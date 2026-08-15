// /**
//  * Movie Explorer - Main Application Script
//  * Modular controller managing page lifecycle, global navigation, and trailer modal.
//  */
// import { MovieService } from "./movies";
// import { WatchlistService } from "./watchlist";
// import { ValidationService } from "./validation";
// import { SearchService } from "./search";
// import { ProfileService } from "./profile";
// document.addEventListener("DOMContentLoaded", () => {
//     initGlobalComponents();
//     routePageController();
// });

// // Global Navigation & UI Initialization
// function initGlobalComponents() {
//     highlightActiveNavLink();
//     initMobileMenu();

//     if (WatchlistService) {
//         WatchlistService.updateWatchlistBadge();
//     }

//     if (SearchService) {
//         SearchService.initSearch();
//     }

//     initTrailerModal();
// }

// function highlightActiveNavLink() {
//     const currentPath = window.location.pathname.split("/").pop() || "index.html";
//     const links = document.querySelectorAll(".nav-link");

//     links.forEach(link => {
//         const to = link.getAttribute("to");
//         if (to === currentPath || (currentPath === "" && to === "index.html")) {
//             link.classList.add("text-red-500", "font-bold");
//             link.classList.remove("text-slate-300");
//         } else {
//             link.classList.remove("text-red-500", "font-bold");
//             link.classList.add("text-slate-300");
//         }
//     });
// }

// function initMobileMenu() {
//     const menuBtn = document.getElementById("mobile-menu-btn");
//     const mobileMenu = document.getElementById("mobile-menu-dropdown");

//     if (menuBtn && mobileMenu) {
//         menuBtn.addEventListener("click", () => {
//             mobileMenu.classList.toggle("hidden");
//             mobileMenu.classList.toggle("animate-fade-in");
//         });
//     }
// }

// // Page Router
// function routePageController() {
//     const path = window.location.pathname.split("/").pop();

//     if (path === "index.html" || path === "" || path === "/") {
//         renderHomePage();
//     } else if (path === "movie-details.html") {
//         renderMovieDetailsPage();
//     } else if (path === "watchlist.html") {
//         if (WatchlistService) WatchlistService.renderWatchlistPage();
//     } else if (path === "profile.html") {
//         if (ProfileService) ProfileService.renderProfilePage();
//     } else if (path === "contact.html") {
//         if (ValidationService) ValidationService.initContactForm();
//     } else if (path === "login.html") {
//         if (ValidationService) ValidationService.initLoginForm();
//     }
// }
// // ----------------------------------------------------
// // HOME PAGE RENDERING ENGINE
// // ----------------------------------------------------
// function renderHomePage() {
//     const movies = MovieService ? MovieService.getAllMovies() : [];
//     if (movies.length === 0) return;

//     // Render Hero Banner (#1 Trending Movie index 0)
//     renderHeroBanner(0);

//     // Define Category Sections to render as Horizontal Rows
//     const categoryConfigs = [
//         { key: "trending", title: "- Trending Movies" },
//         { key: "popular", title: "- Most Popular Movies" },
//         { key: "upcoming", title: "- Upcoming Movies" },
//         { key: "old", title: "- Classic & Old Movies" },
//         { key: "top_rated", title: "- Top Rated Movies" },
//         { key: "action", title: "- Action Movies" },
//         { key: "comedy", title: "- Comedy Movies" },
//         { key: "horror", title: "- Horror & Thriller" },
//         { key: "scifi", title: "- Science Fiction" },
//         { key: "romance", title: "- Romance Movies" },
//         { key: "tvshows", title: "- TV Shows & Web Series" }
//     ];

//     const sectionsContainer = document.getElementById("main-category-sections");
//     if (!sectionsContainer) return;

//     sectionsContainer.innerHTML = categoryConfigs.map(cat => {
//         const categoryMovies = MovieService.getMoviesByCategory(cat.key);
//         if (categoryMovies.length === 0) return "";

//         return `
//       <section class="mb-10">
//         <div class="flex items-center justify-between mb-4">
//           <h2 class="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
//             ${cat.title}
//           </h2>
//           <div class="flex items-center gap-1.5">
//             <button 
//               onClick={scrollRow('${cat.key}', -400)}
//               class="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all shadow-md"
//               title="Scroll left"
//             >
//               &lt;
//             </button>
//             <button 
//               onClick={scrollRow('${cat.key}', 400)}
//               class="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all shadow-md"
//               title="Scroll right"
//             >
//              &gt;
//             </button>
//           </div>
//         </div>

//         <div 
//           id="row-${cat.key}" 
//           class="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
//         >
//           ${categoryMovies.map(movie => createMovieCardHTML(movie)).join("")}
//         </div>
//       </section>
//     `;
//     }).join("");
// }

