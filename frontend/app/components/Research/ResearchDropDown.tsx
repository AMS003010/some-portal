import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
}

interface DropProps {
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function ResearchDropDown({index,setIndex}: DropProps) {
    return (
        <Menu as="div" className="relative inline-block text-left w-full">
            <div className='flex justify-start items-center w-full my-1 hover:bg-[#21205e] rounded-lg py-4 text-[#FFF] hover:text-white  pl-3 cursor-pointer'>
                <MenuButton className="flex items-center justify-between w-full">
                    <div className='flex justify-start items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                        </svg>
                        <div className='text-lg'>Research</div>
                    </div>
                    <ChevronDownIcon className="mr-2 h-7 w-7 text-gray-400" aria-hidden="true" />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    <MenuItem>
                        {({ focus }) => (
                            <div className='text-gray-700 block px-4 py-2 text-base'>
                                Research
                            </div>
                        )}
                    </MenuItem>
                    <hr/>
                <MenuItem>
                    {({ focus }) => (
                        <div
                            className={`${classNames(focus ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700', 'block px-4 py-2 text-sm')} flex justify-start items-center gap-2`}
                            onClick={() => setIndex(0)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <div>Add</div>
                        </div>
                    )}
                </MenuItem>
                <MenuItem>
                    {({ focus }) => (
                        <div
                            className={`${classNames(focus ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700', 'block px-4 py-2 text-sm')} flex justify-start items-center gap-2`}
                            onClick={() => setIndex(1)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-column-big size-5">
                                <path d="M3 3v16a2 2 0 0 0 2 2h16"/>
                                <rect x="15" y="5" width="4" height="12" rx="1"/>
                                <rect x="7" y="8" width="4" height="9" rx="1"/>
                            </svg>
                            <div>Analyze</div>
                        </div>
                    )}
                </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    )
}