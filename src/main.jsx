import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthRouter from './AuthRouter'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthRouter />
  </StrictMode>,
)
