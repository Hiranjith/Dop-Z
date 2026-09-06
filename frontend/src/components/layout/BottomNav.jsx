import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Dumbbell, Clock, BarChart3, User, BookOpen } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Workout', path: '/workout', icon: Dumbbell },
    { name: 'Exercises', path: '/exercises', icon: BookOpen },
    { name: 'History', path: '/history', icon: Clock },
    { name: 'Progress', path: '/progress', icon: BarChart3 },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-dark-bg border-t border-slate-800 z-50">
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <li key={item.name} className="flex-1">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center h-full transition-colors ${
                  isActive ? 'text-primary' : 'text-slate-500 hover:text-slate-300'
                }`
              }
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
