import { Roboto } from 'next/font/google'
import { MultiValue, SingleValue} from "react-select";
import "../../../styles/addPublicationStyles.css"
import Creatable from "react-select/creatable"
import makeAnimated from 'react-select/animated';
import { TagsInput } from "react-tag-input-component";
import React, {useState, useEffect, FormEvent} from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const roboto = Roboto({
    weight: '500',
    subsets: ['latin'],
    display: 'swap',
})

type JournalJSON = {
    PaperTitle: string,
    Authors: string,
    Department: string,
    JournalName: string,
    PublicationYear: string,
    ISSNNumber: string,
    Link: string,
}

export default function AddJournal () {
    const [paperTitle, setPaperTitle] = useState("")
    const [faculty, setFaculty] = useState("")
    const [authorNames, setAuthorNames] = useState<string []>(faculty ? [faculty] : []);
    const [selectedDepartment, setSelectedDepartment] = useState<SingleValue<{
        value: string;
        label: String;
    }> | null>(null);
    const [journalName, setJournalName] = useState("")
    const [year, setYear] = useState("")
    const [issnNo, setIssnNo] = useState("")
    const [publicationLinks, setPublicationLinks] = useState<string []>([]);

    const handleAuthorNamesChange = (names: string []) => {
        console.log(names)
        let spreadoutnames = names?.pop()?.trim().split(",")
        
        let newnames = spreadoutnames?.map((name) => {
        if(!authorNames.includes(name.trim()) && name.trim().length > 0){
        names.push(name.trim())
        }})
        
        setAuthorNames(names)
    }

    const handleAuthorNamesBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        let spreadoutnames = e.target.value.trim().split(",");
        setAuthorNames(prevNames => {
            let newNames = [...prevNames];
            spreadoutnames.forEach(name => {
                const trimmedName = name.trim();
                if (!newNames.includes(trimmedName) && trimmedName.length > 0) {
                    newNames.push(trimmedName);
                }
            });
            return newNames;
        });
    };

    const handlePublicationLinksChange = (links: string []) => {
        console.log(links)
        let spreadoutlinks = links?.pop()?.trim().split(",")
        
        let newlinks = spreadoutlinks?.map((link) => {
        if(!publicationLinks.includes(link.trim()) && link.trim().length > 0){
        links.push(link.trim())
        }})
        
        setPublicationLinks(links)
    }

    const handlePublicationLinksBlur = (e: React.FocusEvent<HTMLInputElement>) => {
       let spreadoutlinks = e.target.value?.trim().split(",")
       setPublicationLinks(prevLinks => {
        let newLinks = [...prevLinks];
        spreadoutlinks.forEach(link => {
            const trimmedLink = link.trim();
            if (!newLinks.includes(trimmedLink) && trimmedLink.length > 0) {
                newLinks.push(trimmedLink);
            }
        });
        
        return newLinks;
        });
    }

    const handleFacultyBlur = () => {
        // When the input field loses focus, update authorNames with the final faculty value
        if (faculty && faculty.trim() !== "" && (!authorNames.includes(faculty)) ){
        setAuthorNames(prevAuthorNames => [...prevAuthorNames, faculty]);
        }
    };

    const animatedComponents = makeAnimated();

    const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!selectedDepartment){
            alert("All fields are mandatory! Please select a publication status.")
            return
        }

        if(!paperTitle){
            alert("All fields are mandatory! Please fill a title")
            return
        }

        if(!journalName){
            alert("All fields are mandatory! Please fill the name of journal")
            return
        }

        if(!issnNo){
            alert("All fields are mandatory! Please fill the ISSN Number")
            return
        }

        if(authorNames.length == 0){
            alert("All fields are mandatory! Please fill in author names.")
            return
        }

        if(publicationLinks.length == 0){
            alert("All fields are mandatory! Please add certificate / publication links.")
            return
        }
        

        let json : JournalJSON = {
            PaperTitle: paperTitle,
            AuthorNames: authorNames,
            Department: selectedDepartment.value,
            JournalName: journalName,
            PublicationYear: year,
            ISSNNumber: issnNo,
            Link: publicationLinks
        }

            
        try{
            const response = await axios.post('http://localhost:5000/publication', JSON.stringify(json));
            if (response.status === 201 || response.status == 200) {
                toast.success('Form submitted successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                },
                );
            } else {
                toast.error('An error occurred. Please try again later.');
            }
            
            } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again later.');
            
            }
        
        }

        const handleClearAll = () => {
        setFaculty("")
        setPaperTitle("")
        setJournalName("")
        setIssnNo("")
        setYear("")
        setSelectedDepartment(null)
        setAuthorNames(faculty ? [faculty] : [])
        setPublicationLinks([])
    }

    return(
      <>
       <ToastContainer/>
        <div className="bg-[#d5e7eb]">
            <div className="bg-white flex flex-col">
                <h1 className={`${roboto.className} text-black text-3xl lg:text-3xl mt-7`}>Journal</h1>
                <hr className="flex justify-center border-t-2 border-gray-200 mt-7 mb-10"/>
                <form onSubmit={formSubmit}>
                    <div className='flex justify-between gap-5 mb-7'>
                        <div className='relative w-full'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-400' 
                                type='text'
                                autoFocus
                                
                                placeholder='Title of the paper'
                                required
                                value={faculty}
                                onChange={(e) => {setFaculty(e.target.value)}}
                                onBlur={handleFacultyBlur}
                            />
                            <label className='absolute left-0 -top-3.5 text-indigo-700 text-sm font-semibold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-indigo-700 peer-focus:font-semibold peer-focus:text-sm'>Title of the paper</label>
                        </div>
                       
                    </div>
                    
                     <div className='relative w-full mb-10'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-400' 
                                type='text'
                                placeholder='Name of Journal / Book / Conference'
                                required
                                value={journalName}
                                onChange={(e) => {setJournalName(e.target.value)}}
                            />
                            <label className='absolute left-0 -top-3.5 text-indigo-700 font-semibold text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-indigo-700 peer-focus:text-sm peer-focus:font-semibold'>Name of Journal</label>
                        </div>
                    <div className='flex justify-between gap-5 mb-10'>
                    
                        <div className='relative w-full'>
                            <Creatable
                                className='text-blue-700'  
                                isClearable
                                isSearchable
                                required
                                components={animatedComponents}
                                defaultValue={selectedDepartment}
                                onChange={setSelectedDepartment}
                                placeholder = {
                                    <p className='text-gray-500'>
                                        Department of the teacher
                                    </p>
                                }
                                options={[
                                    { value: "CSE", label: "CSE" },
                                    
                                    { value: "ECE", label: "ECE" },
                                ]}
                            />
                        </div>
                    </div>
                    <div className='relative w-full mb-10'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-400' 
                                type='text'
                                autoFocus
                                
                                placeholder='Year of publication'
                                required
                                value={faculty}
                                onChange={(e) => {setFaculty(e.target.value)}}
                                onBlur={handleFacultyBlur}
                            />
                            <label className='absolute left-0 -top-3.5 text-indigo-700 text-sm font-semibold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-indigo-700 peer-focus:font-semibold peer-focus:text-sm'>Year of publication</label>
                        </div>
                    <div className='mb-7 w-full relative'>
                      
                        
                         { /*  <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600' 
                                type='text'
                                placeholder='Author Names'
                            /> */}

                        <TagsInput
                            value={authorNames}
                            onChange={(e) => {handleAuthorNamesChange(e)}}
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {handleAuthorNamesBlur(e)}}
                            placeHolder='Name of the authors'
                            
                            classNames={{
                                input: "text-gray-900",
                                tag: "bg-gray-300 text-blue-600"
                            }}
                        />               
                    </div>
                    <div className='relative w-full mb-7'>
                        <TagsInput
                            value={publicationLinks}
                            onChange={(e) => {handlePublicationLinksChange(e)}}
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {handlePublicationLinksBlur(e)}}
                            placeHolder='Link to Article/ Paper/ Abstract'
                            classNames={{
                                input: "text-gray-900",
                                tag: "bg-gray-300 text-blue-600"
                            }}
                        />               
                    </div>
                      
                    
                    <div className='flex justify-between gap-5 mb-32'>
                        <div className='relative w-full'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500' 
                                type='text'
                                placeholder='ISSN Number'
                                value={issnNo}
                                onChange={(e) => {setIssnNo(e.target.value)}}
                            />
                            <label className='absolute left-0 -top-3.5 text-indigo-700 text-sm font-semibold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-indigo-700 peer-focus:font-semibold peer-focus:text-sm'>ISSN Number</label>
                        </div>
                    </div>
                    <div className='relative w-full flex justify-end px-4 mt-20 lg:mt-8'>
                         <button className='bg-gradient-to-r from-[#170a7f] to-[#12075c] text-white font-semibold hover:scale-105 hover:shadow-[0_0_40px_-10px_(0,0,0,1)] hover:shadow-yellow-400 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:text-yellow-400 rounded px-4 py-4' type="submit">Add Publication</button>
                         <button className='ml-6 bg-gradient-to-r from-red-700 to-red-800 text-white font-semibold hover:scale-105 hover:shadow-[0_0_40px_-10px_(0,0,0,1)] hover:shadow-yellow-400 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:text-yellow-400 rounded px-6 py-4' onClick={handleClearAll}>Clear All</button>
                    </div>
                </form>
            </div>
        </div>
      </>

    )
}