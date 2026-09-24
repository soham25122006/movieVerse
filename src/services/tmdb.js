/**
 * TMDB API Service for MovieVerse
 * Connects the React application to The Movie Database (TMDB) API
 * with automatic fallback to curated static movie data.
 */

import { MovieService } from '../js/movies';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE || 'https://image.tmdb.org/t/p';

// Standard Genre ID to Name Mapping
const GENRE_MAP = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
  10759: 'Action & Adventure',
  10762: 'Kids',
  10763: 'News',
  10764: 'Reality',
  10765: 'Sci-Fi & Fantasy',
  10766: 'Soap',
  10767: 'Talk',
  10768: 'War & Politics',
};

// Fallback images
const FALLBACK_POSTER = 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&q=80';
const FALLBACK_BANNER = 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&q=80';

// In-memory cache to prevent duplicate fetches
const cache = new Map();

/**
 * Format minutes into "Xh Ym"
 */
function formatRuntime(minutes) {
  if (!minutes || typeof minutes !== 'number') return '2h 00m';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  return `${hours}h ${mins.toString().padStart(2, '0')}m`;
}

/**
 * Helper to fetch from TMDB with caching and error handling
 */
async function fetchFromTMDB(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('language', 'en-US');

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  const cacheKey = url.toString();
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`TMDB HTTP error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.warn(`TMDB request failed for ${endpoint}:`, error.message);
    throw error;
  }
}

/**
 * Transforms raw TMDB movie/tv object into the standard MovieVerse format
 */
export function transformTMDBItem(item, customType = null) {
  if (!item) return null;

  const isMovie = item.title !== undefined || item.media_type === 'movie';
  const title = item.title || item.name || 'Untitled';
  const releaseDate = item.release_date || item.first_air_date || '';
  const year = releaseDate ? parseInt(releaseDate.split('-')[0], 10) : 2024;
  const rating = item.vote_average ? Number(item.vote_average.toFixed(1)) : 7.5;

  // Extract genres
  let genres;
  if (Array.isArray(item.genres) && item.genres.length > 0) {
    genres = item.genres.map(g => (typeof g === 'string' ? g : g.name));
  } else if (Array.isArray(item.genre_ids) && item.genre_ids.length > 0) {
    genres = item.genre_ids.map(id => GENRE_MAP[id] || 'General');
  } else {
    genres = [isMovie ? 'Action' : 'TV Series'];
  }

  // Extract poster and banner
  const poster = item.poster_path ? `${IMAGE_BASE}/w500${item.poster_path}` : FALLBACK_POSTER;
  const banner = item.backdrop_path ? `${IMAGE_BASE}/original${item.backdrop_path}` : item.poster_path ? `${IMAGE_BASE}/original${item.poster_path}` : FALLBACK_BANNER;

  // Extract director
  let director = 'Acclaimed Director';
  if (item.credits?.crew) {
    const dir = item.credits.crew.find(c => c.job === 'Director');
    if (dir) director = dir.name;
  }

  // Extract cast
  let cast = ['Starring Actor', 'Featured Performer'];
  if (item.credits?.cast && item.credits.cast.length > 0) {
    cast = item.credits.cast.slice(0, 6).map(c => c.name);
  }

  // Extract YouTube trailer
  let trailerUrl = 'https://www.youtube.com/embed/Way9Dexny3w';
  if (item.videos?.results && item.videos.results.length > 0) {
    const ytVideo = item.videos.results.find(
      v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser' || v.type === 'Clip')
    ) || item.videos.results.find(v => v.site === 'YouTube');
    if (ytVideo?.key) {
      trailerUrl = `https://www.youtube.com/embed/${ytVideo.key}`;
    }
  }

  // Runtime
  let runtime = '2h 15m';
  if (item.runtime) {
    runtime = formatRuntime(item.runtime);
  } else if (item.episode_run_time && item.episode_run_time[0]) {
    runtime = `${item.episode_run_time[0]}m`;
  } else if (!isMovie) {
    const seasons = item.number_of_seasons || 1;
    runtime = `${seasons} ${seasons === 1 ? 'Season' : 'Seasons'}`;
  }

  const determinedType = customType || (isMovie ? 'Movie' : 'TV Show');

  return {
    id: item.id.toString(),
    tmdbId: item.id,
    title,
    year,
    rating,
    runtime,
    genre: genres,
    categories: ['trending'],
    poster,
    banner,
    description: item.overview || 'Experience this captivating streaming title on MovieVerse.',
    director,
    cast,
    trailerUrl,
    type: determinedType,
  };
}

/**
 * TMDB API Functions mapped to MovieVerse categories
 */
