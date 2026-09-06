import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Plus, Bookmark, Info, CheckCircle2, Lightbulb, Dumbbell, Activity, Target } from 'lucide-react';
import { exercisesData } from '../../data/exercises';

const InfoCard = ({ icon, title, value }) => (
  <div className="flex items-center gap-4 bg-[#080C0D] border border-white/5 rounded-2xl p-4 w-full">
    <div className="w-12 h-12 rounded-xl bg-[#1A1F22] text-[#7FB800] flex items-center justify-center flex-none">
      {icon}
    </div>
    <div className="flex flex-col">
      <h4 className="text-slate-400 text-sm font-medium mb-0.5">{title}</h4>
      <p className="text-slate-200 text-base font-semibold">{value}</p>
    </div>
  </div>
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 text-red-500 font-bold bg-black h-full">
          <h2>Something went wrong in ExerciseGuidePage:</h2>
          <pre className="mt-4 text-sm text-white whitespace-pre-wrap">{this.state.error?.toString()}</pre>
          <pre className="mt-4 text-xs text-gray-400 whitespace-pre-wrap">{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const ExerciseGuidePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const exercise = useMemo(() => {
    return exercisesData.find(ex => ex.id === id);
  }, [id]);

  if (!exercise) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Exercise not found</h2>
        <button onClick={() => navigate('/exercises')} className="text-[#7FB800] hover:underline">
          Return to Library
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="h-full flex flex-col pt-6 md:pt-8 px-4 md:px-8 pb-24 md:pb-10 overflow-hidden text-slate-200 bg-dark-bg">
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0 flex flex-col">
          
          <div className="max-w-3xl mx-auto w-full">
            {/* Top Bar */}
            <div className="flex items-center mb-6 shrink-0">
              <button 
                onClick={() => navigate('/exercises')} 
                className="text-slate-300 hover:text-white flex items-center transition-colors text-lg font-medium"
              >
                <ArrowLeft size={22} className="mr-3" /> Exercises
              </button>
            </div>

            {/* Header: Title and Bookmark */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">{exercise.name}</h1>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors text-slate-300 flex-none border border-white/10">
                <Bookmark size={20} />
              </button>
            </div>
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-[#7FB800] text-[#080C0D] rounded-full text-xs font-semibold">
                {exercise.category}
              </span>
              <span className="px-3 py-1 bg-transparent border border-white/20 text-slate-300 rounded-full text-xs font-medium">
                {exercise.equipment}
              </span>
            </div>

            {/* Image/Video Block */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-800 border border-white/10 aspect-[4/3] md:aspect-[16/9] w-full mb-6 group">
              <img 
                src={exercise.image?.includes('placehold.co') ? '/exercises/Seated cable row.png' : exercise.image} 
                alt={exercise.name} 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Description */}
            <p className="text-slate-300 text-[15px] md:text-base leading-relaxed mb-8">
              {exercise.description}
            </p>

            {/* Muscles Worked Block */}
            <div className="bg-[#1A1F22] rounded-2xl p-5 md:p-6 mb-6">
              <h3 className="text-base md:text-lg font-bold text-white mb-5">Muscles Worked</h3>
              
              <div className="flex flex-row gap-4 md:gap-8 items-center">
                {/* Anatomy Diagrams (Left) */}
                <div className="flex bg-transparent w-[55%] md:w-1/2 -ml-2">
                  <img 
                    src="/exercises/scr-muscles.png" 
                    alt="Muscles worked" 
                    className="w-full h-auto object-contain mix-blend-screen"
                  />
                </div>

                {/* Muscles List (Right) */}
                <div className="flex-1 space-y-5">
                  <div>
                    <h4 className="text-[13px] font-medium text-slate-400 mb-2">Primary Muscles</h4>
                    <ul className="space-y-1.5">
                      {exercise.primaryMuscles?.map((m, i) => (
                        <li key={i} className="flex items-center text-sm text-slate-200">
                          <span className="w-3 h-3 rounded-full bg-red-500 mr-3 flex-none"></span> 
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {exercise.secondaryMuscles?.length > 0 && (
                    <div>
                      <h4 className="text-[13px] font-medium text-slate-400 mb-2">Secondary Muscles</h4>
                      <ul className="space-y-1.5">
                        {exercise.secondaryMuscles?.map((m, i) => (
                          <li key={i} className="flex items-center text-sm text-slate-200">
                            <span className="w-3 h-3 rounded-full bg-orange-400 mr-3 flex-none"></span> 
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Info Cards Row */}
            <div className="flex flex-col gap-3 mb-8">
              <InfoCard icon={<Dumbbell size={22} />} title="Equipment" value={exercise.equipment} />
              <InfoCard icon={<Activity size={22} />} title="Exercise Type" value={exercise.type || 'Strength'} />
              <InfoCard icon={<Target size={22} />} title="Difficulty" value={exercise.difficulty || 'Beginner'} />
            </div>

            {/* Bottom Section: Instructions & Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              
              {/* How to Perform */}
              <div className="bg-[#1A1F22] rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-6">How to Perform</h3>
                <div className="space-y-6">
                  {exercise.instructions?.map((inst, i) => (
                    <div key={i} className="flex items-start group">
                      <div className="flex-none w-7 h-7 rounded-full bg-[#7FB800]/10 text-[#7FB800] flex items-center justify-center font-bold text-sm mr-4 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed pt-0.5">{inst}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Form Tips */}
              <div className="bg-[#1A1F22] rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Lightbulb size={24} className="text-yellow-500" />
                  <h3 className="text-xl font-bold text-white">Form Tips</h3>
                </div>
                <div className="space-y-4">
                  {exercise.formTips?.map((tip, i) => (
                    <div key={i} className="flex items-start bg-[#080C0D]/50 rounded-xl p-4 border border-white/5">
                      <CheckCircle2 size={18} className="text-[#7FB800] flex-none mr-3 mt-0.5" />
                      <p className="text-slate-300 text-sm leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pro Tip Section */}
            {exercise.proTip && (
              <div className="mb-8 bg-gradient-to-r from-[#1A1F22] to-[#7FB800]/10 border border-[#7FB800]/20 rounded-2xl p-6 md:p-8 flex gap-4 md:gap-6">
                <div className="w-10 h-10 rounded-full bg-[#7FB800]/20 border border-[#7FB800]/40 flex items-center justify-center flex-none">
                  <span className="text-[#7FB800] font-bold text-lg">!</span>
                </div>
                <div>
                  <h4 className="text-[#7FB800] font-bold text-sm mb-1.5 uppercase tracking-wider">Pro Tip</h4>
                  <p className="text-slate-200 text-sm md:text-base leading-relaxed">
                    {exercise.proTip}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Sticky Add to Workout Button */}
        <div className="md:hidden sticky bottom-0 left-0 right-0 py-4 bg-dark-bg/90 backdrop-blur-lg border-t border-white/10 mt-auto -mx-4 px-4 z-40">
          <button className="w-full bg-[#7FB800] hover:bg-[#6ca100] text-[#080C0D] px-4 py-3.5 rounded-xl font-bold transition-colors flex items-center justify-center text-[15px] shadow-[0_4px_12px_rgba(127,184,0,0.3)]">
            <Plus size={20} className="mr-2" /> Add to Workout
          </button>
        </div>

      </div>
    </ErrorBoundary>
  );
};

export default ExerciseGuidePage;
