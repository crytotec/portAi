import Home from "./Home"
import Footer from "./Footer"
import Navbar from "./Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"


function App() {
  return(<div>
    <BrowserRouter>
     <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
     </div>)
}
export default App