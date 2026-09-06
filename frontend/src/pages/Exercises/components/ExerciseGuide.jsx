import React from 'react';
import { Play, Info, Target, Dumbbell } from 'lucide-react';

const ExerciseGuide = ({ exercise }) => {
  if (!exercise) return null;

  const imageUrl = exercise.image || `https://placehold.co/400x300/1A1F22/7FB800?text=${encodeURIComponent(exercise.name)}`;

  return (
    <div className="space-y-6 text-slate-300">
      {/* Header Image */}
      <div className="w-full aspect-video rounded-lg overflow-hidden bg-black/50 relative border border-white/5">
        <img 
          src={imageUrl} 
          alt={exercise.name} 
          className="w-full h-full object-cover"
        />
        {/* Optional Play Button Overlay if there were video */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="bg-black/50 p-3 rounded-full text-white hover:text-[#7FB800] hover:bg-black/70 transition-colors border border-white/10">
            <Play fill="currentColor" size={24} />
          </button>
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 p-3 rounded-lg border border-white/5 flex flex-col justify-center">
          <div className="flex items-center text-xs text-slate-400 mb-1">
            <Target size={14} className="mr-1" /> Primary Muscle
          </div>
          <div className="text-white font-medium">
            {exercise.primaryMuscles ? exercise.primaryMuscles.join(', ') : exercise.category}
          </div>
        </div>
        <div className="bg-white/5 p-3 rounded-lg border border-white/5 flex flex-col justify-center">
          <div className="flex items-center text-xs text-slate-400 mb-1">
            <Dumbbell size={14} className="mr-1" /> Equipment
          </div>
          <div className="text-white font-medium truncate">
            {exercise.equipment || 'Bodyweight'}
          </div>
        </div>
      </div>

      {/* Description */}
      {exercise.description && (
        <div>
          <h3 className="text-sm text-slate-400 font-medium mb-2 uppercase tracking-wider flex items-center">
            <Info size={14} className="mr-2" /> Description
          </h3>
          <p className="text-sm leading-relaxed">
            {exercise.description}
          </p>
        </div>
      )}

      {/* Secondary Muscles */}
      {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
        <div>
          <h3 className="text-sm text-slate-400 font-medium mb-2 uppercase tracking-wider">Secondary Muscles</h3>
          <div className="flex flex-wrap gap-2">
            {exercise.secondaryMuscles.map((muscle, index) => (
              <span key={index} className="px-2 py-1 bg-white/5 rounded text-xs border border-white/5 text-slate-300">
                {muscle}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* How to Perform */}
      {exercise.instructions && exercise.instructions.length > 0 && (
        <div>
          <h3 className="text-sm text-slate-400 font-medium mb-3 uppercase tracking-wider">How to Perform</h3>
          <ol className="space-y-3">
            {exercise.instructions.map((step, index) => (
              <li key={index} className="flex gap-3 text-sm">
                <span className="flex-none flex items-center justify-center w-6 h-6 rounded-full bg-[#7FB800]/20 text-[#7FB800] text-xs font-bold border border-[#7FB800]/30">
                  {index + 1}
                </span>
                <span className="mt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Form Tips */}
      {exercise.formTips && exercise.formTips.length > 0 && (
        <div className="bg-[#7FB800]/5 p-4 rounded-lg border border-[#7FB800]/20">
          <h3 className="text-sm text-[#7FB800] font-medium mb-2 uppercase tracking-wider">Form Tips</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
            {exercise.formTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExerciseGuide;
