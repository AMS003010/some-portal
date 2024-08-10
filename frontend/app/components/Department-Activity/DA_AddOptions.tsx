import DaHome from './DA_Home';
import AddWorshop from './Add/Workshop_Add';
import AddSeminar from './Add/Seminar_Add';
import AddFdp from './Add/FDP_Add';
import AddHackathons from './Add/Hackathons_Add';
import AddSpecialTopic from './Add/SpecialTopic_Add';
import AddOther from './Add/Other_Add';

import { Roboto } from 'next/font/google';
import { useState } from 'react';

const roboto = Roboto({
    weight: '500',
    subsets: ['latin'],
    display: 'swap',
})

export default function DaAddOption () {

    const [rIndex,setRIndex] = useState<number>(0);

    const ResearchList = [
        <DaHome key="0" rIndex={rIndex} setRIndex={setRIndex}/>,
        <AddWorshop key="1"/>,
        <AddSeminar key="2"/>,
        <AddFdp key="3"/>,
        <AddHackathons key="4"/>,
        <AddSpecialTopic key="5"/>,
        <AddOther key="6"/>
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
                <h1 className={`${roboto.className} text-black text-3xl md:text-4xl lg:text-4xl mt-16 md:mt-7`}>Department Activity / Add</h1>
                <hr className="flex justify-center border-t-2 border-gray-200 mt-7 mb-10"/>
                {ResearchList[rIndex]}
            </div>
        </div>
    )
}