import { Roboto } from 'next/font/google';
import { Quicksand } from 'next/font/google';
import { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

const roboto = Roboto({
    weight: '500',
    subsets: ['latin'],
    display: 'swap',
})

const quicksand = Quicksand({
    weight: '500',
    subsets: ['latin'],
    display: 'swap',
})

export default function CompareSection () {

    interface Publication {
        ID: number,
        FacultyName: string,
        StartDate: Date,
        EndDate: Date,
        Types: string[],
        Title: string,
        Conference_Or_Journal_Name: string,
        Status: string,
        TotalAuthors: string,
        AuthorNames: string[],
        IsCapstone: string,
        Links: string[],
        ImpactFactor: string,
        ScopusIndexation: string,
    }
    
    interface DataProp {
        label: string,
        data: number[],
        backgroundColor: string[]
    }
    
    interface ChartDataInf {
        labels: string[],
        datasets: DataProp[]
    }

    const [conferences1,setConferences1] = useState<number>(0);
    const [journals1,setJournals1] = useState<number>(0);
    const [books1,setBooks1] = useState<number>(0);
    const [conferences2,setConferences2] = useState<number>(0);
    const [journals2,setJournals2] = useState<number>(0);
    const [books2,setBooks2] = useState<number>(0);
    const [pub1,setPubs1] = useState<Publication[]>([]);
    const [pub2,setPubs2] = useState<Publication[]>([]);
    const [filterStartDate1, setFilterStartDate1] = useState<string>('2023-01-01');
    const [filterEndDate1,setfilterEndDate1] = useState<string>(`${new Date().toISOString().slice(0, -14)}`);
    const [filterStartDate2, setFilterStartDate2] = useState<string>('2023-01-01');
    const [filterEndDate2,setfilterEndDate2] = useState<string>(`${new Date().toISOString().slice(0, -14)}`);
    const [chartData, setChartData] = useState<ChartDataInf>({
        labels:[],
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState<any>({
        plugins: {
            legend: {
                position: 'top',
            },
        },
        maintainAspectRatio: false,
        responsive: true
    });

    const handleDateFilter = async () => {
        try {
            const response1 = await axios.get(`http://127.0.0.1:5000/publications?starttime=${filterStartDate1}&endtime=${filterEndDate1}`, {
                headers: { 'Content-type': 'application/json' }
            });
            console.log({ "data1": await response1.data });
    
            // Assuming a successful response does not have a `status` key but contains the data directly
            if (!response1.data) {
                console.log("Unable to fetch publications for the first date range");
                return;
            }
    
            const response2 = await axios.get(`http://127.0.0.1:5000/publications?starttime=${filterStartDate2}&endtime=${filterEndDate2}`, {
                headers: { 'Content-type': 'application/json' }
            });
            console.log({ "data2": await response2.data });
    
            if (!response2.data) {
                console.log("Unable to fetch publications for the second date range");
                return;
            }
    
            let jour_temp1 = 0;
            let conf_temp1 = 0;
            let book_temp1 = 0;
            let jour_temp2 = 0;
            let conf_temp2 = 0;
            let book_temp2 = 0;
    
            const data1: Publication[] = await response1.data;
            const data2: Publication[] = await response2.data;
    
            data1.forEach((publication) => {
                if (publication.Types.includes("Journal")) {
                    jour_temp1 += 1;
                } else if (publication.Types.includes("Conference")) {
                    conf_temp1 += 1;
                } else if (publication.Types.includes("Book Chapter")) {
                    book_temp1 += 1;
                }
            });
    
            data2.forEach((publication) => {
                if (publication.Types.includes("Journal")) {
                    jour_temp2 += 1;
                } else if (publication.Types.includes("Conference")) {
                    conf_temp2 += 1;
                } else if (publication.Types.includes("Book Chapter")) {
                    book_temp2 += 1;
                }
            });
    
            console.log(jour_temp1, conf_temp1, book_temp1);
            console.log(jour_temp2, conf_temp2, book_temp2);
    
            setJournals1(jour_temp1);
            setConferences1(conf_temp1);
            setBooks1(book_temp1);
            setJournals2(jour_temp2);
            setConferences2(conf_temp2);
            setBooks2(book_temp2);
    
            setChartData({
                labels: ['Journals', 'Conferences', 'Book Chapter'],
                datasets: [
                    {
                        label: 'Time Period 1',
                        data: [jour_temp1, conf_temp1, book_temp1],
                        backgroundColor: ['#fe1966', '#fe1966', '#fe1966'],
                    },
                    {
                        label: 'Time Period 2',
                        data: [jour_temp2, conf_temp2, book_temp2],
                        backgroundColor: ['#004aac', '#004aac', '#004aac'],
                    },
                ]
            });
        } catch (error) {
            console.error("Error fetching date filtered data:", error);
        }
    }       

    return(
        <div className="bg-[#d5e7eb] h-max w-screen flex justify-end overflow-y-auto">
            <div className="h-max bg-white m-3 w-screen md:w-[79%] rounded-2xl p-7 flex flex-col shadow">
                <h1 className={`${roboto.className} text-black text-4xl lg:text-4xl mt-7`}>Compare dashboard</h1>
                <hr className="flex justify-center border-t-2 border-gray-200 mt-7 mb-10"/>
                <div className='bg-gray-50 shadow-lg rounded-2xl w-[100%] p-8'>
                    <div className={`${roboto.className} text-black text-2xl`}>
                        Publications Overview
                    </div>
                    <div className='flex flex-row justify-between mt-5 mb-2'>
                        <div>
                            <input 
                                className={`${quicksand.className} text-gray-500 border-2 border-gray-100 focus:outline-none focus:border-gray-400 p-2 rounded-l-xl shadow-md hover:cursor-pointer  text-[0.7rem] lg:text-[1rem]`}
                                required
                                type='date'
                                id='startdate1'
                                placeholder='Start Date1'
                                value={filterStartDate1}
                                onChange={(e) => setFilterStartDate1(e.target.value)}
                            />
                            <input 
                                className={`${quicksand.className} text-gray-500 border-2 border-gray-100 focus:outline-none focus:border-gray-400 p-2 rounded-r-xl shadow-md hover:cursor-pointer  text-[0.7rem] lg:text-[1rem]`}
                                required
                                type='date'
                                id='enddate1'
                                placeholder='End Date1'
                                value={filterEndDate1}
                                onChange={(e) => setfilterEndDate1(e.target.value)}
                            />
                        </div>
                        <div>
                            <input 
                                className={`${quicksand.className} text-gray-500 border-2 border-gray-100 focus:outline-none focus:border-gray-400 p-2 rounded-l-xl shadow-md hover:cursor-pointer  text-[0.7rem] lg:text-[1rem]`}
                                required
                                type='date'
                                id='startdate2'
                                placeholder='Start Date2'
                                value={filterStartDate2}
                                onChange={(e) => setFilterStartDate2(e.target.value)}
                            />
                            <input 
                                className={`${quicksand.className} text-gray-500 border-2 border-gray-100 focus:outline-none focus:border-gray-400 p-2 rounded-r-xl shadow-md hover:cursor-pointer  text-[0.7rem] lg:text-[1rem]`}
                                required
                                type='date'
                                id='enddate2'
                                placeholder='End Date2'
                                value={filterEndDate2}
                                onChange={(e) => setfilterEndDate2(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='flex flex-row items-center gap-2 mb-10 p-2 text-gray-500 border-gray-100 border-2 rounded-xl hover:border-gray-400 hover:cursor-pointer shadow-md w-max' onClick={() => handleDateFilter()}>
                        <div>Search</div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between gap-3'>
                        <div className='bg-[white] rounded-l-xl border-l-[0.7rem] border-l-pink-700 p-4 rounded-lg shadow-md w-[100%]'>
                            <div className='text-black'>Total Conferences</div>
                            <div className='text-black text-4xl'>{conferences1}</div>
                        </div>
                        <div className='bg-[white] rounded-l-xl border-l-[0.7rem] border-l-green-700 p-4 rounded-lg shadow-md w-[100%]'>
                            <div className='text-black'>Total Journals</div>
                            <div className='text-black text-4xl'>{journals1}</div>
                        </div>
                        <div className='bg-[white] rounded-l-xl border-l-[0.7rem] border-l-orange-700 p-4 rounded-lg shadow-md w-[100%]'>
                            <div className='text-black'>Total Book Chapters</div>
                            <div className='text-black text-4xl'>{books1}</div>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between gap-3 mt-5 mb-9'>
                        <div className='bg-[white] rounded-l-xl border-l-[0.7rem] border-l-pink-700 p-4 rounded-lg shadow-md w-[100%]'>
                            <div className='text-black'>Total Conferences</div>
                            <div className='text-black text-4xl'>{conferences2}</div>
                        </div>
                        <div className='bg-[white] rounded-l-xl border-l-[0.7rem] border-l-green-700 p-4 rounded-lg shadow-md w-[100%]'>
                            <div className='text-black'>Total Journals</div>
                            <div className='text-black text-4xl'>{journals2}</div>
                        </div>
                        <div className='bg-[white] rounded-l-xl border-l-[0.7rem] border-l-orange-700 p-4 rounded-lg shadow-md w-[100%]'>
                            <div className='text-black'>Total Book Chapters</div>
                            <div className='text-black text-4xl'>{books2}</div>
                        </div>
                    </div>
                    <div className='w-full md:col-span-2 h-[50vh] mb-2 md:m-auto p-4 rounded-lg bg-white shadow-lg'>
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    )
}