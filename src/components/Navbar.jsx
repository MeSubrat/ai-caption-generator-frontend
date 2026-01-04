import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Store,
    ChevronDown,
    Search,
    Bell,
    Settings,
    UserCircle,
    Menu,
    X,
    Sparkles
} from 'lucide-react';
import GenerateCaptionButton from '../Utils/GenerateCaptionButton';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const navLinks = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'History', href: '/caption-history' },
        { name: 'Marketplace', href: '/marketplace' },
        { name: 'Learn', href: '/tutorials' },
    ];

    // Helper to check active state based on route
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="flex h-14 items-center justify-between">

                    {/* Left Section: Branding */}
                    <div
                        className="flex items-center gap-2 cursor-pointer group shrink-0"
                        onClick={() => navigate('/dashboard')}
                    >
                        <div className="rounded-lg p-1.5 bg-indigo-600 text-white shadow-sm group-hover:bg-indigo-700 transition-colors">
                            <Store size={16} strokeWidth={2.5} />
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="hidden sm:block text-sm font-bold text-gray-900 tracking-tight">CaptionAI</span>
                            <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </div>
                    </div>

                    {/* Center Section: Desktop Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`text-xs font-semibold uppercase tracking-wider transition-all hover:text-indigo-600 ${isActive(link.href)
                                        ? 'text-indigo-600'
                                        : 'text-gray-500'
                                    }`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Right Section: Actions */}
                    <div className="flex items-center gap-1 sm:gap-3">
                        {/* Hidden on mobile to keep bar clean; mobile menu has it instead */}
                        {/* <div className="hidden lg:block">
                            <GenerateCaptionButton />
                        </div> */}

                        <div className="flex items-center border-l border-gray-100 ml-2 pl-2 sm:gap-1">
                            <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-gray-50 rounded-full transition-all">
                                <Search size={18} strokeWidth={2} />
                            </button>
                            <button className="relative p-2 text-gray-400 hover:text-indigo-600 hover:bg-gray-50 rounded-full transition-all">
                                <Bell size={18} strokeWidth={2} />
                                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                            </button>
                            <button className="hidden sm:block p-2 text-gray-400 hover:text-indigo-600 hover:bg-gray-50 rounded-full transition-all">
                                <Settings size={18} strokeWidth={2} />
                            </button>
                            <button className="ml-1 p-1 text-gray-400 hover:text-indigo-600 transition-all">
                                <UserCircle size={22} strokeWidth={2} />
                            </button>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden ml-1 p-2 text-gray-500 hover:bg-gray-50 rounded-lg"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Optimized Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl z-50 md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex flex-col p-4 space-y-3">
                        {/* Mobile-only CTA */}
                        <div className="pb-2">
                            <GenerateCaptionButton />
                        </div>

                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`flex items-center justify-between p-3 rounded-xl text-sm font-bold ${isActive(link.href)
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {link.name}
                                {isActive(link.href) && <Sparkles size={14} />}
                            </a>
                        ))}

                        <div className="pt-4 mt-2 border-t border-gray-100 grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 p-3 text-xs font-bold text-gray-500 bg-gray-50 rounded-xl">
                                <Settings size={16} /> Settings
                            </button>
                            <button className="flex items-center justify-center gap-2 p-3 text-xs font-bold text-gray-500 bg-gray-50 rounded-xl">
                                <Bell size={16} /> Alerts
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;