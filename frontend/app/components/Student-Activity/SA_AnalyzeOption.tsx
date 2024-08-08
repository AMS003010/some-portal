import SaHome from './SA_Home';
import HigherStudiesAnalyze from './Analyze/HigherStudies_Analyze';
import EntranceExamAnalyze from './Analyze/EntranceExam_Analyze';
import SportsCulturalAnalyze from './Analyze/SportsCultural_Analyze';
import CareerCounselledAnalyze from './Analyze/CareerCounselling_Analyze';

import { Roboto } from 'next/font/google';
import { useState } from 'react';

const roboto = Roboto({
    weight: '500',
    subsets: ['latin'],
    display: 'swap',
})

export default function SaAnalyzeOption () {

    const [rIndex,setRIndex] = useState<number>(0);

    const ResearchList = [
        <SaHome key="0" rIndex={rIndex} setRIndex={setRIndex}/>,
        <HigherStudiesAnalyze key="1"/>,
        <EntranceExamAnalyze key="2"/>,
        <SportsCulturalAnalyze key="3"/>,
        <CareerCounselledAnalyze key="4"/>
    ]

    return(
        <div className="bg-[#d5e7eb] h-[100vh] w-screen flex justify-end overflow-y-auto">
            <div className="h-max bg-white m-3 w-[94%] md:w-[79%] rounded-2xl text-gray-500 p-7 flex flex-col shadow">
                {rIndex===0 ? (<p></p>) : (
                    <div className='w-max cursor-pointer hover:invert' onClick={() => setRIndex(0)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-arrow-left size-10">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M16 12H8"/>
                            <path d="m12 8-4 4 4 4"/>
                        </svg>
                    </div>
                )}
                <h1 className={`${roboto.className} text-black text-3xl md:text-4xl lg:text-4xl mt-16 md:mt-7`}>Student Activity / Analyze</h1>
                <hr className="flex justify-center border-t-2 border-gray-200 mt-7 mb-10"/>
                {ResearchList[rIndex]}
            </div>
        </div>
    )
}