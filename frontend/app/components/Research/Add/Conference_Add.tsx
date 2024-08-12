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

type ConferenceJSON = {
    FacultyName: string,
    BookChapterTitle: string,
    PaperTitle: string,
    ConferenceTitle: string,
    PublicationYear: string,
    ISBN_ISSN_Number: string,
    SameInstitution: number,
    PublisherName: string,
}

export default function AddConference () {
    const [facultyName, setFacultyName] = useState("")
    const [bookTitle, setBookTitle] = useState("")
    const [paperTitle, setPaperTitle] = useState("")
    const [confTitle, setConfTitle] = useState("")
    const [year, setYear] = useState("")
    const [isbnNo, setIsbnNo] = useState("")
    const [publisherName, setPublisherName] = useState("")
    const [sameInstitution, setSameInstitution] = useState(1)

    const animatedComponents = makeAnimated();

    const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if(!facultyName){
            alert("All fields are mandatory! Please fill in faculty name")
            return
        }

        if(!bookTitle){
            alert("All fields are mandatory! Please fill Book Chapter title")
            return
        }

        if(!confTitle){
            alert("All fields are mandatory! Please fill in conference title")
            return
        }

        if(!year){
            alert("All fields are mandatory! Please fill in publication year")
            return
        }

        if(!isbnNo){
            alert("All fields are mandatory! Please fill in ISBN_ISSN_Number")
            return
        }

        if(!publisherName){
            alert("All fields are mandatory! Please fill in publisher name")
            return
        }    

        let json : ConferenceJSON = {
            FacultyName: facultyName,
            BookChapterTitle: bookTitle,
            PaperTitle: paperTitle,
            ConferenceTitle: confTitle,
            PublicationYear: year,
            ISBN_ISSN_Number: isbnNo,
            SameInstitution: sameInstitution,
            PublisherName: publisherName
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
  setFacultyName("")
  setBookTitle("")
  setPaperTitle("")
  setConfTitle("")
  setYear("")
  setIsbnNo("")
  setSameInstitution(1)
  setPublisherName("")
 }



    return(
      <>
       <ToastContainer/>
        <div className="bg-[#d5e7eb]">
            <div className="bg-white flex flex-col">
                <h1 className={`${roboto.className} text-black text-3xl lg:text-3xl mt-7`}>Conferences/Book Chapters/Book Publications</h1>
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
                                value={facultyName}
                                onChange={(e) => {setFacultyName(e.target.value)}}
                            />
                            <label className='absolute left-0 -top-3.5 text-indigo-700 text-sm font-semibold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-indigo-700 peer-focus:font-semibold peer-focus:text-sm'>Name of the teacher</label>
                        </div>
                       
                    </div>
                    <div className='flex justify-between gap-5 mb-7'>
                        <div className='relative w-full'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-400' 
                                required
                                type='text'
                                placeholder='Title'
                                value={bookTitle}
                                onChange={(e) => setBookTitle(e.target.value)}
                            />
                            <label className='absolute left-0 -top-3.5 text-indigo-700 font-semibold text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-indigo-700 peer-focus:text-sm peer-focus:font-semibold'>Title of the Books/Chapter published</label>
                        </div>
                    </div>
                     <div className='relative w-full mb-10'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-400' 
                                type='text'
                                placeholder='Name of Journal / Book / Conference'
                                required
                                value={paperTitle}
                                onChange={(e) => {setPaperTitle(e.target.value)}}
                            />
                            <label className='absolute left-0 -top-3.5 text-indigo-700 font-semibold text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-indigo-700 peer-focus:text-sm peer-focus:font-semibold'>Title of the paper</label>
                        </div>
                        <div className='relative w-full mb-10'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-400' 
                                type='text'
                                placeholder='Name of Journal / Book / Conference'
                                required
                                value={confTitle}
                                onChange={(e) => {setConfTitle(e.target.value)}}
                            />
                            <label className='absolute left-0 -top-3.5 text-indigo-700 font-semibold text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-indigo-700 peer-focus:text-sm peer-focus:font-semibold'>Title of the proceedings of the conference</label>
                        </div>
                        <div className='relative w-full mb-10'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-400' 
                                type='text'
                                placeholder='Name of Journal / Book / Conference'
                                required
                                value={year}
                                onChange={(e) => {setYear(e.target.value)}}
                            />
                            <label className='absolute left-0 -top-3.5 text-indigo-700 font-semibold text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-indigo-700 peer-focus:text-sm peer-focus:font-semibold'>Year of publication</label>
                        </div>
                        <div className='relative w-full mb-10'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-400' 
                                type='text'
                                placeholder='Name of Journal / Book / Conference'
                                required
                                value={isbnNo}
                                onChange={(e) => {setIsbnNo(e.target.value)}}
                            />
                            <label className='absolute left-0 -top-3.5 text-indigo-700 font-semibold text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-indigo-700 peer-focus:text-sm peer-focus:font-semibold'>ISBN / ISSN number of the proceeding</label>
                        </div>
                        <div className='relative w-full mb-10'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-400' 
                                type='text'
                                placeholder='Name of Journal / Book / Conference'
                                required
                                value={publisherName}
                                onChange={(e) => {setPublisherName(e.target.value)}}
                            />
                            <label className='absolute left-0 -top-3.5 text-indigo-700 font-semibold text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-indigo-700 peer-focus:text-sm peer-focus:font-semibold'>Name of the publisher</label>
                        </div>
                    <div className='flex justify-between gap-5 mb-10'>
                       
                        
                    </div>
        
                   
                    <div className='relative flex-row items-center w-full justify-center md:w-1/2 mx-auto mb-10'>
                        <h1 className='text-gray-700 text-lg text-center'>Whether at the time of publication affiliating institutions was same</h1>
                        <span className='flex flex-row justify-center mt-4'>
                            <input 
                                className='inline-block text-center mr-1'
                                type='radio'
                                name="capstone"
                                value={1}
                                id="yes"
                                checked={sameInstitution== 1}
                                onChange={(e) => {setSameInstitution(parseInt(e.target.value))}}
                            />
                            <label htmlFor='yes' className='text-gray-900'>Yes</label>
                            <input 
                                type='radio'
                                className='inline-block ml-4 text-center mr-1'
                                name='capstone'
                                value={0}
                                id="no"
                                checked={sameInstitution== 0}
                                onChange={(e) => {setSameInstitution(parseInt(e.target.value))}}
                            />
                            <label htmlFor="no" className='text-gray-900 text-center flex items-center'>No</label>
                        </span>
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