import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail } from 'lucide-react';

const EmailLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const method = searchParams.get('method') || 'email';
  const [inputValue, setInputValue] = useState('');

  const isEmail = method === 'email';

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Mock sending OTP, redirect to verification page
      navigate(`/auth/verify?method=${method}&val=${encodeURIComponent(inputValue)}`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0c0c0e] px-8 pt-16 pb-10">
      
      {/* Header Logo */}
      <div className="flex justify-center mb-16">
        <h2 className="text-2xl font-bold tracking-tight">
          Dop <span className="text-[#8DC63F]">Z</span>
        </h2>
      </div>

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2">
          {isEmail ? 'Enter your email' : 'Enter your mobile number'}
        </h1>
        <p className="text-slate-400 text-sm">We'll send you a 4-digit OTP</p>
      </div>

      <form onSubmit={handleSendOTP} className="space-y-6 flex-1">
        <div className="relative">
          {isEmail ? (
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                type="email"
                placeholder="Enter your email address"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#8DC63F] transition-colors"
                required
              />
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white flex items-center shrink-0 focus-within:border-[#8DC63F] transition-colors">
                <span className="text-slate-300">+91</span>
              </div>
              <input 
                type="tel"
                placeholder="Enter mobile number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#8DC63F] transition-colors"
                required
              />
            </div>
          )}
        </div>

        <button 
          type="submit"
          className="w-full bg-[#8DC63F] text-black font-bold py-4 rounded-2xl hover:bg-[#7ab32b] transition-colors shadow-[0_0_20px_rgba(141,198,63,0.2)] active:scale-[0.98]"
        >
          Send OTP
        </button>
      </form>

      {/* Or continue with section */}
      <div className="mt-auto pt-8">
        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink-0 mx-4 text-slate-500 text-sm">Or continue with</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>
        
        <div className="flex justify-center gap-6 mt-4">
          <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
            {/* Google Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.89 16.79 15.72 17.57V20.34H19.29C21.37 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
              <path d="M12 23C14.97 23 17.46 22.02 19.29 20.34L15.72 17.57C14.73 18.23 13.47 18.63 12 18.63C9.15 18.63 6.74 16.71 5.88 14.13H2.21V16.98C4.01 20.55 7.7 23 12 23Z" fill="#34A853"/>
              <path d="M5.88 14.13C5.66 13.47 5.53 12.75 5.53 12C5.53 11.25 5.66 10.53 5.88 9.87V7.02H2.21C1.48 8.48 1.05 10.18 1.05 12C1.05 13.82 1.48 15.52 2.21 16.98L5.88 14.13Z" fill="#FBBC05"/>
              <path d="M12 5.38C13.62 5.38 15.06 5.93 16.2 7.02L19.37 3.85C17.45 2.06 14.96 1 12 1C7.7 1 4.01 3.45 2.21 7.02L5.88 9.87C6.74 7.29 9.15 5.38 12 5.38Z" fill="#EA4335"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailLogin;
