import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: '500',
    subsets: ['latin'],
    display: 'swap',
})

export default function FdpCompareSection () {
    return(
        <div className="bg-[#d5e7eb] h-[100vh] w-screen flex justify-end overflow-y-auto">
            <div className="h-max bg-white m-3 w-[94%] md:w-[79%] rounded-2xl p-7 flex flex-col shadow">
                <h1 className={`${roboto.className} text-black text-3xl md:text-4xl lg:text-4xl mt-16 md:mt-7`}>Compare Dashboard</h1>
                <hr className="flex justify-center border-t-2 border-gray-200 mt-7 mb-10"/>
            </div>
        </div>
    )
}