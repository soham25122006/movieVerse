import { useState, useEffect, useRef, useCallback } from 'react';
import { tmdbService } from '../services/tmdb';
import { MovieService } from '../js/movies';
import { MovieContext } from './MovieContextBase';

const WATCHLIST_STORAGE_KEY = 'movieExplorer_watchlist_items';
const HISTORY_STORAGE_KEY = 'movieExplorer_history_items';
const PROFILE_STORAGE_KEY = 'movieExplorer_user';

function MovieProvider({ children }) {
  // ----------------------------------------------------
  // SEARCH STATE
  // ----------------------------------------------------
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchDebounceTimer = useRef(null);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen(prev => !prev);
  }, []);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  }, []);

  // Real-time search with debounce
  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);

    if (searchDebounceTimer.current) {
      clearTimeout(searchDebounceTimer.current);
    }

    if (!query || query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    searchDebounceTimer.current = setTimeout(async () => {
      try {
        const results = await tmdbService.searchMovies(query);
        setSearchResults(results);
      } catch (err) {
        console.error('Search error:', err);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);
  }, []);

  // ----------------------------------------------------
  // TOAST NOTIFICATIONS
  // ----------------------------------------------------
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2800);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // ----------------------------------------------------
  // WATCHLIST STATE
  // ----------------------------------------------------
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const stored = localStorage.getItem(WATCHLIST_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // Check legacy ID storage
      const legacyIds = localStorage.getItem('movieExplorer_watchlist');
      if (legacyIds) {
        const parsed = JSON.parse(legacyIds);
        const legacyMovies = MovieService.getAllMovies().filter(m => parsed.includes(m.id));
        return legacyMovies;
      }
      return [];
    } catch (e) {
      console.error('Error loading watchlist', e);
      return [];
    }
  });

  const isInWatchlist = useCallback((movieId) => {
    return watchlist.some(m => m.id.toString() === movieId?.toString());
  }, [watchlist]);

  const addToWatchlist = useCallback((movie) => {
    if (!movie) return;
    setWatchlist(prev => {
      if (prev.some(m => m.id.toString() === movie.id.toString())) return prev;
      const updated = [movie, ...prev];
      try {
        localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(updated));
        localStorage.setItem('movieExplorer_watchlist', JSON.stringify(updated.map(m => m.id)));
      } catch (e) {
        console.error('Error saving watchlist', e);
      }
      return updated;
    });
    showToast(`Added "${movie.title}" to Watchlist!`, 'success');
  }, [showToast]);

  const removeFromWatchlist = useCallback((movieId) => {
    if (!movieId) return;
    setWatchlist(prev => {
      const movieToRemove = prev.find(m => m.id.toString() === movieId.toString());
      const updated = prev.filter(m => m.id.toString() !== movieId.toString());
      try {
        localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(updated));
        localStorage.setItem('movieExplorer_watchlist', JSON.stringify(updated.map(m => m.id)));
      } catch (e) {
        console.error('Error saving watchlist', e);
      }
      if (movieToRemove) {
        showToast(`Removed "${movieToRemove.title}" from Watchlist`, 'info');
      }
      return updated;
    });
  }, [showToast]);

  const toggleWatchlist = useCallback((movie) => {
    if (!movie) return;
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  }, [isInWatchlist, addToWatchlist, removeFromWatchlist]);

  // ----------------------------------------------------
  // WATCH HISTORY
  // ----------------------------------------------------
  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
      return MovieService.getAllMovies().slice(0, 3);
    } catch {
      return MovieService.getAllMovies().slice(0, 3);
    }
  });

  const recordMovieView = useCallback((movie) => {
    if (!movie) return;
    setHistory(prev => {
      const filtered = prev.filter(m => m.id.toString() !== movie.id.toString());
      const updated = [movie, ...filtered].slice(0, 12);
      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving history', e);
      }
      return updated;
    });
  }, []);

  // ----------------------------------------------------
  // USER PROFILE
  // ----------------------------------------------------
  const defaultProfile = {
    name: 'Alex Rivera',
    email: 'alex.rivera@movieexplorer.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
    memberSince: '2024',
    totalWatched: 28,
    favoriteGenre: 'Science Fiction',
    plan: 'Premium 4K Ultra',
  };

  const [profile, setProfile] = useState(() => {
    try {
      const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
      return stored ? { ...defaultProfile, ...JSON.parse(stored) } : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const updateProfile = useCallback((updatedFields) => {
    setProfile(prev => {
      const updated = { ...prev, ...updatedFields };
      try {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving profile', e);
      }
      return updated;
    });
  }, []);

  const clearUserData = useCallback(() => {
    try {
      localStorage.removeItem(WATCHLIST_STORAGE_KEY);
      localStorage.removeItem('movieExplorer_watchlist');
      localStorage.removeItem(HISTORY_STORAGE_KEY);
      setWatchlist([]);
      setHistory([]);
      showToast('Local watchlist and history have been cleared.', 'info');
    } catch (e) {
      console.error('Error clearing data', e);
    }
  }, [showToast]);

  // ----------------------------------------------------
  // TRAILER MODAL
  // ----------------------------------------------------
  const [trailerData, setTrailerData] = useState({
    isOpen: false,
    trailerUrl: '',
    title: '',
  });

  const openTrailer = useCallback((trailerUrl, title) => {
    if (!trailerUrl) return;
    const embedUrl = trailerUrl.includes('?') ? `${trailerUrl}&autoplay=1` : `${trailerUrl}?autoplay=1`;
    setTrailerData({
      isOpen: true,
      trailerUrl: embedUrl,
      title: title || 'Official Trailer',
    });
  }, []);

  const closeTrailer = useCallback(() => {
    setTrailerData({
      isOpen: false,
      trailerUrl: '',
      title: '',
    });
  }, []);

  // ----------------------------------------------------
  // KEYBOARD SHORTCUTS (ESC TO CLOSE SEARCH / TRAILER)
  // ----------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (trailerData.isOpen) {
          closeTrailer();
        } else if (isSearchOpen) {
          closeSearch();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [trailerData.isOpen, isSearchOpen, closeTrailer, closeSearch]);

  const value = {
    // Search
    isSearchOpen,
    searchQuery,
    searchResults,
    isSearching,
    toggleSearch,
    openSearch,
    closeSearch,
    setSearchQuery: handleSearchChange,

    // Watchlist
    watchlist,
    watchlistCount: watchlist.length,
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,

    // History & Profile
    history,
    recordMovieView,
    profile,
    updateProfile,
    clearUserData,

    // Trailer Modal
    trailerData,
    openTrailer,
    closeTrailer,

    // Toast
    toasts,
    showToast,
    removeToast,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}

export default MovieProvider;
export { useMovieContext } from './useMovieContext';
export { MovieProvider };
