import React from 'react'
import {Link} from 'react-router-dom'
import '../js/search.js'
import '../js/app.js'
import '../js/movies.js'
import '../js/movies.js'
import Login_icon_or_photo from './Login_icon_or_photo.jsx'
function Navbar() {
  return (
    <header className="header-glass sticky top-0 z-30 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-red-900/30 group-hover:scale-105 transition-transform text-lg">
            🎬
          </div>
          <span className="text-xl font-black tracking-tight text-white group-hover:text-red-500 transition-colors">
            Movie<span className="text-red-600">Verse</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="nav-link text-slate-300 hover:text-white transition-colors">Home</Link>
          <Link to="/watchlist" className="nav-link text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
            <span>Watchlist</span>
            <span className="watchlist-count-badge hidden bg-red-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full">0</span>
          </Link>
          <Link to="/about" className="nav-link text-slate-300 hover:text-white transition-colors">About</Link>
          <Link to="/contact" className="nav-link text-slate-300 hover:text-white transition-colors">Contact</Link>
          <Link to="/profile" className="nav-link text-slate-300 hover:text-white transition-colors">You</Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            className="search-toggle-btn p-2.5 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all shadow-sm flex items-center justify-center text-sm"
            title="Toggle Search"
          >
            🔍
          </button>

          {/* <Link to="/profile" className="hidden sm:flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-all">
            <img id="nav-profile-avatar" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="Profile" className="w-7 h-7 rounded-lg object-cover" referrerPolicy="no-referrer" />
            <span className="text-xs font-semibold text-slate-200 pr-1">Alex</span>
          </Link> */}
          <Login_icon_or_photo/>
          <button id="mobile-menu-btn" className="md:hidden p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl text-lg leading-none">
            ☰
          </button>
        </div>
      </div>
      <div id="search-bar-container" className="hidden border-t border-slate-800 bg-slate-900/95 backdrop-blur-md px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <span className="text-base text-slate-400 shrink-0">🔍</span>
          <input
            id="search-input"
            type="text"
            placeholder="Search movies, web series, genres, actors, directors..."
            className="w-full bg-transparent text-white text-sm sm:text-base focus:outline-none placeholder:text-slate-500"
          />
          <button id="search-clear-btn" className="text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors shrink-0">
            Clear
          </button>
        </div>
      </div>
      <div id="mobile-menu-dropdown" className="hidden md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3">
        <Link to="/" className="block py-2 text-slate-200 font-semibold hover:text-red-500">Home</Link>
        <Link to="/watchlist" className="flex items-center justify-between py-2 text-slate-200 font-semibold hover:text-red-500">
          <span>Watchlist</span>
          <span className="watchlist-count-badge hidden bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">0</span>
        </Link>
        <Link to="/about" className="block py-2 text-slate-200 font-semibold hover:text-red-500">About</Link>
        <Link to="/contact" className="block py-2 text-slate-200 font-semibold hover:text-red-500">Contact</Link>
        <Link to="/profile" className="block py-2 text-slate-200 font-semibold hover:text-red-500">You (Profile)</Link>
        <Link to="/login" className="block py-2 text-red-400 font-semibold">Account Login</Link>
      </div>
    </header>
  )
}

export default Navbar
  // <header class="header-glass sticky top-0 z-40 border-b border-slate-800/80 transition-all">
  //   <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
  //     <a href="index.html" class="flex items-center gap-2.5 group">
  //       <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-red-900/30 group-hover:scale-105 transition-transform text-lg">
  //         🎬
  //       </div>
  //       <span class="text-xl font-black tracking-tight text-white group-hover:text-red-500 transition-colors">
  //         Movie<span class="text-red-600">Explorer</span>
  //       </span>
  //     </a>

  //     <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
  //       <a href="index.html" class="nav-link text-slate-300 hover:text-white transition-colors">Home</a>
  //       <a href="watchlist.html" class="nav-link text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
  //         <span>Watchlist</span>
  //         <span class="watchlist-count-badge hidden bg-red-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full">0</span>
  //       </a>
  //       <a href="about.html" class="nav-link text-slate-300 hover:text-white transition-colors">About</a>
  //       <a href="contact.html" class="nav-link text-slate-300 hover:text-white transition-colors">Contact</a>
  //       <a href="profile.html" class="nav-link text-slate-300 hover:text-white transition-colors">You</a>
  //     </nav>

  //     <div class="flex items-center gap-3">
  //       <button class="search-toggle-btn p-2.5 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-sm">
  //         🔍
  //       </button>
  //       <a href="profile.html" class="hidden sm:flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl">
  //         <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="Profile" class="w-7 h-7 rounded-lg object-cover" referrerPolicy="no-referrer" />
  //         <span class="text-xs font-semibold text-slate-200 pr-1">Alex</span>
  //       </a>
  //       <button id="mobile-menu-btn" class="md:hidden p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl text-lg leading-none">
  //         ☰
  //       </button>
  //     </div>
  //   </div>

  //   <!-- Mobile Dropdown -->
  //   <div id="mobile-menu-dropdown" class="hidden md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3">
  //     <a href="index.html" class="block py-2 text-slate-200 font-semibold hover:text-red-500">Home</a>
  //     <a href="watchlist.html" class="flex items-center justify-between py-2 text-slate-200 font-semibold hover:text-red-500">
  //       <span>Watchlist</span>
  //       <span class="watchlist-count-badge hidden bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">0</span>
  //     </a>
  //     <a href="about.html" class="block py-2 text-slate-200 font-semibold hover:text-red-500">About</a>
  //     <a href="contact.html" class="block py-2 text-slate-200 font-semibold hover:text-red-500">Contact</a>
  //     <a href="profile.html" class="block py-2 text-slate-200 font-semibold hover:text-red-500">You (Profile)</a>
  //   </div>

  //   <!-- Search Overlay Bar -->
  //   <div id="search-bar-container" class="hidden border-t border-slate-800 bg-slate-900/95 px-4 py-3">
  //     <div class="max-w-4xl mx-auto flex items-center gap-3">
  //       <span class="text-base text-slate-400 shrink-0">🔍</span>
  //       <input id="search-input" type="text" placeholder="Search movies, genres..." class="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-slate-500" />
  //       <button id="search-clear-btn" class="text-xs text-slate-400 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg">Clear</button>
  //     </div>
  //   </div>
  // </header>