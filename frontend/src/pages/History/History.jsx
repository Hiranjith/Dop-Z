import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, CalendarDays, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { historyData, muscleFilters } from '../../data/historyData';

const History = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All Time');
  const navigate = useNavigate();

  // Helper to format date string "YYYY-MM-DD" into Month, Day, Year
  const formatDate = (dateString) => {
    // Adding T00:00:00 ensures we don't hit timezone offset issues 
    // that might shift the date backwards by one day locally.
    const date = new Date(dateString + 'T00:00:00');
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    const year = date.getFullYear();
    return { month, day, year };
  };

  const filteredAndSortedHistory = useMemo(() => {
    let result = historyData;

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(workout => 
        workout.name.toLowerCase().includes(query)
      );
    }

    // Filter by muscle
    if (activeFilter !== 'All') {
      result = result.filter(workout => 
        workout.muscles.includes(activeFilter)
      );
    }

    // Sort (always newest first)
    result = [...result].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    return result;
  }, [searchQuery, activeFilter]);

  return (
    <div className="h-full flex flex-col pt-6 md:pt-10 px-4 md:px-10 pb-24 md:pb-10 overflow-hidden bg-dark-bg text-slate-200">
      
      {/* Header section */}
      <div className="flex flex-row items-center justify-between mb-6 shrink-0 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">History</h1>
          <p className="text-slate-400 text-sm md:text-base">
            Your past workouts. Keep going!
          </p>
        </div>
        
        {/* Desktop Add Button */}
        <button 
          onClick={() => navigate('/workout')}
          className="hidden md:flex items-center bg-[#7FB800] hover:bg-[#6ca100] text-[#080C0D] px-4 py-2 rounded-lg font-bold transition-colors shrink-0"
        >
          <Plus size={20} className="mr-2" /> Start Workout
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Search workouts..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#1A1F22] text-white pl-10 pr-4 py-3 rounded-xl border border-transparent focus:border-[#7FB800] focus:outline-none transition-colors"
        />
      </div>

      {/* Filters (Horizontally scrollable) */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-6 shrink-0 pb-1">
        {muscleFilters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors border ${
              activeFilter === filter 
                ? 'bg-[#7FB800] text-[#080C0D] border-[#7FB800]' 
                : 'bg-[#1A1F22] text-slate-300 border-white/5 hover:bg-white/10 hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Date */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="relative">
          <select 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="appearance-none bg-[#1A1F22] text-white py-2 pl-10 pr-8 rounded-lg border border-transparent focus:border-[#7FB800] focus:outline-none cursor-pointer text-sm font-medium"
          >
            <option className="bg-[#1A1F22] text-white" value="All Time">All Time</option>
            <option className="bg-[#1A1F22] text-white" value="This Week">This Week</option>
            <option className="bg-[#1A1F22] text-white" value="This Month">This Month</option>
          </select>
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
        </div>
      </div>

      {/* Workout Count */}
      <div className="text-sm text-slate-400 mb-4 shrink-0 hidden md:block">
        {filteredAndSortedHistory.length} workouts
      </div>

      {/* Workout Cards */}
      <div className="flex-1 overflow-y-auto hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        {filteredAndSortedHistory.length > 0 ? (
          <div className="flex flex-col gap-3 pb-4">
            {filteredAndSortedHistory.map(workout => {
              const { month, day, year } = formatDate(workout.date);
              
              return (
                <div 
                  key={workout.id}
                  onClick={() => navigate('/workout/summary', { state: { fromHistory: true } })}
                  className="bg-[#1A1F22] border border-white/5 rounded-xl p-4 flex items-center hover:bg-white/5 transition-colors cursor-pointer"
                >
                  {/* Date section */}
                  <div className="flex flex-col items-center justify-center w-16 shrink-0 border-r border-white/10 pr-4 mr-4">
                    <span className="text-xs text-slate-400 uppercase font-bold">{month}</span>
                    <span className="text-2xl font-bold text-white leading-none my-1">{day}</span>
                    <span className="text-xs text-slate-500">{year}</span>
                  </div>
                  
                  {/* Info section */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-1 truncate">{workout.name}</h3>
                    <p className="text-sm text-slate-400 mb-2 truncate">
                      {workout.exercises} exercises &bull; {workout.sets} sets &bull; {workout.duration}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2 md:mt-3">
                      {workout.muscles.map((muscle, index) => (
                        <span 
                          key={index}
                          className="text-[11px] px-2 py-0.5 rounded-full border border-white/10 text-slate-300 bg-white/5 font-medium"
                        >
                          {muscle}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Arrow section */}
                  <div className="shrink-0 pl-2">
                    <ChevronRight size={20} className="text-slate-500" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-8 mt-10">
            <CalendarDays className="text-slate-400 mb-4" size={48} strokeWidth={1.5} />
            <h3 className="text-xl font-bold text-white mb-2">No workouts yet</h3>
            <p className="text-slate-400 mb-6 max-w-[280px] text-sm leading-relaxed">
              Your workout history will appear here once you complete your first workout.
            </p>
            <button 
              onClick={() => navigate('/workout')}
              className="bg-[#7FB800] hover:bg-[#6ca100] text-[#080C0D] px-6 py-2.5 rounded-lg font-bold transition-colors flex items-center"
            >
              <Plus size={18} className="mr-2" strokeWidth={2.5} /> Start Workout
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default History;
