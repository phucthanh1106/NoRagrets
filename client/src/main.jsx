import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Popup from './pages/Popup.jsx'
import Options from './pages/Options.jsx'
import BlockPage from './pages/BlockPage.jsx'

// Check where the user at
const urlParams = new URLSearchParams(window.location.search);
const isOptionsPage = urlParams.get('type') === 'options';
const isBlockPage = urlParams.get('type') === 'block';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isBlockPage ? (
      <BlockPage /> 
    ) : isOptionsPage ? (
      <Options />
    ) : (
      <Popup />
    )}
    {/* <TestCSS /> */}
  </StrictMode>,
)
