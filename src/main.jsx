import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/font.css';
import './index.css';
import App from './App.jsx';
import { ToastProvider } from './designsystem/components/toast/ToastContext';
import { ToastContainer } from './designsystem/components/toast/ToastContainer';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <App />
      <ToastContainer />
    </ToastProvider>
  </StrictMode>,
);
