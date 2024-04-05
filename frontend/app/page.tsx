"use client"
import { Roboto } from 'next/font/google'
import { resolve } from 'path';

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

export default function Home() {

  interface Publication {
    ID: number,
    FacultyName: string,
    date: string,
    PublicationType: string,
    Title: string,
    Conference_Or_Journal_Name: string,
    Statu: string,
    TotalAuthors: string,
    AuthorNames: string[],
    IsCapstone: string,
    Links: string[],
    ImpactFactor: string,
    ScopusIndexation: string,
    id:  string
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
  const [acceptPubs,setAcceptPubs] = useState<number>(0);
  const [pendPubs,setPendPubs] = useState<number>(0);
  const [publishPubs,setPublishPubs] = useState<number>(0);
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
        text: 'Daily Revenue'
      }
    },
    maintainAspectRatio: false,
    responsive: true
  });

    useEffect(() => {
        const fetchPubs = async () => {
            try {
                //await new Promise(resolve => setTimeout(resolve,7000));
                const response = await fetch('http://localhost:8000/publications',{
                    method:'GET',
                    headers:{'Content-type':'appliaction/json'}
                });
                if(!response.ok){
                    console.log("Unable fetching publications");
                }
                const data: Publication[] = await response.json();
                let acceptedCount = 0;
                let pendingCount = 0;
                let publisgedcount = 0;
                data.forEach((publication) => {
                  if (publication.Statu === "Accepted") {
                    acceptedCount++;
                  } else if (publication.Statu === "Pending") {
                    pendingCount++;
                  } else if (publication.Statu === "Published") {
                    publisgedcount++;
                  }
                });

                const pub_tot = data.length;
                setPubs(data);
                setAcceptPubs(acceptedCount);
                setPublishPubs(publisgedcount);
                setPendPubs(pendingCount);
                settotalPubs(pub_tot);
                
                setChartData({
                  labels: ['Published', 'Accepted', 'Pending'],
                  datasets: [
                      {
                          label: 'Publication Status',
                          data: [publisgedcount, acceptedCount, pendingCount],
                          
                          backgroundColor: ['#11b765', '#f8821e', '#ef4437'],
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
    <main className="bg-[#d5e7eb] h-max w-screen flex justify-end overflow-hidden overflow-y-auto">
      <div className="h-max bg-white m-3 w-screen md:w-[79%] rounded-2xl p-7 flex flex-col shadow">
        <div className='flex justify-between flex-row w-[100%]'>
          <div className='flex justify-start flex-col pt-8'>
            <h1 className={`${roboto.className} text-black text-4xl lg:text-4xl`}>Publications</h1>
            {totalPubs!=0 ? <div className={`${roboto.className} text-black text-xl`}>{totalPubs} total</div> : <div className='px-2 py-4 my-1 bg-slate-300 animate-pulse rounded-lg'></div>}
          </div>
          <div className='flex justify-end'>
            <div className='hidden md:flex justify-between gap-8'>
              <div>
                {publishPubs!=0 ? <div className="text-black text-1xl lg:text-4xl mb-2">{publishPubs}</div> : <div className='px-2 py-4 bg-slate-300 animate-pulse rounded-lg'></div>}
                <div className="text-[#6c717e]">Published</div>
              </div>
              <div className='bg-[#e9eaed] w-[2px] h-[85%]'></div>
              <div>
              {pendPubs!=0 ? <div className="text-black text-1xl lg:text-4xl mb-2">{pendPubs}</div> : <div className='px-2 py-4 bg-slate-300 animate-pulse rounded-lg'></div>}
                <div className="text-[#6c717e]">Pending</div>
              </div>
            </div>
          </div>
        </div>
        <hr className="flex justify-center border-t-2 border-[#e9eaed] my-5"/>

        <div className='overflow-auto rounded-lg shadow hidden md:block mb-5'>
          <table className='w-full text-black'>
            <thead className='bg-gray-50 border-b-2 border-gray-200'>
              <tr>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>No</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Title</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Faculty</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>No of authors</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Published on</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Type</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Capstone/Non-Capstone</th>
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
                      {publication.Statu=="Published" ? (
                        <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-80 bg-yellow-200 rounded-lg bg-opacity-50'>{publication.Statu}</span>
                      ) : publication.Statu == "Accepted" ? (
                        <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-orange-80 bg-orange-200 rounded-lg bg-opacity-50'>{publication.Statu}</span>
                      ) : (
                        <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-blue-80 bg-blue-200 rounded-lg bg-opacity-50'>{publication.Statu}</span>
                      )
                      }
                    </td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{publication.date}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{publication.PublicationType}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{publication.IsCapstone}</td>
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


        <div className='w-full md:col-span-2 h-[50vh] mb-2 md:m-auto p-4 border rounded-lg bg-white shadow'>
          {pub.length!=0 ? <Doughnut data={chartData} options={chartOptions} /> : <div className='px-2 py-4 my-1 bg-slate-300 animate-pulse rounded-lg w-[100%] h-[100%]'></div>}
        </div>
        
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 md:hidden">
          {pub.length!=0 ? (pub.map((publication) => (
            <div className='bg-white space-y-3 p-4 rounded-lg shadow' key={publication.ID}>
              <div className='flex items-center space-x-2 text-sm py-2'>
                <div className='text-blue-500 font-bold text-[0.8rem] lg:text-sm'>{publication.FacultyName}</div>
                <div className='text-gray-500 hidden'>{publication.date}</div>
                <div>
                  {publication.Statu=="Published" ? (
                    <span className='p-1.5 text-[0.6rem] lg:text-sm font-medium uppercase rounded-lg tracking-wider text-green-800 bg-green-200'>{publication.Statu}</span>
                    ) : publication.Statu == "Accepted" ? (
                    <span className='p-1.5 text-[0.6rem] lg:text-sm font-medium uppercase rounded-lg tracking-wider text-orange-800 bg-orange-200'>{publication.Statu}</span>
                    ) : (
                    <span className='p-1.5 text-[0.6rem] lg:text-sm font-medium uppercase rounded-lg tracking-wider text-blue-800 bg-blue-200'>{publication.Statu}</span>
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