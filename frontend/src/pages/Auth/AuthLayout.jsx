import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AuthLayout = ({ showBackButton = true }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-bg text-white flex justify-center items-center font-sans">
      <div className="w-full max-w-md h-screen sm:h-[850px] sm:rounded-[40px] sm:border-[8px] sm:border-slate-800 bg-[#0c0c0e] relative overflow-hidden flex flex-col shadow-2xl">
        
        {/* Optional Header with Back Button */}
        {showBackButton && (
          <div className="absolute top-0 left-0 w-full p-6 z-10">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md"
            >
              <ArrowLeft size={20} className="text-white" />
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto hide-scrollbar relative z-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
