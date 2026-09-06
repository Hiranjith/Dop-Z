import React from 'react';
import { ChevronRight } from 'lucide-react';

const ExerciseCard = ({ exercise, onClick, viewMode = 'grid' }) => {
  // Safe fallback if image is missing
  const imageUrl = exercise.image || `https://placehold.co/400x300/1A1F22/7FB800?text=${encodeURIComponent(exercise.name)}`;

  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => onClick(exercise)}
        className="flex items-center p-3 bg-[#1A1F22] rounded-xl cursor-pointer hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group"
      >
        <div className="w-16 h-16 rounded-lg bg-black/50 overflow-hidden shrink-0 flex-none mr-4">
          <img 
            src={imageUrl} 
            alt={exercise.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium truncate">{exercise.name}</h3>
          <span className="inline-block mt-1 px-2 py-0.5 text-xs text-white/70 bg-white/10 rounded-full border border-white/5">
            {exercise.category}
          </span>
        </div>
        <ChevronRight size={20} className="text-white/30 group-hover:text-[#7FB800] transition-colors ml-2 shrink-0" />
      </div>
    );
  }

  // Grid view (Desktop default)
  return (
    <div 
      onClick={() => onClick(exercise)}
      className="flex flex-col bg-[#1A1F22] rounded-xl overflow-hidden cursor-pointer hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10 group h-full"
    >
      <div className="w-full aspect-[4/3] bg-black/50 overflow-hidden relative">
        <img 
          src={imageUrl} 
          alt={exercise.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F22]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-white font-medium truncate mb-2">{exercise.name}</h3>
        <div className="flex items-center justify-between mt-auto">
          <span className="px-2 py-1 text-xs text-white/70 bg-white/10 rounded-md border border-white/5">
            {exercise.category}
          </span>
          <ChevronRight size={18} className="text-white/30 group-hover:text-[#7FB800] transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
