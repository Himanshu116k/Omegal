import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
    <App />
        <Toaster expand={true} position="top-center" richColors   /> {/* Add this once in your app */}

  </BrowserRouter>,
)
