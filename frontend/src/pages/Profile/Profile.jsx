import React from 'react';
import { Settings, User, Ruler, LogOut, ChevronRight, Edit3 } from 'lucide-react';

const Profile = () => {
  return (
    <div className="flex flex-col md:-mx-8 md:-my-8 text-slate-200 bg-dark-bg animate-fade-in relative">
      
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 pt-6 sticky top-0 bg-dark-bg z-20 md:hidden">
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <button className="p-1 text-slate-300 hover:text-white transition-colors">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between p-8 pb-4 sticky top-0 bg-dark-bg z-20">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Profile</h1>
          <p className="text-sm text-slate-400">Manage your account information.</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-xl text-sm font-medium transition-colors">
          <Edit3 className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      <div className="px-4 md:px-8 pb-4">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          
          {/* User Section (Mobile) / User Card (Desktop) */}
          <div className="md:bg-slate-900/50 md:border md:border-slate-800 md:rounded-2xl flex flex-col md:pt-8 md:overflow-hidden md:shadow-sm">
            
            {/* User Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start px-4 md:px-8 mb-6 md:mb-8">
              <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-4xl font-bold text-dark-bg mb-4 md:mb-0 md:mr-6 flex-shrink-0 shadow-[0_0_15px_rgba(163,230,53,0.3)]">
                H
              </div>
              <div className="text-center md:text-left flex flex-col justify-center h-full pt-1">
                <h2 className="text-2xl font-bold text-white mb-1">Hiran</h2>
                <p className="text-slate-400 mb-1">hiran@example.com</p>
                <p className="text-sm text-slate-500">Member since Aug 2025</p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 bg-slate-900/50 border border-slate-800 rounded-2xl md:bg-slate-800/20 md:border-t md:border-x-0 md:border-b-0 md:rounded-none">
              <div className="flex flex-col items-center justify-center py-4 border-r border-slate-800/50">
                <span className="text-xl md:text-2xl font-bold text-white mb-1">24</span>
                <span className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider">Workouts</span>
              </div>
              <div className="flex flex-col items-center justify-center py-4 border-r border-slate-800/50">
                <span className="text-xl md:text-2xl font-bold text-white mb-1">3</span>
                <span className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider">Months</span>
              </div>
              <div className="flex flex-col items-center justify-center py-4">
                <span className="text-xl md:text-2xl font-bold text-white mb-1">6</span>
                <span className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider">Muscle Groups</span>
              </div>
            </div>
          </div>

          {/* Account Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 md:px-0 mb-3 md:mb-4 md:text-base md:text-white md:capitalize md:tracking-normal">Account</h3>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-sm">
              {/* Personal Information */}
              <button className="flex items-center justify-between p-4 md:p-5 hover:bg-slate-800/50 transition-colors border-b border-slate-800/50 w-full text-left">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 mr-4 flex-shrink-0">
                    <User className="w-5 h-5 text-slate-300" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm md:text-base mb-0.5">Personal Information</div>
                    <div className="text-slate-400 text-xs md:text-sm">Name, email, phone</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500" />
              </button>

              {/* Body Metrics */}
              <button className="flex items-center justify-between p-4 md:p-5 hover:bg-slate-800/50 transition-colors w-full text-left">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 mr-4 flex-shrink-0">
                    <Ruler className="w-5 h-5 text-slate-300" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm md:text-base mb-0.5">Body Metrics</div>
                    <div className="text-slate-400 text-xs md:text-sm">Weight, height, age, etc.</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Log Out Button */}
          <div className="pt-2 md:pt-4">
            <button className="w-full flex items-center justify-center space-x-3 p-4 border border-red-500/30 rounded-2xl text-red-500 hover:bg-red-500/10 transition-colors shadow-sm font-medium">
              <LogOut className="w-5 h-5" />
              <span>Log Out</span>
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
