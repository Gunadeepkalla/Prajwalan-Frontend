import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { setupMockHandlers } from './lib/mockHandlers'

// Enable mock API — set VITE_USE_REAL_API=true to disable and connect to backend
if (import.meta.env.VITE_USE_REAL_API !== 'true') {
  setupMockHandlers()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
  </StrictMode>,
)