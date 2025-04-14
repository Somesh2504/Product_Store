import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Create from './components/Create'
import Nav from './components/Navbar'
function App() {
  return (
    <div>
        <BrowserRouter>
            <Nav/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create/>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
