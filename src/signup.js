function Signup() {
  return (
    <body>
      <div className="h-screen flex items-center justify-center bg-[#748A8C]">
        <div className="mr-56 max-w-sm mx-auto p-8 bg-[#012326] rounded-xl shadow-md space-y-2 flex-auto">
          <div className="text-center space-y-2 sm:text-left">
            <h1 className="mb-4 text-lg text-center font-semibold text-gray-300">
              Register your free account and get immidiate access to online
              courses
            </h1>
            <div className="border-t border-gray-300 my-4"></div>
          </div>
          <div>
            <p className="text-body py-2 text-gray-500 font-medium dark:text-gray-400">
              Username
            </p>
            <input
              type="text"
              placeholder="Username"
              class="border border-gray-400 py-1 px-2"
            ></input>
            <p className="text-body py-2 text-gray-500 font-medium dark:text-gray-400">
              Email
            </p>
            <input
              type="text"
              placeholder="Email"
              class="border border-gray-400 py-1 px-2"
            ></input>
            <p className="text-body py-2 text-gray-500 font-medium dark:text-gray-400">
              Password
            </p>
            <input
              type="text"
              placeholder="Password"
              class="border border-gray-400 py-1 px-2"
            ></input>
            <p className="text-body py-2 text-gray-500 font-medium dark:text-gray-400">
              Confirm Password
            </p>
            <input
              type="text"
              placeholder="Confirm Password"
              class="border border-gray-400 py-1 px-2"
            ></input>
            <div class="mt-5">
              <button
                className="w-full py-3 text-center border rounded-full text-sm font-semibold  hover:text-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2
         border-green-400 text-[#49ad62] hover:bg-green-500 focus:ring-green-600 dark:text-green-400"
              >
                Sign Up
              </button>
              <p className="text-body text-center py-2 text-white font-medium">
                Already a Member?
                <button className="text-green-400 px-1 hover:underline">
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
export default Signup;
