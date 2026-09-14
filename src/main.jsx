import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/font.css';
import './styles/index.css';
import App from './App.jsx';
import { ToastProvider } from './designsystem/components/toast/ToastContext';
import { ToastContainer } from './designsystem/components/toast/ToastContainer';
import { ModalProvider } from './designsystem/components/modal/ModalContext';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

if (window.Kakao && !window.Kakao.isInitialized()) {
  window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModalProvider>
      <ToastProvider>
        <App />
        <ToastContainer />
      </ToastProvider>
    </ModalProvider>
  </StrictMode>,
);
