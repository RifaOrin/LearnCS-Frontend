import React, { useState } from "react";
import { Link } from "react-router-dom";

function Searchbar({ history }) {
    const [searchValue, setSearchValue] = useState("");

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className="max-w-md mx-auto py-3 mr-4">
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-[#00242c8e] overflow-hidden">
                <Link to={`/searchResult/${searchValue}`}>
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </Link>
                <input
                    className="peer h-full w-full outline-none text-sm bg-[#00242c8e] pl-3 text-white"
                    type="text"
                    id="search"
                    placeholder="Search something.."
                    value={searchValue}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default Searchbar;
