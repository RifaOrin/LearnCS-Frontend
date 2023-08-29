import { useState } from "react";
import axios from "axios";
import {  Link } from "react-router-dom";
const Url = "http://127.0.0.1:8000/auth/users/";

function Signup() {
  
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRe_Password] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userData = {
    username,
    email,
    password,
    re_password,
  };
  const signin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await axios.post(Url, userData);
      setShowPopup(true);
    } catch (error) {
      if (error.response.data.email !== undefined) {
        alert(error.response.data.email);
      }
      if (error.response.data.password !== undefined) {
        alert(error.response.data.password);
      }
      if (error.response.data.username !== undefined) {
        alert(error.response.data.username);
      }
      if (error.response.data.re_password !== undefined) {
        alert(error.response.data.re_password);
      }
    }

    setIsLoading(false);
  };
  return (
    <body>
      <div
        className="h-screen flex items-center justify-center bg-[#748A8C] bg-cover bg-no-repeat"
        style={{
          "background-image": `url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="w-full flex flex-col md:flex-row items-center justify-center ">
          <div className="w-1/2 flex items-center justify-center ">
            <div className="grid grid-cols-2 gap-4  ">
            
            <div className="text-green-500 text-base font-medium px-10 py-10 bg-no-repeat bg-cover bg-center rounded-xl bg-[#012326] bg-opacity-95">
              Total Students
              <h1 className="text-[#F2F2F2] text-4xl font-medium pt-1">3000+</h1>
            </div>
            <div className="text-green-500 text-base font-medium px-10 py-10 bg-no-repeat bg-cover bg-center rounded-xl bg-[#052e31] bg-opacity-95">
              Total Instructors
              <h1 className="text-[#F2F2F2] text-4xl font-medium pt-1">30+</h1>
            </div>
            
            
            <div className="text-green-500 text-base font-medium px-10 py-10 bg-no-repeat bg-cover bg-center rounded-xl bg-[#052e31] bg-opacity-95">
              Total Courses
              <h1 className="text-[#F2F2F2] text-4xl font-medium pt-1">50+</h1>
            </div>
            <div className="text-green-500 text-base font-medium px-10 py-10 bg-no-repeat bg-cover bg-center rounded-xl bg-[#012326] bg-opacity-95">
              Total Study Material
              <h1 className="text-[#F2F2F2] text-4xl font-medium pt-1">500+</h1>
            </div>
            
            </div>
            
          </div>
        
        <div className="w-1/2 max-w-sm mx-auto p-8  bg-[#012326] bg-opacity-60 backdrop-blur-md rounded-xl shadow-md space-y-2 py-5 flex-auto">
          <div className="text-center space-y-2">
            <h1 className="mb-4 text-base text-center font-semibold text-[#F2F2F2]">
              Register your free account and get immidiate access to online
              courses
            </h1>
            <div className="border-t border-[#F2F2F2] my-4"></div>
          </div>
          <div>
            <p className="text-body py-2 text-[#F2F2F2] font-medium">
              Username
            </p>
            <input
              type="text"
              placeholder="Username"
              class="border outline-none focus:border-2 focus:border-green-500 w-full rounded-sm py-2 px-3"
              onChange={(e) => setUsername(e.target.value)}
              required
            ></input>
            <p className="text-body py-2 text-[#F2F2F2] font-medium ">
              Email Address
            </p>
            <input
              type="text"
              placeholder="Email Address"
              class="border outline-none focus:border-2 focus:border-green-500 w-full rounded-sm py-2 px-3"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
            <p className="text-body py-2 text-[#F2F2F2] font-medium ">
              Password
            </p>
            <input
              type="password"
              placeholder="Password"
              class="w-full rounded-sm border outline-none focus:border-2 focus:border-green-500 py-2 px-3"
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
            <p className="text-body py-2 text-[#F2F2F2] font-medium ">
              Confirm Password
            </p>
            <input
              type="password"
              placeholder="Confirm Password"
              class="w-full rounded-sm border outline-none focus:border-2 focus:border-green-500 py-2 px-3"
              onChange={(e) => setRe_Password(e.target.value)}
              required
            ></input>
            <div class="mt-5">
              <button
                className="w-full py-3 text-center border rounded-full text-sm font-semibold hover:text-[#F2F2F2] hover:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2
                                         border-[#5ba66e] text-[#49ad62] hover:bg-green-500 focus:ring-green-600 dark:text-green-400 hover:scale-105 duration-200"
                onClick={signin}
              >
                Sign Up
              </button>
              <div className="mt-5 grid grid-cols-3 items-center text-gray-300">
                <hr className="border-gray-400"></hr>
                <p className="text-center text-sm cursor-pointer">OR</p>
                <hr className="border-gray-400"></hr>
              </div>
              <p className="mt-2 text-body text-center py-2 text-[#F2F2F2] font-medium">
                Already a Member?
                <Link to="/login">
                  <button className="text-green-400 px-1 hover:underline">
                    Sign In
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
        </div>
      )}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm mx-auto shadow-lg">
            <p className="text-center text-lg text-gray-800 font-semibold mb-4">
              Please check your email for account activation.
            </p>
            <button
              className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </body>
  );
}
export default Signup;
