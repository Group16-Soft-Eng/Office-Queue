import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainMenu.css';

const MainMenu: React.FC = () => (
  <nav className="header-menu">
    <Link to="/">Home</Link>
    <Link to="/customer">Customer</Link>
    <Link to="/counter">Counter</Link>
    <Link to="/manager">Manager</Link>
    <Link to="/display">Display Board</Link>
  </nav>
);

export default MainMenu;