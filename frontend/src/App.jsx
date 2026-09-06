import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home/Home';
import StartWorkout from './pages/Workout/StartWorkout';
import ActiveWorkout from './pages/Workout/ActiveWorkout';
import WorkoutSummary from './pages/Workout/WorkoutSummary';
import ExerciseDetails from './pages/Workout/ExerciseDetails';
import Exercises from './pages/Exercises/Exercises';
import ExerciseGuidePage from './pages/Exercises/ExerciseGuidePage';
import History from './pages/History/History';
import Progress from './pages/Progress/Progress';
import ExerciseProgress from './pages/Progress/ExerciseProgress';
import Profile from './pages/Profile/Profile';
import './App.css';

// Placeholder components for other routes
const Placeholder = ({ title }) => (
  <div className="flex items-center justify-center h-full">
    <h2 className="text-2xl font-bold text-slate-400">{title} Page Coming Soon</h2>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="workout" element={<StartWorkout />} />
          <Route path="workout/active" element={<ActiveWorkout />} />
          <Route path="workout/summary" element={<WorkoutSummary />} />
          <Route path="workout/exercise/:id" element={<ExerciseDetails />} />
          <Route path="exercises" element={<Exercises />} />
          <Route path="exercises/:id" element={<ExerciseGuidePage />} />
          <Route path="history" element={<History />} />
          <Route path="progress" element={<Progress />} />
          <Route path="progress/exercise/:id" element={<ExerciseProgress />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
