/**
 * Movie Explorer - Profile & History Module
 * Local Storage user profile management, statistics, and watch history tracking.
 */
import { MovieService } from "./movies";
import { WatchlistService } from "./watchlist";
const PROFILE_STORAGE_KEY = "movieExplorer_user";
const HISTORY_STORAGE_KEY = "movieExplorer_history";

const defaultProfile = {
  name: "Alex Rivera",
  email: "alex.rivera@movieexplorer.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80",
  memberSince: "2024",
  totalWatched: 28,
  favoriteGenre: "Science Fiction",
  plan: "Premium 4K Ultra"
};

function getUserProfile() {
  try {
    const data = localStorage.getItem(PROFILE_STORAGE_KEY);
    return data ? { ...defaultProfile, ...JSON.parse(data) } : defaultProfile;
  } catch (e) {
    console.error("Error reading profile", e);
    return defaultProfile;
  }
}

function saveUserProfile(updated) {
  try {
    const current = getUserProfile();
    const newProfile = { ...current, ...updated };
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(newProfile));
    return newProfile;
  } catch (e) {
    console.error("Error saving profile", e);
  }
}

function recordMovieView(movieId) {
  try {
    let history = getWatchHistoryIds();
    // Move to top if already exists
    history = history.filter(id => id !== movieId);
    history.unshift(movieId);
    // Keep last 15 viewed
    if (history.length > 15) history = history.slice(0, 15);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  } catch (e) {
    console.error("Error saving history", e);
  }
}

function getWatchHistoryIds() {
  try {
    const data = localStorage.getItem(HISTORY_STORAGE_KEY);
    return data ? JSON.parse(data) : ["m1", "m2", "m4"]; // default starter history
  } catch (e) {
    return ["m1", "m2", "m4"];
  }
}

function renderProfilePage() {
  const profile = getUserProfile();
  const historyIds = getWatchHistoryIds();
  const watchlistIds = WatchlistService ? WatchlistService.getWatchlistIds() : [];
  const allMovies = MovieService ? MovieService.getAllMovies() : [];

  // Update Profile Info
  const nameEl = document.getElementById("profile-name");
  const emailEl = document.getElementById("profile-email");
  const avatarEl = document.getElementById("profile-avatar");
  const planEl = document.getElementById("profile-plan");

  if (nameEl) nameEl.textContent = profile.name;
  if (emailEl) emailEl.textContent = profile.email;
  if (avatarEl) avatarEl.src = profile.avatar;
  if (planEl) planEl.textContent = profile.plan;

  // Update Stats
  const statWatched = document.getElementById("stat-total-watched");
  const statWatchlist = document.getElementById("stat-watchlist-count");
  const statGenre = document.getElementById("stat-fav-genre");

  if (statWatched) statWatched.textContent = profile.totalWatched ?? historyIds.length;
  if (statWatchlist) statWatchlist.textContent = watchlistIds.length;
  if (statGenre) statGenre.textContent = profile.favoriteGenre;

  // Render History Movies
  const historyContainer = document.getElementById("profile-history-container");
  if (historyContainer) {
    const historyMovies = allMovies.filter(m => historyIds.includes(m.id));
    if (historyMovies.length === 0) {
      historyContainer.innerHTML = `<p class="text-slate-500 text-sm italic col-span-full py-4">No recently viewed movies yet.</p>`;
    } else {
      historyContainer.innerHTML = historyMovies.slice(0, 6).map(movie => `
        <div class="group bg-slate-900/80 border border-slate-800 rounded-lg overflow-hidden flex items-center gap-3 p-2.5 transition-all hover:bg-slate-800/80 hover:border-slate-700">
          <img src="${movie.poster}" alt="${movie.title}" class="w-12 h-16 object-cover rounded-md shrink-0" referrerPolicy="no-referrer" loading="lazy" />
          <div class="min-w-0 flex-1">
            <h4 class="font-semibold text-slate-200 text-xs truncate group-hover:text-red-400">${movie.title}</h4>
            <p class="text-slate-400 text-[11px] mt-0.5">${movie.year} • ${movie.genre[0]}</p>
            <div class="flex items-center gap-1 mt-1 text-amber-400 text-[11px]">
              <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <span>${movie.rating}</span>
            </div>
          </div>
          <a href="movie-details.html?id=${movie.id}" class="p-2 text-slate-400 hover:text-white hover:bg-slate-700/60 rounded-full transition-colors shrink-0">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </a>
        </div>
      `).join("");
    }
  }
}

export const ProfileService = {
  getUserProfile,
  saveUserProfile,
  recordMovieView,
  getWatchHistoryIds,
  renderProfilePage
};
