import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import Login_icon_or_photo from './Login_icon_or_photo.jsx';
import Searchbar from './Searchbar.jsx';

function Navbar() {
  const location = useLocation();
  const { watchlistCount, toggleSearch, isSearchOpen } = useMovieContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinkClasses = (path) =>
    `nav-link transition-colors ${
      isActive(path)
        ? 'text-red-500 font-bold'
        : 'text-slate-300 hover:text-white font-medium'
    }`;

  return (
    <header className="header-glass sticky top-0 z-30 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-red-900/30 group-hover:scale-105 transition-transform text-lg">
            🎬
          </div>
          <span className="text-xl font-black tracking-tight text-white group-hover:text-red-500 transition-colors">
            Movie<span className="text-red-600">Verse</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/" className={navLinkClasses('/')}>
            Home
          </Link>
          <Link to="/watchlist" className={`${navLinkClasses('/watchlist')} flex items-center gap-1.5`}>
            <span>Watchlist</span>
            {watchlistCount > 0 && (
              <span className="bg-red-600 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full animate-fade-in">
                {watchlistCount}
              </span>
            )}
          </Link>
          <Link to="/about" className={navLinkClasses('/about')}>
            About
          </Link>
          <Link to="/contact" className={navLinkClasses('/contact')}>
            Contact
          </Link>
          <Link to="/profile" className={navLinkClasses('/profile')}>
            You
          </Link>
        </nav>

        {/* Actions Right Side */}
        <div className="flex items-center gap-3">
          {/* Search Toggle Button */}
          <button
            onClick={toggleSearch}
            className={`p-2.5 text-slate-300 hover:text-white border border-slate-800 rounded-xl transition-all shadow-sm flex items-center justify-center text-sm cursor-pointer ${
              isSearchOpen ? 'bg-red-600/20 border-red-500/50 text-red-400' : 'bg-slate-900 hover:bg-slate-800'
            }`}
            title="Toggle Search"
            aria-label="Toggle Search"
          >
            🔍
          </button>

          {/* Profile / Login */}
          <Login_icon_or_photo />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="md:hidden p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl text-lg leading-none cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Reactive Search Bar */}
      <Searchbar />

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3 animate-fade-in">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-slate-200 font-semibold hover:text-red-500"
          >
            Home
          </Link>
          <Link
            to="/watchlist"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-slate-200 font-semibold hover:text-red-500"
          >
            <span>Watchlist</span>
            {watchlistCount > 0 && (
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {watchlistCount}
              </span>
            )}
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-slate-200 font-semibold hover:text-red-500"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-slate-200 font-semibold hover:text-red-500"
          >
            Contact
          </Link>
          <Link
            to="/profile"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-slate-200 font-semibold hover:text-red-500"
          >
            You (Profile)
          </Link>
          <Link
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-red-400 font-semibold"
          >
            Account Login
          </Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;