import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Sparkles, User, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MessagePopup from './MessagePopup';

const SignupScreen = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [popup, setPopup] = useState({
        visible: false,
        message: "",
        type: "",
    });

    const showPopup = (msg, type = "success") => {
        setPopup({
            visible: true,
            message: msg,
            type: type,
        });
    };

    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        return { minLength, hasUpperCase, hasLowerCase, hasNumber };
    };

    const passwordValidation = validatePassword(formData.password);
    const isPasswordValid = Object.values(passwordValidation).every(Boolean);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Validation
        if (formData.password !== formData.confirmPassword) {
            showPopup('Passwords do not match', 'error');
            setIsLoading(false);
            return;
        }

        if (!isPasswordValid) {
            showPopup('Password does not meet requirements', 'error');
            setIsLoading(false);
            return;
        }

        // TODO: Replace with actual API call
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // For demo purposes, accept any valid data
            if (formData.name && formData.email && formData.password) {
                showPopup('Account created successfully!', 'success');
                setTimeout(() => {
                    setIsAuthenticated(true);
                }, 1000);
            } else {
                showPopup('Please fill in all fields', 'error');
            }
        } catch (error) {
            showPopup('Signup failed. Please try again.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialSignup = (provider) => {
        showPopup(`${provider} signup coming soon!`, 'info');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
            <MessagePopup
                message={popup.message}
                type={popup.type}
                visible={popup.visible}
                onClose={() => setPopup({ ...popup, visible: false })}
            />
            
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-12 h-12 text-purple-600 animate-pulse" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        Get Started
                    </h1>
                    <p className="text-gray-600 text-lg">Create your account and start generating amazing captions</p>
                </div>

                {/* Signup Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="John Doe"
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="you@example.com"
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:ring-2 outline-none transition-all ${
                                        formData.password 
                                            ? (isPasswordValid 
                                                ? 'border-green-300 focus:border-green-500 focus:ring-green-200' 
                                                : 'border-red-300 focus:border-red-500 focus:ring-red-200')
                                            : 'border-gray-200 focus:border-purple-500 focus:ring-purple-200'
                                    }`}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            
                            {/* Password Requirements */}
                            {formData.password && (
                                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                                    <p className="text-xs font-semibold text-gray-700 mb-2">Password must contain:</p>
                                    <div className="space-y-1">
                                        <div className={`flex items-center gap-2 text-xs ${passwordValidation.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                                            <Check className={`w-3 h-3 ${passwordValidation.minLength ? 'text-green-600' : 'text-gray-400'}`} />
                                            At least 8 characters
                                        </div>
                                        <div className={`flex items-center gap-2 text-xs ${passwordValidation.hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
                                            <Check className={`w-3 h-3 ${passwordValidation.hasUpperCase ? 'text-green-600' : 'text-gray-400'}`} />
                                            One uppercase letter
                                        </div>
                                        <div className={`flex items-center gap-2 text-xs ${passwordValidation.hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
                                            <Check className={`w-3 h-3 ${passwordValidation.hasLowerCase ? 'text-green-600' : 'text-gray-400'}`} />
                                            One lowercase letter
                                        </div>
                                        <div className={`flex items-center gap-2 text-xs ${passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                                            <Check className={`w-3 h-3 ${passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-400'}`} />
                                            One number
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    placeholder="••••••••"
                                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:ring-2 outline-none transition-all ${
                                        formData.confirmPassword 
                                            ? (formData.password === formData.confirmPassword 
                                                ? 'border-green-300 focus:border-green-500 focus:ring-green-200' 
                                                : 'border-red-300 focus:border-red-500 focus:ring-red-200')
                                            : 'border-gray-200 focus:border-purple-500 focus:ring-purple-200'
                                    }`}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
                            )}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start gap-2 text-sm">
                            <input 
                                type="checkbox" 
                                className="mt-1 w-4 h-4 text-purple-600 rounded focus:ring-purple-500 focus:ring-2" 
                                required
                            />
                            <label className="text-gray-600">
                                I agree to the{' '}
                                <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !isPasswordValid}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Creating account...</span>
                                </>
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Social Signup Divider */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">Or sign up with</span>
                            </div>
                        </div>

                        {/* Social Signup Buttons */}
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button 
                                onClick={() => handleSocialSignup('Google')}
                                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all font-medium text-gray-700"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google
                            </button>
                            <button 
                                onClick={() => handleSocialSignup('Facebook')}
                                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all font-medium text-gray-700"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                Facebook
                            </button>
                        </div>
                    </div>
                </div>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignupScreen;

