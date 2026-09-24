import { Link } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useMovieContext();

  return (
    <div className="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen flex flex-col selection:bg-red-600 selection:text-white">
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-white tracking-tight">Your Watchlist</h1>
              <span
                id="watchlist-total-count"
                className="bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold px-3 py-1 rounded-full"
              >
                {watchlist.length} {watchlist.length === 1 ? 'Movie' : 'Movies'}
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-1">
              Movies and web series you saved to watch later. Stored locally in your browser.
            </p>
          </div>
        </div>

        {/* Empty State */}
        {watchlist.length === 0 ? (
          <div
            id="watchlist-empty-state"
            className="py-20 text-center bg-slate-900/50 border border-slate-800 rounded-3xl max-w-2xl mx-auto my-12 p-8"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-slate-800/80 text-slate-400 rounded-full flex items-center justify-center border border-slate-700 text-3xl">
              🔖
            </div>
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Your Watchlist is Empty</h2>
            <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
              You haven't saved any movies or web series yet. Browse the home page and click "Add to Watchlist" to save your favorite titles.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm shadow-xl transition-all hover:scale-105"
            >
              <span>🎬</span>
              <span>Explore Movies</span>
            </Link>
          </div>
        ) : (
          /* Watchlist Grid */
          <div
            id="watchlist-container"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {watchlist.map((movie) => {
              const primaryGenre =
                Array.isArray(movie.genre) && movie.genre.length > 0
                  ? movie.genre[0]
                  : 'Feature';

              return (
                <div
                  key={movie.id}
                  className="group relative bg-slate-900 border border-slate-800/80 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-red-950/20 hover:border-slate-700 animate-fade-in flex flex-col"
                >
                  <div className="relative aspect-[2/3] overflow-hidden bg-slate-950">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>

                    {/* Rating Badge */}
                    <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 border border-amber-500/20">
                      <span>⭐</span>
                      <span>{movie.rating}</span>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromWatchlist(movie.id)}
                      className="absolute top-3 right-3 bg-red-600/90 hover:bg-red-600 text-white w-7 h-7 rounded-full shadow-lg transition-all duration-200 hover:scale-110 flex items-center justify-center font-bold text-xs cursor-pointer z-10"
                      title="Remove from Watchlist"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                        <span>{movie.year}</span>
                        <span>•</span>
                        <span>{movie.runtime || 'Movie'}</span>
                        <span>•</span>
                        <span className="text-red-400 font-medium truncate max-w-[80px]">
                          {primaryGenre}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-100 text-base line-clamp-1 group-hover:text-red-500 transition-colors">
                        {movie.title}
                      </h3>
                      <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                        {movie.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                      <Link
                        to={`/movie_details?id=${movie.id}`}
                        className="flex-1 py-2 px-3 bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold text-center transition-colors duration-200 flex items-center justify-center gap-1.5"
                      >
                        <span>View Details</span>
                        <span>❯</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default Watchlist;