import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
}

interface DropProps {
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function SaDropDown({index,setIndex}: DropProps) {
    return (
        <Menu as="div" className="relative inline-block text-left w-full">
            <div className='flex justify-start items-center w-full my-1 hover:bg-[#21205e] rounded-lg py-4 text-[#FFF] hover:text-white  pl-3 cursor-pointer'>
                <MenuButton className="flex items-center justify-between w-full">
                    <div className='flex justify-start items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pyramid size-8">
                            <path d="M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z"/>
                            <path d="M12 2v20"/>
                        </svg>
                        <div className='text-lg'>Student Activity</div>
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
                                Student Activity
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
                            onClick={() => setIndex(5)}
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