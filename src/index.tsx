import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/styles/style.module.css';

const rootElement = document.querySelector('#root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <div>
      <App />
    </div>
  </React.StrictMode>
);
