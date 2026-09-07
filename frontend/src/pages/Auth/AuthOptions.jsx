import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';

const AuthOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#0c0c0e] px-8 pt-16 pb-10">
      
      {/* Header Logo */}
      <div className="flex justify-center mb-16">
        <h2 className="text-2xl font-bold tracking-tight">
          Dop <span className="text-[#8DC63F]">Z</span>
        </h2>
      </div>

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2">Let's get you in</h1>
        <p className="text-slate-400">Choose a method to continue</p>
      </div>

      <div className="space-y-4 flex-1">
        <button 
          onClick={() => navigate('/auth/login?method=email')}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <Mail size={22} className="text-slate-300" />
            <span className="font-semibold">Continue with Email</span>
          </div>
          <ArrowRight size={18} className="text-slate-500 group-hover:text-white transition-colors" />
        </button>

        <button 
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
        >
          <div className="flex items-center gap-4">
            {/* Simple Google SVG */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.89 16.79 15.72 17.57V20.34H19.29C21.37 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
              <path d="M12 23C14.97 23 17.46 22.02 19.29 20.34L15.72 17.57C14.73 18.23 13.47 18.63 12 18.63C9.15 18.63 6.74 16.71 5.88 14.13H2.21V16.98C4.01 20.55 7.7 23 12 23Z" fill="#34A853"/>
              <path d="M5.88 14.13C5.66 13.47 5.53 12.75 5.53 12C5.53 11.25 5.66 10.53 5.88 9.87V7.02H2.21C1.48 8.48 1.05 10.18 1.05 12C1.05 13.82 1.48 15.52 2.21 16.98L5.88 14.13Z" fill="#FBBC05"/>
              <path d="M12 5.38C13.62 5.38 15.06 5.93 16.2 7.02L19.37 3.85C17.45 2.06 14.96 1 12 1C7.7 1 4.01 3.45 2.21 7.02L5.88 9.87C6.74 7.29 9.15 5.38 12 5.38Z" fill="#EA4335"/>
            </svg>
            <span className="font-semibold">Continue with Google</span>
          </div>
          <ArrowRight size={18} className="text-slate-500 group-hover:text-white transition-colors" />
        </button>


      </div>

      <div className="text-center mt-auto">
        <p className="text-xs text-slate-500 leading-relaxed px-4">
          By continuing, you agree to our <br />
          <a href="#" className="text-white hover:underline">Terms of Service</a> and <a href="#" className="text-white hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default AuthOptions;
