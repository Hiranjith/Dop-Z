import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link2, TrendingUp, CheckCircle2 } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#0a0f12] to-[#05080a]">
      {/* Background Image Placeholder */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05080a]/80 to-[#05080a]"></div>
        
        {/* Skip button area (from design) */}
        <div className="absolute top-6 right-6 z-20">
          <button 
            onClick={() => navigate('/auth/options')}
            className="text-slate-400 text-sm font-medium hover:text-white transition-colors"
          >
            Skip
          </button>
        </div>
      </div>

      <div className="px-8 pb-10 pt-4 relative z-10 flex flex-col justify-end">
        <h1 className="text-4xl font-bold leading-tight mb-8">
          A stronger<br />
          <span className="text-[#8DC63F]">you is a habit</span><br />
          away.
        </h1>

        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[#8DC63F]/30 bg-[#8DC63F]/10">
              <Link2 size={20} className="text-[#8DC63F]" />
            </div>
            <div>
              <p className="font-semibold text-white">Track</p>
              <p className="text-sm text-slate-400">your workouts</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[#8DC63F]/30 bg-[#8DC63F]/10">
              <TrendingUp size={20} className="text-[#8DC63F]" />
            </div>
            <div>
              <p className="font-semibold text-white">Improve</p>
              <p className="text-sm text-slate-400">with insights</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[#8DC63F]/30 bg-[#8DC63F]/10">
              <CheckCircle2 size={20} className="text-[#8DC63F]" />
            </div>
            <div>
              <p className="font-semibold text-white">Stay consistent</p>
              <p className="text-sm text-slate-400">and see results</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/auth/options')}
          className="w-full bg-[#8DC63F] text-black font-bold py-4 rounded-2xl hover:bg-[#7ab32b] transition-colors shadow-[0_0_20px_rgba(141,198,63,0.3)] active:scale-[0.98]"
        >
          Get Started
        </button>
        
        {/* Indicator dots */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-2 h-2 rounded-full bg-slate-600"></div>
          <div className="w-6 h-2 rounded-full bg-[#8DC63F]"></div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
