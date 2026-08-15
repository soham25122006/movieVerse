import React from 'react'
import { Link } from 'react-router-dom'
import { MovieService } from '../js/movies';
import { ProfileService } from '../js/profile';
import { AppModule } from '../js/app';
import { WatchlistService } from '../js/watchlist';
import Moviecard from '../Components/Moviecard';

function Movie_details() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id") || "m1";
    const movie = MovieService ? MovieService.getMovieById(movieId) : null;

    if (!movie) return;

    // Record history view
    // if (ProfileService) {
    //     ProfileService.recordMovieView(movie.id);
    // }
    return (
        <>
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">


                <div className="mb-6 flex items-center justify-between">
                    <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl text-sm font-semibold transition-all">
                        <span>←</span>
                        <span>Back to Explorer</span>
                    </Link>
                    <span className="text-xs text-slate-500 font-medium">Movie Explorer ID: {movie.id}</span>
                </div>


                <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl mb-12">

                    <div className="relative h-64 sm:h-96 w-full">
                        <img src={movie.banner} alt={movie.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>
                    </div>


                    <div className="relative z-10 p-6 sm:p-10 -mt-24 sm:-mt-32 flex flex-col md:flex-row gap-8 items-start">

                        <div className="w-48 sm:w-60 shrink-0 rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl bg-slate-950 self-center md:self-start">
                            <img src={movie.poster} alt={movie.title} className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                        </div>


                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{movie.type}</span>
                                <span className="bg-slate-800 text-amber-400 font-bold text-xs px-3 py-1 rounded-full border border-amber-500/20 flex items-center gap-1">
                                    ⭐ {movie.rating} / 10
                                </span>
                                <span className="text-slate-400 text-sm font-medium">{movie.year}</span>
                                <span className="text-slate-600">•</span>
                                <span className="text-slate-400 text-sm font-medium">{movie.runtime}</span>
                            </div>

                            <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">{movie.title}</h1>

                            <div className="flex flex-wrap gap-2 mb-6">
                                ${movie.genre.map(g => (<span className="bg-slate-800 text-slate-200 text-xs font-semibold px-3 py-1 rounded-lg border border-slate-700">{g}</span>))}
                            </div>

                            <p className="text-slate-300 text-base leading-relaxed mb-8 max-w-3xl">
                                {movie.description}
                            </p>


                            <div className="flex flex-wrap items-center gap-4">
                                <button
                                    onClick={AppModule.openTrailerModal(movie.trailerUrl, movie.title)}
                                    className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm shadow-xl flex items-center gap-2 transition-all hover:scale-105"
                                >
                                    <span>▶</span>
                                    <span>Play Trailer</span>
                                </button>

                                <button
                                    onClick={() => WatchlistService.toggleWatchlist(movie.id)}
                                    className={`px-6 py-3.5 ${WatchlistService.isInWatchlist ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-800 hover:bg-slate-700'} text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2`}
                                >
                                    {WatchlistService.isInWatchlist ? <>
                                        <span>✓</span>
                                        <span>In Watchlist</span>
                                    </> : <>
                                        <span>+</span>
                                        <span>Add to Watchlist</span>
                                    </>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
                            <span>🎬 Filmmakers</span>
                        </h3>
                        <div className="space-y-4 text-sm">
                            <div>
                                <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1">Director</span>
                                <span className="text-slate-100 font-semibold text-base">{movie.director}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1">Release Year</span>
                                <span className="text-slate-200">{movie.year}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1">Runtime</span>
                                <span className="text-slate-200">{movie.runtime}</span>
                            </div>
                        </div>
                    </div>


                    <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
                            <span>⭐ Top Cast</span>
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {movie.cast.map(actor => (
                                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-sm shrink-0 border border-slate-700">
                                        {actor.charAt(0)}
                                    </div>
                                    <span className="text-xs font-medium text-slate-200 line-clamp-2">{actor}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">More Movies You Might Like</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                        {(MovieService ? MovieService.getAllMovies() : [])
                            .filter(m => m.id !== movie.id && m.genre.some(g => movie.genre.includes(g)))
                            .slice(0, 5)
                            .map(m => <Moviecard
                                key={movie.id}
                                movie={m} />)}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Movie_details