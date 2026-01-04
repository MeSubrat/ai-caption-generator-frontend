import React, { useState } from 'react'
import {
    Camera, Type, Instagram, Facebook, Twitter, Linkedin,
    Sparkles, Copy, RefreshCw, Heart, History, MoreHorizontal,
    MessageCircle, Send, Bookmark, Share2, Globe
} from 'lucide-react';

function LivePreviewMockUp() {
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedPlatform, setSelectedPlatform] = useState('instagram');
    const [generatedCaption, setGeneratedCaption] = useState('');

    const platforms = [
        { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500' },
        { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
        { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'bg-black' },
        { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' }
    ];

    // --- MOCKUP COMPONENTS ---

    const InstagramPreview = () => (
        <div className="bg-white border rounded-sm max-w-[350px] mx-auto shadow-sm">
            <div className="flex items-center p-3 gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px]">
                    <div className="w-full h-full rounded-full bg-white p-[1px]">
                        <div className="w-full h-full rounded-full bg-gray-200" />
                    </div>
                </div>
                <span className="text-xs font-bold text-gray-900">your_studio</span>
                <MoreHorizontal className="ml-auto w-4 h-4 text-gray-500" />
            </div>
            <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" /> : <Camera className="w-10 h-10 text-gray-300" />}
            </div>
            <div className="p-3">
                <div className="flex gap-3 mb-2">
                    <Heart className="w-6 h-6" />
                    <MessageCircle className="w-6 h-6" />
                    <Send className="w-6 h-6" />
                    <Bookmark className="w-6 h-6 ml-auto" />
                </div>
                <p className="text-sm font-bold mb-1">1,234 likes</p>
                <div className="text-sm leading-snug">
                    <span className="font-bold mr-2">your_studio</span>
                    <span className="whitespace-pre-wrap">{generatedCaption || "Your caption will appear here..."}</span>
                </div>
            </div>
        </div>
    );

    const TwitterPreview = () => (
        <div className="bg-white border rounded-2xl max-w-[400px] mx-auto p-4 shadow-sm">
            <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
                <div className="flex-1">
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-gray-900">User Name</span>
                        <span className="text-gray-500 text-sm">@username · 1m</span>
                    </div>
                    <p className="text-[15px] text-gray-900 leading-normal mt-1 whitespace-pre-wrap">
                        {generatedCaption || "What's happening?"}
                    </p>
                    {imagePreview && (
                        <div className="mt-3 rounded-2xl border overflow-hidden max-h-60">
                            <img src={imagePreview} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="flex justify-between mt-4 text-gray-500 max-w-xs">
                        <MessageCircle size={18} />
                        <RefreshCw size={18} />
                        <Heart size={18} />
                        <Share2 size={18} />
                    </div>
                </div>
            </div>
        </div>
    );

    const LinkedInPreview = () => (
        <div className="bg-white border rounded-lg max-w-[450px] mx-auto shadow-sm">
            <div className="p-3 flex items-center gap-2">
                <div className="w-12 h-12 bg-gray-200 rounded-none" />
                <div>
                    <p className="text-sm font-bold text-gray-900">Software Professional</p>
                    <p className="text-xs text-gray-500">Full-stack Developer • 1st</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                        <span>1m •</span> <Globe size={12} />
                    </div>
                </div>
            </div>
            <div className="px-3 pb-3 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                {generatedCaption || "Share your professional update..."}
            </div>
            {imagePreview && (
                <div className="bg-gray-100 border-y">
                    <img src={imagePreview} className="w-full max-h-80 object-cover" />
                </div>
            )}
            <div className="p-2 border-t flex justify-around text-gray-500 font-semibold text-sm">
                <div className="flex items-center gap-1 p-2 hover:bg-gray-100 rounded">Like</div>
                <div className="flex items-center gap-1 p-2 hover:bg-gray-100 rounded">Comment</div>
                <div className="flex items-center gap-1 p-2 hover:bg-gray-100 rounded">Repost</div>
            </div>
        </div>
    );



    return (
        <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-slate-900 rounded-[3rem] p-4 shadow-2xl border-[12px] border-slate-800 w-full max-w-[450px] mx-auto relative">
                {/* iPhone Dynamic Island Mock */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-800 rounded-full z-10" />

                <div className="bg-white rounded-[2rem] overflow-hidden min-h-[600px] flex flex-col">
                    <div className="h-10 w-full flex justify-between px-8 pt-6 pb-4 items-center border-b bg-white">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{selectedPlatform} Preview</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 bg-slate-100/50">
                        {/* DYNAMIC RENDERING BASED ON SELECTION */}
                        {selectedPlatform === 'instagram' && <InstagramPreview />}
                        {selectedPlatform === 'twitter' && <TwitterPreview />}
                        {selectedPlatform === 'linkedin' && <LinkedInPreview />}
                        {selectedPlatform === 'facebook' && <LinkedInPreview />} {/* Reuse LI for demo */}
                    </div>

                    {generatedCaption && (
                        <div className="p-4 bg-white border-t">
                            <button
                                onClick={() => navigator.clipboard.writeText(generatedCaption)}
                                className="w-full py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-bold flex items-center justify-center gap-2 transition-all"
                            >
                                <Copy size={18} /> Copy Final Caption
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LivePreviewMockUp