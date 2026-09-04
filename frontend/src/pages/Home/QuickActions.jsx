import React from 'react';
import { Dumbbell, BookOpen } from 'lucide-react';

const QuickActions = () => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="bg-dark-card border border-white/5 hover:border-primary/50 hover:bg-white/5 rounded-xl p-5 flex items-center transition-all group text-left">
          <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-4 group-hover:bg-primary group-hover:text-dark-bg transition-colors">
            <Dumbbell className="w-6 h-6" />
          </div>
          <div>
            <div className="text-white font-medium text-lg">Start Workout</div>
            <div className="text-sm text-slate-400 mt-1">Log your exercises</div>
          </div>
        </button>

        <button className="bg-dark-card border border-white/5 hover:border-primary/50 hover:bg-white/5 rounded-xl p-5 flex items-center transition-all group text-left">
          <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-4 group-hover:bg-primary group-hover:text-dark-bg transition-colors">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-white font-medium text-lg">Browse Exercises</div>
            <div className="text-sm text-slate-400 mt-1">Explore the library</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
