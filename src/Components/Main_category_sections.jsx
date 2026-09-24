import { useState, useEffect, useRef } from 'react';
import Moviecard from './Moviecard';
import { tmdbService } from '../services/tmdb';

function CategoryRow({ cat }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const rowRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    async function loadCategoryMovies() {
      setLoading(true);
      try {
        const data = await tmdbService.getMoviesByCategory(cat.key);
        if (isMounted) {
          setMovies(data || []);
        }
      } catch (err) {
        console.error(`Error loading category ${cat.key}:`, err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadCategoryMovies();
    return () => {
      isMounted = false;
    };
  }, [cat.key]);

  const scrollRow = (distance) => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: distance, behavior: 'smooth' });
    }
  };

  if (!loading && movies.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
          {cat.title}
        </h2>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scrollRow(-400)}
            className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all shadow-md cursor-pointer"
            title="Scroll left"
            aria-label="Scroll left"
          >
            &lt;
          </button>
          <button
            onClick={() => scrollRow(400)}
            className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all shadow-md cursor-pointer"
            title="Scroll right"
            aria-label="Scroll right"
          >
            &gt;
          </button>
        </div>
      </div>

      <div
        ref={rowRef}
        className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
      >
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="shrink-0 w-44 sm:w-52 aspect-[2/3] rounded-xl bg-slate-900 border border-slate-800 animate-pulse"
              />
            ))
          : movies.map((movie) => (
              <Moviecard key={movie.id} movie={movie} />
            ))}
      </div>
    </section>
  );
}

function Main_category_sections() {
  const categoryConfigs = [
    { key: 'trending', title: '🔥 Trending Movies' },
    { key: 'popular', title: '⭐ Most Popular Movies' },
    { key: 'upcoming', title: '🚀 Upcoming Movies' },
    { key: 'old', title: '📽️ Classic & Old Movies' },
    { key: 'top_rated', title: '🏆 Top Rated Movies' },
    { key: 'action', title: '💥 Action Movies' },
    { key: 'comedy', title: '🍿 Comedy Movies' },
    { key: 'horror', title: '👻 Horror & Thriller' },
    { key: 'scifi', title: '🛸 Science Fiction' },
    { key: 'romance', title: '❤️ Romance Movies' },
    { key: 'tvshows', title: '📺 TV Shows & Web Series' },
  ];

  return (
    <div id="main-category-sections">
      {categoryConfigs.map((cat) => (
        <CategoryRow key={cat.key} cat={cat} />
      ))}
    </div>
  );
}

export default Main_category_sections;