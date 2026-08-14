/**
 * Movie Explorer - Search Module
 * Animated search overlay bar & real-time JavaScript filtering engine.
 */
import { MovieService } from "./movies";
function initSearch() {
  const searchToggleBtns = document.querySelectorAll(".search-toggle-btn");
  const searchBar = document.getElementById("search-bar-container");
  const searchInput = document.getElementById("search-input");
  const searchClearBtn = document.getElementById("search-clear-btn");
  const searchResultsContainer = document.getElementById("search-results-section");

  if (!searchBar) return;

  // Toggle search bar visibility
  searchToggleBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = searchBar.classList.contains("hidden");
      if (isHidden) {
        searchBar.classList.remove("hidden");
        searchBar.classList.add("animate-fade-in");
        if (searchInput) searchInput.focus();
      } else {
        closeSearch();
      }
    });
  });

  // Clear button
  if (searchClearBtn) {
    searchClearBtn.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
        searchInput.focus();
        handleSearchInput("");
      }
    });
  }

  // Live input handler
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      handleSearchInput(e.target.value);
    });
  }

  // Close search if Esc pressed
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !searchBar.classList.contains("hidden")) {
      closeSearch();
    }
  });
}

function closeSearch() {
  const searchBar = document.getElementById("search-bar-container");
  const searchInput = document.getElementById("search-input");
  const searchResultsSection = document.getElementById("search-results-section");
  const mainContentSections = document.getElementById("main-category-sections");

  if (searchBar) searchBar.classList.add("hidden");
  if (searchInput) searchInput.value = "";
  if (searchResultsSection) searchResultsSection.classList.add("hidden");
  if (mainContentSections) mainContentSections.classList.remove("hidden");
}

function handleSearchInput(query) {
  const searchResultsSection = document.getElementById("search-results-section");
  const searchResultsGrid = document.getElementById("search-results-grid");
  const searchResultsCount = document.getElementById("search-results-count");
  const mainCategorySections = document.getElementById("main-category-sections");

  if (!query || query.trim() === "") {
    if (searchResultsSection) searchResultsSection.classList.add("hidden");
    if (mainCategorySections) mainCategorySections.classList.remove("hidden");
    return;
  }

  const results = MovieService ? MovieService.searchMoviesQuery(query) : [];

  if (mainCategorySections) mainCategorySections.classList.add("hidden");
  if (searchResultsSection) searchResultsSection.classList.remove("hidden");

  if (searchResultsCount) {
    searchResultsCount.textContent = `Found ${results.length} ${results.length === 1 ? 'title' : 'titles'} for "${query}"`;
  }

  if (!searchResultsGrid) return;

  if (results.length === 0) {
    searchResultsGrid.innerHTML = `
      <div class="col-span-full py-16 text-center bg-slate-900/50 border border-slate-800 rounded-2xl">
        <div class="w-16 h-16 mx-auto mb-4 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center text-2xl font-bold">
          🔍
        </div>
        <h3 class="text-xl font-bold text-slate-200 mb-1">No movies or web series found</h3>
        <p class="text-slate-400 text-sm max-w-md mx-auto">We couldn't find anything matching "${query}". Try searching for popular titles like "Dune", "Interstellar", or genre names like "Action".</p>
      </div>
    `;
    return;
  }

  searchResultsGrid.innerHTML = results.map(movie => `
    <div class="group relative bg-slate-900 border border-slate-800/80 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-700 animate-fade-in flex flex-col">
      <div class="relative aspect-[2/3] overflow-hidden bg-slate-950">
        <img 
          src="${movie.poster}" 
          alt="${movie.title}" 
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div class="absolute top-3 left-3 bg-slate-900/90 text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 border border-amber-500/20">
          <span>⭐</span>
          <span>${movie.rating}</span>
        </div>
      </div>
      <div class="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div class="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>${movie.year}</span>
            <span>•</span>
            <span class="text-red-400 font-medium">${movie.genre[0]}</span>
          </div>
          <h3 class="font-bold text-slate-100 text-base line-clamp-1 group-hover:text-red-500 transition-colors">${movie.title}</h3>
        </div>
        <a href="movie-details.html?id=${movie.id}" class="mt-3 py-2 px-3 bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold text-center transition-colors">
          Explore Movie
        </a>
      </div>
    </div>
  `).join("");
}

export const SearchService = {
  initSearch,
  closeSearch,
  handleSearchInput
};
