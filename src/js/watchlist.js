/**
 * Movie Explorer - Watchlist Module
 * Local Storage persistent watchlist management with dynamic UI reactivity.
 */
import { MovieService } from "./movies";
const WATCHLIST_STORAGE_KEY = "movieExplorer_watchlist";

function getWatchlistIds() {
  try {
    const data = localStorage.getItem(WATCHLIST_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading watchlist from Local Storage", e);
    return [];
  }
}

function saveWatchlistIds(ids) {
  try {
    localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(ids));
    updateWatchlistBadge();
  } catch (e) {
    console.error("Error saving watchlist to Local Storage", e);
  }
}

function isInWatchlist(movieId) {
  const ids = getWatchlistIds();
  return ids.includes(movieId);
}

function addToWatchlist(movieId) {
  const ids = getWatchlistIds();
  if (!ids.includes(movieId)) {
    ids.push(movieId);
    saveWatchlistIds(ids);
    showToast("Added to Watchlist!", "success");
  }
  updateWatchlistButtonsUI(movieId);
}

function removeFromWatchlist(movieId) {
  let ids = getWatchlistIds();
  if (ids.includes(movieId)) {
    ids = ids.filter(id => id !== movieId);
    saveWatchlistIds(ids);
    showToast("Removed from Watchlist", "info");
  }
  updateWatchlistButtonsUI(movieId);
  
  // If currently on Watchlist page, refresh grid
  if (window.location.pathname.includes("watchlist.html")) {
    renderWatchlistPage();
  }
}

function toggleWatchlist(movieId) {
  if (isInWatchlist(movieId)) {
    removeFromWatchlist(movieId);
  } else {
    addToWatchlist(movieId);
  }
}

function updateWatchlistButtonsUI(movieId) {
  const isSaved = isInWatchlist(movieId);
  const buttons = document.querySelectorAll(`[data-watchlist-btn="${movieId}"]`);
  
  buttons.forEach(btn => {
    if (isSaved) {
      btn.classList.add("bg-emerald-600", "hover:bg-emerald-700", "text-white");
      btn.classList.remove("bg-red-600", "hover:bg-red-700", "bg-slate-800", "hover:bg-slate-700");
      btn.innerHTML = `
        <span>✓</span>
        <span>In Watchlist</span>
      `;
    } else {
      btn.classList.remove("bg-emerald-600", "hover:bg-emerald-700");
      btn.classList.add("bg-slate-800/80", "hover:bg-slate-700", "text-slate-100");
      btn.innerHTML = `
        <span>+</span>
        <span>Add to Watchlist</span>
      `;
    }
  });
}

function updateWatchlistBadge() {
  const count = getWatchlistIds().length;
  const badges = document.querySelectorAll(".watchlist-count-badge");
  badges.forEach(badge => {
    badge.textContent = count;
    if (count > 0) {
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  });
}

function renderWatchlistPage() {
  const container = document.getElementById("watchlist-container");
  const emptyState = document.getElementById("watchlist-empty-state");
  const countSpan = document.getElementById("watchlist-total-count");
  if (!container) return;

  const savedIds = getWatchlistIds();
  const allMovies = MovieService ? MovieService.getAllMovies() : [];
  const savedMovies = allMovies.filter(m => savedIds.includes(m.id));

  if (countSpan) {
    countSpan.textContent = `${savedMovies.length} ${savedMovies.length === 1 ? 'Movie' : 'Movies'}`;
  }

  if (savedMovies.length === 0) {
    container.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");

  container.innerHTML = savedMovies.map(movie => `
    <div class="group relative bg-slate-900 border border-slate-800/80 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-red-950/20 hover:border-slate-700 animate-fade-in flex flex-col">
      <div class="relative aspect-[2/3] overflow-hidden bg-slate-950">
        <img 
          src="${movie.poster}" 
          alt="${movie.title}" 
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
        
        <!-- Rating Badge -->
        <div class="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 border border-amber-500/20">
          <span>⭐</span>
          <span>${movie.rating}</span>
        </div>

        <!-- Remove Button -->
        <button 
          onclick="WatchlistService.removeFromWatchlist('${movie.id}')"
          class="absolute top-3 right-3 bg-red-600/90 hover:bg-red-600 text-white w-7 h-7 rounded-full shadow-lg transition-all duration-200 hover:scale-110 flex items-center justify-center font-bold text-xs"
          title="Remove from Watchlist"
        >
          ✕
        </button>
      </div>

      <div class="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div class="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
            <span>${movie.year}</span>
            <span>•</span>
            <span>${movie.runtime}</span>
            <span>•</span>
            <span class="text-red-400 font-medium">${movie.genre[0]}</span>
          </div>
          <h3 class="font-bold text-slate-100 text-base line-clamp-1 group-hover:text-red-500 transition-colors">
            ${movie.title}
          </h3>
          <p class="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            ${movie.description}
          </p>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
          <a 
            href="movie-details.html?id=${movie.id}" 
            class="flex-1 py-2 px-3 bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold text-center transition-colors duration-200 flex items-center justify-center gap-1.5"
          >
            <span>View Details</span>
            <span>❯</span>
          </a>
        </div>
      </div>
    </div>
  `).join("");
}

// Global Toast helper
function showToast(message, type = "info") {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  const bgClass = type === "success" ? "bg-emerald-600" : "bg-slate-800 border border-slate-700";
  toast.className = `${bgClass} text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-medium flex items-center gap-2.5 animate-toast pointer-events-auto`;
  toast.innerHTML = `
    <span>ℹ️</span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("opacity-0", "transition-opacity", "duration-300");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

export const WatchlistService = {
  getWatchlistIds,
  isInWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  toggleWatchlist,
  updateWatchlistButtonsUI,
  updateWatchlistBadge,
  renderWatchlistPage,
  showToast
};
