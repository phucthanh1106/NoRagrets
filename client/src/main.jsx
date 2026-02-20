import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import CustomizationPage from './pages/CustomizationPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CustomizationPage />
  </StrictMode>,
)
