import React from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar.jsx';
import Footer from './component/footer.jsx';
import Home from './Home/Home.jsx';
import Sidebar from './component/Sidebar.jsx';
import Result from '../src/Result/result.jsx';
import Notes from '../src/Notes/notes.jsx';
import Community from './Community/Community.jsx';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sidebar' element={<Sidebar />} />
        <Route path='/result' element={<Result />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/community' element={<Community />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
    
  )
}

export default App
