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

type PublicationJSON = {
  FacultyName: string,
  StartDate: string,
  EndDate: string,
  Types: string[],
  Title: string,
  ConferenceOrJournalName: string,
  Status: string,
  TotalAuthors: number,
  AuthorNames: string[],
  IsCapstone: number,
  Links: string[],
  ImpactFactor: string,
  ScopusIndexation: string
}

export default function AddWorshop () {
    const [faculty, setFaculty] = useState("")
    const [title, setTitle] = useState("")
    const [confName, setConfName] = useState("")
    const [selectedTypes, setSelectedTypes] = useState<MultiValue<{
    value: string;
    label: string;
  }> | null>(null);

  const [selectedPubStatus, setSelectedPubStatus] = useState<SingleValue<{
    value: string;
    label: String;
  }> | null>(null);

  const [pubStartDate,setPubStartDate] = useState("")
  const [pubEndDate,setPubEndDate] = useState("")

   const [authorNames, setAuthorNames] = useState<string []>(faculty ? [faculty] : []);

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


  const [publicationLinks, setPublicationLinks] = useState<string []>([]);

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

   /* useEffect(() => {
    console.log(publicationLinks)
    console.log(authorNames)
   },[publicationLinks,authorNames]) */



  const [isCapstone, setIsCapstone] = useState(1)

  const [impactFactor, setImpactFactor] = useState("")
  const [indexation, setIndexation] = useState<SingleValue<{
    value: string;
    label: String;
  }> | null>(null);

  const animatedComponents = makeAnimated();

    const handleFacultyBlur = () => {
    // When the input field loses focus, update authorNames with the final faculty value
    if (faculty && faculty.trim() !== "" && (!authorNames.includes(faculty)) ){
      setAuthorNames(prevAuthorNames => [...prevAuthorNames, faculty]);
    }
  };

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
   e.preventDefault()

   const Types = selectedTypes?.map(item => item.value);
   if(!Types){
alert("All fields are mandatory! Please select a publication type.")
return
   }

    if(!selectedPubStatus){
alert("All fields are mandatory! Please select a publication status.")
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

   if(!indexation){
alert("All fields are mandatory! Please add indexation.")
return
   }

   let startDateObj = new Date(pubStartDate)

   let endDateObj = pubEndDate.length > 0 ? new Date(pubEndDate) : new Date(pubStartDate)

   const formatISODate = (date: Date): string => {
  return date.toISOString().split('.')[0] + 'Z';
};
   

    let json : PublicationJSON = {
        FacultyName: faculty,
       StartDate: formatISODate(startDateObj),
  EndDate: formatISODate(endDateObj),
        Types: Types,
        Title: title,
        ConferenceOrJournalName: confName,
        Status: selectedPubStatus.value,
        TotalAuthors: authorNames.length,
        AuthorNames: authorNames,
        IsCapstone: isCapstone,
        Links: publicationLinks,
        ImpactFactor: impactFactor,
        ScopusIndexation: indexation.value
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
  setTitle("")
  setConfName("")
  setSelectedPubStatus(null)
  setSelectedTypes(null)
  setPubEndDate("")
  setPubStartDate("")
  setScopus("")
  setImpactFactor("")
  setAuthorNames(faculty ? [faculty] : [])
  setPublicationLinks([])
  setIsCapstone(1)
 }



    return(
      <>
       <ToastContainer/>
        <div className="bg-[#d5e7eb]">
            <div className="bg-white flex flex-col">
                <h1 className={`${roboto.className} text-black text-3xl lg:text-3xl mt-7`}>Workshops</h1>
                <hr className="flex justify-center border-t-2 border-gray-200 mt-7 mb-10"/>
                <form onSubmit={formSubmit}>
                    <div className='flex justify-between gap-5 mb-7'>
                        <div className='relative w-full'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-400' 
                                type='text'
                                autoFocus
                                
                                placeholder='Faculty Name'
                                required
                                value={faculty}
                                onChange={(e) => {setFaculty(e.target.value)}}
                                onBlur={handleFacultyBlur}
                            />
                            <label className='absolute left-0 -top-3.5 text-indigo-700 text-sm font-semibold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-indigo-700 peer-focus:font-semibold peer-focus:text-sm'>Faculty Name</label>
                        </div>
                       
                    </div>
                    <div className='flex justify-between gap-5 mb-7'>
                        <div className='relative w-full'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-400' 
                                required
                                type='text'
                                placeholder='Title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <label className='absolute left-0 -top-3.5 text-indigo-700 font-semibold text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-indigo-700 peer-focus:text-sm peer-focus:font-semibold'>Title</label>
                        </div>
                    </div>
                     <div className='relative w-full mb-10'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-400' 
                                type='text'
                                placeholder='Name of Journal / Book / Conference'
                                required
                                value={confName}
                                onChange={(e) => {setConfName(e.target.value)}}
                            />
                            <label className='absolute left-0 -top-3.5 text-indigo-700 font-semibold text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-indigo-700 peer-focus:text-sm peer-focus:font-semibold'>Name of Journal / Book / Conference</label>
                        </div>
                    <div className='flex justify-between gap-5 mb-10'>
                       
                        <div className='relative w-full'>
                           <Creatable
                                className='text-blue-700 '
                                closeMenuOnSelect={false}
                                isClearable
                                required
                                components={animatedComponents}
                                defaultValue={selectedTypes}
                                onChange={setSelectedTypes}
                                isSearchable
                                placeholder = {
                                    <p className='text-gray-500'>
                                        Publication Type
                                    </p>
                                }
                                options={[
                                    { value: "Conference", label: "Conference" },
                                    { value: "Journal", label: "Journal" },
                                    { value: "Book Chapter", label: "Book Chapter" },
                                ]}
                                isMulti
                            />
                        </div>
                        <div className='relative w-full'>
                            <Creatable
                                className='text-blue-700'  
                                isClearable
                                isSearchable
                                required
                                components={animatedComponents}
                                defaultValue={selectedPubStatus}
                                onChange={setSelectedPubStatus}
                                placeholder = {
                                    <p className='text-gray-500'>
                                        Publication Status
                                    </p>
                                }
                                options={[
                                    { value: "Published", label: "Published" },
                                    
                                    { value: "Presented", label: "Presented" },
                                ]}
                            />
                        </div>
                    </div>
                    <div className='relative w-full flex flex-col items-center justify-center mb-10'>
                        <h1 className='text-gray-700 text-lg'>Publication / Conference Dates</h1>
                        <span className='flex flex-row items-center space-x-8 justify-center mt-2 md:mt-4'>
                            <div className='flex flex-col'>
                            <label htmlFor='startdate' className='text-indigo-800 mb-1 text-center font-semibold'>Start Date</label> 
                                <input 
                                    className='text-gray-900 border-2 border-gray-300 focus:outline-none focus:border-blue-400 p-1'
                                    required
                                    type='date'
                                    id='startdate'
                                    placeholder='Start Date'
                                    value={pubStartDate}
                                    onChange={(e) => setPubStartDate(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor='enddate' className='mb-1 font-semibold text-center text-indigo-800'>End Date (Optional)</label>
                                <input 
                                    className='text-gray-900 border-2 border-gray-300 p-1 focus:outline-none focus:border-blue-400'
                                    type='date'
                                    id="enddate"
                                    value={pubEndDate}
                                    onChange={(e) => setPubEndDate(e.target.value)}
                                />
                            </div>     
                        </span>  
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
                            placeHolder='Authors (Comma Separated)'
                            
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
                            placeHolder='Certificate / Publication Links (Comma separated)'
                            classNames={{
                                input: "text-gray-900",
                                tag: "bg-gray-300 text-blue-600"
                            }}
                        />               
                    </div>
                    <div className='relative flex-row items-center w-full justify-center md:w-1/2 mx-auto mb-10'>
                        <h1 className='text-gray-700 text-lg text-center'>Capstone Project?</h1>
                        <span className='flex flex-row justify-center mt-4'>
                            <input 
                                className='inline-block text-center mr-1'
                                type='radio'
                                name="capstone"
                                value={1}
                                id="yes"
                                checked={isCapstone== 1}
                                onChange={(e) => {setIsCapstone(parseInt(e.target.value))}}
                            />
                            <label htmlFor='yes' className='text-gray-900'>Yes</label>
                            <input 
                                type='radio'
                                className='inline-block ml-4 text-center mr-1'
                                name='capstone'
                                value={0}
                                id="no"
                                checked={isCapstone== 0}
                                onChange={(e) => {setIsCapstone(parseInt(e.target.value))}}
                            />
                            <label htmlFor="no" className='text-gray-900 text-center flex items-center'>No</label>
                        </span>
                    </div>
                      
                    
                    <div className='flex justify-between gap-5 mb-32'>
                        <div className='relative w-full'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500' 
                                type='text'
                                placeholder='Impact Factor'
                                value={impactFactor}
                                onChange={(e) => {setImpactFactor(e.target.value)}}
                            />
                            <label className='absolute left-0 -top-3.5 text-indigo-700 text-sm font-semibold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-indigo-700 peer-focus:font-semibold peer-focus:text-sm'>Impact Factor (Optional)</label>
                        </div>
                        <div className='relative w-full'>
                            <Creatable
                                className='text-blue-700'  
                                isClearable
                                isSearchable
                                required
                                components={animatedComponents}
                                defaultValue={indexation}
                                onChange={setIndexation}
                                placeholder = {
                                    <p className='text-gray-500'>
                                        Indexation
                                    </p>
                                }
                                options={[
                                { value: "Q1", label: "Q1" },
                                { value: "Q2", label: "Q2" },
                                { value: "Q3", label: "Q3" },
                                { value: "Q4", label: "Q4" },
                                { value: "WOS", label: "WOS" },
                                { value: "SCI", label: "SCI" },
                        ]}
                            />
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