// let currentHeroIndex = 0;

// function prevHeroMovie() {
//     renderHeroBanner(currentHeroIndex - 1);
// }

// function nextHeroMovie() {
//     renderHeroBanner(currentHeroIndex + 1);
// }

// window.prevHeroMovie = prevHeroMovie;
// window.nextHeroMovie = nextHeroMovie;

// function renderHeroBanner(index = 0) {
//     const bannerContainer = document.getElementById("hero-banner-section");
//     if (!bannerContainer) return;

//     const movies = MovieService ? MovieService.getMoviesByCategory("trending") : [];
//     if (movies.length === 0) return;

//     currentHeroIndex = (index + movies.length) % movies.length;
//     const movie = movies[currentHeroIndex];

//     const isInWatchlist = WatchlistService ? WatchlistService.isInWatchlist(movie.id) : false;

//     bannerContainer.innerHTML = `
//     <div class="relative w-full min-h-[520px] md:min-h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 group">
//       <!-- Background Image -->
//       <img 
//         src="${movie.banner}" 
//         alt="${movie.title}" 
//         class="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
//         referrerPolicy="no-referrer"
//       />
      
//       <!-- Gradient Overlays for readability -->
//       <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 sm:via-slate-950/80 to-transparent"></div>
//       <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

//       <!-- Navigation Arrows Top Right -->
//       <div class="absolute top-6 right-6 z-20 flex items-center gap-2">
//         <button 
//           onClick={prevHeroMovie} 
//           class="w-9 h-9 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white backdrop-blur-md transition-all shadow-lg flex items-center justify-center text-sm font-bold cursor-pointer"
//           title="Previous Featured Movie"
//         >
//           &lt;
//         </button>
//         <button 
//           onClick={nextHeroMovie}
//           class="w-9 h-9 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white backdrop-blur-md transition-all shadow-lg flex items-center justify-center text-sm font-bold cursor-pointer"
//           title="Next Featured Movie"
//         >
//           &gt;
//         </button>
//       </div>

//       <!-- Banner Content Left Side -->
//       <div class="relative z-10 h-full min-h-[520px] md:min-h-[600px] max-w-2xl flex flex-col justify-end p-6 sm:p-10 md:p-14">
        
//         <!-- Featured Tag -->
//         <div class="flex flex-wrap items-center gap-2 mb-3">
//           <span class="bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
//             <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
//             #${currentHeroIndex + 1} Trending Movie
//           </span>
//           <span class="bg-slate-900/80 text-amber-400 border border-amber-500/30 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
//             ⭐ ${movie.rating} / 10
//           </span>
//           <span class="bg-slate-900/80 text-slate-300 border border-slate-700/80 text-[11px] font-medium px-2 py-0.5 rounded-full">
//             4K Ultra HD
//           </span>
//         </div>

//         <!-- Movie Title -->
//         <h1 class="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none mb-3 drop-shadow-md">
//           ${movie.title}
//         </h1>

//         <!-- Release Year, Runtime, Genre -->
//         <div class="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300 font-medium mb-4">
//           <span class="font-bold text-white">${movie.year}</span>
//           <span>•</span>
//           <span>${movie.runtime}</span>
//           <span>•</span>
//           <div class="flex flex-wrap items-center gap-1.5">
//             ${movie.genre.map(g => `<span class="bg-slate-800/80 px-2.5 py-0.5 rounded-md border border-slate-700/60 text-slate-200 text-xs">${g}</span>`).join("")}
//           </div>
//         </div>

//         <!-- Short Description -->
//         <p class="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3 mb-8 max-w-xl">
//           ${movie.description}
//         </p>

//         <!-- CTA Buttons -->
//         <div class="flex flex-wrap items-center gap-3">
//           <button 
//             onClick={openTrailerModal('${movie.trailerUrl}', '${movie.title}')}
//             class="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm shadow-xl hover:shadow-red-900/40 transition-all flex items-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
//           >
//             <span>▶</span>
//             <span>Watch Now</span>
//           </button>

//           <button 
//             data-watchlist-btn="${movie.id}"
//             onClick={WatchlistService.toggleWatchlist('${movie.id}')}
//             class="px-6 py-3.5 ${isInWatchlist ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-900/90 hover:bg-slate-800'} text-white border border-slate-700/80 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer"
//           >
//             ${isInWatchlist ? `
//               <span>✓</span>
//               <span>In Watchlist</span>
//             ` : `
//               <span>+</span>
//               <span>Add to Watchlist</span>
//             `}
//           </button>

//           <Link 
//             to="movie-details.html?id=${movie.id}"
//             class="px-5 py-3.5 bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl font-semibold text-sm transition-all border border-slate-800"
//           >
//             More Details
//           </Link>
//         </div>

