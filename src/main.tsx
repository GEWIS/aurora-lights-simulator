import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContextProvider from './context/AuthContext';
import LightsContextProvider from './context/LightsContext';
import { client } from './api';
import SocketContextProvider from './context/SocketContext';

client.setConfig({
  baseUrl: '/api',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <LightsContextProvider>
          <App />
        </LightsContextProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
