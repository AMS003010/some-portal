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
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Faculty</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>No of authors</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Published on</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Type</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Capstone/Non-Capstone</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              <tr>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>1</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap truncate max-w-[150px] hover:whitespace-normal'>
                  Automated Gym Exercise Form Checker: Deep-Learning Based Pose Estimation
                </td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Dr.Bharathi R</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>5</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                  <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-80 bg-yellow-200 rounded-lg bg-opacity-50'>Accepted</span>
                </td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Jan 2024</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Conference</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Capstone</td>
              </tr>
              <tr>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>2</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap truncate max-w-[150px] hover:whitespace-normal'>
                  Player Performance Analysis
                </td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Dr. Arti Arya</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>3</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                  <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-gray-80 bg-gray-200 rounded-lg bg-opacity-50'>Accepted (yet to receive)</span>
                </td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Jan 2024</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Journal</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Capstone</td>
              </tr>
              <tr>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>3</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap truncate max-w-[150px] hover:whitespace-normal'>
                  Intersection of Machine Learning, Deep Learning and Transformers to Combat Fake News in Kannada Language
                </td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Dr.Bharathi R</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>5</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                  <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-80 bg-yellow-200 rounded-lg bg-opacity-50'>Accepted</span>
                </td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Jan 2024</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Conference</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Capstone</td>
              </tr>
              <tr>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>4</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap truncate max-w-[150px] hover:whitespace-normal'>
                  Ensemble of Multimodal Deep Learning Models for Violin Bowing Techniques Classification
                </td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Dr.Kamatchi Priya</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>6</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                  <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-80 bg-yellow-200 rounded-lg bg-opacity-50'>Accepted</span>
                </td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Jan 2024</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Conference</td>
                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Non-Capstone</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 md:hidden">
          <div className='bg-white space-y-3 p-4 rounded-lg shadow'>
            <div className='flex items-center space-x-2 text-sm py-2'>
              <div className='text-blue-500 font-bold'>Dr.Bharathi R</div>
              <div className='text-gray-500'>Jan 2024</div>
              <div>
                <span className='p-1.5 text-sm font-medium uppercase rounded-lg tracking-wider text-green-800 bg-green-200'>Accepted</span>
              </div>
            </div>
            <div className='text-sm text-gray-700'>Automated Gym Exercise Form Checker: Deep-Learning Based Pose Estimation</div>
            <div className='text-sm font-medium text-black'>Capstone</div>
          </div>
          <div className='bg-white space-y-3 p-4 rounded-lg shadow'>
            <div className='flex items-center space-x-2 text-sm py-2'>
              <div className='text-blue-500 font-bold'>Dr. Arti Arya</div>
              <div className='text-gray-500'>Jan 2024</div>
              <div>
                <span className='p-1.5 text-sm font-medium uppercase rounded-lg tracking-wider text-green-800 bg-green-200'>Accepted</span>
              </div>
            </div>
            <div className='text-sm text-gray-700'>Player Performance Analysis</div>
            <div className='text-sm font-medium text-black'>Capstone</div>
          </div>
          <div className='bg-white space-y-3 p-4 rounded-lg shadow'>
            <div className='flex items-center space-x-2 text-sm py-2'>
              <div className='text-blue-500 font-bold'>Dr.Bharathi R</div>
              <div className='text-gray-500'>Jan 2024</div>
              <div>
                <span className='p-1.5 text-sm font-medium uppercase rounded-lg tracking-wider text-green-800 bg-green-200'>Accepted</span>
              </div>
            </div>
            <div className='text-sm text-gray-700'>Intersection of Machine Learning, Deep Learning and Transformers to Combat Fake News in Kannada Language</div>
            <div className='text-sm font-medium text-black'>Capstone</div>
          </div>
          <div className='bg-white space-y-3 p-4 rounded-lg shadow'>
            <div className='flex items-center space-x-2 text-sm py-2'>
              <div className='text-blue-500 font-bold'>Dr.Kamatchi Priya</div>
              <div className='text-gray-500'>Jan 2024</div>
              <div>
                <span className='p-1.5 text-sm font-medium uppercase rounded-lg tracking-wider text-green-800 bg-green-200'>Accepted</span>
              </div>
            </div>
            <div className='text-sm text-gray-700'>Ensemble of Multimodal Deep Learning Models for Violin Bowing Techniques Classification</div>
            <div className='text-sm font-medium text-black'>Non-Capstone</div>
          </div>
        </div>

      </div>
    </main>
  );
}