import React from 'react'
import Moviecard from './Moviecard';
import { MovieService } from '../js/movies';


function Display_categories(props) {
    const cat = props.cat;
    const categoryMovies = MovieService.getMoviesByCategory(cat.key);
    if (categoryMovies.length === 0) return null;
    function scrollRow(categoryKey, distance) {
        const row = document.getElementById(`row-${categoryKey}`);
        if (row) {
            row.scrollBy({ left: distance, behavior: 'smooth' });
        }
    };

    return (
        <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
                    {cat.title}
                </h2>
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => scrollRow(cat.key, -400)}
                        className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all shadow-md"
                        title="Scroll left"
                    >
                        &lt;
                    </button>
                    <button
                        onClick={() => scrollRow(cat.key, -400)}
                        className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all shadow-md"
                        title="Scroll right"
                    >
                        &gt;
                    </button>
                </div>
            </div>

            <div
                id={`row-${cat.key}`}
                className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
            >
                {categoryMovies.map(movie =>
                    <Moviecard
                        key={movie.id}
                        movie={movie} />)}
            </div>
        </section>
    );

}

function Main_category_sections() {
    const categoryConfigs = [
        { key: "trending", title: "- Trending Movies" },
        { key: "popular", title: "- Most Popular Movies" },
        { key: "upcoming", title: "- Upcoming Movies" },
        { key: "old", title: "- Classic & Old Movies" },
        { key: "top_rated", title: "- Top Rated Movies" },
        { key: "action", title: "- Action Movies" },
        { key: "comedy", title: "- Comedy Movies" },
        { key: "horror", title: "- Horror & Thriller" },
        { key: "scifi", title: "- Science Fiction" },
        { key: "romance", title: "- Romance Movies" },
        { key: "tvshows", title: "- TV Shows & Web Series" }
    ];
    const movies = MovieService ? MovieService.getAllMovies() : [];
    if (movies.length === 0) return;

    return (
        <>
            {categoryConfigs.map(cat => (
                <Display_categories
                    key={cat.key}
                    cat={cat}
                />
            ))}
        </>
    )
}
export default Main_category_sections