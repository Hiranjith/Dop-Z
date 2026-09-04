import React from 'react';

const WeeklyChart = () => {
  const days = [
    { name: 'Mon', value: 40 },
    { name: 'Tue', value: 65 },
    { name: 'Wed', value: 30 },
    { name: 'Thu', value: 75 },
    { name: 'Fri', value: 45 },
    { name: 'Sat', value: 0 },
    { name: 'Sun', value: 0 },
  ];

  return (
    <div className="bg-dark-card border border-white/5 rounded-xl p-5 h-full flex flex-col">
      <h3 className="text-lg font-bold text-white mb-6">This Week</h3>
      
      <div className="flex-1 flex items-end justify-between px-2 pt-4">
        {days.map((day, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="w-full max-w-[12px] md:max-w-[16px] h-32 bg-dark-bg rounded-t-sm relative flex items-end">
              <div 
                className={`w-full rounded-t-sm transition-all duration-1000 ${day.value > 0 ? 'bg-primary' : 'bg-transparent'}`}
                style={{ height: `${day.value}%` }}
              ></div>
            </div>
            <span className="text-[10px] md:text-xs text-slate-500 mt-3">{day.name}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
         <span className="text-sm text-slate-400">Total Workouts</span>
         <span className="text-white font-bold"><span className="text-xl">4</span>/7</span>
      </div>
    </div>
  );
};

export default WeeklyChart;
