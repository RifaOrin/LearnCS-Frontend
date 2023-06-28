import { IonIcon } from '@ionic/react';
import { callOutline,mailOutline,locationOutline,logoFacebook, logoTwitter, logoLinkedin, logoInstagram } from 'ionicons/icons';


function Contact(){
    
    return(

        <body className="antialiased bg-gray-100 ">
            <div className="flex w-full min-h-screen justify-center items-center">
            
                <div 
                    className="flex flex-col md:flex-row md:space-x-6 md:space-y-0 space-y-6 bg-[#498C60] w-full max-w-4xl p-8 sm:p-12 rounded-xl shadow-lg text-white overflow-hidden">

                        <div className="flex flex-col space-y-8 justify-between">
                            <div>
                                <h1 className="font-bold text-4xl tracking-wide">Contact Us</h1>
                                <p className="pt-2 text-[#bde2cab0] text-sm">Got a question, feedback, or need assistance?
                                 We're here to help! </p>
                            </div>
                            <div className='flex flex-col space-y-6'>
                                <div className='inline-flex space-x-2 items-center'>
                                    <IonIcon icon={callOutline} className="text-[#05F26C] text-xl"/>
                                    <span>(+880) 14567890</span>
                                </div>
                                <div className='inline-flex space-x-2 items-center'>
                                    <IonIcon icon={mailOutline} className="text-[#05F26C] text-xl"/>
                                    <span>rifa321@gmail.com</span>
                                </div>
                                <div className='inline-flex space-x-2 items-center'>
                                    <IonIcon icon={locationOutline} className="text-[#05F26C] text-xl"/>
                                    <span>Dhaka, Bangladesh</span>
                                </div>
                                
                            </div>
                            <div className='flex space-x-4 text-lg'>
                                <a href="#"><IonIcon icon={logoFacebook} className="text-white"/></a>
                                <a href="#"><IonIcon icon={logoTwitter} className="text-white"/></a>
                                <a href="#"><IonIcon icon={logoLinkedin} className="text-white"/></a>
                                <a href="#"><IonIcon icon={logoInstagram} className="text-white"/></a>
                            </div>
                        </div>
                        <div className='relative'>
                            <div className='absolute w-40 h-40 bg-[#7ED98B] rounded-full z-0 -right-28 -top-28'></div>
                            <div className='absolute w-40 h-40 bg-[#7ED98B] rounded-full z-0 -left-28 -bottom-16'></div>
                            <div className='relative z-10 bg-white rounded-xl shadow-lg p-8 text-gray-600'>
                                <form action='' className='flex flex-col space-y-4'>
                                    <div>
                                        <label for="">Your Name</label>
                                        <input type="text" placeholder='Your Name' className='ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-[#05F26C]'></input>
                                    </div>
                                    <div>
                                        <label for="">Email Address</label>
                                        <input type="text" placeholder='Email Address' className='ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-[#05F26C]'></input>
                                    </div>
                                    <div>
                                        <label for="">Message</label>
                                        <textarea placeholder='Message' rows='4' className='ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-[#05F26C]'></textarea>
                                    </div>
                                    <button className='inline-block self-end bg-[#498C60] hover:bg-[#7ED98B] hover:text-gray-600 hover:scale-105 duration-300 text-white font-bold rounded-lg px-6 py-2 uppercase text-sm'>Send Message</button>
                                </form>
                            </div>
                        </div>


                    
                </div>
                

            </div>
            
            
        </body>

    );
}
export default Contact;