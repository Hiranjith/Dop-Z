import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, ChevronDown, Dumbbell } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const workoutFrequencyData = [
  { name: 'Jul 7', workouts: 2 },
  { name: 'Jul 14', workouts: 3 },
  { name: 'Jul 21', workouts: 2 },
  { name: 'Jul 28', workouts: 3 },
  { name: 'Aug 4', workouts: 2 },
  { name: 'Aug 11', workouts: 5 },
  { name: 'Aug 18', workouts: 3 },
  { name: 'Aug 25', workouts: 4 },
  { name: 'Sep 1', workouts: 5 },
];

const muscleGroupData = [
  { name: 'Back', value: 28, color: '#22c55e' }, // green-500
  { name: 'Chest', value: 18, color: '#ef4444' }, // red-500
  { name: 'Legs', value: 16, color: '#3b82f6' }, // blue-500
  { name: 'Shoulders', value: 14, color: '#eab308' }, // yellow-500
  { name: 'Arms', value: 12, color: '#a855f7' }, // purple-500
  { name: 'Abs', value: 8, color: '#06b6d4' }, // cyan-500
  { name: 'Cardio', value: 4, color: '#64748b' }, // slate-500
];

const timeSpentData = [
  { name: 'Jul 7', hours: 1.5 },
  { name: 'Jul 14', hours: 2.5 },
  { name: 'Jul 21', hours: 3 },
  { name: 'Jul 28', hours: 2.8 },
  { name: 'Aug 4', hours: 4 },
  { name: 'Aug 11', hours: 3 },
  { name: 'Aug 18', hours: 3.5 },
  { name: 'Aug 25', hours: 4.2 },
  { name: 'Sep 1', hours: 5 },
];

const recentWorkouts = [
  { id: 1, date: 'SEP 6', name: 'Back + Biceps', exercises: 8, time: '1h 05m' },
  { id: 2, date: 'SEP 4', name: 'Chest + Triceps', exercises: 7, time: '58m' },
  { id: 3, date: 'SEP 2', name: 'Leg Day', exercises: 6, time: '1h 12m' },
  { id: 4, date: 'AUG 30', name: 'Shoulders + Abs', exercises: 7, time: '55m' },
];

const OverviewTab = () => {
  const [timeRange, setTimeRange] = useState('Last 3 Months');
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="inline-flex items-center space-x-2 bg-slate-800/50 rounded-lg px-4 py-2 cursor-pointer border border-slate-700/50 hover:bg-slate-800 transition-colors">
        <Calendar className="w-4 h-4 text-slate-400" />
        <span className="text-sm font-medium text-slate-200">{timeRange}</span>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm">
          <Calendar className="w-5 h-5 text-slate-400 mb-1" />
          <span className="text-xl font-bold text-white mb-1">24</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Workouts</span>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm">
          <Clock className="w-5 h-5 text-slate-400 mb-1" />
          <span className="text-xl font-bold text-white mb-1">14h 20m</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Time</span>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm">
          <Dumbbell className="w-5 h-5 text-slate-400 mb-1" />
          <span className="text-xl font-bold text-white mb-1">8</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Muscles</span>
        </div>
      </div>

      {/* Workout Frequency Chart */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm">
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-1">Workout Frequency</h3>
          <p className="text-xs text-slate-400">Workouts per week</p>
        </div>
        <div className="h-48 w-full -ml-3 sm:ml-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={workoutFrequencyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Tooltip 
                cursor={{ fill: '#334155', opacity: 0.4 }}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#a3e635' }}
              />
              <Bar dataKey="workouts" fill="#a3e635" radius={[2, 2, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Time Spent Chart */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm">
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-1">Time Spent</h3>
          <p className="text-xs text-slate-400">Hours per week</p>
        </div>
        <div className="h-48 w-full -ml-3 sm:ml-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSpentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#a3e635' }}
              />
              <Line type="monotone" dataKey="hours" stroke="#a3e635" strokeWidth={2} dot={{ r: 4, fill: '#0f172a', stroke: '#a3e635', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#a3e635' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Muscle Group Focus */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-white font-semibold">Muscle Group Focus</h3>
        </div>
        <div className="flex items-center justify-between">
          <div className="relative w-32 h-32 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={muscleGroupData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {muscleGroupData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-bold text-white leading-none mb-1">24</span>
              <span className="text-[10px] text-slate-400 leading-none">Workouts</span>
            </div>
          </div>
          
          <div className="flex-1 ml-6 grid grid-cols-1 gap-y-2">
            {muscleGroupData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <span className="text-slate-400 font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Workouts */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white font-semibold">Recent Workouts</h3>
          <button 
            onClick={() => navigate('/history')}
            className="text-xs text-primary font-medium hover:text-primary/80 transition-colors"
          >
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentWorkouts.slice(0, 3).map((workout, index) => (
            <div 
              key={workout.id} 
              onClick={() => navigate('/workout/summary', { state: { fromProgress: true } })}
              className={`flex items-center justify-between cursor-pointer hover:bg-slate-800/30 p-2 -mx-2 rounded-lg transition-colors ${index !== 2 ? 'border-b border-slate-800/50' : ''}`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center justify-center w-12 text-center bg-slate-800/50 rounded-lg p-2">
                  <span className="text-[10px] font-medium text-slate-400 uppercase leading-none mb-1">{workout.date.split(' ')[0]}</span>
                  <span className="text-lg font-bold text-white leading-none">{workout.date.split(' ')[1]}</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">{workout.name}</h4>
                  <div className="flex items-center text-xs text-slate-400 space-x-2">
                    <span>{workout.exercises} exercises</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    <span>{workout.time}</span>
                  </div>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500 -rotate-90" />
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default OverviewTab;
