import React from 'react';
import { Dumbbell, Clock, BarChart3, Flame } from 'lucide-react';

const StatCards = () => {
  const stats = [
    { label: 'Workouts this week', value: '4', icon: Dumbbell, color: 'text-primary' },
    { label: 'Avg. duration (min)', value: '52', icon: Clock, color: 'text-primary' },
    { label: 'Total volume (kg)', value: '12,430', icon: BarChart3, color: 'text-primary' },
    { label: 'Est. calories burned', value: '2,840', icon: Flame, color: 'text-primary' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-dark-card border border-white/5 rounded-xl p-4 flex flex-col md:flex-row md:items-center">
          <div className="mb-3 md:mb-0 md:mr-4">
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
          </div>
          <div>
            <div className="text-2xl font-bold text-white leading-tight">{stat.value}</div>
            <div className="text-xs text-slate-400">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
