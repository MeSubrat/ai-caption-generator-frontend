import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Settings, User } from "lucide-react";

const SaaSNavbar = () => {
    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(false);

    const userName = localStorage.getItem("userName") || "User";
    const userInitial = userName.charAt(0).toUpperCase();

    return (
        <nav className="w-full bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">

            {/* Left: Logo + Company */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
                <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <path d="M9 22V12h6v10" />
                </svg>
                <span className="font-semibold text-gray-800">Company Name LLC</span>
            </div>

            {/* Center: Menu */}
            <div className="hidden md:flex items-center gap-6 text-gray-600 font-medium">
                <button onClick={() => navigate("/generate-caption")} className="hover:text-black">Workspace</button>
                <button onClick={() => navigate("/manage")} className="hover:text-black">Manage</button>
                <button onClick={() => navigate("/templates")} className="hover:text-black">Marketplace</button>
                <button onClick={() => navigate("/learn")} className="hover:text-black">Learn</button>
            </div>

            {/* Right: Icons + Profile */}
            <div className="flex items-center gap-4 text-gray-600 relative">
                <Search size={18} className="cursor-pointer hover:text-black" onClick={() => navigate("/search")} />
                <Settings size={18} className="cursor-pointer hover:text-black" onClick={() => navigate("/settings")} />

                {/* Profile Circle */}
                <div
                    onClick={() => setDropdown(!dropdown)}
                    className="w-8 h-8 bg-purple-200 text-purple-700 font-bold rounded-full flex items-center justify-center cursor-pointer"
                >
                    {userInitial}
                </div>

                {/* Dropdown */}
                {dropdown && (
                    <div className="absolute right-0 top-10 bg-white border border-gray-100 shadow-lg rounded-xl w-40 py-2 text-sm">
                        <p className="px-4 py-1 font-semibold text-gray-800">{userName}</p>
                        <hr className="my-1 border-gray-200" />
                        <button onClick={() => navigate("/profile")} className="block w-full text-left px-4 py-1 hover:bg-gray-50">Profile</button>
                        <button onClick={() => navigate("/billing")} className="block w-full text-left px-4 py-1 hover:bg-gray-50">Billing</button>
                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                                localStorage.removeItem("userName");
                                navigate("/");
                            }}
                            className="block w-full text-left px-4 py-1 text-red-600 hover:bg-gray-50"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile Menu for small screens */}
            <div className="flex md:hidden text-gray-600 cursor-pointer" onClick={() => setDropdown(!dropdown)}>
                <User size={20} />
            </div>

        </nav>
    );
};

export default SaaSNavbar;
