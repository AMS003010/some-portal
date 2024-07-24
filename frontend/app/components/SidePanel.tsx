"use client"

import Image from 'next/image';
import PubDropDown from './Publication/PubDropDown';
import FdpDropDown from './FDP/FdpDropDown';

import PesLogo from '../images/PES-logo-white.png';
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 block lg:hidden" onClick={openbar}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        <Image src={PesLogo} alt='PES logo' className='w-28 lg:w-40 lg:mt-3 cursor-pointer hidden'/>
                    </div>
                    <hr className=' flex justify-center border-t-2 border-[#FFF] mt-4'/>
                    <div className='flex flex-col justify-start mt-10'>
                        <div>
                            <PubDropDown index={index} setIndex={setIndex}/>
                        </div>
                        <div>
                            <FdpDropDown index={index} setIndex={setIndex}/>
                        </div>
                        <div className='flex justify-start items-center my-1 hover:bg-[#21205e] rounded-lg py-4 text-[#FFF] hover:text-white pl-3 cursor-pointer absolute bottom-2 w-[94%]'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                            </svg>
                            <span className={`${nunito.className} text-lg ml-2`}>Logout</span>
                        </div>
                    </div>
                </div>   
            </div>
        </>
    )
}