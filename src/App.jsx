import { useState } from 'react'
import Usermanagement from './components/Usermanagement'
import Productmanagement from './components/Productmanagement'
import Dashboard from './components/Dashboard'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./components/Home";
// import Blogs from "./pages/Blogs";
// import Contact from "./pages/Contact";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      
      <BrowserRouter >
      <Routes >

      <Route  path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="Usermanagement" element={<Usermanagement />} />
          <Route path="Productmanagement" element={<Productmanagement />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
      
      </>
  )
}

export default App
