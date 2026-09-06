import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import OverviewTab from './OverviewTab';
import ExercisesTab from './ExercisesTab';

const Progress = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'overview');

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Progress</h1>
      </div>

      <div className="flex space-x-2 bg-slate-900/50 p-1 rounded-full mb-6 max-w-sm">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
            activeTab === 'overview'
              ? 'bg-primary text-dark-bg shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('exercises')}
          className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
            activeTab === 'exercises'
              ? 'bg-primary text-dark-bg shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Exercises
        </button>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar pb-6">
        {activeTab === 'overview' ? <OverviewTab /> : <ExercisesTab />}
      </div>
    </div>
  );
};

export default Progress;
