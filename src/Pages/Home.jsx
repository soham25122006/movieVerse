import { useMovieContext } from '../context/MovieContext';
import Hero_banner from '../Components/Hero_banner';
import Main_category_sections from '../Components/Main_category_sections';
import Trailer from '../Components/Trailer';
import Moviecard from '../Components/Moviecard';

function Home() {
  const { searchQuery, searchResults, isSearching, closeSearch } = useMovieContext();
  const hasActiveSearch = searchQuery && searchQuery.trim().length > 0;

  return (
    <div className="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen flex flex-col selection:bg-red-600 selection:text-white">
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {hasActiveSearch ? (
          /* ==================== SEARCH RESULTS SECTION ==================== */
          <section id="search-results-section" className="mb-12 animate-fade-in">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>Search Results</span>
                  {isSearching && (
                    <span className="text-xs font-normal text-slate-400 animate-pulse">
                      (Searching TMDB...)
                    </span>
                  )}
                </h2>
                <p id="search-results-count" className="text-sm text-slate-400 mt-0.5">
                  {isSearching
                    ? `Searching for "${searchQuery}"...`
                    : `Found ${searchResults.length} ${
                        searchResults.length === 1 ? 'title' : 'titles'
                      } for "${searchQuery}"`}
                </p>
              </div>
              <button
                onClick={closeSearch}
                className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 cursor-pointer bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg transition-colors"
              >
                ✕ Close Search
              </button>
            </div>

            {isSearching ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[2/3] rounded-xl bg-slate-900 border border-slate-800 animate-pulse"
                  />
                ))}
              </div>
            ) : searchResults.length === 0 ? (
              <div className="py-16 text-center bg-slate-900/50 border border-slate-800 rounded-2xl max-w-xl mx-auto p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center text-2xl font-bold">
                  🔍
                </div>
                <h3 className="text-xl font-bold text-slate-200 mb-1">
                  No movies or web series found
                </h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                  We couldn't find anything matching "{searchQuery}". Try searching for popular titles like "Dune", "Avatar", "Spider-Man", or "Stranger Things".
                </p>
              </div>
            ) : (
              <div
                id="search-results-grid"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              >
                {searchResults.map((movie) => (
                  <Moviecard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </section>
        ) : (
          /* ==================== NORMAL HOME SECTIONS ==================== */
          <>
            <Hero_banner />
            <Main_category_sections />
          </>
        )}

        {/* Global Trailer Modal */}
        <Trailer />
      </main>
    </div>
  );
}

export default Home;