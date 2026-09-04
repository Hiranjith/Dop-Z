import React from 'react';
import HeroSection from './HeroSection';
import StatCards from './StatCards';
import RecentWorkouts from './RecentWorkouts';
import WeeklyChart from './WeeklyChart';
import QuickActions from './QuickActions';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto w-full">
      <HeroSection />
      <StatCards />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col">
          <RecentWorkouts />
          <QuickActions />
        </div>
        
        <div className="flex flex-col gap-6">
          <WeeklyChart />
          
          {/* Quote Card (Bottom right on Desktop, bottom on Mobile) */}
          <div className="bg-dark-card border border-white/5 rounded-xl p-6 relative overflow-hidden flex-1 min-h-[160px] flex items-center">
             <div 
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url('/Laptop banner.png')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark-card via-dark-card/80 to-transparent" />
              
              <div className="relative z-10">
                <span className="text-4xl text-primary font-serif leading-none block mb-2">"</span>
                <p className="text-white font-medium text-lg italic">
                  Small progress leads to big results.
                </p>
                <div className="w-8 h-1 bg-primary mt-4 rounded-full"></div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
