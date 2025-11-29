import Home from "./Home"
import Footer from "./Footer"
import Navbar from "./Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import About from "./About"
import Contact from "./Contact"
import Education from "./Education"


function App() {
  return(<div>
    <BrowserRouter>
     <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/education" element={<Education/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    
    
    
    
     </div>)
}
export default App