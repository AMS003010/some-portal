import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
}

interface DropProps {
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function PubDropDown({index,setIndex}: DropProps) {
    return (
        <Menu as="div" className="relative inline-block text-left w-full">
            <div className='flex justify-start items-center w-full my-1 hover:bg-[#21205e] rounded-lg py-4 text-[#FFF] hover:text-white  pl-3 cursor-pointer'>
                <MenuButton className="flex items-center justify-between w-full">
                    <div className='flex justify-start items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-library-big size-8">
                            <rect width="8" height="18" x="3" y="3" rx="1"/>
                            <path d="M7 3v18"/>
                            <path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"/>
                        </svg>
                        <div className='text-lg'>Publication</div>
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
                                Publication
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
                            onClick={() => setIndex(1)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            <div>My Publications</div>
                        </div>
                    )}
                </MenuItem>
                <MenuItem>
                    {({ focus }) => (
                        <div
                            className={`${classNames(focus ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700', 'block px-4 py-2 text-sm')} flex justify-start items-center gap-2`}
                            onClick={() => setIndex(2)}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>
                            <div>Add a Publication</div>
                        </div>
                    )}
                </MenuItem>
                <MenuItem>
                    {({ focus }) => (
                        <div
                            className={`${classNames(focus ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700', 'block px-4 py-2 text-sm')} flex justify-start items-center gap-2`}
                            onClick={() => setIndex(3)}
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
