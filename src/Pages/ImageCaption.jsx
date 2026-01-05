import React, { useState, useRef } from 'react';
import {
    ArrowLeft, Sparkles, Instagram, Linkedin, Twitter, Facebook,
    Hash, Smile, Copy, CheckCircle2, Image as ImageIcon,
    MoreHorizontal, Heart, Zap, MousePointer2, Upload, X, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ImageCaption = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // States
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [favorited, setFavorited] = useState(false);

    const [platform, setPlatform] = useState('Instagram');
    const [tone, setTone] = useState('Professional');
    const [includeHashtags, setIncludeHashtags] = useState(true);

    // Upload Logic
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadProgress(1);
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 30;
                if (progress >= 100) {
                    clearInterval(interval);
                    setSelectedImage(URL.createObjectURL(file));
                    setTimeout(() => setUploadProgress(0), 500);
                }
                setUploadProgress(Math.floor(progress));
            }, 150);
        }
    };

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const renderMobilePreview = () => {
        const displayText = "AI is analyzing your image to generate the perfect story...";
        const tags = includeHashtags ? "#VisualVibes #AI2026 #Viral" : "";

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
                                {selectedImage && <img src={selectedImage} alt="Tweet" className="w-full mt-2 rounded-xl border border-gray-100" />}
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
                        <div className="w-full aspect-square bg-gray-100 rounded-sm overflow-hidden flex items-center justify-center">
                            {selectedImage ? <img src={selectedImage} alt="FB" className="w-full h-full object-cover" /> : <ImageIcon size={24} className="text-gray-300" />}
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
                        {selectedImage && <img src={selectedImage} alt="LinkedIn" className="w-full aspect-video object-cover rounded shadow-sm" />}
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
                        <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3 border border-gray-100 flex items-center justify-center">
                            {selectedImage ? <img src={selectedImage} alt="Insta" className="w-full h-full object-cover" /> : <ImageIcon size={32} className="text-gray-300" />}
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

            {/* Background Decor */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/40 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/40 blur-[120px] rounded-full pointer-events-none" />

            {/* Navigation */}
            <nav className="sticky top-4 z-50 mx-auto max-w-10xl px-4">
                <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl h-14 flex items-center justify-between px-6 shadow-xl shadow-black/5">
                    <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-indigo-600 transition-all uppercase tracking-widest">
                        <ArrowLeft size={16} /> Back to Hub
                    </button>
                    <div className="flex items-center gap-2">
                        <Zap size={14} className="text-amber-500 fill-amber-400" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-wide">CaptionAI powered by Gemini AI</span>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* LEFT: EDITOR PANEL */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-white/40 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/60 shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <header className="mb-10">
                                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Vision <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Sync.</span></h1>
                                    <p className="text-gray-500 font-medium text-sm">Upload an image to generate context-aware captions.</p>
                                </header>

                                {/* --- IMAGE UPLOAD SECTION WITH PROGRESS --- */}
                                <div className="mb-10">
                                    <div className="flex items-center gap-2 mb-4">
                                        <ImageIcon size={14} className="text-indigo-600" />
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Upload Media</label>
                                    </div>

                                    {uploadProgress > 0 ? (
                                        <div className="border-2 border-indigo-500/20 rounded-[2rem] p-12 bg-white/60 flex flex-col items-center justify-center gap-4">
                                            <Loader2 className="animate-spin text-indigo-600" size={32} />
                                            <div className="w-full max-w-xs space-y-2">
                                                <div className="flex justify-between text-[10px] font-bold text-indigo-600 uppercase">
                                                    <span>Processing...</span>
                                                    <span>{uploadProgress}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                                    <div
                                                        className="h-full bg-indigo-600 transition-all duration-300"
                                                        style={{ width: `${uploadProgress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : !selectedImage ? (
                                        <div
                                            onClick={() => fileInputRef.current.click()}
                                            className="group cursor-pointer border-2 border-dashed border-gray-200 rounded-[2rem] p-12 bg-white/40 hover:bg-white hover:border-indigo-400 transition-all flex flex-col items-center justify-center gap-4 shadow-sm"
                                        >
                                            <div className="p-4 bg-white rounded-2xl text-gray-300 group-hover:text-indigo-600 transition-all shadow-md">
                                                <Upload size={32} />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-bold text-gray-700">Select Image to Analyze</p>
                                                <p className="text-[10px] text-gray-400 uppercase mt-1">PNG, JPG, WEBP</p>
                                            </div>
                                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                                        </div>
                                    ) : (
                                        <div className="relative rounded-[2rem] overflow-hidden aspect-video border-2 border-white shadow-xl group">
                                            <img src={selectedImage} alt="Uploaded" className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => setSelectedImage(null)}
                                                className="absolute top-4 right-4 p-2 bg-black/60 text-white rounded-full backdrop-blur-md hover:bg-red-500 transition-all"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Platforms Grid */}
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
                                                className={`group flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${platform === p.name
                                                    ? 'border-indigo-600 bg-white shadow-xl text-indigo-600'
                                                    : 'border-transparent bg-white/40 text-gray-400'
                                                    }`}
                                            >
                                                {p.icon}
                                                <span className="text-[10px] font-bold">{p.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Tone Grid */}
                                <div className="mb-10">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Select Tone</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['Professional', 'Witty', 'Promotional', 'Minimalist'].map((t) => (
                                            <button
                                                key={t}
                                                onClick={() => setTone(t)}
                                                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${tone === t
                                                    ? 'bg-indigo-600 text-white shadow-lg'
                                                    : 'bg-white/60 text-gray-500 hover:bg-white border border-white/40'
                                                    }`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    className="group relative w-full overflow-hidden bg-gray-900 text-white py-5 rounded-3xl font-black text-sm tracking-widest uppercase transition-all hover:bg-black active:scale-95 disabled:opacity-50"
                                    disabled={!selectedImage || loading}
                                    onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
                                >
                                    <div className="relative z-10 flex items-center justify-center gap-3">
                                        {loading ? "Analyzing..." : <><Sparkles size={20} className="text-indigo-400" /> Magic Generate</>}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: FLOATING PREVIEW */}
                    <div className="lg:col-span-5 sticky top-28 hidden lg:block">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-indigo-500/20 blur-[80px] rounded-full group-hover:bg-purple-500/20 transition-all duration-700" />
                            <div className="relative bg-white rounded-[3.5rem] border-[10px] border-gray-900 shadow-2xl p-7 aspect-[9/18.5] max-w-[320px] mx-auto overflow-hidden">
                                <div className="h-full pt-4">
                                    {renderMobilePreview()}
                                </div>
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

export default ImageCaption;