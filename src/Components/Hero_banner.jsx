import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import { tmdbService } from '../services/tmdb';

function Hero_banner() {
  const { isInWatchlist, toggleWatchlist, openTrailer } = useMovieContext();
  const [movies, setMovies] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const autoPlayTimer = useRef(null);

  useEffect(() => {
    let isMounted = true;
    async function loadTrending() {
      setLoading(true);
      try {
        const trendingList = await tmdbService.getTrending();
        if (isMounted && trendingList && trendingList.length > 0) {
          setMovies(trendingList.slice(0, 10));
        }
      } catch (e) {
        console.error('Failed to load hero banner movies:', e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadTrending();
    return () => {
      isMounted = false;
    };
  }, []);

  const resetTimer = useCallback(() => {
    if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    if (movies.length > 1) {
      autoPlayTimer.current = setInterval(() => {
        setCurrentHeroIndex(prev => (prev + 1) % movies.length);
      }, 6000);
    }
  }, [movies.length]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [resetTimer]);

  if (loading) {
    return (
      <div className="relative w-full min-h-[520px] md:min-h-[600px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 animate-pulse flex items-end p-8 sm:p-14 mb-10">
        <div className="space-y-4 max-w-xl">
          <div className="h-6 w-32 bg-slate-800 rounded-full"></div>
          <div className="h-12 w-80 bg-slate-800 rounded-xl"></div>
          <div className="h-4 w-96 bg-slate-800 rounded"></div>
          <div className="h-12 w-48 bg-slate-800 rounded-xl mt-4"></div>
        </div>
      </div>
    );
  }

  if (movies.length === 0) return null;

  const movie = movies[currentHeroIndex] || movies[0];
  const isSaved = isInWatchlist(movie.id);

  const prevHeroMovie = () => {
    setCurrentHeroIndex((currentHeroIndex - 1 + movies.length) % movies.length);
    resetTimer();
  };

  const nextHeroMovie = () => {
    setCurrentHeroIndex((currentHeroIndex + 1) % movies.length);
    resetTimer();
  };

  return (
    <div className="relative w-full min-h-[520px] md:min-h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 group mb-10">
      {/* Background Banner */}
      <img
        src={movie.banner}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
        referrerPolicy="no-referrer"
        onError={(e) => {
          e.currentTarget.src =
            'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&q=80';
        }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 sm:via-slate-950/80 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

      {/* Navigation Arrows Top Right */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
        <button
          onClick={prevHeroMovie}
          className="w-9 h-9 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white backdrop-blur-md transition-all shadow-lg flex items-center justify-center text-sm font-bold cursor-pointer"
          title="Previous Featured Movie"
        >
          &lt;
        </button>
        <button
          onClick={nextHeroMovie}
          className="w-9 h-9 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white backdrop-blur-md transition-all shadow-lg flex items-center justify-center text-sm font-bold cursor-pointer"
          title="Next Featured Movie"
        >
          &gt;
        </button>
      </div>

      {/* Banner Content */}
      <div className="relative z-10 h-full min-h-[520px] md:min-h-[600px] max-w-2xl flex flex-col justify-end p-6 sm:p-10 md:p-14">
        {/* Featured Tag */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            #{currentHeroIndex + 1} Trending Movie
          </span>
          <span className="bg-slate-900/80 text-amber-400 border border-amber-500/30 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            ⭐ {movie.rating} / 10
          </span>
          <span className="bg-slate-900/80 text-slate-300 border border-slate-700/80 text-[11px] font-medium px-2 py-0.5 rounded-full">
            4K Ultra HD
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none mb-3 drop-shadow-md">
          {movie.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300 font-medium mb-4">
          <span className="font-bold text-white">{movie.year}</span>
          <span>•</span>
          <span>{movie.runtime}</span>
          <span>•</span>
          <div className="flex flex-wrap items-center gap-1.5">
            {(movie.genre || []).slice(0, 3).map((g, i) => (
              <span
                key={i}
                className="bg-slate-800/80 px-2.5 py-0.5 rounded-md border border-slate-700/60 text-slate-200 text-xs"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3 mb-8 max-w-xl">
          {movie.description}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => openTrailer(movie.trailerUrl, movie.title)}
            className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm shadow-xl hover:shadow-red-900/40 transition-all flex items-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>▶</span>
            <span>Watch Now</span>
          </button>

          <button
            onClick={() => toggleWatchlist(movie)}
            className={`px-6 py-3.5 ${
              isSaved ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-900/90 hover:bg-slate-800'
            } text-white border border-slate-700/80 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer`}
          >
            {isSaved ? (
              <>
                <span>✓</span>
                <span>In Watchlist</span>
              </>
            ) : (
              <>
                <span>+</span>
                <span>Add to Watchlist</span>
              </>
            )}
          </button>

          <Link
            to={`/movie_details?id=${movie.id}`}
            className="px-5 py-3.5 bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl font-semibold text-sm transition-all border border-slate-800"
          >
            More Details
          </Link>
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center gap-2 mt-6">
          {movies.slice(0, 5).map((m, i) => (
            <button
              key={m.id || i}
              onClick={() => {
                setCurrentHeroIndex(i);
                resetTimer();
              }}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === currentHeroIndex ? 'w-8 bg-red-600' : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              title={m.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero_banner;