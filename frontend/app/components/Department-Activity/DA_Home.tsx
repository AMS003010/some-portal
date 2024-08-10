interface SideProps {
    rIndex: number
    setRIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function DaHome ({rIndex, setRIndex}: SideProps) {

    return(
        <div className='flex justify-center items-center mb-[5rem]'>
            <div>
                <h1 className='text-3xl mb-5'>Select your choice</h1>
                <div className='flex flex-col gap-3'>
                    <div className='px-6 py-4 border-gray-200 border-2 rounded-xl hover:cursor-pointer hover:shadow-md transform hover:-translate-y-2 duration-200 text-center' onClick={() => setRIndex(1)}>Worshops</div>
                    <div className='px-6 py-4 border-gray-200 border-2 rounded-xl hover:cursor-pointer hover:shadow-md transform hover:-translate-y-2 duration-200 text-center' onClick={() => setRIndex(2)}>Seminars / Guest Lectures</div>
                    <div className='px-6 py-4 border-gray-200 border-2 rounded-xl hover:cursor-pointer hover:shadow-md transform hover:-translate-y-2 duration-200 text-center' onClick={() => setRIndex(3)}>FDP</div>
                    <div className='px-6 py-4 border-gray-200 border-2 rounded-xl hover:cursor-pointer hover:shadow-md transform hover:-translate-y-2 duration-200 text-center' onClick={() => setRIndex(4)}>Hackathons</div>
                    <div className='px-6 py-4 border-gray-200 border-2 rounded-xl hover:cursor-pointer hover:shadow-md transform hover:-translate-y-2 duration-200 text-center' onClick={() => setRIndex(5)}>Summer Course / Special Topic</div>
                    <div className='px-6 py-4 border-gray-200 border-2 rounded-xl hover:cursor-pointer hover:shadow-md transform hover:-translate-y-2 duration-200 text-center' onClick={() => setRIndex(6)}>Other</div>
                </div>
            </div>
        </div>
    )
}