import { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';

function Searchbar() {
  const {
    isSearchOpen,
    searchQuery,
    setSearchQuery,
    closeSearch,
    isSearching,
  } = useMovieContext();

  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);

    // If typing while on a non-home page, navigate to home so results can be displayed
    if (val.trim() && location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div
      id="search-bar-container"
      className="border-t border-slate-800 bg-slate-900/95 backdrop-blur-md px-4 py-3 animate-fade-in transition-all"
    >
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <span className="text-base text-slate-400 shrink-0">
          {isSearching ? (
            <span className="inline-block animate-spin">⏳</span>
          ) : (
            '🔍'
          )}
        </span>
        <input
          ref={inputRef}
          id="search-input"
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search movies, web series, genres, actors, directors..."
          className="w-full bg-transparent text-white text-sm sm:text-base focus:outline-none placeholder:text-slate-500"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors shrink-0"
          >
            Clear
          </button>
        )}
        <button
          onClick={closeSearch}
          className="text-xs text-red-400 hover:text-red-300 hover:bg-slate-800/80 px-2.5 py-1.5 rounded-lg transition-colors shrink-0 font-medium"
          title="Close Search (Esc)"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Searchbar;
