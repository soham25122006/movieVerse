import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer.jsx'
import Navbar from './Components/Navbar.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
