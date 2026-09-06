import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, Trophy, Dumbbell, Clock, ClipboardList, ArrowUpRight, ArrowRight, ChevronRight, User } from 'lucide-react';

const WorkoutSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data from location state or use defaults for preview
  const state = location.state || {};
  const {
    fromHistory,
    fromProgress,
    elapsedSeconds = 3120, // 52 mins
    selectedExercises = [
      { id: '1', name: 'Seated Cable Row', category: 'Back' },
      { id: '2', name: 'Lat Pulldown', category: 'Back' },
      { id: '3', name: 'Barbell Row', category: 'Back' },
      { id: '4', name: 'Dumbbell Curl', category: 'Biceps' },
      { id: '5', name: 'Hammer Curl', category: 'Biceps' },
    ],
    workoutData = {
      '1': { sets: [{ weight: '25', reps: '12' }, { weight: '25', reps: '12' }, { weight: '25', reps: '12' }] },
      '2': { sets: [{ weight: '22.5', reps: '12' }, { weight: '22.5', reps: '12' }, { weight: '22.5', reps: '12' }] },
      '3': { sets: [{ weight: '40', reps: '10' }, { weight: '40', reps: '10' }, { weight: '40', reps: '10' }] },
      '4': { sets: [{ weight: '12.5', reps: '12' }, { weight: '12.5', reps: '12' }, { weight: '12.5', reps: '12' }, { weight: '12.5', reps: '12' }] },
      '5': { sets: [{ weight: '15', reps: '10' }, { weight: '15', reps: '10' }, { weight: '15', reps: '10' }] }
    }
  } = state;

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    if (hrs > 0) return `${hrs}h ${mins}min`;
    return `${mins} min`;
  };

  let totalSets = 0;
  Object.values(workoutData).forEach(data => {
    if(data && data.sets) totalSets += data.sets.length;
  });
  
  if (totalSets === 0) totalSets = 16; // default mock

  const prs = [
    {
      exerciseName: 'Lat Pulldown',
      metric: '22.5 kg × 12',
      previous: '20 kg × 12',
    },
    {
      exerciseName: 'Hammer Curl',
      metric: '15 kg × 10',
      previous: '12.5 kg × 10',
    }
  ];

  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'short', 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric'
  });
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="flex flex-col h-full md:-mx-8 md:-my-8 text-slate-200 bg-dark-bg">
      {/* Top Navigation Bar - Shared */}
      <div className="flex items-center justify-between p-4 md:px-8 border-b border-slate-800 bg-dark-bg sticky top-0 z-20">
        <div className="flex items-center">
          <button onClick={() => fromHistory ? navigate('/history') : fromProgress ? navigate('/progress') : navigate('/')} className="mr-3 md:mr-4 p-1 md:p-2.5 -ml-1 md:ml-0 text-slate-300 hover:text-white md:bg-slate-800/50 md:border md:border-slate-700 rounded-xl transition-colors">
            <ChevronLeft className="w-7 h-7 md:w-5 md:h-5" strokeWidth={2} />
          </button>
          <div className="flex flex-col justify-center">
            <h1 className="text-lg md:text-xl font-bold text-white leading-none mb-1 md:mb-1.5">Workout Summary</h1>
            <p className="text-[12px] md:text-sm text-slate-400 leading-none">{currentDate} • {currentTime}</p>
          </div>
        </div>
        
        {/* Desktop Top Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={() => navigate('/')} className="px-5 py-2.5 bg-slate-800/80 text-white hover:bg-slate-700 border border-slate-700 rounded-xl text-sm font-semibold transition-colors">
            Go Home
          </button>
          <button onClick={() => navigate('/history')} className="px-5 py-2.5 bg-primary text-dark-bg hover:bg-primary-dark rounded-xl text-sm font-bold transition-colors flex items-center">
            View Full Details <ArrowRight className="w-4 h-4 ml-2" strokeWidth={3} />
          </button>
        </div>
        
        {/* Mobile Top Action removed per request */}
        <div className="md:hidden w-10"></div> {/* Spacer to keep header balanced if needed, or just empty */}
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 md:gap-8">
          
          {/* Left Column (Desktop) / Top Section (Mobile) */}
          <div className="flex-1 space-y-6 md:space-y-8">
            
            {/* Completion Card */}
            <div className="flex flex-col items-center justify-center py-8 md:py-12 bg-slate-800/20 border border-slate-800 rounded-3xl relative overflow-hidden">
               {/* Confetti / Sparkles effect */}
               <div className="absolute inset-0 overflow-hidden pointer-events-none">
                 {/* Left side confetti */}
                 <div className="absolute top-8 left-[20%] w-2 h-2 bg-primary/80 rounded-[2px] animate-confetti shadow-[0_0_8px_#8DC63F]" style={{ animationDuration: '2.5s', animationDelay: '0.1s' }}></div>
                 <div className="absolute top-12 left-[10%] w-1.5 h-1.5 bg-white/60 rounded-full animate-confetti" style={{ animationDuration: '2.2s', animationDelay: '0.4s' }}></div>
                 <div className="absolute top-4 left-[30%] w-2.5 h-2.5 bg-primary-dark/70 rounded-[1px] animate-confetti" style={{ animationDuration: '2.8s', animationDelay: '0.2s' }}></div>
                 <div className="absolute top-16 left-[25%] w-1.5 h-1.5 bg-primary rounded-full animate-confetti shadow-[0_0_5px_#8DC63F]" style={{ animationDuration: '2.1s', animationDelay: '0.6s' }}></div>
                 
                 {/* Right side confetti */}
                 <div className="absolute top-6 right-[20%] w-2 h-2 bg-primary/80 rounded-[2px] animate-confetti shadow-[0_0_8px_#8DC63F]" style={{ animationDuration: '2.4s', animationDelay: '0s' }}></div>
                 <div className="absolute top-14 right-[12%] w-1.5 h-1.5 bg-white/60 rounded-full animate-confetti" style={{ animationDuration: '2.7s', animationDelay: '0.3s' }}></div>
                 <div className="absolute top-8 right-[32%] w-2.5 h-2.5 bg-primary-dark/70 rounded-[1px] animate-confetti" style={{ animationDuration: '2.3s', animationDelay: '0.5s' }}></div>
                 <div className="absolute top-16 right-[25%] w-1.5 h-1.5 bg-primary rounded-full animate-confetti shadow-[0_0_5px_#8DC63F]" style={{ animationDuration: '2.6s', animationDelay: '0.2s' }}></div>
                 
                 {/* Center confetti */}
                 <div className="absolute top-2 left-[45%] w-1.5 h-1.5 bg-white/50 rounded-[2px] animate-confetti" style={{ animationDuration: '2.9s', animationDelay: '0.1s' }}></div>
                 <div className="absolute top-4 right-[45%] w-2 h-2 bg-primary/60 rounded-full animate-confetti" style={{ animationDuration: '2.2s', animationDelay: '0.4s' }}></div>
               </div>

               <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mb-6 z-10 animate-circle-pulse relative">
                 <Check className="w-8 h-8 md:w-10 md:h-10 text-dark-bg animate-check-pop" strokeWidth={4} />
               </div>
               
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 relative z-10">Great Workout!</h2>
               <p className="text-slate-300 font-medium mb-1 text-lg">Back + Biceps</p>
               <p className="text-slate-500 text-sm">Consistency builds a stronger you.</p>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="bg-slate-800/30 border border-slate-800/60 rounded-2xl p-4 flex items-center">
                <div className="mr-4">
                  <Dumbbell className="w-8 h-8 text-primary" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-[20px] font-bold text-white leading-none mb-1.5">{selectedExercises.length}</div>
                  <div className="text-[13px] text-slate-400 font-medium leading-none">Exercises</div>
                </div>
              </div>

              <div className="bg-slate-800/30 border border-slate-800/60 rounded-2xl p-4 flex items-center">
                <div className="mr-4">
                  <ClipboardList className="w-8 h-8 text-primary" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-[20px] font-bold text-white leading-none mb-1.5">{totalSets}</div>
                  <div className="text-[13px] text-slate-400 font-medium leading-none">Total Sets</div>
                </div>
              </div>

              <div className="bg-slate-800/30 border border-slate-800/60 rounded-2xl p-4 flex items-center">
                <div className="mr-4">
                  <Clock className="w-8 h-8 text-primary" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-[20px] font-bold text-white leading-none mb-1.5">{formatTime(elapsedSeconds)}</div>
                  <div className="text-[13px] text-slate-400 font-medium leading-none">Workout Time</div>
                </div>
              </div>

              <div className="bg-slate-800/30 border border-slate-800/60 rounded-2xl p-4 flex items-center">
                <div className="mr-4">
                  <Trophy className="w-8 h-8 text-primary" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-[20px] font-bold text-white leading-none mb-1.5">{prs.length}</div>
                  <div className="text-[13px] text-slate-400 font-medium leading-none">New PRs</div>
                </div>
              </div>
            </div>

             {/* Quote / Footer Note (Laptop only) */}
            <div className="hidden md:flex bg-slate-800/20 border border-slate-800 rounded-2xl p-6 items-center justify-between mt-8">
              <div className="flex items-start">
                 <span className="text-3xl font-serif text-primary mr-3 opacity-60 leading-none">"</span>
                 <div>
                    <p className="text-slate-300 font-medium">Small steps today.</p>
                    <p className="text-slate-400 text-sm">Bigger results tomorrow.</p>
                 </div>
              </div>
              <div className="text-xl font-bold italic tracking-wider text-white">
                Dop <span className="text-primary">Z</span>
              </div>
            </div>

          </div>

          {/* Right Column (Desktop) / Bottom Section (Mobile) */}
          <div className="flex-1 space-y-6 md:space-y-8">
            
            {/* PR Section */}
            {prs.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Trophy className="w-5 h-5 text-primary mr-2" />
                    <h3 className="font-bold text-white text-lg">New Personal Records ({prs.length})</h3>
                  </div>
                  <button className="text-primary text-sm font-medium hover:text-primary-dark">View All</button>
                </div>
                
                <div className="space-y-3">
                  {prs.map((pr, idx) => (
                    <div key={idx} className="bg-slate-800/30 border border-slate-800 rounded-2xl p-4 flex flex-row items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mr-4 border border-slate-700">
                          <User className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-sm mb-0.5">{pr.exerciseName}</h4>
                          <div className="text-white text-sm font-bold mb-0.5">{pr.metric}</div>
                          <div className="text-slate-500 text-xs">Previous: {pr.previous}</div>
                        </div>
                      </div>
                      <div className="flex items-center bg-primary/10 border border-primary/20 px-2 py-1 rounded-lg">
                        <ArrowUpRight className="w-3.5 h-3.5 text-primary mr-1" strokeWidth={3} />
                        <span className="text-primary text-xs font-bold uppercase tracking-wider">New PR</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Exercises Performed Section */}
            <div>
              <div className="flex items-center justify-between mb-4 mt-2">
                 <h3 className="font-bold text-white text-lg">Exercises Performed</h3>
                 <button className="text-primary text-sm font-medium hover:text-primary-dark hidden md:block">View All Sets</button>
              </div>

              <div className="bg-slate-800/30 border border-slate-800 rounded-2xl overflow-hidden">
                {/* Table Header (Desktop) */}
                <div className="hidden md:flex text-xs font-semibold text-slate-400 p-4 border-b border-slate-800/50">
                   <div className="w-12 text-center">#</div>
                   <div className="flex-1">Exercise</div>
                   <div className="w-24 text-center">Sets</div>
                   <div className="w-32 text-right pr-4">Best Set</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-slate-800/50">
                   {selectedExercises.map((exercise, index) => {
                     const exData = workoutData[exercise.id] || { sets: [] };
                     const setsCount = exData.sets.length;
                     
                     // Find best set mock logic (highest weight)
                     let bestSet = null;
                     exData.sets.forEach(set => {
                        const weight = parseFloat(set.weight);
                        const reps = parseInt(set.reps);
                        if (!bestSet && weight && reps) {
                           bestSet = set;
                        } else if (bestSet && weight > parseFloat(bestSet.weight)) {
                           bestSet = set;
                        }
                     });

                     return (
                       <div 
                         key={exercise.id} 
                         onClick={() => navigate(`/workout/exercise/${exercise.id}`, { state: { exercise, exData, workoutDate: currentDate } })}
                         className="flex items-center p-3 md:p-4 hover:bg-slate-800/20 transition-colors cursor-pointer"
                       >
                         <div className="w-8 md:w-12 font-bold text-slate-500 text-center text-sm mr-3 md:mr-0">{index + 1}</div>
                         
                         <div className="flex items-center flex-1 min-w-0">
                           <div className="w-10 h-10 md:hidden rounded-lg bg-slate-800 flex items-center justify-center mr-3 border border-slate-700 flex-shrink-0">
                             <User className="w-5 h-5 text-slate-400" />
                           </div>
                           <div className="hidden md:flex w-10 h-10 rounded-lg bg-slate-800 items-center justify-center mr-4 border border-slate-700 flex-shrink-0">
                             <User className="w-5 h-5 text-slate-400" />
                           </div>
                           
                           <div className="flex-1 min-w-0">
                             <h4 className="text-white text-sm font-semibold truncate">{exercise.name}</h4>
                             <p className="text-slate-500 text-xs hidden md:block">{exercise.category}</p>
                             
                             {/* Mobile sets/best set display */}
                             <p className="text-slate-400 text-xs md:hidden mt-0.5">
                               {setsCount} sets {bestSet ? `• ${bestSet.weight} kg × ${bestSet.reps}` : ''}
                             </p>
                           </div>
                         </div>

                         <div className="hidden md:block w-24 text-center text-slate-300 text-sm">{setsCount}</div>
                         <div className="hidden md:flex w-32 justify-end items-center text-sm font-medium text-slate-300">
                            {bestSet ? `${bestSet.weight} kg × ${bestSet.reps}` : '--'}
                            <ChevronRight className="w-4 h-4 text-slate-500 ml-2" />
                         </div>
                         
                         {/* Mobile Arrow */}
                         <div className="md:hidden ml-2">
                           <ChevronRight className="w-5 h-5 text-slate-600" />
                         </div>
                       </div>
                     );
                   })}
                </div>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex flex-col pt-4 pb-2">
              <button onClick={() => navigate('/')} className="w-full py-3.5 bg-slate-800/80 text-white hover:bg-slate-700 border border-slate-700 rounded-xl text-sm font-semibold transition-colors">
                Go Home
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSummary;
