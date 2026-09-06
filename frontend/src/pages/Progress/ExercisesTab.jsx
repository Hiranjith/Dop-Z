import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, ChevronDown, ChevronRight } from 'lucide-react';

const mockExercises = [
  { id: 1, name: 'Bench Press', lastWeight: 60, lastReps: 8, progress: [40, 50, 50, 60, 60] },
  { id: 2, name: 'Squat', lastWeight: 80, lastReps: 6, progress: [60, 70, 70, 75, 80] },
  { id: 3, name: 'Lat Pulldown', lastWeight: 45, lastReps: 10, progress: [35, 40, 45, 45, 45] },
  { id: 4, name: 'Shoulder Press', lastWeight: 30, lastReps: 8, progress: [20, 25, 25, 30, 30] },
  { id: 5, name: 'Barbell Row', lastWeight: 50, lastReps: 8, progress: [40, 45, 50, 50, 50] },
  { id: 6, name: 'Bicep Curl', lastWeight: 20, lastReps: 10, progress: [15, 15, 17.5, 20, 20] },
  { id: 7, name: 'Tricep Pushdown', lastWeight: 25, lastReps: 12, progress: [20, 22.5, 25, 25, 25] },
  { id: 8, name: 'Leg Press', lastWeight: 100, lastReps: 10, progress: [80, 90, 100, 100, 100] },
];

const ExercisesTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('Last 3 Months');
  const navigate = useNavigate();

  const filteredExercises = mockExercises.filter(ex => 
    ex.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Controls */}
      <div className="flex flex-col space-y-4">
        <div className="inline-flex items-center self-start space-x-2 bg-slate-800/50 rounded-lg px-4 py-2 cursor-pointer border border-slate-700/50 hover:bg-slate-800 transition-colors">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-200">{timeRange}</span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-all focus:ring-1 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Exercises List */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {filteredExercises.map((exercise, index) => (
          <div 
            key={exercise.id} 
            onClick={() => navigate(`/progress/exercise/${exercise.id}`, { state: { exercise } })}
            className={`p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors cursor-pointer group ${
              index !== filteredExercises.length - 1 ? 'border-b border-slate-800/50' : ''
            }`}
          >
            <div className="flex-1 pr-4">
              <h4 className="text-sm font-medium text-white mb-1 group-hover:text-primary transition-colors">{exercise.name}</h4>
              <p className="text-xs text-slate-400">
                Last: {exercise.lastWeight} kg × {exercise.lastReps}
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Mini Bar Chart Progress Indicator */}
              <div className="flex items-end space-x-1 h-8 w-16">
                {exercise.progress.map((val, i) => {
                  const maxVal = Math.max(...exercise.progress);
                  const heightPercentage = Math.max((val / maxVal) * 100, 15); // Ensure a minimum height for visibility
                  
                  return (
                    <div 
                      key={i} 
                      className={`flex-1 rounded-t-sm ${i === exercise.progress.length - 1 ? 'bg-primary' : 'bg-primary/30 group-hover:bg-primary/50 transition-colors'}`}
                      style={{ height: `${heightPercentage}%` }}
                    />
                  );
                })}
              </div>
              
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-slate-300 transition-colors" />
            </div>
          </div>
        ))}
        {filteredExercises.length === 0 && (
          <div className="p-8 text-center text-slate-400">
            No exercises found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

export default ExercisesTab;
