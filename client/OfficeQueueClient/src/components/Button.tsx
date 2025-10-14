import React from 'react';
import '../styles/Button.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button' }) => (
  <button type={type} onClick={onClick} className="btn">
    {children}
  </button>
);

export default Button;