//         <!-- Slide Indicators -->
//         <div class="flex items-center gap-2 mt-6">
//           ${movies.slice(0, 5).map((m, i) => `
//             <button 
//               onClick={renderHeroBanner(${i}}
//               class="h-2 rounded-full transition-all cursor-pointer ${i === currentHeroIndex ? 'w-8 bg-red-600' : 'w-2 bg-slate-700 hover:bg-slate-500'}"
//               title="${m.title}"
//             ></button>
//           `).join("")}
//         </div>

//       </div>
//     </div>
//   `;
// }

// function createMovieCardHTML(movie) {
//     return `
//     <div class="shrink-0 w-44 sm:w-52 group relative bg-slate-900 border border-slate-800/80 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-slate-700 hover:shadow-red-950/20 flex flex-col">
      
//       <!-- Poster Container -->
//       <div class="relative aspect-[2/3] overflow-hidden bg-slate-950">
//         <img 
//           src="${movie.poster}" 
//           alt="${movie.title}" 
//           class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//           referrerPolicy="no-referrer"
//           loading="lazy"
//         />

//         <!-- Hover Overlay -->
//         <div class="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center gap-2">
//           <Link 
//             to="movie-details.html?id=${movie.id}"
//             class="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all transform translate-y-2 group-hover:translate-y-0"
//           >
//             View Details
//           </Link>
//           <button 
//             onClick={WatchlistService.toggleWatchlist('${movie.id}'}
//             class="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-all transform translate-y-2 group-hover:translate-y-0"
//           >
//             ${WatchlistService && WatchlistService.isInWatchlist(movie.id) ? 'Remove Watchlist' : '+ Watchlist'}
//           </button>
//         </div>

//         <!-- Rating Badge -->
//         <div class="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md text-amber-400 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-500/20">
//           <span>⭐</span>
//           <span>${movie.rating}</span>
//         </div>

//         <!-- Type Badge -->
//         <div class="absolute top-2.5 right-2.5 bg-slate-900/90 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-700">
//           ${movie.type}
//         </div>
//       </div>

//       <!-- Details -->
//       <div class="p-3 flex flex-col justify-between flex-1">
//         <div>
//           <h3 class="font-bold text-slate-100 text-sm truncate group-hover:text-red-500 transition-colors">
//             ${movie.title}
//           </h3>
//           <div class="flex items-center justify-between text-xs text-slate-400 mt-1">
//             <span>${movie.year}</span>
//             <span class="text-slate-500">•</span>
//             <span class="text-slate-300 font-medium">${movie.genre[0]}</span>
//           </div>
//         </div>
//       </div>

//     </div>
//   `;
// }
// // ----------------------------------------------------
// // MOVIE DETAILS PAGE RENDERING
// // ----------------------------------------------------
// function renderMovieDetailsPage() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const movieId = urlParams.get("id") || "m1";
//     const movie = MovieService ? MovieService.getMovieById(movieId) : null;

//     if (!movie) return;

//     // Record history view
//     if (ProfileService) {
//         ProfileService.recordMovieView(movie.id);
//     }

//     const container = document.getElementById("movie-details-container");
//     if (!container) return;

//     const isInWatchlist = WatchlistService ? WatchlistService.isInWatchlist(movie.id) : false;

//     container.innerHTML = `
//     <!-- Top Back Button & Breadcrumbs -->
//     <div class="mb-6 flex items-center justify-between">
//       <Link to="/" class="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl text-sm font-semibold transition-all">
//         <span>←</span>
//         <span>Back to Explorer</span>
//       </Link>
//       <span class="text-xs text-slate-500 font-medium">Movie Explorer ID: ${movie.id}</span>
//     </div>

//     <!-- Main Detail Backdrop Hero -->
//     <div class="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl mb-12">
//       <!-- Backdrop Banner -->
//       <div class="relative h-64 sm:h-96 w-full">
//         <img src="${movie.banner}" alt="${movie.title}" class="w-full h-full object-cover" referrerPolicy="no-referrer" />
//         <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>
//       </div>

//       <!-- Content Overlay -->
//       <div class="relative z-10 p-6 sm:p-10 -mt-24 sm:-mt-32 flex flex-col md:flex-row gap-8 items-start">
//         <!-- Poster -->
//         <div class="w-48 sm:w-60 shrink-0 rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl bg-slate-950 self-center md:self-start">
//           <img src="${movie.poster}" alt="${movie.title}" class="w-full h-auto object-cover" referrerPolicy="no-referrer" />
//         </div>

