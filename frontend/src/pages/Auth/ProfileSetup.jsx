import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    height: '',
    weight: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name) {
      // Mock saving profile
      navigate('/auth/success');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0c0c0e] px-8 pt-10 pb-10">
      
      {/* Header Logo */}
      <div className="flex justify-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight">
          Dop <span className="text-[#8DC63F]">Z</span>
        </h2>
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2">Let's set up your profile</h1>
        <p className="text-slate-400 text-sm">This helps us give you a better experience.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
        
        {/* Avatar Upload */}
        <div className="flex justify-center mb-4">
          <button 
            type="button"
            className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative hover:bg-white/10 transition-colors"
          >
            <Camera size={24} className="text-slate-400" />
            <div className="absolute inset-0 rounded-full border border-dashed border-slate-500 opacity-50"></div>
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus-within:border-[#8DC63F] transition-colors relative">
            <label className="text-xs text-slate-400 block mb-1">Your name</label>
            <input 
              type="text"
              placeholder="e.g. Hiran"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-transparent text-white focus:outline-none"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus-within:border-[#8DC63F] transition-colors">
              <label className="text-xs text-slate-400 block mb-1">Height (cm)</label>
              <input 
                type="number"
                placeholder="170"
                value={formData.height}
                onChange={(e) => setFormData({...formData, height: e.target.value})}
                className="w-full bg-transparent text-white focus:outline-none"
              />
            </div>
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus-within:border-[#8DC63F] transition-colors">
              <label className="text-xs text-slate-400 block mb-1">Weight (kg)</label>
              <input 
                type="number"
                placeholder="61"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
                className="w-full bg-transparent text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <button 
            type="submit"
            disabled={!formData.name}
            className="w-full bg-[#8DC63F] text-black font-bold py-4 rounded-2xl hover:bg-[#7ab32b] disabled:opacity-50 transition-colors shadow-[0_0_20px_rgba(141,198,63,0.2)] active:scale-[0.98]"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSetup;
