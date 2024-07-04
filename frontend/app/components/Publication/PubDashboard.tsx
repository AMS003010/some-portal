"use client"
import { Roboto } from 'next/font/google';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const roboto = Roboto({
  weight: '500',
  subsets: ['latin'],
  display: 'swap',
})

export default function PubDashboard() {

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


  const [pub,setPubs] = useState<Publication[]>([]);
  const [totalPubs,settotalPubs] = useState<number>(0);
  const [presentedPubs,setpresentedPubs] = useState<number>(0);
  const [publishPubs,setPublishPubs] = useState<number>(0);
  const [filterStartDate, setFilterStartDate] = useState<string>('2023-01-01');
  const [filterEndDate,setfilterEndDate] = useState<string>(`${new Date().toISOString().slice(0, -14)}`);
  const [chartData, setChartData] = useState<ChartDataInf>({
    labels:[],
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState<any>({
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Publication Status'
      }
    },
    maintainAspectRatio: false,
    responsive: true
  });

  const handleDateFilter = async () => {
    try {
      console.log("start "+filterStartDate);
      console.log("end "+filterEndDate);
      const response = await axios.get(`http://127.0.0.1:5000/publications?starttime=${filterStartDate}&endtime=${filterEndDate}`,{
                    headers:{'Content-type':'application/json'}
                });
                if(!response.data.status){
                    console.log("Unable fetching publications");
                }


                const fetchedData = await response.data;
                console.log(fetchedData);


                const data: Publication[] = await response.data;
                let presentedCount = 0;
                let publishedcount = 0;
                data.forEach((publication) => {
                  if (publication.Status === "Presented") {
                    presentedCount++;
                  } else if (publication.Status === "Published") {
                    publishedcount++;
                  }
                });

                const pub_tot = data.length;
                setPubs(data);
                setPublishPubs(publishedcount);
                setpresentedPubs(presentedCount);
                settotalPubs(pub_tot);
                
                setChartData({
                  labels: ['Published', 'Presented'],
                  datasets: [
                      {
                          label: 'Publication Status',
                          data: [publishedcount, presentedCount],
                          
                          backgroundColor: ['#f8821e', '#ef4437'],
                        }, 
                  ]
              })
              setChartOptions({
                  plugins: {
                      legend: {
                          position: 'top',
                      },
                      title: {
                          display: true,
                          text: 'Publication Status'
                      }
                  },
                  maintainAspectRatio: false,
                  responsive: true
              })
    } catch (error) {
      console.error("Error fetching date filtered data:", error);
    }
  }

    useEffect(() => {
        const fetchPubs = async () => {
            try {
                const currentTimestamp: string = await new Date().toISOString().slice(0, -14);
                const response = await axios.get(`http://127.0.0.1:5000/publications?starttime=${filterStartDate}&endtime=${currentTimestamp}`,{
                    headers:{'Content-type':'application/json'}
                });
                if(!response.data.status){
                    console.log("Unable fetching publications");
                }


                const fetchedData = await response.data;
                console.log(fetchedData);


                const data: Publication[] = await response.data;
                let presentedCount = 0;
                let publishedcount = 0;
                data.forEach((publication) => {
                  if (publication.Status === "Presented") {
                    presentedCount++;
                  } else if (publication.Status === "Published") {
                    publishedcount++;
                  }
                });

                const pub_tot = data.length;
                setPubs(data);
                setPublishPubs(publishedcount);
                setpresentedPubs(presentedCount);
                settotalPubs(pub_tot);
                
                setChartData({
                  labels: ['Published', 'Presented'],
                  datasets: [
                      {
                          label: 'Publication Status',
                          data: [publishedcount, presentedCount],
                          
                          backgroundColor: ['#f8821e', '#ef4437'],
                        }, 
                  ]
              })
              setChartOptions({
                  plugins: {
                      legend: {
                          position: 'top',
                      },
                      title: {
                          display: true,
                          text: 'Publication Status'
                      }
                  },
                  maintainAspectRatio: false,
                  responsive: true
              })

            } catch (error) {
                console.log("Error fetching publications",error);
            }
        }
        fetchPubs();
    },[])

  return (
    <main className="bg-[#d5e7eb] h-max w-screen flex justify-end overflow-y-auto">
      <div className="h-max bg-white m-3 w-[94%] md:w-[79%] rounded-2xl p-7 flex flex-col shadow">
        <div className='flex justify-between flex-row w-[100%]'>
          <div className='flex justify-start flex-col pt-8'>
            <h1 className={`${roboto.className} text-black text-4xl lg:text-4xl`}>Publications</h1>
            {totalPubs!=0 ? <div className={`${roboto.className} text-black text-xl`}>{totalPubs} total</div> : <div className='px-2 py-4 my-1 bg-slate-300 animate-pulse rounded-lg'></div>}
          </div>
          <div className='flex justify-end'>
            <div className='hidden md:flex justify-between gap-8'>
              <div>
                {publishPubs!=0 ? <div className="text-black text-4xl mb-2">{publishPubs}</div> : <div className='px-2 py-4 bg-slate-300 animate-pulse rounded-lg'></div>}
                <div className="text-[#6c717e]">Published</div>
              </div>
              <div className='bg-[#e9eaed] w-[2px] h-[85%]'></div>
              <div>
              {presentedPubs!=0 ? <div className="text-black text-4xl mb-2">{presentedPubs}</div> : <div className='text-black text-4xl mb-2'>0</div>}
                <div className="text-[#6c717e]">Presented</div>
              </div>
            </div>
          </div>
        </div>
        <hr className="flex justify-center border-t-2 border-gray-200 mt-5 mb-2"/>

        <div className='flex justify-between items-center mt-9 mb-4'>
          <div className='flex justify-start items-center'>
            <div>
              <input 
                className='text-gray-900 border-2 border-gray-100 focus:outline-none focus:border-gray-400 p-2 rounded-xl shadow-md hover:cursor-pointer text-[0.7rem] lg:text-[1rem] mr-2 lg:mr-0'
                required
                type='date'
                id='startdate'
                placeholder='Start Date'
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
              />
            </div>
            <div className='text-gray-400 ml-4 mr-4 flex justify-center text-center hidden lg:block'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </div>
            <div>
              <input 
                className='text-gray-900 border-2 border-gray-100 focus:outline-none focus:border-gray-400 p-2 rounded-xl shadow-md hover:cursor-pointer  text-[0.7rem] lg:text-[1rem]'
                required
                type='date'
                id='startdate'
                placeholder='Start Date'
                value={filterEndDate}
                onChange={(e) => setfilterEndDate(e.target.value)}
              />
            </div>
            <div className='text-gray-500 border-gray-100 border-2 rounded-xl p-2 flex items-center md:p-2 ml-2 hover:border-gray-400 hover:cursor-pointer shadow-md  text-[0.7rem] lg:text-[1rem]' onClick={() => handleDateFilter()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 lg:w-6 lg:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
          </div>
          <div className='text-gray-500 border-gray-100 border-2 rounded-xl p-2 ml-2 hover:border-gray-400 hover:cursor-pointer shadow-md  text-[0.7rem] lg:text-[1rem] hidden md:block'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
          </div>
        </div>
        

        <div className='overflow-auto rounded-lg shadow-lg hidden md:block mb-5'>
          <table className='w-full text-black'>
            <thead className='bg-gray-50 border-b-2 border-gray-200'>
              <tr>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>No</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Title</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Faculty</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>No of authors</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Dates</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Type</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Capstone</th>
              </tr>
            </thead>
              {pub.length!=0 ? (
                <tbody className='divide-y divide-gray-100'>
                {pub.map((publication) => (
                  <tr key={publication.ID}>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{publication.ID}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap truncate max-w-[150px] hover:whitespace-normal'>
                      {publication.Title}
                    </td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{publication.FacultyName}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{publication.TotalAuthors}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                      {publication.Status=="Published" ? (
                        <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-80 bg-yellow-200 rounded-lg bg-opacity-50'>{publication.Status}</span>
                      ) : publication.Status == "Accepted" ? (
                        <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-orange-80 bg-orange-200 rounded-lg bg-opacity-50'>{publication.Status}</span>
                      ) : (
                        <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-blue-80 bg-blue-200 rounded-lg bg-opacity-50'>{publication.Status}</span>
                      )
                      }
                    </td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{ publication.StartDate == publication.EndDate ? ` ${new Date(publication.StartDate).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                      })}` : ` ${new Date(publication.StartDate).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                      })} -  ${new Date(publication.EndDate).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                      })} `}
                    </td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{publication.Types.join(",")}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{publication.IsCapstone ? "Yes" : "No"}</td>
                  </tr>
                ))}
                </tbody>
              ) : (
                <tbody className='divide-y divide-gray-100'>
                  {[...Array(5)].map((_, index) => (
                    <tr key={index}>
                      <td className='p-3 text-sm text-gray-700 whitespace-nowrap'><span className='bg-slate-300 w-[90%] animate-pulse px-[50%] py-1 rounded-lg'></span></td>
                      <td className='p-3 text-sm text-gray-700 whitespace-nowrap truncate max-w-[150px] hover:whitespace-normal'><span className='bg-slate-300 w-[90%] animate-pulse px-[50%] py-1 rounded-lg'></span></td>
                      <td className='p-3 text-sm text-gray-700 whitespace-nowrap'><span className='bg-slate-300 w-[90%] animate-pulse px-[50%] py-1 rounded-lg'></span></td>
                      <td className='p-3 text-sm text-gray-700 whitespace-nowrap'><span className='bg-slate-300 w-[90%] animate-pulse px-[50%] py-1 rounded-lg'></span></td>
                      <td className='p-3 text-sm text-gray-700 whitespace-nowrap'><span className='bg-slate-300 w-[90%] animate-pulse px-[50%] py-1 rounded-lg'></span></td>
                      <td className='p-3 text-sm text-gray-700 whitespace-nowrap'><span className='bg-slate-300 w-[90%] animate-pulse px-[50%] py-1 rounded-lg'></span></td>
                      <td className='p-3 text-sm text-gray-700 whitespace-nowrap'><span className='bg-slate-300 w-[90%] animate-pulse px-[50%] py-1 rounded-lg'></span></td>
                      <td className='p-3 text-sm text-gray-700 whitespace-nowrap'><span className='bg-slate-300 w-[90%] animate-pulse px-[50%] py-1 rounded-lg'></span></td>
                    </tr>
                  ))}
                </tbody>
              )}

          </table>
        </div>


        <div className='w-full md:col-span-2 h-[50vh] mb-2 md:m-auto p-4 border rounded-lg bg-white shadow-lg'>
          {pub.length!=0 ? <Doughnut data={chartData} options={chartOptions} /> : <div className='px-2 py-4 my-1 bg-slate-300 animate-pulse rounded-lg w-[100%] h-[100%]'></div>}
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 md:hidden">
          {pub.length!=0 ? (pub.map((publication) => (
            <div className='bg-white space-y-3 p-4 rounded-lg shadow' key={publication.ID}>
              <div className='flex items-center space-x-2 text-sm py-2'>
                <div className='text-blue-500 font-bold text-[0.8rem] lg:text-sm'>{publication.FacultyName}</div>
                <div className='text-gray-500 hidden'>{` ${publication.StartDate} -  ${publication.EndDate} `}</div>
                <div>
                      {publication.Status=="Published" ? (
                          <span className='p-1.5 text-[0.6rem] lg:text-sm font-medium uppercase rounded-lg tracking-wider text-blue-800 bg-yellow-200'>{publication.Status}</span>
                        ) : publication.Status == "Accepted" ? (
                          <span className='p-1.5 text-[0.6rem] lg:text-sm font-medium uppercase rounded-lg tracking-wider text-blue-800 bg-orange-200'>{publication.Status}</span>
                        ) : (
                          <span className='p-1.5 text-[0.6rem] lg:text-sm font-medium uppercase rounded-lg tracking-wider text-blue-800 bg-blue-200'>{publication.Status}</span>
                        )
                      }
                </div>
              </div>
              <div className='text-sm text-gray-700'>{publication.Title}</div>
              <div className='text-sm font-medium text-black'>{publication.IsCapstone}</div>
            </div>
          ))) : (
            [...Array(5)].map((_,index) => (
              <div className='bg-white space-y-3 p-4 rounded-lg shadow' key={index}>
                <div className='flex items-center space-x-2 text-sm py-2'>
                  <div className='text-blue-500 font-bold text-[0.8rem] lg:text-sm animate-pulse px-6 py-3 rounded-lg bg-slate-300'></div>
                  <div className='text-gray-500 hidden md:block'></div>
                  <div>
                    <span className='p-1.5 text-[0.6rem] lg:text-sm font-medium uppercase rounded-lg tracking-wider bg-slate-300 animate-pulse px-6 py-2'></span>
                  </div>
                </div>
                <div className='text-sm text-gray-700 animate-pulse px-2 py-4 rounded-lg bg-slate-300'></div>
                <div className='text-sm font-medium text-black animate-pulse px-2 py-4 rounded-lg bg-slate-300'></div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}