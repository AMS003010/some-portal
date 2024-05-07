"use client"

import Image from 'next/image';

import PesLogo from '../images/PES logo_white.png';
import { Nunito } from 'next/font/google'

const nunito = Nunito({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

interface SidePanelProps {
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function SidePanel({index,setIndex}: SidePanelProps) {

    const openbar = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768) {
            const sidebar = document.querySelector('.sidebar');
            sidebar?.classList.toggle('translate-x-[18.5rem]');
        }
    }    

    return(
        <>
            <div className="absolute text-blue-900 text-4xl top-8 left-8 cursor-pointer block lg:hidden" onClick={openbar}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
            </div>
            <div className='sidebar fixed z-10 top-0 bottom-0 lg:left-0 left-[-300px] p-2 w-64 h-dvh overflow-y-auto text-center bg-gradient-to-r from-[#170a4b] to-[#12073a] transform transition duration-300'>
                <div>
                    <div className='flex justify-around lg:justify-center items-center'>
                        <Image src={PesLogo} alt='PES logo' className='w-28 lg:w-40 lg:mt-3 cursor-pointer'/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 block lg:hidden" onClick={openbar}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        <Image src={PesLogo} alt='PES logo' className='w-28 lg:w-40 lg:mt-3 cursor-pointer hidden'/>
                    </div>
                    <hr className=' flex justify-center border-t-2 border-[#FFF] mt-4'/>
                    <div className='flex flex-col justify-start mt-10'>
                        <div className='flex justify-start items-center my-1 hover:bg-[#21205e] rounded-lg py-4 text-[#FFF] hover:text-white  pl-3 cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z" />
                            </svg>
                            <span className={`${nunito.className} text-lg ml-2 `} onClick={() => setIndex(0)}>Dashboard</span>
                        </div>
                        <div className='flex justify-start items-center my-1 hover:bg-[#21205e] rounded-lg py-4 text-[#FFF] hover:text-white pl-3 cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            <span className={`${nunito.className} text-lg ml-2`}>My profile</span>
                        </div>
                        <div className='flex justify-start items-center my-1 hover:bg-[#21205e] rounded-lg py-4 text-[#FFF] hover:text-white pl-3 cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>
                            <span className={`${nunito.className} text-lg ml-2`} onClick={() => setIndex(1)}>Add a Publication</span>
                        </div>
                        <div className='flex justify-start items-center my-1 hover:bg-[#21205e] rounded-lg py-4 text-[#FFF] hover:text-white pl-3 cursor-pointer absolute bottom-2 w-[94%]'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                            </svg>
                            <span className={`${nunito.className} text-lg ml-2`}>Logout</span>
                        </div>
                    </div>
                </div>   
            </div>
        </>
    )
}