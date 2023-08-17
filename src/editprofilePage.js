import Profilepic from "./images/profilePhoto.jpg";
import { IonIcon } from "@ionic/react";
import Footer from "./footer";
import {personOutline, paperPlaneOutline, schoolOutline, locationOutline, trashOutline} from 'ionicons/icons';

function Editprofile(){
    return(
        <body className="bg-gray-100 min-h-screen">
            <div className="sticky top-0 z-10 w-full h-20 border bg-gray-100 flex justify-end items-center space-x-2 pr-40">
                <button className="text-black text-sm font-semibold cursor-pointer">Cancel</button>
                <button className="text-black text-xs font-semibold px-3 py-2 cursor-pointer border rounded-md outline-none bg-[#05F26C] hover:bg-[#0dc55d]">Save and Exit</button>

            </div>
            <div className="flex flex-col md:flex-row md:space-x-4 pl-20 pr-20 pb-10">
                <div className="w-1/4 flex flex-col space-y-8 border ml-20 p-12 justify-center items-center">
                    <div className="w-40 h-40 overflow-hidden rounded-full">
                    <img src={Profilepic} className="object-cover w-full h-full"></img>
                    </div>
                    <div className="flex flex-col space-y-2">
                            <div className="relative">
                            <IonIcon
                                icon={personOutline}
                                className="text-2xl text-[#279477] absolute left-2 top-1/2 transform -translate-y-1/2"
                            />
                            <input
                                    type="text"
                                    placeholder="First Name"
                                    className="border-2 outline-none w-full focus:border-2 focus:border-green-500 rounded-sm py-2 px-3 pl-10 placeholder-black ">
                            </input>
                            </div>
                            <div className="relative">
                            <IonIcon
                                icon={personOutline}
                                className="text-2xl text-[#279477] absolute left-2 top-1/2 transform -translate-y-1/2"
                            />
                            <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="border-2 outline-none focus:border-2 focus:border-green-500 w-full rounded-sm py-2 px-3 pl-10 placeholder-black ">
                            </input>
                            </div>
                            <div className="relative">
                            <IonIcon
                                icon={paperPlaneOutline}
                                className="text-2xl text-[#279477] absolute left-2 top-1/2 transform -translate-y-1/2"
                            />
                            <input
                                    type="text"
                                    placeholder="Email"
                                    className="border-2 outline-none focus:border-2 focus:border-green-500 w-full rounded-sm py-2 px-3 pl-10 placeholder-black ">
                            </input>
                            </div>
                            <div className="relative">
                            <IonIcon
                                icon={schoolOutline}
                                className="text-2xl text-[#279477] absolute left-2 top-1/2 transform -translate-y-1/2"
                            />
                            <input
                                    type="text"
                                    placeholder="University Name"
                                    className="border-2 outline-none focus:border-2 focus:border-green-500 w-full rounded-sm py-2 px-3 pl-10 placeholder-black ">
                            </input>
                            </div>
                            <div className="relative">
                            <IonIcon
                                icon={locationOutline}
                                className="text-2xl text-[#279477] absolute left-2 top-1/2 transform -translate-y-1/2"
                            />
                            <input
                                    type="text"
                                    placeholder="Location"
                                    className="border-2 outline-none focus:border-2 focus:border-green-500 w-full rounded-sm py-2 px-3 pl-10 placeholder-black ">
                            </input>
                            </div>
                    </div>
                </div>
                <div className="w-3/4">
                    <button className="w-full pt-10 pb-5 border-b-4 text-lg font-semibold text-green-700 border-green-700 ">Profile</button>
                    <div className="flex flex-row mt-10">
                    <input type="text" placeholder="About Me"
                    className="w-full border-2 pl-2 py-2 outline-none font-semibold text-lg focus:border-green-700"
                    >
                    </input>
                    <IonIcon
                            icon={trashOutline}
                            className="text-xl text-[#279477] pl-2"
                    />
                    </div>
                    <div className="flex flex-row mt-10">
                    <input type="text" placeholder="Add Short Description"
                    className="w-full pb-10 pl-2 pt-2 font-semibold text-lg border-2 outline-none focus:border-green-700"
                    >
                    </input>
                    <IonIcon
                            icon={trashOutline}
                            className="text-xl text-[#279477] pl-2"
                    />
                    </div>
                    

                </div>
            </div>
            <Footer />

        </body>

    );
}
export default Editprofile;