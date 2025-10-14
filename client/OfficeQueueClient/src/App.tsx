import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Customer from './pages/Customer';
import Counter from './pages/Counter';
import Manager from './pages/Manager';
import DisplayBoard from './pages/DisplayBoard';
import MainMenu from './components/MainMenu';
import Statistics from './pages/Statistics';
import ServicePage from './pages/ServicePage';


const App: React.FC = () => (
  
  <Router>
    <MainMenu />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/counter/:id" element={<Counter />} />
      <Route path="/manager" element={<Manager />} />
      <Route path="/display" element={<DisplayBoard />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/service/:id" element={<ServicePage />} />
    </Routes>
  </Router>
);

export default App;