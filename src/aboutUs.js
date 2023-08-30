import { IonIcon } from "@ionic/react";
import { accessibilityOutline, schoolOutline, sparklesOutline } from "ionicons/icons";
import Hero from "./images/hero.jpg";
import Rifa from "./images/rifa.jpg";
import Zisan from "./images/zisan.jpg";
import Maruf from "./images/maruf.jpg";
import Tasnuva from "./images/tasnuva.jpg";
import Footer from "./footer";

function About(){
    return(
        <body>
            <div class="bg-gray-50 min-h-screen px-24">
                <div className="flex items-center justify-between pt-24">
                    <h1 className="text-3xl font-medium text-black">Learn<span className="text-3xl text-[#55D98E] font-medium">CS</span></h1>
                    <div className="ml-auto">
                        <button className="px-6 py-2 bg-[#39df81] hover:bg-[#16ad58] rounded-lg text-white text-lg font-semibold mr-5">Login</button>
                        <button className="text-md text-[#39df81] hover:py-2 hover:px-2 hover:bg-[#c0f5d6] hover:rounded-lg font-medium">Join for free</button>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-24">
                <div class="relative w-full max-w-lg">
                        <div class="absolute top-0 -left-4 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                        <div class="absolute top-0 -right-4 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                        <div class="absolute -bottom-8 left-20 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                        <div class="absolute -bottom-8 -right-20 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                    <div className="relative">
                        <h1 className="text-5xl mb-5 font-medium w-full leading-normal text-black">Empower Your Future with LearnCS</h1>
                        <p className="text-xl text-gray-500 font-medium">Elevate Your Programming Journey with Comprehensive CS Courses on LearnCs</p>
                    </div>
                </div>
                    <img src={Hero} className="w-1/2 rounded-lg"></img>
                </div>
                <div className="flex justify-center">
                <h1 className="mt-20 pt-24 text-4xl text-black font-medium">We Empower</h1>
                </div>
                <div className="flex flex-row pt-24 pb-24 justify-center">
                    <div className="flex flex-col px-20">
                    <div class="flex justify-center pb-5"><IonIcon icon={accessibilityOutline} className="text-4xl text-green-500"></IonIcon></div>
                    <h1 className="text-2xl font-semibold pb-4 text-center">Members to</h1>
                    <div className="text-center">
                    <p>Learn new skills.</p>
                    <p>Make discoveries.</p>
                    <p>Get inspired.</p>
                    </div>
                    </div>
                    <div className="flex flex-col px-20">
                    <div class="flex justify-center pb-5"><IonIcon icon={schoolOutline} className="text-4xl text-green-500"></IonIcon></div>
                    <h1 className="text-2xl font-semibold pb-4 text-center">Techers to</h1>
                    <div className="text-center">
                    <p>Share expertise.</p>
                    <p>Make new experience.</p>
                    <p>Give back.</p>
                    </div>
                    </div>
                    <div className="flex flex-col px-20">
                    <div class="flex justify-center pb-5"><IonIcon icon={sparklesOutline} className="text-4xl text-green-500"></IonIcon></div>
                    <h1 className="text-2xl font-semibold pb-4 text-center">Employees to</h1>
                    <div className="text-center">
                    <p>Be curious.</p>
                    <p>Make an impact.</p>
                    <p>Live a full life.</p>
                    </div>
                    </div>


                </div>
                <h1 className="mt-20 pt-24 text-4xl text-black font-semibold text-center">Our LearnCS Team</h1>
                <div className="flex flex-row pt-24 pb-10 justify-center">
                <div className="flex flex-col px-20">
                    <div className="w-40 h-40 mx-auto overflow-hidden rounded-full">
                    <img src={Zisan} className="w-full h-full object-cover"></img>
                    </div>
                    <h1 className="text-2xl font-semibold pb-4 text-center pt-4">Kasif Hasnaen Zisan</h1>
                    <div className="text-center">
                    <p>Backend Developer</p>
                    </div>
                </div>
                <div className="flex flex-col px-20">
                    <div className="w-40 h-40 mx-auto overflow-hidden rounded-full">
                    <img src={Rifa} className="w-full h-full object-cover"></img>
                    </div>
                    <h1 className="text-2xl font-semibold pb-4 text-center pt-4">Rifa Tasnim Orin</h1>
                    <div className="text-center">
                    <p>Frontend Developer</p>
                    
                    </div>
                </div>
                <div className="flex flex-col px-20">
                    <div className="w-40 h-40 mx-auto overflow-hidden rounded-full">
                    <img src={Maruf} className="w-full h-full object-cover"></img>
                    </div>
                    <h1 className="text-2xl font-semibold pb-4 text-center pt-4">Maruf Shahriar</h1>
                    <div className="text-center">
                    <p>Full-stack Developer</p>
                    
                    </div>
                </div>

                </div>
                <div className="flex flex-row pt-10 pb-24 justify-center">
                <div className="flex flex-col px-20">
                    <div className="w-40 h-40 mx-auto overflow-hidden rounded-full">
                    <img src={Tasnuva} className="w-full h-full object-cover"></img>
                    </div>
                    <h1 className="text-2xl font-semibold pb-4 text-center pt-4">Tasnuva Sadia</h1>
                    <div className="text-center">
                    <p>Frontend Developer</p>
                    </div>
                </div>

                </div>
            </div>
            <Footer/>
        </body>

    );
}
export default About;