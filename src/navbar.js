import Logo from "./images/default1.png";
import { Link } from "react-router-dom"




function Navbar(){
    return(
        <nav className="bg-[#012326] p-4 flex items-center justify-between">
            <div className="flex items-center">
            <img src={Logo} className="w-40 cursor-pointer"></img>
            </div>
            <div className="flex-grow md:flex md:items-center md:w-1/2">
            <div className="relative md:pl-10 w-64 md:w-auto">
            <button className="absolute right-2 md:left-12 top-1/2 transform -translate-y-1/2">
                <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35"
                ></path>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16z"
                ></path>
                </svg>
            </button>
            <input
                type="text"
                placeholder="Search for courses, instructor"
                className="hidden md:inline-block bg-[#012326] placeholder-white text-white border-2 outline-none rounded-sm py-2 px-4 w-full  pl-10"
            />
            </div>

            </div>
            <div className="md:flex md:items-center">
                <Link to = "/courses" className="hidden lg:block text-white text-md font-semibold mr-4 hover:text-[#05F26C]">Explore Courses</Link>
                <Link to="/login" ><button className="hidden lg:block text-white text-md font-semibold mr-4 hover:text-[#05F26C]">Sign In</button></Link>
                <Link to = "/signup"><button className="text-[#012326] font-bold mr-4 outline-none px-5 py-2 rounded-sm bg-[#05F26C] hover:bg-[#07cc5c]">Sign Up</button></Link>
            </div>
        </nav>



    );
}
export default Navbar;