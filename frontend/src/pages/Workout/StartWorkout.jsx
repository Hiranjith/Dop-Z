import React, { useState } from 'react';
import { Search, ChevronLeft, Plus, X, ArrowRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { exercisesData, exerciseCategories } from '../../data/exercises';

const StartWorkout = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const filteredExercises = exercisesData.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ex.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggleExercise = (exercise) => {
    const isSelected = selectedExercises.some(e => e.id === exercise.id);
    if (isSelected) {
      setSelectedExercises(selectedExercises.filter(e => e.id !== exercise.id));
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const handleRemoveExercise = (id) => {
    setSelectedExercises(selectedExercises.filter(e => e.id !== id));
  };

  const clearAll = () => {
    setSelectedExercises([]);
  };

  return (
    <div className="flex flex-col md:flex-row h-full -mx-4 md:-mx-8 -my-4 md:-my-8 text-slate-200">
      
      {/* Left / Main Section */}
      <div className="flex-1 flex flex-col p-4 md:p-8 h-full overflow-hidden">
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center mb-4">
          <button 
            onClick={() => navigate('/')}
            className="mr-3 text-slate-400 hover:text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-white">Start Workout</h1>
        </div>

        {/* Desktop Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold text-white mb-1">Start Workout</h1>
            <p className="text-slate-400 text-sm">Choose exercises and build your workout.</p>
          </div>
          
          <div className="relative w-full md:w-64 lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search exercises..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 text-white text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-2 mb-4 hide-scrollbar space-x-2">
          {exerciseCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat 
                  ? 'bg-primary text-dark-bg' 
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Exercises List */}
        <div className="flex-1 overflow-y-auto pr-2 pb-20 md:pb-0">
          <h2 className="text-lg font-semibold text-white mb-4 hidden md:block">Exercises</h2>
          <div className="space-y-2">
            {filteredExercises.map(exercise => {
              const isSelected = selectedExercises.some(e => e.id === exercise.id);
              return (
                <div 
                  key={exercise.id} 
                  onClick={() => handleToggleExercise(exercise)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                    isSelected 
                      ? 'border-primary/50 bg-primary/10' 
                      : 'border-slate-800 bg-dark-card hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mr-4">
                      {/* Placeholder for exercise illustration */}
                      <User className="w-6 h-6 text-slate-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{exercise.name}</h3>
                      <p className="text-xs text-slate-400">{exercise.category}</p>
                    </div>
                  </div>
                  <button 
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-primary text-dark-bg' : 'bg-primary text-dark-bg'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleExercise(exercise);
                    }}
                  >
                    {isSelected ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
              );
            })}
            
            {filteredExercises.length === 0 && (
              <div className="text-center py-10 text-slate-500">
                No exercises found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Selected Panel */}
      <div className="hidden md:flex w-80 md:w-96 lg:w-[450px] flex-col bg-dark-card border-l border-slate-800 p-6 h-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Selected Exercises ({selectedExercises.length})</h2>
          {selectedExercises.length > 0 && (
            <button onClick={clearAll} className="text-primary text-sm font-medium hover:text-primary-dark">
              Clear All
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 mb-6">
          {selectedExercises.length === 0 ? (
            <div className="text-center text-slate-500 text-sm mt-10">
              No exercises selected yet. <br /> Tap the + icon to add them.
            </div>
          ) : (
            selectedExercises.map(exercise => (
              <div key={exercise.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-800/20">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center mr-3">
                     <User className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium">{exercise.name}</h4>
                    <p className="text-xs text-slate-400">{exercise.category}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleRemoveExercise(exercise.id)}
                  className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-600 hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>

        <button 
          disabled={selectedExercises.length === 0}
          className={`w-full py-3 rounded-lg flex items-center justify-center font-bold text-lg transition-colors ${
            selectedExercises.length > 0 
              ? 'bg-primary text-dark-bg hover:bg-primary-dark' 
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          Start Workout {selectedExercises.length > 0 ? `(${selectedExercises.length})` : ''} 
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>

      {/* Mobile Sticky Button */}
      <div className="md:hidden fixed bottom-[72px] left-0 right-0 p-4 bg-gradient-to-t from-dark-bg via-dark-bg to-transparent pointer-events-none">
        <button 
          disabled={selectedExercises.length === 0}
          onClick={() => setIsMobileDrawerOpen(true)}
          className={`w-full py-3 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg pointer-events-auto transition-colors ${
            selectedExercises.length > 0 
              ? 'bg-primary text-dark-bg' 
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          View Selected {selectedExercises.length > 0 ? `(${selectedExercises.length})` : ''} 
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer (Overlay) */}
      {isMobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col bg-dark-bg">
          <div className="flex items-center justify-between p-4 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white">Selected Exercises</h2>
            <button onClick={() => setIsMobileDrawerOpen(false)} className="p-2 text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
             {selectedExercises.map(exercise => (
              <div key={exercise.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-dark-card">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mr-3">
                     <User className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{exercise.name}</h4>
                    <p className="text-xs text-slate-400">{exercise.category}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleRemoveExercise(exercise.id)}
                  className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-600 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-800 pb-[80px]">
            <button 
              className="w-full py-3 rounded-xl bg-primary text-dark-bg flex items-center justify-center font-bold text-lg"
            >
              Start Workout ({selectedExercises.length}) 
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      )}



    </div>
  );
};

export default StartWorkout;
