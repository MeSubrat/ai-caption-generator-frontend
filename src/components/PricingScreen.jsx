import React from 'react';
// import { Check, X, Sparkles, Zap, Calendar, Crown, Lock, ArrowRight } from 'lucide-react';
import {
    Check, X, Sparkles, Zap, Calendar,
    Crown, Lock, ArrowRight, Instagram,
    Twitter, Linkedin
} from 'lucide-react';

const PricingScreen = ({ currentPlan = 'FREE', planExpiryDate = '2026-12-31', onUpgrade }) => {
    const isFree = currentPlan === 'FREE';
    const isPro = currentPlan === 'PRO';

    // Grouped features for better readability
    const featureGroups = [
        {
            category: "Core Generation",
            features: [
                { free: '10 AI captions per day', pro: 'Unlimited AI captions', isFree: true },
                { free: '3 tones (Funny, Romantic...)', pro: 'All 20+ AI tones unlocked', isFree: true },
                { free: 'Custom counts (2, 3, 5)', pro: 'Custom counts (2, 3, 5)', isFree: false },
            ]
        },
        {
            category: "AI Smart Tools",
            features: [
                { free: 'AI hashtag suggestions', pro: 'Viral hashtag engine', isFree: true },
                { free: 'Caption Redefiner', pro: 'Caption Redefiner Pro', isFree: false },
                { free: 'Auto categorization badges', pro: 'Smart categorization', isFree: false },
            ]
        },
        {
            category: "Social & History",
            features: [
                { free: 'Save favorite captions', pro: 'Unlimited favorites', isFree: true },
                { free: 'History (24 hours)', pro: 'Lifetime generation history', isFree: false },
                { free: 'Community (Read-only)', pro: 'Publish to Community', isFree: true },
                { free: 'Manual scheduling', pro: 'Smart scheduling & Reminders', isFree: false },
            ]
        }
    ];

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-[#fafafa] relative overflow-hidden py-16 px-4">
            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/30 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/30 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold mb-6 uppercase tracking-widest">
                        <Sparkles size={14} /> Flexible Pricing
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
                        Ready to go <span className="text-indigo-600">Viral?</span>
                    </h1>
                    <p className="text-lg text-gray-500 font-medium leading-relaxed">
                        Choose the plan that fits your creative workflow. From solo creators to digital agencies.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">

                    {/* --- FREE PLAN CARD --- */}
                    <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white p-10 shadow-xl flex flex-col relative transition-transform hover:scale-[1.01]">
                        {isFree && (
                            <div className="absolute -top-3 left-10">
                                <span className="px-4 py-1 bg-gray-900 text-white text-[10px] font-black uppercase tracking-tighter rounded-full">
                                    Current Tier
                                </span>
                            </div>
                        )}

                        <div className="mb-10">
                            <h3 className="text-xl font-black text-gray-400 uppercase tracking-widest mb-2">Starter</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-black text-gray-900">₹0</span>
                                <span className="text-gray-400 font-bold">/year</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-4 font-medium">For casual creators exploring AI magic.</p>
                        </div>

                        <div className="space-y-8 flex-1">
                            {featureGroups.map((group, gIdx) => (
                                <div key={gIdx}>
                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">{group.category}</h4>
                                    <ul className="space-y-4">
                                        {group.features.map((f, fIdx) => (
                                            <li key={fIdx} className="flex items-start gap-3">
                                                {f.isFree ? (
                                                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                                                ) : (
                                                    <Lock className="w-5 h-5 text-gray-300 shrink-0" />
                                                )}
                                                <span className={`text-sm font-medium ${f.isFree ? 'text-gray-700' : 'text-gray-400 line-through opacity-50'}`}>
                                                    {f.free}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <button disabled className="w-full mt-10 py-4 px-6 bg-gray-100 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest cursor-not-allowed">
                            Active Plan
                        </button>
                    </div>

                    {/* --- PRO PLAN CARD (The "Hero" Card) --- */}
                    <div className="relative group flex flex-col">
                        {/* Animated Glow behind card */}
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

                        <div className={`h-full bg-white rounded-[2.5rem] border-2 p-10 shadow-2xl flex flex-col relative z-10 transition-all transform hover:scale-[1.02] ${isPro ? 'border-indigo-500' : 'border-indigo-100'
                            }`}>

                            <div className="absolute -top-4 right-10">
                                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-1.5 rounded-full shadow-xl flex items-center gap-2">
                                    <Crown size={14} className="fill-white" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Most Popular</span>
                                </div>
                            </div>

                            <div className="mb-10">
                                <h3 className="text-xl font-black text-indigo-600 uppercase tracking-widest mb-2">Creator Pro</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-black text-gray-900">₹499</span>
                                    <span className="text-gray-400 font-bold">/year</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-4 font-medium">Power tools for serious growth and reach.</p>
                            </div>

                            {isPro && planExpiryDate && (
                                <div className="mb-8 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-indigo-600" />
                                    <p className="text-xs text-indigo-700 font-bold">
                                        Renews on {formatDate(planExpiryDate)}
                                    </p>
                                </div>
                            )}

                            <div className="space-y-8 flex-1">
                                {featureGroups.map((group, gIdx) => (
                                    <div key={gIdx}>
                                        <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">{group.category}</h4>
                                        <ul className="space-y-4">
                                            {group.features.map((f, fIdx) => (
                                                <li key={fIdx} className="flex items-start gap-3">
                                                    <div className="bg-indigo-50 rounded-full p-0.5">
                                                        <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                                                    </div>
                                                    <span className="text-sm font-bold text-gray-800">{f.pro}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={onUpgrade}
                                disabled={isPro}
                                className={`w-full mt-10 py-5 px-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${isPro
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-900 text-white hover:bg-black shadow-xl shadow-indigo-200 hover:shadow-indigo-300'
                                    }`}
                            >
                                {isPro ? 'Active Tier' : <><Zap size={16} className="fill-amber-400 text-amber-400" /> Upgrade to Pro</>}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Trust Section */}
                <div className="mt-20 flex flex-col items-center gap-6">
                    <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />
                        ))}
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                            +2k
                        </div>
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Trusted by 2,000+ creators in 2026
                    </p>
                    <div className="flex items-center gap-8 opacity-30 grayscale mt-4">
                        <Instagram size={20} />
                        <Twitter size={20} />
                        <Linkedin size={20} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingScreen;