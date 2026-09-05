import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronDown, CheckCircle2, Circle, Clock, Dumbbell, Flame, BarChart2, Plus, Trash2, ArrowRight, User, MoreHorizontal, Copy } from 'lucide-react';

// Mock previous workout data for demonstration
const MOCK_PREVIOUS_WORKOUT = {
  '1': [ { weight: '20', reps: '12' }, { weight: '20', reps: '12' }, { weight: '15', reps: '15' } ],
  '2': [ { weight: '40', reps: '10' }, { weight: '40', reps: '10' } ],
  '3': [ { weight: '60', reps: '8' }, { weight: '60', reps: '8' }, { weight: '60', reps: '8' } ],
  '4': [ { weight: '25', reps: '10' }, { weight: '25', reps: '10' }, { weight: '25', reps: '10' } ]
};

const ActiveWorkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const selectedExercises = location.state?.selectedExercises || [];
  
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isQueueExpanded, setIsQueueExpanded] = useState(true);
  
  const [workoutData, setWorkoutData] = useState(() => {
    const initialData = {};
    selectedExercises.forEach(ex => {
      initialData[ex.id] = {
        status: 'not_started', // not_started, in_progress, completed
        sets: [ { weight: '', reps: '', notes: '' } ],
        notes: ''
      };
    });
    if (selectedExercises.length > 0) {
       initialData[selectedExercises[0].id].status = 'in_progress';
    }
    return initialData;
  });

  useEffect(() => {
    if (selectedExercises.length === 0) {
      navigate('/workout');
    }
  }, [selectedExercises, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (selectedExercises.length === 0) return null;

  const currentExercise = selectedExercises[activeExerciseIndex];
  const currentData = workoutData[currentExercise.id];
  const previousSets = MOCK_PREVIOUS_WORKOUT[currentExercise.id] || [];

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSetChange = (setIndex, field, value) => {
    const updatedSets = [...currentData.sets];
    updatedSets[setIndex][field] = value;
    
    setWorkoutData(prev => ({
      ...prev,
      [currentExercise.id]: {
        ...prev[currentExercise.id],
        sets: updatedSets,
        status: 'in_progress'
      }
    }));
  };

  const addSet = () => {
    setWorkoutData(prev => ({
      ...prev,
      [currentExercise.id]: {
        ...prev[currentExercise.id],
        sets: [...prev[currentExercise.id].sets, { weight: '', reps: '', notes: '' }],
        status: 'in_progress'
      }
    }));
  };

  const removeSet = (setIndex) => {
    const updatedSets = currentData.sets.filter((_, idx) => idx !== setIndex);
    setWorkoutData(prev => ({
      ...prev,
      [currentExercise.id]: {
        ...prev[currentExercise.id],
        sets: updatedSets.length > 0 ? updatedSets : [{ weight: '', reps: '', notes: '' }]
      }
    }));
  };

  const handleNotesChange = (value) => {
    setWorkoutData(prev => ({
      ...prev,
      [currentExercise.id]: {
        ...prev[currentExercise.id],
        notes: value
      }
    }));
  };

  const usePreviousWorkout = () => {
    if (previousSets.length > 0) {
      const newSets = previousSets.map(set => ({ ...set, notes: '' }));
      setWorkoutData(prev => ({
        ...prev,
        [currentExercise.id]: {
          ...prev[currentExercise.id],
          sets: newSets,
          status: 'in_progress'
        }
      }));
    }
  };

  const copyPreviousSet = (previousSet) => {
    const emptySetIndex = currentData.sets.findIndex(s => s.weight === '' && s.reps === '');
    
    if (emptySetIndex !== -1) {
      // Fill the empty set
      const updatedSets = [...currentData.sets];
      updatedSets[emptySetIndex] = { ...updatedSets[emptySetIndex], weight: previousSet.weight, reps: previousSet.reps };
      setWorkoutData(prev => ({
        ...prev,
        [currentExercise.id]: {
          ...prev[currentExercise.id],
          sets: updatedSets,
          status: 'in_progress'
        }
      }));
    } else {
      // Append a new set
      setWorkoutData(prev => ({
        ...prev,
        [currentExercise.id]: {
          ...prev[currentExercise.id],
          sets: [...currentData.sets, { weight: previousSet.weight, reps: previousSet.reps, notes: '' }],
          status: 'in_progress'
        }
      }));
    }
  };

  const handleSaveAndNext = () => {
    const updatedData = {
      ...workoutData,
      [currentExercise.id]: {
        ...workoutData[currentExercise.id],
        status: 'completed'
      }
    };

    if (activeExerciseIndex < selectedExercises.length - 1) {
      const nextId = selectedExercises[activeExerciseIndex + 1].id;
      if (updatedData[nextId].status === 'not_started') {
         updatedData[nextId].status = 'in_progress';
      }
      setWorkoutData(updatedData);
      setActiveExerciseIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      setWorkoutData(updatedData);
    }
  };

  const handlePreviousExercise = () => {
    if (activeExerciseIndex > 0) {
      setActiveExerciseIndex(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleNextExercise = () => {
    if (activeExerciseIndex < selectedExercises.length - 1) {
      setActiveExerciseIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleJumpToExercise = (index) => {
     const targetId = selectedExercises[index].id;
     const updatedData = { ...workoutData };
     if (updatedData[targetId].status === 'not_started') {
         updatedData[targetId].status = 'in_progress';
     }
     setWorkoutData(updatedData);
     setActiveExerciseIndex(index);
     window.scrollTo(0, 0);
  };

  const finishWorkout = () => {
    if (window.confirm("Are you sure you want to finish this workout?")) {
      navigate('/');
    }
  };

  const completedCount = selectedExercises.filter(ex => workoutData[ex.id]?.status === 'completed').length;
  let totalVolume = 0;
  Object.values(workoutData).forEach(data => {
    data.sets.forEach(set => {
      const weight = parseFloat(set.weight) || 0;
      const reps = parseInt(set.reps) || 0;
      totalVolume += (weight * reps);
    });
  });

  return (
    <div className="flex flex-col h-full md:-mx-8 md:-my-8 text-slate-200">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between p-4 md:px-8 border-b border-slate-800 bg-dark-bg sticky top-0 z-20">
        <div className="flex items-center">
          <button onClick={() => navigate('/workout')} className="mr-3 md:mr-4 p-1 md:p-2.5 -ml-1 md:ml-0 text-slate-300 hover:text-white md:bg-slate-800/50 md:border md:border-slate-700 rounded-xl transition-colors">
            <ChevronLeft className="w-7 h-7 md:w-5 md:h-5" strokeWidth={2} />
          </button>
          <div className="flex flex-col justify-center">
            <h1 className="text-lg md:text-xl font-bold text-white leading-none mb-1 md:mb-1.5">Active Workout</h1>
            <p className="text-[12px] md:text-sm text-slate-400 leading-none hidden md:block">{currentExercise.category} &bull; {activeExerciseIndex + 1} of {selectedExercises.length} exercises</p>
            <p className="text-[12px] text-slate-400 leading-none md:hidden">{activeExerciseIndex + 1} of {selectedExercises.length} exercises</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 md:space-x-6 flex-shrink-0">
          {/* Desktop Timer: Icon left, text stacked right */}
          <div className="hidden md:flex items-center flex-shrink-0">
             <Clock className="w-7 h-7 text-slate-300 mr-3 flex-shrink-0" strokeWidth={1.5} />
             <div className="flex flex-col justify-center flex-shrink-0">
               <span className="text-xs text-slate-400 mb-1 leading-none whitespace-nowrap">Workout Time</span>
               <span className="text-primary font-mono font-bold text-xl leading-none whitespace-nowrap">{formatTime(elapsedSeconds)}</span>
             </div>
          </div>
          
          {/* Mobile Timer: Icon top, text bottom */}
          <div className="md:hidden flex flex-col items-center justify-center px-2 flex-shrink-0">
            <Clock className="w-5 h-5 text-slate-200 mb-1 flex-shrink-0" strokeWidth={2} />
            <span className="text-primary font-mono font-bold text-sm leading-none whitespace-nowrap">{formatTime(elapsedSeconds)}</span>
          </div>

          <button 
            onClick={finishWorkout}
            className="px-5 py-2.5 bg-red-950/60 text-red-500 border border-red-900/80 rounded-xl text-sm font-semibold hover:bg-red-900/50 transition-colors hidden md:block flex-shrink-0 whitespace-nowrap"
          >
            Finish Workout
          </button>
          <button 
            onClick={finishWorkout}
            className="px-4 py-2 bg-red-950/60 text-red-500 border border-red-900/80 rounded-xl text-sm font-semibold hover:bg-red-900/50 transition-colors md:hidden flex-shrink-0 whitespace-nowrap"
          >
            Finish
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden relative">
        
        {/* Left Column: Active Exercise Input (Scrollable) */}
        <div className="flex-1 overflow-y-auto hide-scrollbar p-4 md:p-8 pb-40 md:pb-8">
          
          {/* Active Exercise Header */}
          <div className="flex items-center justify-between mb-6 md:mb-8 bg-dark-bg md:bg-transparent -mx-4 md:mx-0 px-4 md:px-0 pt-2 md:pt-0">
            <div className="flex items-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-slate-800 flex items-center justify-center mr-4 border border-slate-700">
                <User className="w-6 h-6 md:w-8 md:h-8 text-slate-500" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-1">{currentExercise.name}</h2>
                <div className="flex space-x-2">
                  <span className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-400 font-medium">{currentExercise.category}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Previous Workout Stats */}
          <div className="mb-6 bg-slate-800/30 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-start">
                <div className="mr-2 mt-0.5">
                   <Copy className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-300">Previous Workout</h3>
                  <p className="text-xs text-slate-500">3 Sep 2026</p>
                </div>
              </div>
              {previousSets.length > 0 && (
                <button 
                  onClick={usePreviousWorkout}
                  className="text-primary text-sm font-medium hover:text-primary-dark"
                >
                  Use Previous
                </button>
              )}
            </div>
            
            {previousSets.length > 0 ? (
              <div className="flex flex-wrap">
                {previousSets.map((set, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => copyPreviousSet(set)}
                    className="bg-slate-800/30 border border-slate-800 px-4 py-2 rounded-xl text-sm font-medium text-slate-300 mr-3 mb-3 transition-colors hover:bg-slate-800/60 hover:text-white cursor-pointer"
                  >
                    {set.weight} kg &times; {set.reps}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic">No previous data found for this exercise.</p>
            )}
          </div>

          {/* Sets Input Headers */}
          <div className="flex mb-2 px-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <div className="w-10 md:w-12 text-center">Set</div>
            <div className="flex-1 text-center px-1">Weight (kg)</div>
            <div className="flex-1 text-center px-1">Reps</div>
            <div className="flex-[2] hidden md:block text-center px-1">Notes</div>
            <div className="w-10 text-center"></div>
          </div>

          {/* Sets Rows */}
          <div className="space-y-2 md:space-y-3 mb-4">
            {currentData.sets.map((set, idx) => (
              <div key={idx} className="flex items-center">
                <div className="w-10 md:w-12 font-bold text-slate-300 text-center text-sm md:text-base">
                  {idx + 1}
                </div>
                <div className="flex-1 px-1">
                  <input
                    type="text"
                    inputMode="decimal"
                    pattern="[0-9]*"
                    placeholder="--"
                    value={set.weight}
                    onChange={(e) => handleSetChange(idx, 'weight', e.target.value)}
                    className="w-full bg-slate-800/60 md:bg-slate-800/80 border border-slate-700 text-white font-medium rounded-lg px-2 md:px-3 py-2.5 text-center focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div className="flex-1 px-1">
                  <input
                    type="text"
                    inputMode="decimal"
                    pattern="[0-9]*"
                    placeholder="--"
                    value={set.reps}
                    onChange={(e) => handleSetChange(idx, 'reps', e.target.value)}
                    className="w-full bg-slate-800/60 md:bg-slate-800/80 border border-slate-700 text-white font-medium rounded-lg px-2 md:px-3 py-2.5 text-center focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div className="flex-[2] hidden md:block px-1">
                  <input
                    type="text"
                    placeholder=""
                    value={set.notes || ''}
                    onChange={(e) => handleSetChange(idx, 'notes', e.target.value)}
                    className="w-full bg-slate-800/60 md:bg-slate-800/80 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div className="w-10 flex justify-center">
                  <button 
                    onClick={() => removeSet(idx)}
                    className="p-1.5 md:p-2 text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={addSet}
            className="w-full py-3 bg-primary/10 border border-primary/30 text-primary rounded-lg font-semibold flex items-center justify-center hover:bg-primary/20 transition-colors mb-6"
          >
            <Plus className="w-5 h-5 mr-2" /> Add Set
          </button>

          {/* Exercise Notes */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-400 mb-2">Notes (optional)</label>
            <textarea
              value={currentData.notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="How did it feel?"
              rows={2}
              className="w-full bg-slate-800/40 border border-slate-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
            />
          </div>

          {/* Desktop Navigation Buttons */}
          <div className="hidden md:flex items-center space-x-4 mt-auto pt-4 border-t border-slate-800">
             <button 
              onClick={handlePreviousExercise}
              disabled={activeExerciseIndex === 0}
              className={`flex-1 py-3.5 rounded-xl font-bold flex items-center justify-center transition-colors ${
                activeExerciseIndex === 0 
                  ? 'bg-transparent text-slate-600 cursor-not-allowed'
                  : 'bg-slate-800/50 text-white hover:bg-slate-800'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-1" /> Previous Exercise
            </button>
            <button 
              onClick={handleSaveAndNext}
              className="flex-[2] py-3.5 rounded-xl bg-primary text-dark-bg font-bold flex items-center justify-center hover:bg-primary-dark transition-colors"
            >
              {activeExerciseIndex === selectedExercises.length - 1 ? 'Save Exercise' : 'Save & Next'}
              {activeExerciseIndex < selectedExercises.length - 1 && <ArrowRight className="w-5 h-5 ml-2" />}
            </button>
          </div>
          
          {/* Mobile Today's Workout Queue (Below content) */}
          <div className="md:hidden mt-8 pt-6 border-t border-slate-800">
            <button 
              onClick={() => setIsQueueExpanded(!isQueueExpanded)}
              className="flex items-center justify-between w-full mb-4 group"
            >
              <h2 className="text-lg font-bold text-white group-hover:text-slate-300 transition-colors">Today's Workout ({selectedExercises.length})</h2>
              <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isQueueExpanded ? '' : '-rotate-90'}`} />
            </button>
            
            {isQueueExpanded && (
              <div className="space-y-3">
                {selectedExercises.map((exercise, idx) => {
                  const isCurrent = idx === activeExerciseIndex;
                  const isPast = idx < activeExerciseIndex;
                  const status = workoutData[exercise.id]?.status || 'not_started';
                  const isCompleted = status === 'completed';

                  return (
                    <div 
                      key={exercise.id} 
                      className={`flex items-center p-3 rounded-xl border cursor-pointer transition-colors ${
                        isCurrent ? 'bg-primary/10 border-primary/30' : 'bg-slate-800/30 border-slate-800/50 hover:bg-slate-800/60'
                      }`}
                      onClick={() => handleJumpToExercise(idx)}
                    >
                      <div className="mr-3 flex-shrink-0 flex items-center justify-center w-6">
                        {isCompleted || isPast ? (
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        ) : isCurrent ? (
                          <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary/20" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h4 className={`text-sm truncate ${isCurrent ? 'text-white font-semibold' : isCompleted || isPast ? 'text-slate-400' : 'text-slate-300'}`}>
                          {exercise.name}
                        </h4>
                        <p className="text-xs text-slate-500 truncate">{exercise.category}</p>
                      </div>
                      {status === 'in_progress' && !isCurrent && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded ml-2 whitespace-nowrap border border-primary/20">
                          In Progress
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Extra spacer at the bottom for mobile so the sticky button doesn't cover content */}
          <div className="h-32 w-full md:hidden flex-shrink-0"></div>
        </div>

        {/* Right Column: Queue and Stats (Desktop Only) */}
        <div className="hidden lg:flex w-[380px] flex-col border-l border-slate-800 bg-dark-bg h-full overflow-y-auto hide-scrollbar p-6">
          
          {/* Today's Workout Queue */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">Today's Workout</h3>
              <span className="text-xs font-medium text-slate-400">{selectedExercises.length} exercises</span>
            </div>
            
            <div className="space-y-2">
              {selectedExercises.map((exercise, index) => {
                const status = workoutData[exercise.id].status;
                const isActive = index === activeExerciseIndex;
                
                return (
                  <div 
                    key={exercise.id}
                    onClick={() => handleJumpToExercise(index)}
                    className={`flex items-center p-3 rounded-xl border cursor-pointer transition-colors ${
                      isActive ? 'border-primary/50 bg-primary/5' : 'border-slate-800 bg-dark-card hover:border-slate-700'
                    }`}
                  >
                    <div className="flex-shrink-0 w-8 flex justify-center mr-3">
                       {status === 'completed' && !isActive ? (
                         <CheckCircle2 className="w-6 h-6 text-primary" />
                       ) : isActive ? (
                         <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                           <div className="w-3 h-3 rounded-full bg-primary" />
                         </div>
                       ) : (
                         <div className="w-6 h-6 rounded-full border border-slate-600 flex items-center justify-center text-xs text-slate-500 font-medium">{index + 1}</div>
                       )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-sm font-semibold truncate ${isActive ? 'text-white' : status === 'completed' ? 'text-slate-400' : 'text-slate-200'}`}>
                        {exercise.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {workoutData[exercise.id].sets.length} sets
                      </p>
                    </div>

                    {status === 'in_progress' && !isActive && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded ml-2 whitespace-nowrap border border-primary/20">
                        In Progress
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Stats */}
          <div>
             <h3 className="font-bold text-white mb-4">Workout Stats (Live)</h3>
             <div className="grid grid-cols-2 gap-3">
                <div className="bg-dark-card border border-slate-800 rounded-xl p-4 flex flex-col justify-center">
                  <div className="flex items-center text-slate-400 mb-2">
                    <Dumbbell className="w-4 h-4 mr-2 text-primary" />
                    <span className="text-lg font-bold text-white">{completedCount} / {selectedExercises.length}</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">Exercises completed</div>
                </div>

                <div className="bg-dark-card border border-slate-800 rounded-xl p-4 flex flex-col justify-center">
                  <div className="flex items-center text-slate-400 mb-2">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    <span className="text-lg font-bold text-white">{formatTime(elapsedSeconds)}</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">Workout time</div>
                </div>

                <div className="bg-dark-card border border-slate-800 rounded-xl p-4 flex flex-col justify-center">
                  <div className="flex items-center text-slate-400 mb-2">
                    <BarChart2 className="w-4 h-4 mr-2 text-primary" />
                    <span className="text-lg font-bold text-white">{totalVolume.toLocaleString()} kg</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">Total volume</div>
                </div>

                <div className="bg-dark-card border border-slate-800 rounded-xl p-4 flex flex-col justify-center">
                  <div className="flex items-center text-slate-400 mb-2">
                    <Flame className="w-4 h-4 mr-2 text-primary" />
                    <span className="text-lg font-bold text-white">{Math.floor(elapsedSeconds / 60 * 6)}</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">Est. calories burned</div>
                </div>
             </div>
          </div>
        </div>

        {/* Mobile Sticky Save & Next */}
        <div className="md:hidden fixed bottom-[72px] left-0 right-0 border-t border-slate-800 bg-dark-bg p-3 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
           <div className="flex items-center justify-between space-x-2">
              <button 
                onClick={handlePreviousExercise}
                disabled={activeExerciseIndex === 0}
                className={`p-3 rounded-lg flex items-center justify-center transition-colors ${
                  activeExerciseIndex === 0 
                    ? 'text-slate-700 cursor-not-allowed'
                    : 'text-white bg-slate-800'
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button 
                onClick={handleSaveAndNext}
                className="flex-1 py-3 rounded-lg bg-primary text-dark-bg font-bold flex items-center justify-center"
              >
                {activeExerciseIndex === selectedExercises.length - 1 ? 'Save Exercise' : 'Save & Next'}
              </button>

              <button 
                onClick={handleNextExercise}
                disabled={activeExerciseIndex === selectedExercises.length - 1}
                className={`p-3 rounded-lg flex items-center justify-center transition-colors ${
                  activeExerciseIndex === selectedExercises.length - 1 
                    ? 'text-slate-700 cursor-not-allowed'
                    : 'text-white bg-slate-800'
                }`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ActiveWorkout;
