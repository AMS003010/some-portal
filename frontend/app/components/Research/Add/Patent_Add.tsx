import { Roboto } from 'next/font/google'
import { MultiValue, SingleValue} from "react-select";
import "../../../styles/addPublicationStyles.css"
import Creatable from "react-select/creatable"
import makeAnimated from 'react-select/animated';
import { TagsInput } from "react-tag-input-component";
import React, {useState, useEffect, FormEvent, use} from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const roboto = Roboto({
    weight: '500',
    subsets: ['latin'],
    display: 'swap',
})

type PatentJSON = {
    TeacherName: string,
    PatentNumber: string,
    PatentTitle: string,
    PatentYear: string,
    Link: string,
}

export default function AddPatent () {
    const [facultyName, setFacultyName] = useState("")
    const [patentNo, setPatentNo] = useState("")
    const [patentTitle, setPatentTitle] = useState("")
    const [year, setYear] = useState("")
    const [link, setLink] = useState("")

    const animatedComponents = makeAnimated();

    const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        if(!facultyName){
            alert("All fields are mandatory! Please fill in faculty name")
            return
        }

        if(!patentNo){
            alert("All fields are mandatory! Please fill in patent number")
            return
        }

        if(!patentTitle){
            alert("All fields are mandatory! Please fill in patent title")
            return
        }

        if(!year){
            alert("All fields are mandatory! Please fill in the year of patent")
            return
        }

        if(!link){
            alert("All fields are mandatory! Please fill link to patent details")
            return
        }

        let json : PatentJSON = {
            TeacherName: facultyName,
            PatentNumber: patentNo,
            PatentTitle: patentTitle,
            PatentYear: year,
            Link: link
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
        setPatentNo("")
        setPatentTitle("")
        setYear("")
        setLink("")
    }

    return(
      <>
       <ToastContainer/>
        <div className="bg-[#d5e7eb]">
            <div className="bg-white flex flex-col">
                <h1 className={`${roboto.className} text-black text-3xl lg:text-3xl mt-7`}>Patents</h1>
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
                                value={patentNo}
                                onChange={(e) => setPatentNo(e.target.value)}
                            />
                            <label className='absolute left-0 -top-3.5 text-indigo-700 font-semibold text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-indigo-700 peer-focus:text-sm peer-focus:font-semibold'>Patent no.</label>
                        </div>
                    </div>
                     <div className='relative w-full mb-10'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-400' 
                                type='text'
                                placeholder='Name of Journal / Book / Conference'
                                required
                                value={patentTitle}
                                onChange={(e) => {setPatentTitle(e.target.value)}}
                            />
                            <label className='absolute left-0 -top-3.5 text-indigo-700 font-semibold text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-indigo-700 peer-focus:text-sm peer-focus:font-semibold'>Title of the patent</label>
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
                            <label className='absolute left-0 -top-3.5 text-indigo-700 font-semibold text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-indigo-700 peer-focus:text-sm peer-focus:font-semibold'>Year of Award / publish of patents</label>
                        </div>
                        <div className='relative w-full mb-10'>
                            <input 
                                className='peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-400' 
                                type='text'
                                placeholder='Name of Journal / Book / Conference'
                                required
                                value={link}
                                onChange={(e) => {setLink(e.target.value)}}
                            />
                            <label className='absolute left-0 -top-3.5 text-indigo-700 font-semibold text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-indigo-700 peer-focus:text-sm peer-focus:font-semibold'>Link to Document</label>
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