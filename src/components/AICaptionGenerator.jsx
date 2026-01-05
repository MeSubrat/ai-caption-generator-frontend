import React, { useState } from 'react';
import { Camera, Type, Instagram, Facebook, Twitter, Linkedin, Sparkles, Copy, RefreshCw, Heart, History } from 'lucide-react';
import LoginCard from './LoginCard';
import MessagePopup from './MessagePopup';
import axios from 'axios';
import Navbar from './Navbar';

const AICaptionGenerator = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [scenario, setScenario] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedPlatform, setSelectedPlatform] = useState('instagram');
    const [generateHashtags, setGenerateHashtags] = useState(true);
    const [includeEmojis, setIncludeEmojis] = useState(true);
    const [tone, setTone] = useState('casual');
    const [captionLength, setCaptionLength] = useState('medium');
    const [generatedCaption, setGeneratedCaption] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [popup, setPopup] = useState({
        visible: false,
        message: "",
        type: "",
    });
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);


    // const showPopup = (msg, type = "success") => {
    //     setPopup({
    //         visible: true,
    //         message: msg,
    //         type: type,
    //     });
    // };

    const platforms = [
        { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500' },
        { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
        { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: 'bg-sky-500' },
        { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' }
    ];

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // ✅ Instant local preview
        const localPreview = URL.createObjectURL(file);
        setImagePreview(localPreview);
        setImage(file);

        setUploadProgress(0);
        setUploadSuccess(false);
        setIsUploading(true);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await axios.post(`${API_URL}/upload-image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentCompleted);
                },
            });

            console.log("✅ Cloudinary URL:", res.data.imageUrl);
            setUploadedImageUrl(res.data.imageUrl);
            setUploadSuccess(true);
        } catch (error) {
            console.error("❌ Upload failed:", error);
            alert("Image upload failed!");
            setImage(null);
            setImagePreview(null);
            setUploadProgress(0);
        } finally {
            setIsUploading(false);
        }
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        if (!scenario.trim()) {
            setPopup({
                visible: true,
                message: "Add some scenario to generate caption.",
                type: "error",
            })
            setIsGenerating(false);
            return
        }
        else {
            try {
                const result = await axios.post(
                    `${API_URL}/generate-response`,
                    {
                        scenario,
                        platform: selectedPlatform,
                        generateHashtags,
                        includeEmojis,
                        tone,
                        captionLength,
                        imageUrl: uploadedImageUrl
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const generatedResponse = await result.data;
                setTimeout(() => {
                    // setGeneratedCaption(`✨ Living my best life! Captured this amazing moment that I'll cherish forever. Life is all about creating memories and embracing every adventure. 🌟\n\n#LivingMyBestLife #Adventure #Memories #GoodVibes #InstaDaily`);
                    setGeneratedCaption(`${generatedResponse.response.caption} ${generatedResponse.response.hashtags}`);
                    setPopup({
                        visible: true,
                        message: "Caption Generated successfully!!",
                        type: "success",
                    })
                    setIsGenerating(false);
                }, 2000);
            } catch (error) {
                console.log('Error: ', error);
            }
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCaption);
        alert('Caption copied to clipboard!');
    };
    // if (!isAuthenticated) {
    //     return <LoginCard setIsAuthenticated={setIsAuthenticated} />
    // }

    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
            <MessagePopup
                message={popup.message}
                type={popup.type}
                visible={popup.visible}
                onClose={() => setPopup({ ...popup, visible: false })}
            />
            <div className="max-w-6xl mx-auto mt-3.5">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-10 h-10 text-purple-600" />
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            AI Caption Generator
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg">Create engaging captions for your social media posts</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Panel - Input Section */}
                    <div className="space-y-6">
                        {/* Scenario Input */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                                <Type className="w-5 h-5" />
                                Describe Your Scenario
                            </label>
                            <textarea
                                value={scenario}
                                onChange={(e) => setScenario(e.target.value)}
                                placeholder="E.g., A beautiful sunset at the beach with friends, celebrating a birthday party, new product launch..."
                                className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none resize-none transition-all"
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                                <Camera className="w-5 h-5" />
                                Upload Image (Optional)
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-500 transition-all cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label htmlFor="image-upload" className="cursor-pointer">
                                    {imagePreview ? (
                                        <div className="relative">
                                            <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setImage(null);
                                                    setImagePreview(null);
                                                    setUploadedImageUrl(null);
                                                    setUploadProgress(0);
                                                    setUploadSuccess(false);
                                                }}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <Camera className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                                            <p className="text-gray-600">Click to upload an image</p>
                                            <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                                        </div>
                                    )}
                                </label>
                            </div>

                            {/* ✅ Uploading Text */}
                            {isUploading && (
                                <p className="text-sm text-blue-600 mt-3 font-medium">
                                    Uploading image... {uploadProgress}%
                                </p>
                            )}

                            {/* ✅ Progress Bar */}
                            {uploadProgress > 0 && (
                                <div className="w-full bg-gray-200 rounded-full h-3 mt-2 overflow-hidden">
                                    <div
                                        className="h-full transition-all duration-300 bg-purple-600"
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                            )}

                            {/* ✅ Success Message */}
                            {uploadSuccess && (
                                <p className="text-green-600 font-semibold mt-2 text-sm">
                                    ✅ Image uploaded successfully!
                                </p>
                            )}

                        </div>

                        {/* Platform Selection */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <label className="text-lg font-semibold text-gray-800 mb-4 block">
                                Select Platform
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {platforms.map((platform) => {
                                    const Icon = platform.icon;
                                    return (
                                        <button
                                            key={platform.id}
                                            onClick={() => setSelectedPlatform(platform.id)}
                                            className={`p-4 rounded-xl border-2 transition-all ${selectedPlatform === platform.id
                                                ? 'border-purple-500 bg-purple-50 shadow-md'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className={`w-10 h-10 ${platform.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <p className="text-sm font-medium text-gray-800">{platform.name}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Options */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <label className="text-lg font-semibold text-gray-800 mb-4 block">
                                Customization Options
                            </label>

                            {/* Toggle Switches */}
                            <div className="space-y-4 mb-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">Generate Hashtags</span>
                                    <button
                                        onClick={() => setGenerateHashtags(!generateHashtags)}
                                        className={`w-14 h-7 rounded-full transition-all ${generateHashtags ? 'bg-purple-600' : 'bg-gray-300'
                                            }`}
                                    >
                                        <div
                                            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${generateHashtags ? 'translate-x-8' : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">Include Emojis</span>
                                    <button
                                        onClick={() => setIncludeEmojis(!includeEmojis)}
                                        className={`w-14 h-7 rounded-full transition-all ${includeEmojis ? 'bg-purple-600' : 'bg-gray-300'
                                            }`}
                                    >
                                        <div
                                            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${includeEmojis ? 'translate-x-8' : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Tone Selection */}
                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Tone</label>
                                <select
                                    value={tone}
                                    onChange={(e) => setTone(e.target.value)}
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                                >
                                    <option value="casual">Casual</option>
                                    <option value="professional">Professional</option>
                                    <option value="funny">Funny</option>
                                    <option value="inspirational">Inspirational</option>
                                </select>
                            </div>

                            {/* Caption Length */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Caption Length</label>
                                <select
                                    value={captionLength}
                                    onChange={(e) => setCaptionLength(e.target.value)}
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                                >
                                    <option value="short">Short</option>
                                    <option value="medium">Medium</option>
                                    <option value="long">Long</option>
                                </select>
                            </div>
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? (
                                <span className="flex items-center justify-center gap-2">
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    Generating...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <Sparkles className="w-5 h-5" />
                                    Generate Caption
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Right Panel - Output Section */}
                    <div className="space-y-6">
                        {/* Generated Caption */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[400px]">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">Generated Caption</h2>
                                {generatedCaption && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleCopy}
                                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                                            title="Copy to clipboard"
                                        >
                                            <Copy className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={handleGenerate}
                                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                                            title="Regenerate"
                                        >
                                            <RefreshCw className="w-5 h-5" />
                                        </button>
                                        <button
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            title="Save to favorites"
                                        >
                                            <Heart className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {generatedCaption ? (
                                <div className="prose max-w-none">
                                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{generatedCaption}</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                                    <Sparkles className="w-16 h-16 mb-4" />
                                    <p className="text-center">Your AI-generated caption will appear here</p>
                                    <p className="text-sm text-center mt-2">Fill in the details and click "Generate Caption"</p>
                                </div>
                            )}
                        </div>

                        {/* Quick Tips */}
                        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-purple-900 mb-3">💡 Quick Tips</h3>
                            <ul className="space-y-2 text-sm text-purple-800">
                                <li>• Be specific about your scenario for better results</li>
                                <li>• Upload an image for context-aware captions</li>
                                <li>• Different platforms work best with different tones</li>
                                <li>• Use hashtags strategically for more reach</li>
                                <li>• Save your favorite captions for later use</li>
                            </ul>
                        </div>

                        {/* Stats/History Preview */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <History className="w-5 h-5 text-gray-600" />
                                <h3 className="text-lg font-semibold text-gray-800">Recent History</h3>
                            </div>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all">
                                    Instagram - Beach sunset caption
                                </p>
                                <p className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all">
                                    LinkedIn - Product launch post
                                </p>
                                <p className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all">
                                    Twitter - Daily motivation quote
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default AICaptionGenerator;



// GEMINI SUGGESTION

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Camera, Type, Instagram, Facebook, Twitter, Linkedin, 
//   Sparkles, Copy, RefreshCw, Heart, History, X, Send 
// } from 'lucide-react';
// import MessagePopup from './MessagePopup';
// import axios from 'axios';
// import GeneratedCaptionCard from './GeneratedCaptionCard';

// const AICaptionGenerator = () => {
//     // ... (Keep your existing state logic)
//     const [scenario, setScenario] = useState('');
//     const [imagePreview, setImagePreview] = useState(null);
//     const [selectedPlatform, setSelectedPlatform] = useState('instagram');
//     const [tone, setTone] = useState('casual');
//     const [generatedCaption, setGeneratedCaption] = useState('');
//     const [isGenerating, setIsGenerating] = useState(false);
//     const [popup, setPopup] = useState({ visible: false, message: "", type: "" });
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [generatedCaptions, setGeneratedCaptions] = useState([
//         "✨ Ready to launch into the weekend! #Vibes",
//         "The secret to progress is getting started. 🚀 #Motivation"
//     ]);

//     const platforms = [
//         { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-purple-500 to-pink-500', handle: '@your_profile' },
//         { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-400', handle: 'User Name' },
//         { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'from-sky-400 to-blue-500', handle: '@user_handle' },
//         { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'from-blue-700 to-blue-800', handle: 'Professional User' }
//     ];

//     const currentPlatform = platforms.find(p => p.id === selectedPlatform);

//     // ✅ Animation Variants
//     const containerVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
//     };

//     return (
//         <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-100 to-pink-100 p-4 md:p-10 font-sans text-slate-900">
//             <MessagePopup {...popup} onClose={() => setPopup({ ...popup, visible: false })} />
            
//             <div className="max-w-7xl mx-auto">
//                 {/* Header Section */}
//                 <motion.header 
//                     initial={{ opacity: 0, sscale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="text-center mb-12"
//                 >
//                     <div className="inline-flex items-center gap-3 bg-white/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/50 shadow-sm mb-6">
//                         <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
//                         <span className="text-sm font-bold tracking-widest uppercase text-purple-800">Powered by Gemini AI</span>
//                     </div>
//                     <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent pb-2">
//                         Caption Studio
//                     </h1>
//                 </motion.header>

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
//                     {/* Left: Input Console (Span 5) */}
//                     <motion.div 
//                         variants={containerVariants}
//                         initial="hidden"
//                         animate="visible"
//                         className="lg:col-span-5 space-y-6"
//                     >
//                         <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-2xl shadow-purple-200/50">
//                             <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
//                                 <Type className="w-5 h-5 text-purple-600" /> Content Brief
//                             </h3>
                            
//                             {/* Textarea Area */}
//                             <div className="relative group">
//                                 <textarea
//                                     value={scenario}
//                                     onChange={(e) => setScenario(e.target.value)}
//                                     placeholder="What's happening in this post?"
//                                     className="w-full h-40 bg-white/50 border-2 border-slate-100 rounded-2xl p-5 focus:border-purple-400 focus:ring-0 outline-none transition-all resize-none text-lg"
//                                 />
//                                 <div className="absolute bottom-4 right-4 text-xs text-slate-400 font-medium">
//                                     {scenario.length} characters
//                                 </div>
//                             </div>

//                             {/* Image Dropzone */}
//                             <div className="mt-6">
//                                 <input type="file" id="img-up" hidden onChange={(e) => {/* your upload logic */}} />
//                                 <label htmlFor="img-up" className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-6 hover:bg-white/80 hover:border-purple-300 transition-all cursor-pointer group">
//                                     {imagePreview ? (
//                                         <div className="relative w-full h-32">
//                                             <img src={imagePreview} className="w-full h-full object-cover rounded-xl" alt="Preview" />
//                                             <button className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"><X size={14}/></button>
//                                         </div>
//                                     ) : (
//                                         <>
//                                             <Camera className="w-8 h-8 text-slate-300 group-hover:text-purple-500 transition-colors mb-2" />
//                                             <span className="text-sm font-medium text-slate-500">Visual context (Optional)</span>
//                                         </>
//                                     )}
//                                 </label>
//                             </div>
//                         </div>

//                         {/* Platform Pilles */}
//                         <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-white/60 shadow-xl">
//                             <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
//                                 {platforms.map((p) => (
//                                     <button
//                                         key={p.id}
//                                         onClick={() => setSelectedPlatform(p.id)}
//                                         className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl font-bold transition-all ${
//                                             selectedPlatform === p.id 
//                                             ? 'bg-slate-900 text-white shadow-lg scale-105' 
//                                             : 'bg-white text-slate-600 hover:bg-slate-50'
//                                         }`}
//                                     >
//                                         <p.icon size={18} /> {p.name}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>

//                         <button
//                             onClick={() => {/* handleGenerate */}}
//                             disabled={isGenerating}
//                             className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-5 rounded-2xl font-black text-xl shadow-2xl shadow-indigo-200 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50"
//                         >
//                             {isGenerating ? "CRAFTING MAGIC..." : "GENERATE CAPTION"}
//                         </button>
//                     </motion.div>

//                     {/* Right: The Live Preview (Span 7) */}
//                     <motion.div 
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         className="lg:col-span-7"
//                     >
//                         <div className="space-y-4">
//                     <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
//                         <Sparkles className="text-purple-600" /> 
//                         Generated Suggestions
//                     </h2>
                    
//                     {generatedCaptions.length > 0 ? (
//                         generatedCaptions.map((cap, index) => (
//                             <GeneratedCaptionCard 
//                                 key={index} 
//                                 caption={cap} 
//                                 platform={selectedPlatform} 
//                                 image={imagePreview} 
//                             />
//                         ))
//                     ) : (
//                         /* Empty State */
//                         <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
//                             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
//                                 <Sparkles size={32} />
//                             </div>
//                             <p className="text-slate-400">Your AI suggestions will appear here.</p>
//                         </div>
//                     )}
//                     </div> 
//                     </motion.div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AICaptionGenerator;


// import React, { useState } from 'react';
// import { 
//   Camera, Type, Instagram, Facebook, Twitter, Linkedin, 
//   Sparkles, Copy, RefreshCw, Heart, History, MoreHorizontal, 
//   MessageCircle, Send, Bookmark, Share2, Globe 
// } from 'lucide-react';
// import MessagePopup from './MessagePopup';
// import axios from 'axios';

// const AICaptionGenerator = () => {
//     // ... (Keep all your existing state from the original code)
//     const [scenario, setScenario] = useState('');
//     const [imagePreview, setImagePreview] = useState(null);
//     const [selectedPlatform, setSelectedPlatform] = useState('instagram');
//     const [generatedCaption, setGeneratedCaption] = useState('');
//     const [isGenerating, setIsGenerating] = useState(false);
//     const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
//     const [popup, setPopup] = useState({ visible: false, message: "", type: "" });

//     // Mock Platforms Data
    

//     return (
//         <div className="min-h-screen bg-slate-50 p-4 md:p-8">
//             <div className="max-w-7xl mx-auto">
//                 {/* Header */}
//                 <header className="mb-10 text-center">
//                     <h1 className="text-4xl font-black text-slate-900 mb-2">Social Studio <span className="text-purple-600">AI</span></h1>
//                     <p className="text-slate-500">Draft, generate, and preview your posts in one place.</p>
//                 </header>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//                     {/* Left Panel - Control Center */}
//                     <div className="space-y-6">
//                         <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
//                             <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Describe your post</label>
//                             <textarea
//                                 value={scenario}
//                                 onChange={(e) => setScenario(e.target.value)}
//                                 className="w-full h-32 p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
//                                 placeholder="E.g. A team celebrating a new project launch..."
//                             />
                            
//                             <div className="mt-6">
//                                 <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Select Platform</label>
//                                 <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
//                                     {platforms.map((p) => (
//                                         <button
//                                             key={p.id}
//                                             onClick={() => setSelectedPlatform(p.id)}
//                                             className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold transition-all ${
//                                                 selectedPlatform === p.id 
//                                                 ? 'bg-slate-900 text-white shadow-lg' 
//                                                 : 'bg-white border text-slate-600 hover:border-slate-400'
//                                             }`}
//                                         >
//                                             <p.icon size={18} /> {p.name}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>

//                             <button
//                                 onClick={() => {/* Your handleGenerate Logic */}}
//                                 disabled={isGenerating}
//                                 className="w-full mt-8 bg-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-purple-700 transition-all flex items-center justify-center gap-2"
//                             >
//                                 {isGenerating ? <RefreshCw className="animate-spin" /> : <Sparkles />}
//                                 Generate for {selectedPlatform}
//                             </button>
//                         </div>
//                     </div>

//                     {/* Right Panel - Live Preview Engine */}
                    
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AICaptionGenerator;