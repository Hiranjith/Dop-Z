import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, TrendingUp, Calendar, Trophy, Medal } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const mockProgressionData = [
  { date: 'Jul 14', weight: 30, reps: 10 },
  { date: 'Jul 21', weight: 32.5, reps: 10 },
  { date: 'Jul 28', weight: 35, reps: 8 },
  { date: 'Aug 4', weight: 40, reps: 8 },
  { date: 'Aug 11', weight: 45, reps: 8 },
  { date: 'Aug 18', weight: 50, reps: 6 },
  { date: 'Aug 25', weight: 55, reps: 8 },
  { date: 'Sep 1', weight: 57.5, reps: 8 },
  { date: 'Sep 8', weight: 60, reps: 8 },
];

const mockRecentWorkouts = [
  { id: 1, date: 'Sep 6, 2025', weight: 60, reps: 8, sets: 3 },
  { id: 2, date: 'Sep 2, 2025', weight: 57.5, reps: 8, sets: 3 },
  { id: 3, date: 'Aug 28, 2025', weight: 55, reps: 10, sets: 3 },
  { id: 4, date: 'Aug 24, 2025', weight: 55, reps: 8, sets: 3 },
  { id: 5, date: 'Aug 18, 2025', weight: 52.5, reps: 8, sets: 3 },
];

const ExerciseProgress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  
  // Try to get exercise data from state (passed from ExercisesTab)
  // Fallback to mock data
  const exercise = location.state?.exercise || {
    id: id || 1,
    name: 'Bench Press',
    category: 'Chest',
    type: 'Barbell'
  };

  const [timeFilter, setTimeFilter] = useState('Last 4 Weeks');
  const [chartToggle, setChartToggle] = useState('Weight');

  return (
    <div className="flex flex-col h-full md:-mx-8 md:-my-8 text-slate-200 bg-dark-bg animate-fade-in relative pb-20 md:pb-0">
      {/* Header */}
      <div className="flex items-center p-4 md:px-8 pt-6 md:pt-8 mb-2 sticky top-0 bg-dark-bg z-20">
        <button 
          onClick={() => navigate('/progress', { state: { tab: 'exercises' } })} 
          className="mr-3 p-2 text-slate-300 hover:text-white bg-slate-800/50 border border-slate-700 rounded-xl transition-colors"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2} />
        </button>
        <h1 className="text-lg font-bold text-white">Exercise Progress</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 md:gap-8">
          
          {/* Main Column */}
          <div className="flex-1 space-y-6 md:space-y-8">
            
            {/* Title & Filters */}
            <div className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{exercise.name}</h1>
                <p className="text-sm text-slate-400">{exercise.category} • {exercise.type || 'Barbell'}</p>
              </div>
              
              <div className="flex bg-slate-800/50 p-1 rounded-xl w-full md:w-auto">
                {['Last 4 Weeks', 'Last 3 Months', 'All Time'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setTimeFilter(filter)}
                    className={`flex-1 md:flex-none px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      timeFilter === filter 
                        ? 'bg-primary text-dark-bg shadow-sm' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 md:p-4 flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-xl md:text-2xl font-bold text-white mb-1">8</span>
                <span className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider">Workouts</span>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 md:p-4 flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-xl md:text-2xl font-bold text-white mb-1">60 kg</span>
                <span className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider">Best Weight</span>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 md:p-4 flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-xl md:text-2xl font-bold text-white mb-1">8</span>
                <span className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider">Best Reps</span>
              </div>
              <div className="hidden md:flex bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex-col items-center justify-center text-center shadow-sm">
                <span className="text-2xl font-bold text-white mb-1">5,240 kg</span>
                <span className="text-xs text-slate-400 uppercase tracking-wider">Total Volume</span>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 md:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold">Weight Progression</h3>
                <div className="flex bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/50">
                  {['Weight', 'Reps'].map(toggle => (
                    <button
                      key={toggle}
                      onClick={() => setChartToggle(toggle)}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                        chartToggle === toggle 
                          ? 'bg-primary text-dark-bg' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {toggle}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="h-56 md:h-64 w-full -ml-4 md:ml-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockProgressionData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} dy={10} />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 10 }} 
                      domain={chartToggle === 'Weight' ? [0, 'dataMax + 10'] : [0, 'dataMax + 5']}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#a3e635' }}
                      formatter={(value) => [value, chartToggle === 'Weight' ? 'kg' : 'reps']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey={chartToggle.toLowerCase()} 
                      stroke="#a3e635" 
                      strokeWidth={2} 
                      dot={{ r: 3, fill: '#a3e635' }} 
                      activeDot={{ r: 6, fill: '#a3e635', stroke: '#0f172a', strokeWidth: 2 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Workouts List (Mobile primarily, also on Desktop below chart) */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 md:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 border-b border-slate-800/50 pb-4">
                <h3 className="text-white font-semibold">Recent Workouts</h3>
                <button className="text-xs text-primary font-medium hover:text-primary/80 transition-colors">
                  View All
                </button>
              </div>
              
              {/* Header row */}
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3 px-2">
                <div className="w-1/3">Date</div>
                <div className="w-1/3 text-center">Weight × Reps</div>
                <div className="w-1/3 text-right">Sets</div>
              </div>

              <div className="space-y-2">
                {mockRecentWorkouts.map((workout) => (
                  <div key={workout.id} className="flex items-center justify-between p-2 hover:bg-slate-800/30 rounded-lg transition-colors cursor-pointer">
                    <div className="w-1/3 text-sm text-white font-medium">{workout.date}</div>
                    <div className="w-1/3 text-center text-sm text-slate-300">{workout.weight} kg × {workout.reps}</div>
                    <div className="w-1/3 text-right text-sm text-slate-400">{workout.sets}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Desktop) */}
          <div className="hidden lg:flex flex-col w-80 space-y-6">
            
            {/* Performance Insights */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 shadow-sm">
              <h3 className="text-white font-semibold mb-5">Performance Insights</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5 border border-slate-700">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm mb-0.5">+15 kg</div>
                    <div className="text-slate-400 text-xs leading-relaxed">Increase in best weight (in selected period)</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5 border border-slate-700">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm mb-0.5">Consistent Progress</div>
                    <div className="text-slate-400 text-xs leading-relaxed">Your performance has been improving steadily.</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5 border border-slate-700">
                    <Calendar className="w-4 h-4 text-slate-300" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm mb-0.5">8 workouts</div>
                    <div className="text-slate-400 text-xs leading-relaxed">You performed bench press in this period.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Records */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 shadow-sm">
              <h3 className="text-white font-semibold mb-5">Personal Records</h3>
              
              <div className="space-y-5">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs mb-0.5">Heaviest Weight</div>
                    <div className="text-white font-bold text-sm flex items-end">
                      60 kg <span className="text-slate-500 text-[10px] ml-2 font-normal pb-0.5">Sep 6, 2025</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                    <Medal className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs mb-0.5">Most Reps</div>
                    <div className="text-white font-bold text-sm flex items-end">
                      12 reps <span className="text-slate-500 text-[10px] ml-2 font-normal pb-0.5">Aug 12, 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>



    </div>
  );
};

export default ExerciseProgress;
