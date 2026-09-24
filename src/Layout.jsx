import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context';
import App from './App';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Watchlist from './Pages/Watchlist';
import Movie_details from './Pages/Movie_details';

function Layout() {
  return (
    <BrowserRouter>
      <MovieProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="watchlist" element={<Watchlist />} />
            <Route path="movie_details" element={<Movie_details />} />
            {/* Aliases for case & legacy routes */}
            <Route path="Movie_details" element={<Movie_details />} />
            <Route path="movie-details" element={<Movie_details />} />
            <Route path="movie-details.html" element={<Movie_details />} />
            <Route path="index.html" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </MovieProvider>
    </BrowserRouter>
  );
}

export default Layout;