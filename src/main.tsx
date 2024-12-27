import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContextProvider from './context/AuthContext.tsx';
import LightsContextProvider from './context/LightsContext.tsx';
import { client } from './api';

client.setConfig({
  baseUrl: '/api',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <LightsContextProvider>
        <App />
      </LightsContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