export const tmdbService = {
  // 1. Trending Movies
  async getTrending() {
    try {
      const data = await fetchFromTMDB('/trending/movie/week');
      return data.results.map(item => transformTMDBItem(item, 'Movie'));
    } catch {
      return MovieService.getMoviesByCategory('trending');
    }
  },

  // 2. Most Popular Movies
  async getPopular() {
    try {
      const data = await fetchFromTMDB('/movie/popular');
      return data.results.map(item => transformTMDBItem(item, 'Movie'));
    } catch {
      return MovieService.getMoviesByCategory('popular');
    }
  },

  // 3. Upcoming Movies
  async getUpcoming() {
    try {
      const data = await fetchFromTMDB('/movie/upcoming');
      return data.results.map(item => transformTMDBItem(item, 'Movie'));
    } catch {
      return MovieService.getMoviesByCategory('upcoming');
    }
  },

  // 4. Classic & Old Movies
  async getClassic() {
    try {
      const data = await fetchFromTMDB('/discover/movie', {
        sort_by: 'vote_average.desc',
        'vote_count.gte': '2500',
        'primary_release_date.lte': '2005-01-01',
      });
      return data.results.map(item => transformTMDBItem(item, 'Movie'));
    } catch {
      return MovieService.getMoviesByCategory('old');
    }
  },

  // 5. Top Rated Movies
  async getTopRated() {
    try {
      const data = await fetchFromTMDB('/movie/top_rated');
      return data.results.map(item => transformTMDBItem(item, 'Movie'));
    } catch {
      return MovieService.getMoviesByCategory('top_rated');
    }
  },

  // 6. Action Movies (Genre 28)
  async getAction() {
    try {
      const data = await fetchFromTMDB('/discover/movie', {
        with_genres: '28',
        sort_by: 'popularity.desc',
      });
      return data.results.map(item => transformTMDBItem(item, 'Movie'));
    } catch {
      return MovieService.getMoviesByCategory('action');
    }
  },

  // 7. Comedy Movies (Genre 35)
  async getComedy() {
    try {
      const data = await fetchFromTMDB('/discover/movie', {
        with_genres: '35',
        sort_by: 'popularity.desc',
      });
      return data.results.map(item => transformTMDBItem(item, 'Movie'));
    } catch {
      return MovieService.getMoviesByCategory('comedy');
    }
  },

  // 8. Horror & Thriller (Genres 27, 53)
  async getHorror() {
    try {
      const data = await fetchFromTMDB('/discover/movie', {
        with_genres: '27,53',
        sort_by: 'popularity.desc',
      });
      return data.results.map(item => transformTMDBItem(item, 'Movie'));
    } catch {
      return MovieService.getMoviesByCategory('horror');
    }
  },

  // 9. Science Fiction (Genre 878)
  async getSciFi() {
    try {
      const data = await fetchFromTMDB('/discover/movie', {
        with_genres: '878',
        sort_by: 'popularity.desc',
      });
      return data.results.map(item => transformTMDBItem(item, 'Movie'));
    } catch {
      return MovieService.getMoviesByCategory('scifi');
    }
  },

  // 10. Romance Movies (Genre 10749)
  async getRomance() {
    try {
      const data = await fetchFromTMDB('/discover/movie', {
        with_genres: '10749',
        sort_by: 'popularity.desc',
      });
      return data.results.map(item => transformTMDBItem(item, 'Movie'));
    } catch {
      return MovieService.getMoviesByCategory('romance');
    }
  },

  // 11. TV Shows & Web Series
  async getTVShows() {
    try {
      const data = await fetchFromTMDB('/trending/tv/week');
      return data.results.map(item => transformTMDBItem(item, 'TV Show'));
    } catch {
      return MovieService.getMoviesByCategory('tvshows');
    }
  },

  // Unified Category Dispatcher
  async getMoviesByCategory(categoryKey) {
    switch (categoryKey) {
      case 'trending':
        return this.getTrending();
      case 'popular':
        return this.getPopular();
      case 'upcoming':
        return this.getUpcoming();
      case 'old':
        return this.getClassic();
      case 'top_rated':
        return this.getTopRated();
      case 'action':
        return this.getAction();
      case 'comedy':
        return this.getComedy();
      case 'horror':
        return this.getHorror();
      case 'scifi':
        return this.getSciFi();
      case 'romance':
        return this.getRomance();
      case 'tvshows':
      case 'webseries':
        return this.getTVShows();
      default:
        return this.getPopular();
    }
  },

  // Real-time Search Movies & TV Shows
  async searchMovies(query) {
    if (!query || !query.trim()) return [];
    try {
      const data = await fetchFromTMDB('/search/multi', {
        query: query.trim(),
        include_adult: 'false',
      });

      // Filter only movies and tv shows with posters
      const validResults = (data.results || []).filter(
        item => item.media_type === 'movie' || item.media_type === 'tv'
      );

      if (validResults.length === 0) {
        // Fallback to searching local data
        return MovieService.searchMoviesQuery(query);
      }

      return validResults.map(item => transformTMDBItem(item));
    } catch (error) {
      console.warn('TMDB search failed, falling back to local search:', error);
      return MovieService.searchMoviesQuery(query);
    }
  },

  // Fetch Full Movie/TV Details with Credits, Videos, and Similar titles
  async getMovieDetails(id) {
    if (!id) return MovieService.getAllMovies()[0];

    // Check if it's a static mock ID (e.g. 'm1', 'm2')
    if (typeof id === 'string' && id.startsWith('m')) {
      const staticMovie = MovieService.getMovieById(id);
      return staticMovie || MovieService.getAllMovies()[0];
    }

    try {
      // First try as movie
      try {
        const movieData = await fetchFromTMDB(`/movie/${id}`, {
          append_to_response: 'videos,credits,similar',
        });
        const transformed = transformTMDBItem(movieData, 'Movie');

        // Extract similar movies if present
        if (movieData.similar?.results) {
          transformed.similar = movieData.similar.results
            .filter(item => item.poster_path)
            .slice(0, 5)
            .map(item => transformTMDBItem(item, 'Movie'));
        }
        return transformed;
      } catch {
        // If movie fails, try as TV Show
        const tvData = await fetchFromTMDB(`/tv/${id}`, {
          append_to_response: 'videos,credits,similar',
        });
        const transformed = transformTMDBItem(tvData, 'TV Show');
        if (tvData.similar?.results) {
          transformed.similar = tvData.similar.results
            .filter(item => item.poster_path)
            .slice(0, 5)
            .map(item => transformTMDBItem(item, 'TV Show'));
        }
        return transformed;
      }
    } catch (err) {
      console.warn('Failed to fetch details from TMDB:', err);
      return MovieService.getMovieById(id) || MovieService.getAllMovies()[0];
    }
  },
};
