import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Customer from './pages/Customer';
import Counter from './pages/Counter';
import Manager from './pages/Manager';
import DisplayBoard from './pages/DisplayBoard';
import './App.css';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/manager" element={<Manager />} />
      <Route path="/display" element={<DisplayBoard />} />
    </Routes>
  </Router>
);

export default App;