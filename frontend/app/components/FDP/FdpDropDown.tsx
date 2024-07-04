import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
}

interface DropProps {
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function FdpDropDown({index,setIndex}: DropProps) {
    return (
        <Menu as="div" className="relative inline-block text-left w-full">
            <div className='flex justify-start items-center w-full my-1 hover:bg-[#21205e] rounded-lg py-4 text-[#FFF] hover:text-white  pl-3 cursor-pointer'>
                <MenuButton className="flex items-center justify-between w-full">
                    <div className='flex justify-start items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                        </svg>
                        <div className='text-lg'>FDP</div>
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
                                FDP
                            </div>
                        )}
                    </MenuItem>
                    <hr/>
                <MenuItem>
                    {({ focus }) => (
                        <div
                            className={`${classNames(focus ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700', 'block px-4 py-2 text-sm')} flex justify-start items-center gap-2`}
                            onClick={() => setIndex(4)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z" />
                            </svg>
                            <div>Dashboard</div>
                        </div>
                    )}
                </MenuItem>
                <MenuItem>
                    {({ focus }) => (
                        <div
                            className={`${classNames(focus ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700', 'block px-4 py-2 text-sm')} flex justify-start items-center gap-2`}
                            onClick={() => setIndex(5)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            <div>My FDPs</div>
                        </div>
                    )}
                </MenuItem>
                <MenuItem>
                    {({ focus }) => (
                        <div
                            className={`${classNames(focus ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700', 'block px-4 py-2 text-sm')} flex justify-start items-center gap-2`}
                            onClick={() => setIndex(6)}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>
                            <div>Add a FDP</div>
                        </div>
                    )}
                </MenuItem>
                <MenuItem>
                    {({ focus }) => (
                        <div
                            className={`${classNames(focus ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700', 'block px-4 py-2 text-sm')} flex justify-start items-center gap-2`}
                            onClick={() => setIndex(7)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                            </svg>
                            <div>Compare</div>
                        </div>
                    )}
                </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    )
}
