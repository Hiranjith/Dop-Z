import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const Success = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger animations after a short delay
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#0c0c0e] px-8 pt-10 pb-10 relative overflow-hidden">
      
      {/* Confetti Background elements */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${-10 + Math.random() * 20}%`,
                backgroundColor: ['#8DC63F', '#ffffff', '#4ade80'][Math.floor(Math.random() * 3)],
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            ></div>
          ))}
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-center">
        
        {/* Animated Check Icon */}
        <div className={`w-32 h-32 rounded-full border-4 border-[#8DC63F] flex items-center justify-center mb-8 relative ${showConfetti ? 'animate-check-pop animate-circle-pulse' : 'opacity-0 scale-50'}`}>
          <Check size={64} className="text-[#8DC63F]" strokeWidth={3} />
        </div>

        <h1 className="text-3xl font-bold mb-4">You're all set!</h1>
        <p className="text-slate-400 text-lg max-w-[250px]">
          Welcome to Dop Z.<br />
          Let's build a stronger you.
        </p>
      </div>

      <div className="mt-auto pt-6 relative z-10">
        <button 
          onClick={() => navigate('/')}
          className="w-full bg-[#8DC63F] text-black font-bold py-4 rounded-2xl hover:bg-[#7ab32b] transition-colors shadow-[0_0_20px_rgba(141,198,63,0.3)] active:scale-[0.98]"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
