function Footer(){
    return(
        <footer>
                <div className="p-10 bg-black text-[#F2F2F2]">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            <div className="mb-5">
                                <h4 className="text-2xl pb-4">Company</h4>
                                <ul>
                                    <li className="text-sm pb-2 text-gray-300 hover:text-green-500 hover:underline">Home</li>
                                    <li className="text-sm pb-2 text-gray-300 hover:text-green-500 hover:underline">About Us</li>
                                    <li className="text-sm pb-2 text-gray-300 hover:text-green-500 hover:underline">Services</li>
                                    <li className="text-sm pb-2 text-gray-300 hover:text-green-500 hover:underline">Terms of services</li>
                                    <li className="text-sm pb-2 text-gray-300 hover:text-green-500 hover:underline">Privacy policy</li>
                                </ul>
                            </div>
                            <div className="mb-5">
                            <h4 className="text-2xl pb-4">Community</h4>
                                <ul>
                                    <li className="text-sm pb-2 text-gray-300 hover:text-green-500 hover:underline">Team Plans</li>
                                    <li className="text-sm pb-2 text-gray-300 hover:text-green-500 hover:underline">Limited Memberships</li>
                                    <li className="text-sm pb-2 text-gray-300 hover:text-green-500 hover:underline">Free courses</li>
                                    
                                </ul>
                            </div>
                            <div className="mb-5">
                            <h4 className="text-2xl pb-4">Teaching</h4>
                                <ul>
                                    <li className="text-sm pb-2 text-gray-300 hover:text-green-500 hover:underline">Join as an instructor</li>
                                    <li className="text-sm pb-2 text-gray-300 hover:text-green-500 hover:underline">Teacher Rules & Requirements</li>
                                    
                                    
                                </ul>

                            </div>
                            

                        </div>

                    </div>
                </div>
            </footer>

    );
}
export default Footer;