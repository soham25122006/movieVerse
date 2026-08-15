import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { MovieService } from '../js/movies';
import { WatchlistService } from '../js/watchlist';
import { AppModule } from '../js/app';



function Hero_banner() {
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const movies = MovieService ? MovieService.getMoviesByCategory("trending") : [];
    if (movies.length === 0) return;
    
    const movie = movies[currentHeroIndex];
    
    const isInWatchlist = WatchlistService ? WatchlistService.isInWatchlist(movie.id) : false;
    function prevHeroMovie() {
        setCurrentHeroIndex(
            (currentHeroIndex - 1 + movies.length) % movies.length
        );
    }
    
    function nextHeroMovie() {
        setCurrentHeroIndex(
            (currentHeroIndex + 1) % movies.length
        );
    }

    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentHeroIndex(prevIndex =>
                (prevIndex + 1) % movies.length
            );

        }, 5000);

        return () => {
            clearInterval(interval);
        };

    }, []);

    return (
        <div className="relative w-full min-h-[520px] md:min-h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 group">

            <img
                src={movie.banner}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
            />


            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 sm:via-slate-950/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>


            <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
                <button
                    onClick={prevHeroMovie}
                    className="w-9 h-9 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white backdrop-blur-md transition-all shadow-lg flex items-center justify-center text-sm font-bold cursor-pointer"
                    title="Previous Featured Movie"
                >
                    &lt;
                </button>
                <button
                    onClick={nextHeroMovie}
                    className="w-9 h-9 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white backdrop-blur-md transition-all shadow-lg flex items-center justify-center text-sm font-bold cursor-pointer"
                    title="Next Featured Movie"
                >
                    &gt;
                </button>
            </div>


            <div className="relative z-10 h-full min-h-[520px] md:min-h-[600px] max-w-2xl flex flex-col justify-end p-6 sm:p-10 md:p-14">


                <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        #{currentHeroIndex + 1} Trending Movie
                    </span>
                    <span className="bg-slate-900/80 text-amber-400 border border-amber-500/30 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        ⭐ {movie.rating} / 10
                    </span>
                    <span className="bg-slate-900/80 text-slate-300 border border-slate-700/80 text-[11px] font-medium px-2 py-0.5 rounded-full">
                        4K Ultra HD
                    </span>
                </div>


                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none mb-3 drop-shadow-md">
                    {movie.title}
                </h1>


                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300 font-medium mb-4">
                    <span className="font-bold text-white">{movie.year}</span>
                    <span>•</span>
                    <span>{movie.runtime}</span>
                    <span>•</span>
                    <div className="flex flex-wrap items-center gap-1.5">
                        {movie.genre.map(g => (<span className="bg-slate-800/80 px-2.5 py-0.5 rounded-md border border-slate-700/60 text-slate-200 text-xs">{g}</span>))}
                    </div>
                </div>


                <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3 mb-8 max-w-xl">
                    {movie.description}
                </p>


                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={() => AppModule.openTrailerModal(movie.trailerUrl, movie.title)}
                        className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm shadow-xl hover:shadow-red-900/40 transition-all flex items-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
                    >
                        <span>▶</span>
                        <span>Watch Now</span>
                    </button>

                    <button
                        // data-watchlist-btn={movie.id}
                        onClick={() => WatchlistService.toggleWatchlist(movie.id)}
                        className={`px-6 py-3.5 ${isInWatchlist ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-900/90 hover:bg-slate-800'} text-white border border-slate-700/80 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer`}
                    >
                        {isInWatchlist ?
                            <>
                                <span>✓</span>
                                <span>In Watchlist</span>
                            </>
                            :
                            <>
                                <span>+</span>
                                <span>Add to Watchlist</span>
                            </>
                        }
                    </button>

                    <Link
                        to={`/Movie_details?id=${movie.id}`}
                        className="px-5 py-3.5 bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl font-semibold text-sm transition-all border border-slate-800"
                    >
                        More Details
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Hero_banner