import './tailwindcss/input.css';
import Logo from './images/default1.png'; 
import video from './images/course-video.mp4'
import ReactPlayer from 'react-player';
function LandingPage(){
    return(
        <body>
            <div className='container min-h-min bg-[#00242C] px-28 py-0.8'>
                <nav className='flex items-center'>
                    <img src={Logo} className='w-1/6 h-25 cursor-pointer'></img>
                    <ul className='flex-1 text-right'>
                        <li className='list-none inline-block px-5'><a href='#' className='no-underline text-[#F2F2F2] text-lg font-semibold px-3 py-3 hover:border-2 hover:scale-105 duration-250 cursor-pointer' >Home</a></li>
                        <li className='list-none inline-block px-5'><a href='#' className='no-underline text-[#F2F2F2] text-lg font-semibold px-3 py-3 hover:border-2 hover:scale-105 duration-250 cursor-pointer'>About Us</a></li>
                        <li className='list-none inline-block px-5'><a href='#' className='no-underline text-[#F2F2F2] text-lg font-semibold px-3 py-3 hover:border-2 hover:scale-105 duration-250 cursor-pointer'>Contact</a></li>
                        <button type='button' className='text-[#7ED98B] inline-block text-lg font-semibold px-5'>Log In</button>
                        <button type='button' className='text-[#7ED98B] inline-block text-lg font-semibold px-5'>Sign Up</button>
                    </ul>
                    

                </nav>
            </div>

            
            <div className="relative overflow-hidden w-screen h-screen">
        <div className="absolute top-0 left-0 w-full h-full">
          <ReactPlayer
            url={video}
            playing={true}
            loop={true}
            muted={true}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
            className="w-full"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#162239d9]">
          <div className="caption">
            <h6>Graduate School of Management</h6>
            <h2><em>Your</em> Classroom</h2>
            <div className="main-button">
              <div className="scroll-to-section"><a href="#section2">Discover more</a></div>
            </div>
          </div>
        </div>
      </div>

            
            
        </body>
    );
}
export default LandingPage;
