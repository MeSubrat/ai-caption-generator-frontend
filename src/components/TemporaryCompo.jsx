import React, { useState } from 'react';
import { 
  Camera, Type, Instagram, Facebook, Twitter, Linkedin, 
  Sparkles, Copy, RefreshCw, Eye, Edit3, CheckCircle2 
} from 'lucide-react';

const TemporaryCompo = () => {
    const [view, setView] = useState('editor'); // 'editor' or 'preview'
    const [selectedPlatform, setSelectedPlatform] = useState('instagram');
    const [generatedCaption, setGeneratedCaption] = useState("✨ Elevating my workspace with a touch of AI magic! 🚀 There's nothing like a clean setup to fuel creativity. \n\n#DeveloperLife #AISoltuions #FullStack");
    const [imagePreview, setImagePreview] = useState(null);

    // Platform-specific visual config
    const platformConfig = {
        instagram: { icon: Instagram, color: 'from-purple-500 to-pink-500', label: 'Instagram' },
        twitter: { icon: Twitter, color: 'bg-black', label: 'X / Twitter' },
        linkedin: { icon: Linkedin, color: 'bg-blue-700', label: 'LinkedIn' }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <div className="max-w-6xl mx-auto p-6">
                
                {/* Header with View Toggle */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800">CaptionStudio <span className="text-purple-600">Pro</span></h1>
                        <p className="text-slate-500 text-sm">Design, Generate, and Preview in seconds.</p>
                    </div>

                    {/* ✅ THE OPTION FOR LIVE PREVIEW TOGGLE */}
                    <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
                        <button 
                            onClick={() => setView('editor')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${view === 'editor' ? 'bg-slate-900 text-white' : 'text-slate-500'}`}
                        >
                            <Edit3 size={16} /> Editor
                        </button>
                        <button 
                            onClick={() => setView('preview')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${view === 'preview' ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : 'text-slate-500'}`}
                        >
                            <Eye size={16} /> Live Preview
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* LEFT SIDE: Inputs & Controls (Visible in both, but smaller in preview) */}
                    <div className={`${view === 'preview' ? 'lg:col-span-4 opacity-60' : 'lg:col-span-7'} space-y-6 transition-all duration-500`}>
                        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                            <label className="flex items-center gap-2 font-bold text-slate-700 mb-4">
                                <Type className="text-purple-600" /> Scenario Brief
                            </label>
                            <textarea 
                                className="w-full h-32 p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-purple-400"
                                placeholder="Describe your post..."
                            />
                            
                            <div className="grid grid-cols-3 gap-3 mt-6">
                                {Object.entries(platformConfig).map(([key, val]) => (
                                    <button 
                                        key={key}
                                        onClick={() => setSelectedPlatform(key)}
                                        className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${selectedPlatform === key ? 'border-purple-500 bg-purple-50' : 'border-slate-100'}`}
                                    >
                                        <val.icon className={selectedPlatform === key ? 'text-purple-600' : 'text-slate-400'} />
                                        <span className="text-xs font-bold">{val.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Dynamic Preview Container */}
                    <div className={`${view === 'preview' ? 'lg:col-span-8' : 'lg:col-span-5'} transition-all duration-500`}>
                        
                        {view === 'editor' ? (
                            /* Simple Results Card */
                            <div className="bg-white p-6 rounded-[2rem] border-2 border-dashed border-slate-200 h-full flex flex-col justify-center items-center text-center">
                                <div className="bg-purple-100 p-4 rounded-full mb-4">
                                    <Sparkles className="text-purple-600 w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-slate-800">Ready to Generate?</h3>
                                <p className="text-slate-400 text-sm mb-6">Your caption results will appear here.</p>
                                <button className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold">Generate Now</button>
                            </div>
                        ) : (
                            /* ✅ LIVE PREVIEW MOCKUP */
                            <div className="relative">
                                {/* Success Badge */}
                                <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg z-20 animate-bounce">
                                    <CheckCircle2 size={24} />
                                </div>

                                <div className="bg-slate-900 rounded-[3rem] p-4 shadow-2xl border-[10px] border-slate-800 max-w-[400px] mx-auto">
                                    <div className="bg-white rounded-[2.2rem] overflow-hidden min-h-[550px]">
                                        {/* Mockup Header */}
                                        <div className="p-4 border-b flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${platformConfig[selectedPlatform].color}`} />
                                                <span className="text-xs font-black">AI_Studio_User</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{selectedPlatform}</span>
                                        </div>

                                        {/* Post Content */}
                                        <div className="aspect-square bg-slate-100 flex items-center justify-center">
                                            <Camera size={48} className="text-slate-300" />
                                        </div>

                                        <div className="p-4">
                                            <p className="text-sm leading-relaxed text-slate-800">
                                                <span className="font-bold mr-2">AI_Studio_User</span>
                                                {generatedCaption}
                                            </p>
                                            <div className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                                Generated 1 minute ago • Powered by AI
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemporaryCompo;