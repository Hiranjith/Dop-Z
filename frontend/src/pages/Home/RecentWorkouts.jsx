import React from 'react';
import { ChevronRight } from 'lucide-react';

const RecentWorkouts = () => {
  const workouts = [
    { title: 'Back + Biceps', date: '4 Sep 2026', exercises: 5, type: 'upper' },
    { title: 'Chest + Triceps', date: '3 Sep 2026', exercises: 6, type: 'upper' },
    { title: 'Legs', date: '1 Sep 2026', exercises: 6, type: 'lower' },
    { title: 'Shoulders', date: '29 Aug 2026', exercises: 5, type: 'upper' },
  ];

  return (
    <div className="bg-dark-card border border-white/5 rounded-xl p-5 mb-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">Recent Workouts</h3>
        <button className="text-primary text-sm font-medium hover:underline">See all</button>
      </div>
      
      <div className="space-y-3">
        {workouts.map((workout, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group border border-transparent hover:border-white/5">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg bg-primary/20 text-primary flex items-center justify-center mr-4">
                {/* Simple SVG representation of body part based on type */}
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  {workout.type === 'upper' ? (
                    <path d="M12 4a2 2 0 100-4 2 2 0 000 4zm-4.5 4.5V11a2.5 2.5 0 005 0V8.5a.5.5 0 011 0V11a3.5 3.5 0 01-7 0V8.5a.5.5 0 011 0zM12 13a4.5 4.5 0 00-4.5 4.5v3.5a1 1 0 002 0v-2.5h5v2.5a1 1 0 002 0v-3.5A4.5 4.5 0 0012 13z" />
                  ) : (
                    <path d="M12 13a4.5 4.5 0 00-4.5 4.5v3.5a1 1 0 002 0v-2.5h5v2.5a1 1 0 002 0v-3.5A4.5 4.5 0 0012 13zM12 11a3.5 3.5 0 01-3.5-3.5V5a1 1 0 012 0v2.5a1.5 1.5 0 003 0V5a1 1 0 012 0v2.5A3.5 3.5 0 0112 11z" />
                  )}
                </svg>
              </div>
              <div>
                <h4 className="text-white font-medium text-sm md:text-base">{workout.title}</h4>
                <p className="text-xs text-slate-400 mt-1">
                  {workout.date} • {workout.exercises} exercises
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentWorkouts;
