import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PopupProvider } from './Pages/Popup.jsx'

createRoot(document.getElementById('root')).render(
  <PopupProvider>
    <BrowserRouter>
   <App />
   </BrowserRouter>
  </PopupProvider> 
 )
