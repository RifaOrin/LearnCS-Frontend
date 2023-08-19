import { IonIcon } from "@ionic/react";
import Footer from "./footer";
import Navbar from "./navbar";
import Profilepic from "./images/profilePhoto.jpg";


function Instructor(){
    return(
        <body className="bg-[#F4F4F4] min-h-screen">
            <Navbar />
           
            <div className="flex flex-col md:flex-row lg:space-x-4 pl-20 pr-20 pb-10">
                <div className="w-full lg:w-1/4 flex flex-col space-y-8 border lg:ml-20 p-12 justify-center items-center">
                    <div className="w-40 h-40 overflow-hidden rounded-full">
                        <img
                            src={Profilepic}
                            className="object-cover w-full h-full"
                        ></img>
                    </div>
                    <div className="flex flex-col space-y-2 items-center justify-center">
                        <h1 className="text-lg md:text-xl pb-1 flex justify-center font-medium">
                            Don Norman
                        </h1>
                        <p className="text-md text-gray-500 pb-2">UI/UX Designer</p>
                        <p className="text-sm font-semibold px-2 py-1 rounded-sm cursor-pointer text-[#05F26C] bg-[#012326]" >
                            Instructor
                        </p>
                        <p className="text-sm  text-gray-500 italic pt-5 border-b-2 pb-5">
                            norman88@gmail.com
                        </p>
                        <div className="flex flex-row space-x-1 pt-5">
                            <div className="flex flex-col space-y-1 justify-center items-center border-r-2 pr-5">
                                <p className="text-lg font-bold">47</p>
                                <p className="text-sm font-normal">Students</p>
                            </div>
                            <div className="flex flex-col space-y-1 justify-center items-center pl-5">
                                <p className="text-lg font-bold">3</p>
                                <p className="text-sm font-normal">Courses</p>
                            </div>
                        
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-3/4">
                    <h1 className="text-2xl font-bold pl-10 pt-16">About Me</h1>
                    <p className="text-lg font-normal pt-7 pl-10 text-justify">Donald Arthur Norman, commonly known as Don Norman, is a renowned cognitive psychologist, usability engineer, and design advocate. He has made significant contributions to the field of human-centered design, user experience (UX), and usability. Born on December 25, 1935, Norman has had a profound impact on shaping the way designers and engineers think about creating products that are intuitive, user-friendly, and well-suited to human cognitive capabilities.</p>
                    <h1 className="text-2xl font-bold pl-10 pt-16">Teaching</h1>
                

                                            
                
                </div>
            </div>
            <Footer />
        </body>

    );
}
export default Instructor;