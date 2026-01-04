import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Sparkles, Image, RefreshCw, Hash,
    ChevronRight, TrendingUp, Clock,
    Lightbulb, Zap, BarChart3, Plus
} from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from "../Utils/Footer";

const DashboardHome = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName") || "User";

    const services = [
        { title: "Generate Caption", desc: "AI-powered ideas", path: "/generate-caption", icon: <Sparkles className="text-purple-500" />, color: "bg-purple-50" },
        { title: "Image Caption", desc: "Visual to text", path: "/image-caption", icon: <Image className="text-blue-500" />, color: "bg-blue-50" },
        { title: "Rewrite Caption", desc: "Refine & polish", path: "/rewrite-caption", icon: <RefreshCw className="text-pink-500" />, color: "bg-pink-50" },
        { title: "Hashtag Generator", desc: "Boost your reach", path: "/hashtag-generator", icon: <Hash className="text-indigo-500" />, color: "bg-indigo-50" },
    ];

    const quotaUsed = 3;
    const quotaTotal = 10;
    const percentage = (quotaUsed / quotaTotal) * 100;

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* --- HERO SECTION --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                            Welcome back, {userName}! ✨
                        </h1>
                        <p className="text-gray-500 mt-1 text-lg">What are we creating today?</p>
                    </div>
                    <button
                        onClick={() => navigate("/generate-caption")}
                        className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-lg shadow-black/10"
                    >
                        <Plus size={20} />
                        New Caption
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* --- LEFT COLUMN: SERVICES & INSIGHTS --- */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Quick Actions Grid */}
                        <section>
                            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Core Services</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {services.map((s, i) => (
                                    <div
                                        key={i}
                                        onClick={() => navigate(s.path)}
                                        className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-500/5 transition-all cursor-pointer flex items-start gap-4"
                                    >
                                        <div className={`p-3 rounded-xl ${s.color} group-hover:scale-110 transition-transform`}>
                                            {s.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors">{s.title}</h3>
                                            <p className="text-sm text-gray-500">{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* NEW SECTION: AI Insights / Analytics */}
                        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-bold text-gray-800 flex items-center gap-2">
                                    <BarChart3 size={20} className="text-purple-600" />
                                    Predicted Performance
                                </h2>
                                <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-lg">Live Analysis</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500">Avg. Engagement</p>
                                    <p className="text-2xl font-bold text-gray-900">+12.4%</p>
                                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-[70%]" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500">Reach Potential</p>
                                    <p className="text-2xl font-bold text-gray-900">High</p>
                                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[85%]" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500">Best Time to Post</p>
                                    <p className="text-2xl font-bold text-gray-900">6:45 PM</p>
                                    <p className="text-[10px] text-gray-400">Based on trend analysis</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* --- RIGHT COLUMN: STATS & TRENDS --- */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* Improved Quota Card */}
                        <section className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl shadow-purple-200">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-indigo-100 text-xs font-medium uppercase tracking-wider">Current Plan</p>
                                    <h3 className="text-2xl font-bold">Free Trial</h3>
                                </div>
                                <Zap className="text-yellow-400 fill-yellow-400" size={24} />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Usage</span>
                                    <span>{quotaUsed}/{quotaTotal} captions</span>
                                </div>
                                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-white transition-all duration-500"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => navigate("/pricing")}
                                className="w-full mt-6 bg-white text-indigo-600 py-2 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-colors"
                            >
                                Upgrade to Pro
                            </button>
                        </section>

                        {/* Trending Section */}
                        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <TrendingUp size={18} className="text-orange-500" />
                                Trending Now
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Popular Tags</p>
                                    <div className="flex flex-wrap gap-2">
                                        {["#AI2026", "#Growth", "#Viral"].map(tag => (
                                            <span key={tag} className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md hover:bg-purple-100 hover:text-purple-600 cursor-pointer transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <hr className="border-gray-50" />
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Recent Captions</p>
                                    <div className="space-y-3">
                                        {["Sunset vibes...", "Success is shared..."].map((cap, i) => (
                                            <div key={i} className="flex items-center gap-3 group cursor-pointer">
                                                <div className="h-8 w-8 rounded bg-gray-50 flex items-center justify-center shrink-0">
                                                    <Clock size={14} className="text-gray-400" />
                                                </div>
                                                <p className="text-sm text-gray-600 truncate group-hover:text-purple-600">{cap}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Tips Card */}
                        <section className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                            <h2 className="font-bold text-amber-800 mb-2 flex items-center gap-2 text-sm">
                                <Lightbulb size={16} />
                                Pro Tip
                            </h2>
                            <p className="text-xs text-amber-700 leading-relaxed">
                                Captions with a question at the end get <b>35% more comments</b> on average. Try it in your next post!
                            </p>
                        </section>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DashboardHome;