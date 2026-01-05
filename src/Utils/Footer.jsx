import React, { useState } from 'react';
import {
    Store,
    Github,
    Twitter,
    Linkedin,
    Lightbulb,
    ExternalLink,
    Send,
    CheckCircle2
} from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const currentYear = new Date().getFullYear();

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setTimeout(() => setSubscribed(false), 3000); // Reset after 3 seconds
            setEmail("");
        }
    };

    return (
        <footer className="mt-12 border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-6xl px-4 py-10">

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

                    {/* Section 1: Brand & Desc */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="rounded-lg p-1.5 bg-indigo-600 text-white shadow-sm">
                                <Store size={16} strokeWidth={2.5} />
                            </div>
                            <span className="text-lg font-bold text-gray-900 tracking-tight">CaptionAI</span>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Empowering creators with AI-driven captions built for the future of social media.
                        </p>
                    </div>

                    {/* Section 2: Newsletter Subscription */}
                    <div className="lg:col-span-3">
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">Stay Updated</h4>
                        <p className="text-xs text-gray-500 mb-3">Get the latest AI tips and viral trends.</p>
                        <form onSubmit={handleSubscribe} className="space-y-2">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1.5 rounded-lg bg-indigo-600 p-1.5 text-white hover:bg-indigo-700 transition-colors"
                                >
                                    {subscribed ? <CheckCircle2 size={14} /> : <Send size={14} />}
                                </button>
                            </div>
                            {subscribed && (
                                <p className="text-[10px] font-medium text-green-600 animate-in fade-in slide-in-from-top-1">
                                    Thanks for subscribing! Check your inbox soon.
                                </p>
                            )}
                        </form>
                    </div>

                    {/* Section 3: Quick Links */}
                    <div className="grid grid-cols-2 gap-4 lg:col-span-3">
                        <div>
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">Platform</h4>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><a href="#" className="hover:text-indigo-600 transition-colors text-xs">Marketplace</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition-colors text-xs">Pricing</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition-colors text-xs">API</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">Support</h4>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><a href="#" className="hover:text-indigo-600 transition-colors text-xs">Tutorials</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition-colors text-xs">Help Desk</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition-colors text-xs">Legal</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 4: The Integrated Pro Tip */}
                    <div className="lg:col-span-3">
                        <div className="rounded-2xl bg-indigo-50/50 border border-indigo-100 p-4 relative overflow-hidden h-full">
                            <Lightbulb className="absolute -right-2 -bottom-2 text-indigo-100 h-14 w-14 -rotate-12" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 text-indigo-600 mb-2">
                                    <Lightbulb size={14} className="fill-indigo-100" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Weekly Pro Tip</span>
                                </div>
                                <p className="text-[12px] text-indigo-900 leading-snug font-medium italic">
                                    "Captions starting with 'Did you know...' see 40% higher retention."
                                </p>
                                <button className="mt-3 flex items-center gap-1 text-[10px] font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-tight">
                                    Read More <ExternalLink size={10} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] text-gray-400 font-medium tracking-wide">
                        © {currentYear} CAPTIONAI LLC. THE FUTURE OF CREATIVE AI.
                    </p>
                    <div className="flex items-center gap-5">
                        <a href="#" className="text-gray-400 hover:text-indigo-600 transition-all"><Twitter size={16} /></a>
                        <a href="#" className="text-gray-400 hover:text-indigo-600 transition-all"><Linkedin size={16} /></a>
                        <a href="#" className="text-gray-400 hover:text-gray-900 transition-all border-l pl-5 border-gray-200"><Github size={16} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;