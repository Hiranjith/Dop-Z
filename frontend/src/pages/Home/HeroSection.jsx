import React from 'react';
import { Plus } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden mb-6 h-64 md:h-72 w-full bg-dark-card border border-white/5">
      {/* Background Images */}
      <div 
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: `url('/Mobile banner.png')` }}
      />
      <div 
        className="hidden md:block absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/Laptop banner.png')` }}
      />
      
      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-dark-bg/90 via-dark-bg/60 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end md:justify-center p-6 md:p-10 w-full md:w-1/2">
        <p className="text-slate-300 text-lg">Good evening,</p>
        <h2 className="text-4xl font-bold text-white mb-2 flex items-center">
          Hiran <span className="ml-2 text-2xl">👋</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base mb-6 max-w-sm">
          Discipline today. A stronger you tomorrow.
        </p>
        
        <button className="bg-primary hover:bg-primary-dark text-dark-bg font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-colors w-full md:w-max">
          <Plus className="w-5 h-5 mr-2" />
          Start Workout
        </button>
      </div>

      {/* Desktop right side text (optional based on image content, the laptop banner might already have this text embedded, but if not we can add it) */}
      <div className="hidden md:flex absolute top-0 right-0 h-full items-center pr-16 pointer-events-none">
        {/* If the image doesn't have "BETTER THAN YESTERDAY", we would put it here. Assuming the banner image might or might not have it. The screenshot shows it clearly on the right. We will add it as text just in case. */}
      </div>
    </div>
  );
};

export default HeroSection;
