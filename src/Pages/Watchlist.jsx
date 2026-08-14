import React from 'react'
import { Link } from 'react-router-dom'
function Watchlist() {
  return (
    <div className="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen flex flex-col selection:bg-red-600 selection:text-white">

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-white tracking-tight">Your Watchlist</h1>
              <span id="watchlist-total-count" className="bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold px-3 py-1 rounded-full">
                0 Movies
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-1">Movies and web series you saved to watch later. Stored locally in your browser.</p>
          </div>
        </div>

        <div id="watchlist-container" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          
        </div>

        <div id="watchlist-empty-state" className="hidden py-20 text-center bg-slate-900/50 border border-slate-800 rounded-3xl max-w-2xl mx-auto my-12 p-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-slate-800/80 text-slate-400 rounded-full flex items-center justify-center border border-slate-700 text-3xl">
            🔖
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mb-2">Your Watchlist is Empty</h2>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
            You haven't saved any movies or web series yet. Browse the home page and click "Add to Watchlist" to save your favorite titles.
          </p>
          <Link to="/index" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm shadow-xl transition-all hover:scale-105">
            <span>🎬</span>
            <span>Explore Movies</span>
          </Link>
        </div>

      </main>
    </div>
  )
}

export default Watchlist