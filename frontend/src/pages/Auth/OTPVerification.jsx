import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OTPVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const method = searchParams.get('method');
  const val = searchParams.get('val') || 'your email/phone';
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(28);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if there's a value
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 4) {
      // Mock verification success
      navigate('/auth/profile');
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
        <h1 className="text-3xl font-bold mb-2">Enter OTP</h1>
        <p className="text-slate-400 text-sm px-4">
          We've sent you a 4-digit code to <br />
          <span className="text-white font-medium">{val}</span>
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-8 flex-1 flex flex-col">
        <div className="flex justify-center gap-2 sm:gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#8DC63F] transition-colors"
            />
          ))}
        </div>

        <div className="text-center text-sm text-slate-500">
          {timer > 0 ? (
            <p>Resend OTP in 00:{timer.toString().padStart(2, '0')}</p>
          ) : (
            <button type="button" onClick={() => setTimer(30)} className="text-[#8DC63F] hover:underline">
              Resend OTP
            </button>
          )}
        </div>

        <div className="mt-auto pt-8">
          <button 
            type="submit"
            disabled={otp.join('').length !== 4}
            className="w-full bg-[#8DC63F] text-black font-bold py-4 rounded-2xl hover:bg-[#7ab32b] disabled:opacity-50 disabled:hover:bg-[#8DC63F] transition-colors shadow-[0_0_20px_rgba(141,198,63,0.2)] active:scale-[0.98]"
          >
            Verify
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTPVerification;
