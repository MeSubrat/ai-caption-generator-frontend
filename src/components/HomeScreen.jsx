import React from 'react';
import { Sparkles, ArrowRight, Zap, Image, Globe, TrendingUp, Users, Star, Instagram, Facebook, Twitter, Linkedin, Wand2, Clock, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: Wand2,
            title: 'AI-Powered Magic',
            description: 'Generate captivating captions in seconds using advanced AI technology',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: Image,
            title: 'Image Analysis',
            description: 'Upload images and get context-aware captions that perfectly match your content',
            color: 'from-pink-500 to-orange-500'
        },
        {
            icon: Globe,
            title: 'Multi-Platform',
            description: 'Optimized captions for Instagram, Facebook, Twitter, LinkedIn, and more',
            color: 'from-indigo-500 to-purple-500'
        },
        {
            icon: TrendingUp,
            title: 'Boost Engagement',
            description: 'Increase likes, comments, and shares with perfectly crafted social media captions',
            color: 'from-purple-500 to-indigo-500'
        },
        {
            icon: Clock,
            title: 'Save Time',
            description: 'Stop spending hours writing captions. Get professional results in seconds',
            color: 'from-pink-500 to-purple-500'
        },
        {
            icon: Target,
            title: 'Customizable',
            description: 'Choose tone, length, hashtags, and emojis to match your brand voice',
            color: 'from-indigo-500 to-pink-500'
        }
    ];

    const platforms = [
        { icon: Instagram, name: 'Instagram', color: 'from-purple-600 via-pink-600 to-orange-500' },
        { icon: Facebook, name: 'Facebook', color: 'bg-blue-600' },
        { icon: Twitter, name: 'Twitter/X', color: 'bg-sky-500' },
        { icon: Linkedin, name: 'LinkedIn', color: 'bg-blue-700' }
    ];

    const stats = [
        { number: '10K+', label: 'Captions Generated' },
        { number: '5K+', label: 'Happy Users' },
        { number: '99%', label: 'Satisfaction Rate' },
        { number: '24/7', label: 'Available' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            {/* Navigation */}
            <nav className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-8 h-8 text-purple-600" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            AI Caption Generator
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/login')}
                            className="px-4 py-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => navigate('/signup')}
                            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-16 md:py-24">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Sparkles className="w-16 h-16 text-purple-600 animate-pulse" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                            Create Captions That
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Captivate & Convert
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                        Transform your social media presence with AI-powered captions that engage, inspire, and drive results. 
                        Perfect for every platform, every time.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => navigate('/signup')}
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2"
                        >
                            Start Creating Free
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="px-8 py-4 bg-white text-purple-600 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all border-2 border-purple-200"
                        >
                            Watch Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-all"
                        >
                            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                {stat.number}
                            </div>
                            <div className="text-sm md:text-base text-gray-600 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Why Choose Us?
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Everything you need to create stunning social media captions that stand out
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition-all"
                            >
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Platform Support */}
            <section className="container mx-auto px-4 py-16">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Works Everywhere
                            </span>
                        </h2>
                        <p className="text-xl text-gray-700">
                            Optimized captions for all your favorite platforms
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                        {platforms.map((platform, index) => {
                            const Icon = platform.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-110 transition-all"
                                >
                                    <div className={`w-16 h-16 rounded-xl ${platform.color.includes('bg-') ? platform.color : `bg-gradient-to-br ${platform.color}`} flex items-center justify-center mx-auto mb-3`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="font-semibold text-gray-800">{platform.name}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            How It Works
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600">
                        Three simple steps to perfect captions
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold shadow-lg">
                            1
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">Describe Your Content</h3>
                        <p className="text-gray-600">
                            Tell us about your post or upload an image. Our AI understands context and creates relevant captions.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-600 to-orange-500 flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold shadow-lg">
                            2
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">Customize Your Style</h3>
                        <p className="text-gray-600">
                            Choose your platform, tone, length, and preferences. Add hashtags and emojis to match your brand.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold shadow-lg">
                            3
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">Copy & Share</h3>
                        <p className="text-gray-600">
                            Get your perfect caption instantly. Copy it and share it on your social media platforms.
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Loved by Creators
                        </span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {[
                        {
                            name: 'Sarah Johnson',
                            role: 'Content Creator',
                            text: 'This tool has completely transformed my social media game. My engagement has doubled!',
                            rating: 5
                        },
                        {
                            name: 'Mike Chen',
                            role: 'Marketing Manager',
                            text: 'Saves me hours every week. The AI really understands our brand voice and creates perfect captions.',
                            rating: 5
                        },
                        {
                            name: 'Emma Davis',
                            role: 'Influencer',
                            text: 'The best caption generator I\'ve used. It\'s like having a professional copywriter on demand.',
                            rating: 5
                        }
                    ].map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition-all"
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                            <div>
                                <div className="font-semibold text-gray-800">{testimonial.name}</div>
                                <div className="text-sm text-gray-500">{testimonial.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-8 md:p-12 text-center text-white">
                    <Sparkles className="w-16 h-16 mx-auto mb-6 animate-pulse" />
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Ready to Transform Your Social Media?
                    </h2>
                    <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                        Join thousands of creators and marketers who are already creating amazing captions with AI
                    </p>
                    <button
                        onClick={() => navigate('/signup')}
                        className="px-8 py-4 bg-white text-purple-600 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 mx-auto"
                    >
                        Get Started Free
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="container mx-auto px-4 py-8 border-t border-gray-200">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <Sparkles className="w-6 h-6 text-purple-600" />
                        <span className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            AI Caption Generator
                        </span>
                    </div>
                    <div className="text-gray-600 text-sm">
                        © 2026 AI Caption Generator. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomeScreen;

