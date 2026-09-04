import React from 'react';
import { Bell } from 'lucide-react';

const Topbar = () => {
  return (
    <header className="md:hidden flex items-center justify-between p-4 bg-dark-bg">
      <h1 className="text-2xl font-bold italic text-white flex items-center">
        <img src="/Logo.png" alt="Logo" className="w-10 h-10 mr-2 object-contain" />
        Dop <span className="text-primary ml-1 text-3xl leading-none">Z</span>
      </h1>
      <div className="flex items-center space-x-4">
        <button className="text-slate-300 hover:text-white transition-colors relative">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-dark-bg font-bold cursor-pointer">
          H
        </div>
      </div>
    </header>
  );
};

export default Topbar;
