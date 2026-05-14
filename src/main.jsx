import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Topbarhead } from './context/Topbarhead.jsx'
import { Taskcontroller } from './context/Taskcontroller.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Taskcontroller >
  <Topbarhead> 
     <BrowserRouter>
       <App />
    </BrowserRouter>
    </Topbarhead>
    </Taskcontroller>
  </StrictMode>
  
)
