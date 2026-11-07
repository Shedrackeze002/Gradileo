import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource-variable/lexend';
import './index.css';
import App from './App.tsx';
import { startAnalytics } from './analytics';
import { watchForNewBuild } from './staleBuild';

startAnalytics();
watchForNewBuild();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
