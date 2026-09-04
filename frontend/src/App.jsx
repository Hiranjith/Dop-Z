import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home/Home';
import StartWorkout from './pages/Workout/StartWorkout';
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
          <Route path="exercises" element={<Placeholder title="Exercises" />} />
          <Route path="history" element={<Placeholder title="History" />} />
          <Route path="progress" element={<Placeholder title="Progress" />} />
          <Route path="profile" element={<Placeholder title="Profile" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
