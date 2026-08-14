import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import About from './Pages/About';
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import Watchlist from './Pages/Watchlist'
import Movie_details from './Pages/Movie_details';

function Layout() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="login" element={<Login />} />
                    <Route path="watchlist" element={<Watchlist />} />
                    <Route path="movie_details" element={<Movie_details />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Layout