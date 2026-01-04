import React, { useState } from 'react';
import {
    Copy, RefreshCw, Heart, Eye, Type,
    Instagram, Twitter, Linkedin, Facebook,
    MoreHorizontal, Share2, MessageCircle
} from 'lucide-react';

const GeneratedCaptionCard = ({ caption, platform, image }) => {
    const [isPreview, setIsPreview] = useState(false);

    // Platform Mockup Logic
    const renderMockup = () => {
        const commonProfile = (
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-slate-200" />
                <span className="text-xs font-bold text-slate-800">Your_Profile</span>
            </div>
        );

        switch (platform) {
            case 'instagram':
                return (
                    <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
                        <div className="p-3 flex items-center justify-between">
                            {commonProfile}
                            <MoreHorizontal size={16} />
                        </div>
                        {image && <img src={image} alt="Post" className="w-full aspect-square object-cover" />}
                        <div className="p-3 text-sm">
                            <div className="flex gap-3 mb-2"><Heart size={18} /><MessageCircle size={18} /><Share2 size={18} /></div>
                            <p className="whitespace-pre-wrap"><span className="font-bold mr-2">Your_Profile</span>{caption}</p>
                        </div>
                    </div>
                );
            case 'twitter':
                return (
                    <div className="bg-white border rounded-xl p-4 shadow-sm text-left">
                        <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0" />
                            <div className="flex-1">
                                <div className="flex items-center gap-1"><span className="font-bold text-sm">User</span><span className="text-slate-500 text-xs">@handle</span></div>
                                <p className="text-sm mt-1 whitespace-pre-wrap">{caption}</p>
                                {image && <img src={image} className="mt-3 rounded-xl border w-full max-h-40 object-cover" />}
                            </div>
                        </div>
                    </div>
                );
            default:
                return <p className="whitespace-pre-wrap text-slate-700">{caption}</p>;
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 mb-4 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between mb-4">
                {/* Toggle Button Inside Card */}
                <button
                    onClick={() => setIsPreview(!isPreview)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isPreview ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                >
                    {isPreview ? <><Type size={14} /> View Text</> : <><Eye size={14} /> Live Preview</>}
                </button>

                <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-purple-600 transition-all"><Copy size={18} /></button>
                    <button className="p-2 text-slate-400 hover:text-red-500 transition-all"><Heart size={18} /></button>
                </div>
            </div>

            <div className="relative min-h-[100px]">
                {isPreview ? (
                    <div className="animate-in fade-in zoom-in duration-300">
                        {renderMockup()}
                    </div>
                ) : (
                    <div className="prose max-w-none animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{caption}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GeneratedCaptionCard;