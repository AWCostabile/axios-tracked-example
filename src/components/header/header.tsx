import logo from 'assets/logo.svg';
import React from 'react';
import './header.css';

export const Header: React.FC = () => (
  <header>
    <img src={logo} className="header-logo" alt="logo" />
    <p>Ready for Testing</p>
    <a
      className="header-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by React
    </a>
  </header>
);
