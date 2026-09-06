import React, { useState } from 'react';
import { exerciseCategories } from '../../../data/exercises';

const AddCustomExercise = ({ onAdd, onCancel }) => {
  const [name, setName] = useState('');
  // Default to the first category that isn't 'All' or 'Custom'
  const [category, setCategory] = useState('Chest');
  const [equipment, setEquipment] = useState('Barbell');

  const categories = exerciseCategories.filter(c => c !== 'All' && c !== 'Custom');
  
  const equipmentOptions = [
    'Barbell', 'Dumbbells', 'Machine', 'Cable', 'Kettlebell', 'Bodyweight', 'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      name: name.trim(),
      category: 'Custom', // It's stored as Custom category for the filter
      originalCategory: category, // Keep track of actual muscle group
      equipment,
      id: `custom-${Date.now()}`
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="exerciseName" className="block text-sm font-medium text-slate-300 mb-1">
          Exercise Name
        </label>
        <input
          type="text"
          id="exerciseName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Incline Bench Press"
          className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#7FB800] focus:ring-1 focus:ring-[#7FB800] transition-colors"
          required
        />
      </div>

      <div>
        <label htmlFor="muscleGroup" className="block text-sm font-medium text-slate-300 mb-1">
          Muscle Group
        </label>
        <div className="relative">
          <select
            id="muscleGroup"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white appearance-none focus:outline-none focus:border-[#7FB800] focus:ring-1 focus:ring-[#7FB800] transition-colors"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-[#1A1F22] text-white">{cat}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="equipment" className="block text-sm font-medium text-slate-300 mb-1">
          Equipment
        </label>
        <div className="relative">
          <select
            id="equipment"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white appearance-none focus:outline-none focus:border-[#7FB800] focus:ring-1 focus:ring-[#7FB800] transition-colors"
          >
            {equipmentOptions.map(eq => (
              <option key={eq} value={eq} className="bg-[#1A1F22] text-white">{eq}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      <div className="pt-4 flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2.5 bg-[#7FB800] hover:bg-[#6ca100] text-[#080C0D] rounded-lg font-bold transition-colors"
          disabled={!name.trim()}
        >
          Add Exercise
        </button>
      </div>
    </form>
  );
};

export default AddCustomExercise;
