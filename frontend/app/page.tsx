import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '500',
  subsets: ['latin'],
  display: 'swap',
})

export default function Home() {
  return (
    <main className="bg-[#d5e7eb] h-screen w-screen flex justify-end">
      <div className="h-max bg-white m-3 w-[80%] rounded-2xl p-7 flex flex-col">
        <div className='flex justify-between flex-row w-[100%]'>
          <div className='flex justify-start flex-col'>
            <h1 className={`${roboto.className} text-black text-4xl`}>Publications</h1>
            <div className={`${roboto.className} text-black text-xl`}>117 total</div>
          </div>
          <div className='flex justify-end'>
            <div className='flex justify-between gap-8'>
              <div>
                <div className="text-black text-4xl mb-2">94</div>
                <div className="text-[#6c717e]">Accepted</div>
              </div>
              <div className='bg-[#e9eaed] w-[2px] h-[85%]'></div>
              <div>
                <div className="text-black text-4xl mb-2">23</div>
                <div className="text-[#6c717e]">In Progress</div>
              </div>
            </div>
          </div>
        </div>
        <hr className="flex justify-center border-t-2 border-[#e9eaed] my-5"/>

        <div className='overflow-auto rounded-lg shadow hidden md:block'>
          <table className='w-full text-black'>
            <thead className='bg-gray-50 border-b-2 border-gray-200'>
              <tr>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>No</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Title</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>By</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>No of authors</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              <tr>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>1</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Automated Gym Exercise Form Checker: Deep-Learning Based Pose Estimation</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Dr.Bharathi R</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>5</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                  <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-80 bg-yellow-200 rounded-lg bg-opacity-50'>Accepted</span>
                </td>
              </tr>
              <tr>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>2</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Player Performance Analysis</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Dr. Arti Arya</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>3</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                  <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-80 bg-yellow-200 rounded-lg bg-opacity-50'>Accepted (yet to receive)</span>
                </td>
              </tr>
              <tr>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>3</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Intersection of Machine Learning, Deep Learning and Transformers to Combat Fake News in Kannada Language</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Dr.Bharathi R</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>5</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                  <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-80 bg-yellow-200 rounded-lg bg-opacity-50'>Accepted</span>
                </td>
              </tr>
              <tr>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>4</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Ensemble of Multimodal Deep Learning Models for Violin Bowing Techniques Classification</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Dr.Kamatchi Priya</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>6</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                  <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-80 bg-yellow-200 rounded-lg bg-opacity-50'>Accepted</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        

      </div>
    </main>
  );
}