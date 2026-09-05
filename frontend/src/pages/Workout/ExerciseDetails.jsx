import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Edit3, ArrowUp, ArrowDown, ExternalLink, Info, Trophy, User, Check, ArrowRight } from 'lucide-react';

const ExerciseDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract or mock state
  const state = location.state || {};
  const exercise = state.exercise || { id: '1', name: 'Seated Cable Row', category: 'Back' };
  const exData = state.exData || { sets: [{ weight: '25', reps: '12' }, { weight: '25', reps: '12' }, { weight: '20', reps: '15' }], notes: 'Felt good today. Energy was better in the second half of the workout.' };
  const workoutDate = state.workoutDate || 'Sat, 5 Sep 2026';
  
  const [notes, setNotes] = useState(exData.notes || '');
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  // Mock previous data for the sake of comparison
  const previousWorkout = {
    date: 'Thu, 3 Sep 2026',
    sets: [
      { weight: '20', reps: '12' },
      { weight: '20', reps: '12' },
      { weight: '15', reps: '15' }
    ]
  };

  // Derive stats
  const calculateTotalReps = (sets) => sets.reduce((acc, set) => acc + (parseInt(set.reps) || 0), 0);
  const findHeaviest = (sets) => {
    let max = 0;
    sets.forEach(s => {
      const w = parseFloat(s.weight);
      if (w > max) max = w;
    });
    return max;
  };
  const findBestSet = (sets) => {
    let best = null;
    let maxWeight = 0;
    sets.forEach(s => {
      const w = parseFloat(s.weight);
      if (w > maxWeight) {
        maxWeight = w;
        best = s;
      }
    });
    return best;
  };

  const todayTotalSets = exData.sets.length;
  const prevTotalSets = previousWorkout.sets.length;
  
  const todayTotalReps = calculateTotalReps(exData.sets);
  const prevTotalReps = calculateTotalReps(previousWorkout.sets);
  
  const todayHeaviest = findHeaviest(exData.sets);
  const prevHeaviest = findHeaviest(previousWorkout.sets);
  
  const todayBest = findBestSet(exData.sets);
  const prevBest = findBestSet(previousWorkout.sets);

  const hasPR = todayHeaviest > prevHeaviest;

  // Render a comparison indicator arrow
  const renderIndicator = (todayVal, prevVal) => {
    if (todayVal > prevVal) return <ArrowUp className="w-4 h-4 text-primary" strokeWidth={3} />;
    if (todayVal < prevVal) return <ArrowDown className="w-4 h-4 text-red-500" strokeWidth={3} />;
    return <span className="text-slate-500 font-bold">=</span>;
  };

  // Mock history chart data
  const historyData = [
    { date: '10 Aug', weight: 15 },
    { date: '17 Aug', weight: 20 },
    { date: '24 Aug', weight: 20 },
    { date: '3 Sep', weight: 22.5 },
    { date: '5 Sep', weight: 25, isCurrent: true },
  ];
  const maxHistoryWeight = 30;

  return (
    <div className="flex flex-col h-full md:-mx-8 md:-my-8 text-slate-200 bg-dark-bg">
      
      {/* Laptop Header */}
      <div className="hidden md:flex flex-col p-8 border-b border-slate-800 bg-dark-bg sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="flex items-center text-slate-400 hover:text-white transition-colors mb-6 w-fit">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Workout Summary
        </button>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center mr-6 border border-slate-700">
              <User className="w-10 h-10 text-slate-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-3">{exercise.name}</h1>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-lg text-sm font-semibold">{exercise.category}</span>
                <span className="text-slate-400 text-sm">{workoutDate}</span>
                <span className="text-slate-500 text-sm border-l border-slate-700 pl-4">A compound pulling exercise that targets the middle back, lats and biceps.</span>
              </div>
            </div>
          </div>
          
          <button className="flex items-center px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors">
            View Exercise <ExternalLink className="w-4 h-4 ml-2 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex flex-col p-4 border-b border-slate-800 bg-dark-bg sticky top-0 z-20">
         <div className="flex items-center mb-4">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-slate-300 hover:text-white transition-colors">
            <ChevronLeft className="w-7 h-7" strokeWidth={2} />
          </button>
          <div className="ml-2">
            <h1 className="text-lg font-bold text-white leading-none">Exercise Details</h1>
            <p className="text-xs text-slate-400 mt-1">From Workout - {workoutDate}</p>
          </div>
         </div>
         
         <div className="flex items-center mt-2">
           <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center mr-4 border border-slate-700">
             <User className="w-7 h-7 text-slate-400" />
           </div>
           <div>
             <h2 className="text-xl font-bold text-white mb-1.5">{exercise.name}</h2>
             <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary rounded-[6px] text-xs font-semibold">{exercise.category}</span>
           </div>
         </div>
         <p className="text-slate-400 text-xs mt-4">A compound pulling exercise that targets the middle back, lats and biceps.</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 hide-scrollbar">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8">
          
          {/* Main Content Columns (Laptop: 3 cols, Mobile: stacked) */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            
            {/* Column 1: Today's Performance & Notes */}
            <div className="space-y-6 md:space-y-8">
              {/* Today's Performance */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white text-[16px]">Today's Performance</h3>
                  <span className="text-[13px] text-slate-400 font-medium">{todayTotalSets} sets</span>
                </div>
                
                <div>
                  <div className="flex text-[13px] font-medium text-slate-300 mb-3 px-2">
                    <div className="w-10 text-center">Set</div>
                    <div className="flex-1 text-center">Weight (kg)</div>
                    <div className="flex-[0.85] text-center">Reps</div>
                  </div>
                  <div className="space-y-2">
                    {exData.sets.map((set, idx) => (
                      <div key={idx} className="flex items-center px-2">
                        <div className="w-10 text-center font-bold text-white text-[15px]">{idx + 1}</div>
                        <div className="flex-1 px-1.5">
                          <div className="bg-slate-800/50 rounded-lg py-2.5 text-center font-medium text-slate-200 text-[15px]">
                            {set.weight || '--'}
                          </div>
                        </div>
                        <div className="flex-[0.85] px-1.5">
                          <div className="bg-slate-800/50 rounded-lg py-2.5 text-center font-medium text-slate-200 text-[15px]">
                            {set.reps || '--'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notes (Desktop only in this column, mobile below) */}
              <div className="hidden md:block">
                 <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center text-slate-300">
                     <Edit3 className="w-4 h-4 mr-2" />
                     <h3 className="font-bold">Notes</h3>
                   </div>
                   <button 
                     onClick={() => setIsEditingNotes(!isEditingNotes)} 
                     className="text-xs flex items-center px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
                   >
                     {isEditingNotes ? <><Check className="w-3 h-3 mr-1"/> Save</> : <><Edit3 className="w-3 h-3 mr-1"/> Edit</>}
                   </button>
                 </div>
                 <div className="bg-slate-800/20 border border-slate-800 rounded-2xl p-4">
                   {isEditingNotes ? (
                     <textarea 
                       className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-primary min-h-[100px]"
                       value={notes}
                       onChange={(e) => setNotes(e.target.value)}
                       placeholder="Add a note for this exercise..."
                     />
                   ) : (
                     <p className="text-sm text-slate-300 min-h-[60px]">{notes || <span className="text-slate-600 italic">No notes recorded.</span>}</p>
                   )}
                 </div>
              </div>
            </div>

            {/* Column 2: Previous Workout & PR */}
            <div className="space-y-6 md:space-y-8">
              {/* Previous Workout */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-white text-[16px]">Previous Workout</h3>
                  <span className="text-[13px] text-slate-400 font-medium">{prevTotalSets} sets</span>
                </div>
                <p className="text-[13px] text-slate-400 mb-4">{previousWorkout.date}</p>
                
                <div>
                  <div className="flex text-[13px] font-medium text-slate-300 mb-3 px-2">
                    <div className="w-10 text-center">Set</div>
                    <div className="flex-1 text-center">Weight (kg)</div>
                    <div className="flex-[0.85] text-center">Reps</div>
                  </div>
                  <div className="space-y-2">
                    {previousWorkout.sets.map((set, idx) => (
                      <div key={idx} className="flex items-center px-2">
                        <div className="w-10 text-center font-bold text-white text-[15px]">{idx + 1}</div>
                        <div className="flex-1 px-1.5">
                          <div className="bg-slate-800/50 rounded-lg py-2.5 text-center font-medium text-slate-200 text-[15px]">
                            {set.weight}
                          </div>
                        </div>
                        <div className="flex-[0.85] px-1.5">
                          <div className="bg-slate-800/50 rounded-lg py-2.5 text-center font-medium text-slate-200 text-[15px]">
                            {set.reps}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Personal Record (Desktop only in this col) */}
              {hasPR && (
                <div className="hidden md:block bg-primary/10 border border-primary/20 rounded-2xl p-5">
                   <div className="flex items-center mb-2">
                     <Trophy className="w-5 h-5 text-primary mr-2" />
                     <h3 className="font-bold text-primary text-lg">New Personal Record!</h3>
                   </div>
                   <p className="text-sm text-primary/80 ml-7">Heaviest weight: {todayHeaviest} kg (previously {prevHeaviest} kg)</p>
                </div>
              )}
            </div>

            {/* Column 3: Performance Comparison */}
            <div className="space-y-6 md:space-y-8">
               <div>
                  <h3 className="font-bold text-white text-lg mb-4">Performance Comparison</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                    {/* Total Sets */}
                    <div className="bg-slate-800/30 border border-slate-800 rounded-2xl p-4 flex items-center">
                       <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mr-4 flex-shrink-0">
                         <div className="flex space-x-1">
                           <div className="w-1 h-3 bg-primary rounded-full"></div>
                           <div className="w-1 h-4 bg-primary rounded-full"></div>
                           <div className="w-1 h-2 bg-primary rounded-full"></div>
                         </div>
                       </div>
                       <div className="flex-1">
                          <div className="text-xs text-slate-400 mb-0.5">Total Sets</div>
                          <div className="flex items-center justify-between">
                            <div>
                               <span className="text-lg font-bold text-white leading-none mr-2">{todayTotalSets}</span>
                               <span className="text-[10px] text-slate-500">vs {prevTotalSets} previous</span>
                            </div>
                            {renderIndicator(todayTotalSets, prevTotalSets)}
                          </div>
                       </div>
                    </div>

                    {/* Best Set */}
                    <div className="bg-slate-800/30 border border-slate-800 rounded-2xl p-4 flex items-center">
                       <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mr-4 flex-shrink-0">
                          <Trophy className="w-4 h-4 text-primary" />
                       </div>
                       <div className="flex-1">
                          <div className="text-xs text-slate-400 mb-0.5">Best Set</div>
                          <div className="flex items-center justify-between">
                            <div>
                               <div className="text-sm font-bold text-white leading-none mb-1">{todayBest?.weight} kg × {todayBest?.reps}</div>
                               <div className="text-[10px] text-slate-500 leading-none">vs {prevBest?.weight} kg × {prevBest?.reps}</div>
                            </div>
                            {renderIndicator(parseFloat(todayBest?.weight), parseFloat(prevBest?.weight))}
                          </div>
                       </div>
                    </div>

                    {/* Total Reps */}
                    <div className="bg-slate-800/30 border border-slate-800 rounded-2xl p-4 flex items-center">
                       <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mr-4 flex-shrink-0">
                          <div className="w-4 h-4 border-2 border-primary rounded-full border-t-transparent animate-spin" style={{animationDuration: '3s'}}></div>
                       </div>
                       <div className="flex-1">
                          <div className="text-xs text-slate-400 mb-0.5">Total Reps</div>
                          <div className="flex items-center justify-between">
                            <div>
                               <span className="text-lg font-bold text-white leading-none mr-2">{todayTotalReps}</span>
                               <span className="text-[10px] text-slate-500">vs {prevTotalReps}</span>
                            </div>
                            {renderIndicator(todayTotalReps, prevTotalReps)}
                          </div>
                       </div>
                    </div>

                    {/* Heaviest Weight */}
                    <div className="bg-slate-800/30 border border-slate-800 rounded-2xl p-4 flex items-center">
                       <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mr-4 flex-shrink-0">
                         <div className="flex items-end space-x-0.5 h-4">
                           <div className="w-1.5 h-2 bg-primary/40 rounded-t-[1px]"></div>
                           <div className="w-1.5 h-3 bg-primary/70 rounded-t-[1px]"></div>
                           <div className="w-1.5 h-4 bg-primary rounded-t-[1px]"></div>
                         </div>
                       </div>
                       <div className="flex-1">
                          <div className="text-xs text-slate-400 mb-0.5">Heaviest Weight</div>
                          <div className="flex items-center justify-between">
                            <div>
                               <span className="text-lg font-bold text-white leading-none mr-2">{todayHeaviest} kg</span>
                               <span className="text-[10px] text-slate-500">vs {prevHeaviest} kg</span>
                            </div>
                            {renderIndicator(todayHeaviest, prevHeaviest)}
                          </div>
                       </div>
                    </div>

                  </div>
               </div>
            </div>

            {/* Mobile specific layout rendering for Notes and PR */}
            <div className="md:hidden space-y-6">
              {/* Notes */}
              <div>
                 <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center text-slate-300">
                     <Edit3 className="w-4 h-4 mr-2" />
                     <h3 className="font-bold">Notes</h3>
                   </div>
                   <button 
                     onClick={() => setIsEditingNotes(!isEditingNotes)} 
                     className="text-xs flex items-center px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
                   >
                     {isEditingNotes ? <><Check className="w-3 h-3 mr-1"/> Save</> : <><Edit3 className="w-3 h-3 mr-1"/> Edit</>}
                   </button>
                 </div>
                 <div className="bg-slate-800/20 border border-slate-800 rounded-2xl p-4">
                   {isEditingNotes ? (
                     <textarea 
                       className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-primary min-h-[100px]"
                       value={notes}
                       onChange={(e) => setNotes(e.target.value)}
                       placeholder="Add a note for this exercise..."
                     />
                   ) : (
                     <p className="text-sm text-slate-300 min-h-[60px]">{notes || <span className="text-slate-600 italic">No notes recorded.</span>}</p>
                   )}
                 </div>
              </div>

              {/* Personal Record */}
              {hasPR && (
                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex flex-col justify-center items-center text-center">
                   <div className="flex items-center mb-2">
                     <Trophy className="w-5 h-5 text-primary mr-2" />
                     <h3 className="font-bold text-primary text-lg">New Personal Record!</h3>
                   </div>
                   <p className="text-sm text-primary/80">Heaviest weight: {todayHeaviest} kg (previously {prevHeaviest} kg)</p>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Bottom Section (Full Width): Chart & Info */}
        <div className="max-w-7xl mx-auto mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 border-t border-slate-800/50 pt-8 pb-12">
           
           {/* Exercise History (Chart) */}
           <div>
             <h3 className="font-semibold text-white text-[16px] mb-8">Exercise History <span className="text-[13px] text-slate-400 font-normal ml-1">(Last 5 Workouts)</span></h3>
             
             <div className="flex items-end h-48 space-x-2 md:space-x-4 pb-8 relative">
               {/* Y-Axis labels */}
               <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[12px] text-slate-500">
                 <span>30</span>
                 <span>20</span>
                 <span>10</span>
                 <span>0</span>
               </div>
               
               <div className="ml-8 flex-1 flex items-end justify-between h-full border-b border-slate-800/60 relative z-10">
                 {/* Grid lines */}
                 <div className="absolute w-full h-[1px] bg-slate-800/40 bottom-1/3 z-0"></div>
                 <div className="absolute w-full h-[1px] bg-slate-800/40 bottom-2/3 z-0"></div>
                 <div className="absolute w-full h-[1px] bg-slate-800/40 top-0 z-0"></div>

                 {historyData.map((data, idx) => {
                   const heightPercent = (data.weight / maxHistoryWeight) * 100;
                   return (
                     <div key={idx} className="flex flex-col items-center justify-end h-full z-10 w-full relative group">
                       <span className={`text-[12px] font-medium mb-1.5 ${data.isCurrent ? 'text-white font-bold' : 'text-slate-300'}`}>
                         {data.weight} kg
                       </span>
                       <div 
                         className={`w-8 md:w-10 rounded-t-md transition-all duration-500 ${data.isCurrent ? 'bg-primary shadow-[0_0_15px_rgba(141,198,63,0.3)]' : 'bg-slate-500/70 group-hover:bg-slate-400/80'}`} 
                         style={{ height: `${heightPercent}%` }}
                       ></div>
                       <span className={`text-[12px] mt-2 absolute -bottom-7 whitespace-nowrap ${data.isCurrent ? 'text-slate-300' : 'text-slate-500'}`}>
                         {data.date}
                       </span>
                     </div>
                   );
                 })}
               </div>
             </div>
           </div>

           {/* About Exercise */}
           <div className="mt-4 md:mt-0">
             <div className="bg-slate-800/30 border border-slate-800/60 rounded-2xl p-6 h-full flex flex-col justify-center">
               <div className="flex items-center mb-3">
                 <Info className="w-5 h-5 text-slate-300 mr-2" />
                 <h3 className="font-semibold text-white text-[15px]">About {exercise.name}</h3>
               </div>
               <p className="text-slate-400 text-[13px] leading-relaxed mb-5">
                 {exercise.name} primarily targets the middle back (rhomboids), lats, rear delts, and biceps. Focus on controlled movement and a full range of motion.
               </p>
               <button className="text-primary font-medium text-[13px] hover:text-primary-dark transition-colors flex items-center w-fit">
                 View Exercise Details <ArrowRight className="w-4 h-4 ml-1.5" />
               </button>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

// Add ChevronRight locally if needed since not imported at top
const ChevronRight = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);

export default ExerciseDetails;
