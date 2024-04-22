import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './components/home/home';
import AdsPage from './components/ads/ads';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AdsPage />
  </React.StrictMode>
);
