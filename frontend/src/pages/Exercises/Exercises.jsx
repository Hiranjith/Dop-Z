import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, LayoutGrid, List as ListIcon, SlidersHorizontal } from 'lucide-react';
import { exercisesData, exerciseCategories } from '../../data/exercises';
import ExerciseCard from './components/ExerciseCard';
import AddCustomExercise from './components/AddCustomExercise';
import Modal from '../../components/ui/Modal';

const Exercises = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('A-Z');
  
  // Advanced filters state
  const [equipmentFilter, setEquipmentFilter] = useState([]); // array of equipments
  const [typeFilter, setTypeFilter] = useState(null); // 'Strength', 'Cardio', or null
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Custom exercises state
  const [customExercises, setCustomExercises] = useState([]);
  
  // Modals state
  const [showAddCustomModal, setShowAddCustomModal] = useState(false);

  // View mode state
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [desktopViewMode, setDesktopViewMode] = useState('grid');
  
  // Update isMobile on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentViewMode = isMobile ? 'list' : desktopViewMode;

  // Combine default and custom exercises
  const allExercises = useMemo(() => {
    return [...exercisesData, ...customExercises];
  }, [customExercises]);

  // Filter and Sort
  const filteredAndSortedExercises = useMemo(() => {
    let result = allExercises;

    // Quick Filter by Category
    if (activeFilter !== 'All') {
      result = result.filter(ex => ex.category === activeFilter);
    }

    // Advanced Filters
    if (typeFilter) {
      result = result.filter(ex => ex.type === typeFilter);
    }
    if (equipmentFilter.length > 0) {
      result = result.filter(ex => equipmentFilter.includes(ex.equipment));
    }

    // Search
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(ex => 
        ex.name.toLowerCase().includes(lowerQuery) ||
        (ex.primaryMuscles && ex.primaryMuscles.some(m => m.toLowerCase().includes(lowerQuery)))
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === 'A-Z') return a.name.localeCompare(b.name);
      if (sortBy === 'Z-A') return b.name.localeCompare(a.name);
      // Recently Added could be based on ID or a timestamp if we had one
      if (sortBy === 'Recently Added') {
         // Rough approximation: custom exercises are newer, then by ID descending
         if (a.category === 'Custom' && b.category !== 'Custom') return -1;
         if (a.category !== 'Custom' && b.category === 'Custom') return 1;
         return b.id.localeCompare(a.id);
      }
      return 0;
    });

    return result;
  }, [allExercises, activeFilter, typeFilter, equipmentFilter, searchQuery, sortBy]);

  const handleAddCustomExercise = (newExercise) => {
    setCustomExercises(prev => [...prev, newExercise]);
    setShowAddCustomModal(false);
    // Optionally switch to Custom filter to show the newly added exercise
    setActiveFilter('Custom');
  };

  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col pt-6 md:pt-10 px-4 md:px-10 pb-24 md:pb-10 overflow-hidden">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 shrink-0 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Exercises</h1>
          <p className="text-slate-400 text-sm md:text-base">
            Explore exercises, learn proper form and build better workouts.
          </p>
        </div>
        
        {/* Desktop Add Button */}
        <button 
          onClick={() => setShowAddCustomModal(true)}
          className="hidden md:flex items-center bg-[#7FB800] hover:bg-[#6ca100] text-[#080C0D] px-4 py-2 rounded-lg font-bold transition-colors"
        >
          <Plus size={20} className="mr-2" /> Add Custom Exercise
        </button>
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search exercises (e.g. bench press, squat, curl...)" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1A1F22] text-white pl-10 pr-4 py-3 rounded-xl border border-transparent focus:border-[#7FB800] focus:outline-none transition-colors"
          />
        </div>
        
        {/* Desktop Sort Dropdown */}
        <div className="hidden md:flex items-center bg-[#1A1F22] rounded-xl px-4 border border-transparent focus-within:border-[#7FB800] transition-colors relative">
          <span className="text-slate-400 text-sm mr-2 whitespace-nowrap">Sort by:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-white appearance-none outline-none py-3 pr-6 font-medium cursor-pointer"
          >
            <option value="A-Z">A - Z</option>
            <option value="Z-A">Z - A</option>
            <option value="Recently Added">Recently Added</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      {/* Filters and View Toggles */}
      <div className="flex items-center justify-between mb-6 shrink-0 gap-4 relative">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Advanced Filters Button & Popover */}
          <div className="relative flex-none">
            <button 
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`p-2.5 rounded-full border transition-colors flex items-center justify-center ${
                showAdvancedFilters || typeFilter || equipmentFilter.length > 0
                  ? 'bg-[#7FB800] text-[#080C0D] border-[#7FB800]' 
                  : 'bg-[#1A1F22] text-slate-300 border-white/5 hover:bg-white/10'
              }`}
            >
              <SlidersHorizontal size={18} />
            </button>

            {/* Advanced Filters Popover */}
            {showAdvancedFilters && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowAdvancedFilters(false)}
                />
                <div className="absolute top-full left-0 mt-2 w-64 bg-[#1A1F22] rounded-xl shadow-xl border border-white/10 z-50 flex flex-col max-h-[70vh] animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                  
                  {/* Popover Header */}
                  <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0 bg-[#1A1F22]">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider">Filters</h3>
                    <button 
                      onClick={() => {
                        setEquipmentFilter([]);
                        setTypeFilter(null);
                        setShowAdvancedFilters(false);
                      }}
                      className="text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      Clear
                    </button>
                  </div>

                  {/* Popover Content (Scrollable) */}
                  <div className="p-4 overflow-y-auto space-y-4 flex-1 hide-scrollbar">
                    {/* Equipment Filter */}
                    <div>
                      <h4 className="text-slate-400 text-xs font-medium mb-2">Equipment</h4>
                      <div className="space-y-2">
                        {['Barbell', 'Dumbbell', 'Cable', 'Machine', 'Bodyweight'].map(eq => (
                          <label key={eq} className="flex items-center cursor-pointer group">
                            <div className="relative flex items-center justify-center w-4 h-4 mr-2 shrink-0">
                              <input 
                                type="checkbox" 
                                className="peer appearance-none w-4 h-4 border border-slate-500 rounded-sm checked:bg-[#7FB800] checked:border-[#7FB800] transition-colors cursor-pointer"
                                checked={equipmentFilter.includes(eq)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setEquipmentFilter(prev => [...prev, eq]);
                                  } else {
                                    setEquipmentFilter(prev => prev.filter(item => item !== eq));
                                  }
                                }}
                              />
                              <svg className="absolute w-3 h-3 text-[#080C0D] opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </div>
                            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{eq}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Type Filter */}
                    <div>
                      <h4 className="text-slate-400 text-xs font-medium mb-2">Type</h4>
                      <div className="space-y-2">
                        {['Strength', 'Cardio'].map(type => (
                          <label key={type} className="flex items-center cursor-pointer group">
                            <div className="relative flex items-center justify-center w-4 h-4 mr-2 shrink-0">
                              <input 
                                type="radio" 
                                name="exerciseType"
                                className="peer appearance-none w-4 h-4 border border-slate-500 rounded-full checked:border-[#7FB800] transition-colors cursor-pointer"
                                checked={typeFilter === type}
                                onChange={(e) => {
                                  if (e.target.checked) setTypeFilter(type);
                                }}
                              />
                              <div className="absolute w-2 h-2 rounded-full bg-[#7FB800] opacity-0 peer-checked:opacity-100 pointer-events-none" />
                            </div>
                            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {/* Mobile Sort Options inside filter menu for clean UI */}
                    <div className="md:hidden pt-4 border-t border-white/10">
                       <h4 className="text-slate-400 text-xs font-medium mb-2">Sort By</h4>
                       <div className="space-y-2">
                         {['A-Z', 'Z-A', 'Recently Added'].map(option => (
                           <label key={option} className="flex items-center cursor-pointer group">
                             <div className="relative flex items-center justify-center w-4 h-4 mr-2 shrink-0">
                               <input 
                                 type="radio" 
                                 name="mobileSortBy"
                                 className="peer appearance-none w-4 h-4 border border-slate-500 rounded-full checked:border-[#7FB800] transition-colors cursor-pointer"
                                 checked={sortBy === option}
                                 onChange={(e) => {
                                   if (e.target.checked) setSortBy(option);
                                 }}
                               />
                               <div className="absolute w-2 h-2 rounded-full bg-[#7FB800] opacity-0 peer-checked:opacity-100 pointer-events-none" />
                             </div>
                             <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{option}</span>
                           </label>
                         ))}
                       </div>
                    </div>
                  </div>

                  {/* Popover Footer */}
                  <div className="p-4 border-t border-white/10 shrink-0 bg-[#1A1F22]">
                    <button 
                      onClick={() => setShowAdvancedFilters(false)}
                      className="w-full bg-[#7FB800] hover:bg-[#6ca100] text-[#080C0D] py-2.5 rounded-lg font-bold transition-colors"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Scrollable Filters */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 -mb-2 flex-1 items-center border-l border-white/10 pl-3">
            {exerciseCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition-colors border ${
                  activeFilter === cat 
                    ? 'bg-[#7FB800] text-[#080C0D] border-[#7FB800]' 
                    : 'bg-[#1A1F22] text-slate-300 border-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop View Toggle */}
        <div className="hidden md:flex bg-[#1A1F22] rounded-lg p-1 border border-white/5 flex-none">
          <button 
            onClick={() => setDesktopViewMode('grid')}
            className={`p-1.5 rounded-md flex items-center gap-1.5 transition-colors ${desktopViewMode === 'grid' ? 'bg-white/10 text-[#7FB800]' : 'text-slate-400 hover:text-white'}`}
          >
            <LayoutGrid size={16} /> <span className="text-xs font-medium pr-1">Grid</span>
          </button>
          <button 
            onClick={() => setDesktopViewMode('list')}
            className={`p-1.5 rounded-md flex items-center gap-1.5 transition-colors ${desktopViewMode === 'list' ? 'bg-white/10 text-[#7FB800]' : 'text-slate-400 hover:text-white'}`}
          >
            <ListIcon size={16} /> <span className="text-xs font-medium pr-1">List</span>
          </button>
        </div>
      </div>

      <div className="text-sm text-slate-400 mb-4 shrink-0 flex justify-between">
        <span>{filteredAndSortedExercises.length} exercises</span>
        <span className="md:hidden">{sortBy}</span>
      </div>

      {/* Exercises List/Grid */}
      <div className="flex-1 overflow-y-auto hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        {filteredAndSortedExercises.length > 0 ? (
          <div className={
            currentViewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-4" 
              : "flex flex-col gap-3 pb-4"
          }>
            {filteredAndSortedExercises.map(exercise => (
              <ExerciseCard 
                key={exercise.id} 
                exercise={exercise} 
                onClick={(ex) => navigate(`/exercises/${ex.id}`)}
                viewMode={currentViewMode}
              />
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/5">
              <Search className="text-slate-500" size={28} />
            </div>
            
            {activeFilter === 'Custom' ? (
              <>
                <h3 className="text-lg font-bold text-white mb-2">No custom exercises yet</h3>
                <p className="text-slate-400 mb-6 max-w-sm">
                  Create your first custom exercise to add it to your personal library.
                </p>
                <button 
                  onClick={() => setShowAddCustomModal(true)}
                  className="bg-[#7FB800] hover:bg-[#6ca100] text-[#080C0D] px-6 py-2.5 rounded-lg font-bold transition-colors"
                >
                  + Add Exercise
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-white mb-2">No exercises found</h3>
                <p className="text-slate-400 mb-6 max-w-sm">
                  Try another search term or create your own custom exercise.
                </p>
                <button 
                  onClick={() => setShowAddCustomModal(true)}
                  className="bg-[#1A1F22] border border-white/10 hover:bg-white/5 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center"
                >
                  <Plus size={18} className="mr-2" /> Add Custom Exercise
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Mobile Floating Action Button */}
      <button
        onClick={() => setShowAddCustomModal(true)}
        className="md:hidden fixed bottom-[90px] right-6 w-14 h-14 bg-[#7FB800] rounded-full flex items-center justify-center shadow-lg shadow-black/50 hover:scale-105 active:scale-95 transition-transform z-40 text-[#080C0D]"
      >
        <Plus size={28} strokeWidth={2.5} />
      </button>

      {/* Modals */}
      <Modal
        isOpen={showAddCustomModal}
        onClose={() => setShowAddCustomModal(false)}
        title="Add Custom Exercise"
      >
        <AddCustomExercise 
          onAdd={handleAddCustomExercise} 
          onCancel={() => setShowAddCustomModal(false)} 
        />
      </Modal>

      {/* Custom CSS to hide scrollbar but keep functionality */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
};

export default Exercises;