//         <!-- Meta Info -->
//         <div class="flex-1">
//           <div class="flex flex-wrap items-center gap-3 mb-3">
//             <span class="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">${movie.type}</span>
//             <span class="bg-slate-800 text-amber-400 font-bold text-xs px-3 py-1 rounded-full border border-amber-500/20 flex items-center gap-1">
//               ⭐ ${movie.rating} / 10
//             </span>
//             <span class="text-slate-400 text-sm font-medium">${movie.year}</span>
//             <span class="text-slate-600">•</span>
//             <span class="text-slate-400 text-sm font-medium">${movie.runtime}</span>
//           </div>

//           <h1 class="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">${movie.title}</h1>

//           <!-- Genres -->
//           <div class="flex flex-wrap gap-2 mb-6">
//             ${movie.genre.map(g => `<span class="bg-slate-800 text-slate-200 text-xs font-semibold px-3 py-1 rounded-lg border border-slate-700">${g}</span>`).join("")}
//           </div>

//           <p class="text-slate-300 text-base leading-relaxed mb-8 max-w-3xl">
//             ${movie.description}
//           </p>

//           <!-- Buttons -->
//           <div class="flex flex-wrap items-center gap-4">
//             <button 
//               onClick={openTrailerModal('${movie.trailerUrl}', '${movie.title}')}
//               class="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm shadow-xl flex items-center gap-2 transition-all hover:scale-105"
//             >
//               <span>▶</span>
//               <span>Play Trailer</span>
//             </button>

//             <button 
//               data-watchlist-btn="${movie.id}"
//               onClick={WatchlistService.toggleWatchlist('${movie.id}')}
//               class="px-6 py-3.5 ${isInWatchlist ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-800 hover:bg-slate-700'} text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2"
//             >
//               ${isInWatchlist ? `
//                 <span>✓</span>
//                 <span>In Watchlist</span>
//               ` : `
//                 <span>+</span>
//                 <span>Add to Watchlist</span>
//               `}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>

//     <!-- Additional Info Grid: Cast & Director -->
//     <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//       <!-- Director & Credits -->
//       <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
//         <h3 class="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
//           <span>🎬 Filmmakers</span>
//         </h3>
//         <div class="space-y-4 text-sm">
//           <div>
//             <span class="text-slate-400 block text-xs uppercase tracking-wider mb-1">Director</span>
//             <span class="text-slate-100 font-semibold text-base">${movie.director}</span>
//           </div>
//           <div>
//             <span class="text-slate-400 block text-xs uppercase tracking-wider mb-1">Release Year</span>
//             <span class="text-slate-200">${movie.year}</span>
//           </div>
//           <div>
//             <span class="text-slate-400 block text-xs uppercase tracking-wider mb-1">Runtime</span>
//             <span class="text-slate-200">${movie.runtime}</span>
//           </div>
//         </div>
//       </div>

//       <!-- Cast List -->
//       <div class="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
//         <h3 class="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
//           <span>⭐ Top Cast</span>
//         </h3>
//         <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
//           ${movie.cast.map(actor => `
//             <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 flex items-center gap-3">
//               <div class="w-10 h-10 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-sm shrink-0 border border-slate-700">
//                 ${actor.charAt(0)}
//               </div>
//               <span class="text-xs font-medium text-slate-200 line-clamp-2">${actor}</span>
//             </div>
//           `).join("")}
//         </div>
//       </div>
//     </div>

//     <!-- Related Movies Section -->
//     <div class="mb-8">
//       <h3 class="text-xl font-bold text-white mb-4">More Movies You Might Like</h3>
//       <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
//         ${(MovieService ? MovieService.getAllMovies() : [])
//             .filter(m => m.id !== movie.id && m.genre.some(g => movie.genre.includes(g)))
//             .slice(0, 5)
//             .map(m => createMovieCardHTML(m))
//             .join("")}
//       </div>
//     </div>
//   `;
// }

// // ----------------------------------------------------
// // TRAILER MODAL
// // ----------------------------------------------------
function initTrailerModal() {
    const modal = document.getElementById("trailer-modal");
    const closeBtn = document.getElementById("trailer-modal-close");

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", closeTrailerModal);
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeTrailerModal();
        });
    }
}

function openTrailerModal(trailerUrl, title) {
    const modal = document.getElementById("trailer-modal");
    const iframe = document.getElementById("trailer-iframe");
    const modalTitle = document.getElementById("trailer-modal-title");

    if (modal && iframe) {
        if (modalTitle) modalTitle.textContent = `${title} - Official Trailer`;
        // Set auto play parameter
        const embedUrl = trailerUrl.includes("?") ? `${trailerUrl}&autoplay=1` : `${trailerUrl}?autoplay=1`;
        iframe.src = embedUrl;
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    }
};

function closeTrailerModal() {
    const modal = document.getElementById("trailer-modal");
    const iframe = document.getElementById("trailer-iframe");
    if (modal && iframe) {
        iframe.src = "";
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    }
}

export const AppModule = {
    openTrailerModal,
    closeTrailerModal
};