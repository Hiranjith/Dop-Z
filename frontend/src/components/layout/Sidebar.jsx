import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Dumbbell, BookOpen, Clock, BarChart3, Settings } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Start Workout', path: '/workout', icon: Dumbbell },
    { name: 'Exercises', path: '/exercises', icon: BookOpen },
    { name: 'History', path: '/history', icon: Clock },
    { name: 'Progress', path: '/progress', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-dark-bg text-slate-300 h-screen fixed left-0 top-0 hidden md:flex flex-col border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-2xl font-bold italic text-white flex items-center">
          <img src="/Logo.png" alt="Logo" className="w-8 h-8 mr-2 object-contain" />
          Dop <span className="text-primary ml-1 text-3xl leading-none">Z</span>
        </h1>
      </div>

      <nav className="flex-1 mt-6 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-primary/20 text-primary font-medium' : 'hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-4" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center w-full px-4 py-3 mb-2 rounded-lg hover:bg-slate-800 transition-colors">
          <Settings className="w-5 h-5 mr-4" />
          Settings
        </button>
        <div className="flex items-center px-4 py-3 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-dark-bg font-bold mr-3">
            H
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">Hiran</span>
            <span className="text-xs text-slate-500">you@example.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
