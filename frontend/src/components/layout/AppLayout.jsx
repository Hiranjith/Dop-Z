import React, { useRef, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import Topbar from './Topbar';
import { Bell } from 'lucide-react';

const AppLayout = () => {
  const location = useLocation();
  const mainRef = useRef(null);
  
  // Scroll to top on route change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  // Routes where the bottom navigation and its padding should be hidden on mobile
  const hideBottomNav = 
    location.pathname === '/workout/active' || 
    location.pathname === '/workout/summary' || 
    location.pathname.startsWith('/workout/exercise/');

  return (
    <div className="flex h-screen bg-dark-bg text-slate-200 overflow-hidden font-sans">
      <Sidebar />
      
      <main ref={mainRef} className="flex-1 md:ml-64 flex flex-col h-full overflow-y-auto hide-scrollbar">
        <Topbar />
        
        {/* Desktop top right icons */}
        <div className="hidden md:flex justify-end p-6 pb-0 space-x-4">
          <button className="text-slate-300 hover:text-white transition-colors relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-dark-bg font-bold cursor-pointer">
            H
          </div>
        </div>

        <div className={`flex-1 p-4 md:p-8 ${hideBottomNav ? 'pb-4' : 'pb-24'} md:pb-8`}>
          <Outlet />
        </div>
      </main>
      
      {!hideBottomNav && <BottomNav />}
    </div>
  );
};

export default AppLayout;
