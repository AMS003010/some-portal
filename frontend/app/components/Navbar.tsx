import PesLogo from '../images/pes.png';
import Image from 'next/image';

export default function NavBar() {
    return(
        <nav className="bg-[#a6c1ee] flex justify-between items-center w-[100%]  mx-auto p-3">
            <div>
                <Image className="w-20 cursor-pointer" src={PesLogo} alt='pes logo'/>
            </div>
            <div className="flex items-center gap-6">
                <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec] font-black">Sign in</button>
            </div>
        </nav>
    )
}