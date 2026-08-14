import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white text-xs font-bold">ME</div>
            <span className="text-lg font-bold text-white">Movie<span className="text-red-500">Explorer</span></span>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed mb-4">
            Your premier streaming guide and movie discovery engine. Built cleanly with modular HTML, CSS, JavaScript & Tailwind CSS.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">Quick Links</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/" className="hover:text-white transition-colors">Home Explorer</Link></li>
            <li><Link to="/watchlist" className="hover:text-white transition-colors">Personal Watchlist</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Platform</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
            <li><Link to="/profile" className="hover:text-white transition-colors">User Profile (You)</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">Categories</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/" className="hover:text-white transition-colors">Trending & Popular</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Science Fiction & Fantasy</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Action & Thrillers</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">TV Shows & Web Series</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">Connect</h4>
          <div className="flex items-center gap-2 text-slate-400 mb-3 text-xs">
            <Link to="https://github.com" target="_blank" className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg hover:text-white hover:border-slate-700 transition-colors font-medium">
              GitHub
            </Link>
            <Link to="https://twitter.com" target="_blank" className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg hover:text-white hover:border-slate-700 transition-colors font-medium">
              Twitter
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900 pt-6 text-center text-xs text-slate-600">
        &copy; 2026 Movie Explorer. Designed for smooth React conversion. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer