import React, { useState } from 'react';
import { Camera, Type, Instagram, Facebook, Twitter, Linkedin, Sparkles, Copy, RefreshCw, Heart, History } from 'lucide-react';
import LoginCard from './LoginCard';
import MessagePopup from './MessagePopup';

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
        const localPreview = URL.createObjectURL(file);
        setImagePreview(localPreview);
        setImage(file);

        const formData = new FormData();
        formData.append("image", file);
        if (file) {
            const res = await fetch(`${API_URL}/upload-image`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            console.log("Cloudinary URL:", data.imageUrl);
            setUploadedImageUrl(data.imageUrl);
        }
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        // Simulate API call - Replace this with your actual API integration
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
                const result = await fetch(`${API_URL}/generate-response`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        scenario,
                        platform: selectedPlatform,
                        generateHashtags,
                        includeEmojis,
                        tone,
                        captionLength,
                        imageUrl: uploadedImageUrl
                    }),
                });
                const generatedResponse = await result.json();
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
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
            <MessagePopup
                message={popup.message}
                type={popup.type}
                visible={popup.visible}
                onClose={() => setPopup({ ...popup, visible: false })}
            />
            <div className="max-w-6xl mx-auto">
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
    );
};

export default AICaptionGenerator;