import Profilepic from "./images/profilePhoto.jpg";
import { IonIcon } from "@ionic/react";
import Footer from "./footer";
import {caretForwardCircleOutline} from 'ionicons/icons';

function Profile(){
    
    return(
        <body className="bg-gray-100 min-h-screen">
            <div className="sticky top-0 z-10 w-full h-20 border bg-gray-100 flex justify-end items-center space-x-2 pr-40">
                
                <button className="text-black hover:text-white text-sm font-semibold px-3 py-2 cursor-pointer border rounded-md outline-none bg-gray-100 hover:bg-black">Edit Profile</button>

            </div>
            <div className="flex flex-col md:flex-row md:space-x-4 pl-20 pr-20 pb-10">
                <div className="w-1/4 flex flex-col space-y-8 border ml-20 p-12 justify-center items-center">
                    <div className="w-40 h-40 overflow-hidden rounded-full">
                    <img src={Profilepic} className="object-cover w-full h-full"></img>
                    </div>
                    <div className="flex flex-col space-y-2">
                            <h1 className="text-2xl flex justify-center ">Thomas Mathewus</h1>
                            <p className="text-xs pb-5 flex justify-center text-gray-500">Student</p>
                            <p className="text-md flex justify-center text-gray-500">East West University</p>
                            <p className="text-sm flex justify-center text-gray-500">Dhaka, Bangladesh</p>
                            <p className="text-sm flex justify-center text-gray-500 italic pt-5 border-b-2 pb-5">thomas321@gmail.com</p>
                            <div className="flex flex-row space-x-1 pt-5">
                            <IonIcon
                                icon={caretForwardCircleOutline}
                                className="text-xl text-gray-500"
                            />
                           <p className="pb-3 font-semibold text-sm text-gray-500">
                               8 Enrolled Courses
                            </p>
                            </div>
                    </div>
                </div>
                <div className="w-3/4">
                    <button className="w-1/2 pt-10 pb-5 border-b-2 hover:border-b-4 text-black text-md font-semibold hover:text-green-700 hover:border-green-700">Profile</button>
                
                    <button className="w-1/2 pt-10 pb-5 border-b-2 hover:border-b-4 text-black text-md font-semibold hover:text-green-700 hover:border-green-700">Enrolled Courses</button>
                    

                </div>
            </div>
            <Footer />

        </body>

    );
}
export default Profile;