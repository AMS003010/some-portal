import { Roboto } from 'next/font/google'

const roboto = Roboto({
    weight: '500',
    subsets: ['latin'],
    display: 'swap',
})


	// +++FacultyName             string    `json:"FacultyName" db:"Name of the faculties in PES University (Currently)"`
	// StartDate               time.Time `json:"StartDate" db:"Publication / Conference Start Date"`
	// EndDate                 time.Time `json:"EndDate" db:"End Date"`
	// ++Types                   []string  `json:"Types" db:"Publication Type(Journal/Conference/ Book Chapter)"`
	// ++Title                   string    `json:"Title" db:"Title of the Paper/Book/Book chapter"`
	// ++ConferenceOrJournalName string    `json:"ConferenceOrJournalName" db:"Journal Name/Book /Conference"`
	// ++Status                  string    `json:"Status" db:"Status"`
	// ++TotalAuthors            int       `json:"TotalAuthors" db:"Total Authors"`
	// ++AuthorNames             []string  `json:"AuthorNames" db:"Authors"`
	// IsCapstone              int       `json:"IsCapstone" db:"Capstone/ Non Capstone"`
	// Links                   []string  `json:"Links" db:"DOI/ link of the paper (Applicable for Journal Paper and Book Chapter)"`
	// ImpactFactor            string    `json:"ImpactFactor" db:"Impact Factor"`
	// ScopusIndexation        string    `json:"ScopusIndexation" db:"Q1/Q2/Q3/Q4/Scopus /WOS Indexed/Not Applicable"`


export default function AddPublication () {
    return(
        <div className="bg-[#d5e7eb] h-dvh w-screen flex justify-end overflow-hidden overflow-y-auto">
            <div className="h-max bg-white m-3 w-screen md:w-[79%] rounded-2xl p-7 flex flex-col shadow">
                <h1 className={`${roboto.className} text-black text-4xl lg:text-4xl mt-7`}>Add a Publication</h1>
                <hr className="flex justify-center border-t-2 border-gray-200 mt-7 mb-20"/>
                <form>
                    <div className='flex justify-between gap-5 mb-7'>
                        <div className='relative w-full'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600' 
                                type='text'
                                placeholder='Faculty Name'
                            />
                            <label className='absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>Name</label>
                        </div>
                        <div className='relative w-full'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600' 
                                type='text'
                                placeholder='Type'
                            />
                            <label className='absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>Type</label>
                        </div>
                    </div>
                    <div className='flex justify-between gap-5 mb-7'>
                        <div className='relative w-full'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600' 
                                type='text'
                                placeholder='Title'
                            />
                            <label className='absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>Title</label>
                        </div>
                    </div>
                    <div className='flex justify-between gap-5 mb-7'>
                        <div className='relative w-full'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600' 
                                type='text'
                                placeholder='Name of Journal / Book / Conference'
                            />
                            <label className='absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>Name of Journal / Book / Conference</label>
                        </div>
                        <div className='relative w-full'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600' 
                                type='text'
                                placeholder='Status'
                            />
                            <label className='absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>Status</label>
                        </div>
                    </div>
                    <div className='flex justify-between gap-5 mb-7'>
                        <div className='relative w-full'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600' 
                                type='text'
                                placeholder='No of Total Authors'
                            />
                            <label className='absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>No of Total Authors</label>
                        </div>
                        <div className='relative w-full'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600' 
                                type='text'
                                placeholder='Author Names'
                            />
                            <label className='absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>Author Names</label>
                        </div>
                    </div>
                    <div className='flex justify-between gap-5 mb-7'>
                        <div className='relative w-full'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600' 
                                type='text'
                                placeholder='Capstone Project'
                            />
                            <label className='absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>Capstone Project ( Yes / No )</label>
                        </div>
                        <div className='relative w-full'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600' 
                                type='text'
                                placeholder='Links'
                            />
                            <label className='absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>Links</label>
                        </div>
                    </div>
                    <div className='flex justify-between gap-5 mb-7'>
                        <div className='relative w-full'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600' 
                                type='text'
                                placeholder='Impact Factor'
                            />
                            <label className='absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>Impact Factor</label>
                        </div>
                        <div className='relative w-full'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600' 
                                type='text'
                                placeholder='Scopus Indexation'
                            />
                            <label className='absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>Scopus Indexation</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}