import React, { useState } from 'react';
import {
    ArrowLeft, Sparkles, Instagram, Linkedin, Twitter, Facebook,
    Hash, Smile, Copy, CheckCircle2, Image as ImageIcon,
    MoreHorizontal, Heart, MessageCircle, Send, Zap, MousePointer2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GenerateCaption = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const [platform, setPlatform] = useState('Instagram');
    const [tone, setTone] = useState('Professional');
    const [includeHashtags, setIncludeHashtags] = useState(true);
    const [includeEmojis, setIncludeEmojis] = useState(true);
    const [description, setDescription] = useState("");
    const [favorited, setFavorited] = useState(false);
    const [length, setLength] = useState(50); // Default to Medium (50%)

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const renderMobilePreview = () => {
        const displayText = description || `Your AI generated caption will appear here...${includeEmojis ? '😇❤️' : ''}`;
        const tags = includeHashtags ? "#AI #Innovation #CaptionAI" : "";
        // includeEmojis ? displayText + '😇❤️' : displayText;

        switch (platform) {
            case 'Twitter':
                return (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
                            <div className="flex-1">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm font-bold text-gray-900">User Name</span>
                                    <span className="text-gray-500 text-xs">@username</span>
                                </div>
                                <p className="text-[13px] text-gray-800 mt-1 leading-normal">{displayText}</p>
                                <p className="text-[12px] text-blue-500 mt-1">{tags}</p>
                            </div>
                        </div>
                    </div>
                );
            case 'Facebook':
                return (
                    <div className="animate-in fade-in zoom-in-95 duration-300 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-full bg-gray-200 border border-gray-100" />
                            <div>
                                <p className="text-xs font-bold text-blue-900">User Name</p>
                                <p className="text-[10px] text-gray-500 font-medium">Just now · 🌎</p>
                            </div>
                        </div>
                        <p className="text-[13px] text-gray-900 leading-snug">{displayText}</p>
                        <p className="text-[12px] text-blue-700">{tags}</p>
                        <div className="w-full aspect-square bg-gray-100 flex items-center justify-center rounded-sm">
                            <ImageIcon size={24} className="text-gray-300" />
                        </div>
                    </div>
                );
            case 'LinkedIn':
                return (
                    <div className="animate-in fade-in zoom-in-95 duration-300 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-sm bg-gray-200" />
                            <div>
                                <p className="text-xs font-bold text-gray-900">User Name</p>
                                <p className="text-[10px] text-gray-500 italic">Content Creator @ AI</p>
                            </div>
                        </div>
                        <p className="text-[12px] text-gray-800 leading-relaxed">{displayText}</p>
                        <p className="text-[11px] text-indigo-600 font-semibold">{tags}</p>
                    </div>
                );
            default: // Instagram
                return (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[1.5px]">
                                    <div className="w-full h-full rounded-full bg-white p-[1px]">
                                        <div className="w-full h-full rounded-full bg-gray-200" />
                                    </div>
                                </div>
                                <span className="text-[11px] font-bold">your_brand</span>
                            </div>
                            <MoreHorizontal size={14} className="text-gray-400" />
                        </div>
                        <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-3 border border-gray-100">
                            <ImageIcon size={32} className="text-gray-300" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[12px] text-gray-800 leading-snug">
                                <span className="font-bold mr-2">your_brand</span> {displayText}
                            </p>
                            <p className="text-[11px] text-indigo-600 font-medium">{tags}</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#fafafa]">

            {/* --- DYNAMIC BACKGROUND ELEMENTS --- */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/40 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/40 blur-[120px] rounded-full pointer-events-none" />

            {/* --- GLASS NAVIGATION --- */}
            <nav className="sticky top-4 z-50 mx-auto max-w-10xl px-4">
                <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl h-14 flex items-center justify-between px-6 shadow-xl shadow-black/5">
                    <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-indigo-600 transition-all uppercase tracking-widest">
                        <ArrowLeft size={16} /> Back to Hub
                    </button>
                    <div className="flex items-center gap-2">
                        <Zap size={14} className="text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-wide">CaptionAI powered by Gemini AI</span>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* --- LEFT: GLASS EDITOR PANEL --- */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-white/40 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/60 shadow-2xl relative overflow-hidden">

                            <div className="relative z-10">
                                <header className="mb-10">
                                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Generate <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Magic.</span></h1>
                                    <p className="text-gray-500 font-medium">Customize your AI-driven social content.</p>
                                </header>

                                {/* Platforms */}
                                <div className="mb-10">
                                    <div className="flex items-center gap-2 mb-4">
                                        <MousePointer2 size={14} className="text-indigo-600" />
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Platform</label>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {[
                                            { name: 'Instagram', icon: <Instagram size={18} /> },
                                            { name: 'Facebook', icon: <Facebook size={18} /> },
                                            { name: 'LinkedIn', icon: <Linkedin size={18} /> },
                                            { name: 'Twitter', icon: <Twitter size={18} /> }
                                        ].map((p) => (
                                            <button
                                                key={p.name}
                                                onClick={() => setPlatform(p.name)}
                                                className={`group relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${platform === p.name
                                                    ? 'border-indigo-600 bg-white shadow-xl shadow-indigo-500/10 scale-105'
                                                    : 'border-transparent bg-white/40 hover:bg-white/80 text-gray-400'
                                                    }`}
                                            >
                                                <span className={platform === p.name ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}>{p.icon}</span>
                                                <span className={`text-[10px] font-bold ${platform === p.name ? 'text-indigo-600' : 'text-gray-400'}`}>{p.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Tone Grid */}
                                <div className="mb-10">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Tone of Voice</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['Professional', 'Witty', 'Empathetic', 'Promotional', 'Minimalist'].map((t) => (
                                            <button
                                                key={t}
                                                onClick={() => setTone(t)}
                                                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${tone === t
                                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                                                    : 'bg-white/60 text-gray-500 hover:bg-white border border-white/40'
                                                    }`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-8">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Scenario Description</label>
                                    <div className="relative group">
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows={5}
                                            placeholder="Describe the moment..."
                                            className="w-full rounded-3xl bg-white/60 border border-white/80 p-6 text-sm focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none shadow-inner"
                                        />
                                        <div className="absolute bottom-4 right-4 flex gap-2">
                                            <button className="p-2 text-gray-400 hover:text-indigo-600 bg-white rounded-xl shadow-sm"><Smile size={20} /></button>
                                        </div>
                                    </div>
                                </div>

                                {/* Hashtag Toggle Glass */}
                                <div className="flex items-center justify-between p-5 bg-indigo-600/5 rounded-3xl border border-indigo-600/10 mb-10">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600"><Hash size={20} /></div>
                                        <div>
                                            <span className="text-sm font-bold text-gray-800 block">AI Hashtags</span>
                                            <span className="text-[10px] text-indigo-600 font-medium italic underline">Optimized for {platform}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIncludeHashtags(!includeHashtags)}
                                        className={`w-12 h-6 rounded-full relative transition-all duration-300 ${includeHashtags ? 'bg-indigo-600' : 'bg-gray-300'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all ${includeHashtags ? 'right-1' : 'left-1'}`} />
                                    </button>
                                </div>

                                {/* Emoji Toggle Glass */}
                                <div className="flex items-center justify-between p-5 bg-indigo-600/5 rounded-3xl border border-indigo-600/10 mb-10">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600"><Smile size={20} /></div>
                                        <div>
                                            <span className="text-sm font-bold text-gray-800 block">AI Emojis</span>
                                            <span className="text-[10px] text-indigo-600 font-medium italic underline">Optimized for {platform}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIncludeEmojis(!includeEmojis)}
                                        className={`w-12 h-6 rounded-full relative transition-all duration-300 ${includeEmojis ? 'bg-indigo-600' : 'bg-gray-300'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all ${includeEmojis ? 'right-1' : 'left-1'}`} />
                                    </button>
                                </div>

                                {/* --- Length Slider with Platform Insights --- */}
                                <div className="mb-10">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-2">
                                            <Zap size={14} className="text-indigo-600" />
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Caption Length</label>
                                        </div>
                                        <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100 uppercase tracking-tighter">
                                            {length < 33 ? 'Short' : length < 66 ? 'Medium' : 'Long'}
                                        </span>
                                    </div>

                                    <div className="relative flex items-center group mb-4">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={length}
                                            onChange={(e) => setLength(parseInt(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-purple-600 transition-all"
                                        />
                                    </div>

                                    {/* --- Dynamic Insight Box --- */}
                                    <div className="p-4 rounded-2xl bg-white/50 border border-white/80 shadow-sm transition-all duration-300">
                                        <div className="flex gap-3 items-start">
                                            <div className="mt-1 p-1.5 bg-indigo-100 rounded-lg text-indigo-600">
                                                <Sparkles size={22} />
                                            </div>
                                            <div>
                                                <p className="text-l font-bold text-gray-700 -mb-1">
                                                    {length < 33 ? "Punchy & Direct" : length < 66 ? "Engaging & Balanced" : "Storytelling & Detail"}
                                                </p>
                                                <p className="text-[11px] text-gray-500 leading-relaxed">
                                                    {length < 33
                                                        ? "Best for Twitter (X) or Threads. Focuses on a single strong hook and quick call-to-action."
                                                        : length < 66
                                                            ? "Perfect for Instagram and Facebook. Great for building engagement with a mix of context and flair."
                                                            : "Ideal for LinkedIn or Blogs. Uses deep-dive storytelling to establish authority and provide value."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* THE MAGIC BUTTON */}
                                <button
                                    className="group relative w-full overflow-hidden bg-gray-900 text-white py-5 rounded-3xl font-black text-sm tracking-widest uppercase transition-all hover:bg-black hover:shadow-[0_0_40px_rgba(79,70,229,0.3)] active:scale-95"
                                    onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
                                >
                                    <div className="relative z-10 flex items-center justify-center gap-3">
                                        {loading ? "Brewing Magic..." : <><Sparkles size={20} className="text-indigo-400" /> Generate Caption</>}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT: FLOATING PREVIEW --- */}
                    <div className="lg:col-span-5 sticky top-28 hidden lg:block">
                        <div className="relative group">
                            {/* Decorative Blur behind Phone */}
                            <div className="absolute inset-0 bg-indigo-500/20 blur-[80px] rounded-full group-hover:bg-purple-500/20 transition-all duration-700" />

                            <div className="relative bg-white rounded-[3.5rem] border-[10px] border-gray-900 shadow-[0_40px_100px_rgba(0,0,0,0.1)] p-7 aspect-[9/18.5] max-w-[320px] mx-auto overflow-hidden">
                                <div className="h-full pt-4">
                                    {renderMobilePreview()}
                                </div>

                                {/* Floating Copy Action */}
                                <div className="absolute bottom-6 left-6 right-6 flex gap-2">
                                    <button
                                        onClick={handleCopy}
                                        className="flex-[4] bg-white border-2 border-gray-900 text-gray-900 py-3 rounded-xl text-[9px] font-black tracking-widest hover:bg-gray-900 hover:text-white transition-all shadow-lg flex items-center justify-center gap-2"
                                    >
                                        {copied ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
                                        {copied ? "READY" : "COPY"}
                                    </button>
                                    <button
                                        onClick={() => setFavorited(!favorited)}
                                        className={`flex-1 border-2 flex items-center justify-center rounded-xl transition-all shadow-lg ${favorited
                                            ? 'bg-red-50 border-red-500 text-red-500'
                                            : 'bg-white border-gray-900 text-gray-900 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Heart size={16} className={favorited ? "fill-red-500" : ""} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default GenerateCaption;