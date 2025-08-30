import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthRouter from './AuthRouter'
import { ThemeProvider } from './components/common/ThemeProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthRouter />
    </ThemeProvider>
  </StrictMode>,
)
