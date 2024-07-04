import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: '500',
    subsets: ['latin'],
    display: 'swap',
})

export default function FdpDashboard () {
  return(
    <main className="bg-[#d5e7eb] h-[100vh] w-screen flex justify-end overflow-y-auto">
      <div className="h-max bg-white m-3 w-[94%] md:w-[79%] rounded-2xl p-7 flex flex-col shadow">
        <div className='flex justify-between flex-row w-[100%]'>
          <div className='flex justify-start flex-col pt-8'>
            <h1 className={`${roboto.className} text-black text-4xl lg:text-4xl`}>FDPs</h1>
          </div>
        </div>
      </div>
    </main>
  )
}