import './App.css';
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer.jsx';
import Navbar from './Components/Navbar.jsx';
import Toast from './Components/Toast.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <Toast />
    </>
  );
}

export default App;
