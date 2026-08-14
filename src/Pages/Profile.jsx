import React from 'react'
import { Link } from 'react-router-dom'
function Profile() {
  return (
    <div className="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen flex flex-col selection:bg-red-600 selection:text-white">

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl mb-10 relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="relative group">
              <img
                id="profile-avatar"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80"
                alt="Profile Picture"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-slate-700 shadow-xl"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <h1 id="profile-name" className="text-2xl sm:text-3xl font-black text-white tracking-tight">Alex Rivera</h1>
                <span id="profile-plan" className="bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Premium 4K Ultra
                </span>
              </div>

              <p id="profile-email" className="text-slate-400 text-sm mb-4">alex.rivera@movieexplorer.com</p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500">Member:</span> <strong className="text-white">2024</strong>
                </span>
                <span className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500">Status:</span> <strong className="text-emerald-400">Active Session</strong>
                </span>
              </div>
            </div>

            <div className="shrink-0">
              <Link to="/login" className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all border border-slate-700 inline-block">
                Switch Account
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center text-xl font-bold shrink-0">
              🎬
            </div>
            <div>
              <span className="text-slate-400 text-xs uppercase tracking-wider block font-semibold">Total Watched</span>
              <span id="stat-total-watched" className="text-2xl font-black text-white">28</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-500 flex items-center justify-center text-xl font-bold shrink-0">
              🔖
            </div>
            <div>
              <span className="text-slate-400 text-xs uppercase tracking-wider block font-semibold">Watchlist Items</span>
              <span id="stat-watchlist-count" className="text-2xl font-black text-white">0</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center text-xl font-bold shrink-0">
              ⭐
            </div>
            <div>
              <span className="text-slate-400 text-xs uppercase tracking-wider block font-semibold">Favorite Genre</span>
              <span id="stat-fav-genre" className="text-base font-bold text-white">Science Fiction</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>🕒 Recently Viewed History</span>
              </h3>
              <span className="text-xs text-slate-500">Stored in Local Storage</span>
            </div>

            <div id="profile-history-container" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white pb-3 border-b border-slate-800">
              ⚙️ Player Settings
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-200 block">Default Streaming Quality</span>
                  <span className="text-slate-400 text-xs">Auto select best resolution</span>
                </div>
                <select className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg p-2 focus:outline-none">
                  <option>4K Ultra HD</option>
                  <option>1080p Full HD</option>
                  <option>720p HD</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                <div>
                  <span className="font-semibold text-slate-200 block">Autoplay Trailers</span>
                  <span className="text-slate-400 text-xs">Play video on click</span>
                </div>
                <input type="checkbox" checked className="w-4 h-4 accent-red-600 rounded cursor-pointer" />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                <div>
                  <span className="font-semibold text-slate-200 block">Local Storage Data</span>
                  <span className="text-slate-400 text-xs">Reset saved history & watchlist</span>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Clear all local watchlist & watch history?')) {
                      localStorage.clear();
                      location.reload();
                    } else { }
                  }}
                  className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg text-xs font-semibold border border-red-500/30 transition-all"
                >
                  Clear Data
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Profile