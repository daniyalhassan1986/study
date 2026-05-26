import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Contact } from './pages/Contact.jsx'
import { About } from './pages/About.jsx'
import {Navbar} from './components/Navbar.jsx'
import NotFound from './components/NotFound.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
)
