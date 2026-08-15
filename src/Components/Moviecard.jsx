import React from 'react'
import { Link } from 'react-router-dom'
import { WatchlistService } from '../js/watchlist'

function Moviecard(props) {
    return (
        <div className="shrink-0 w-44 sm:w-52 group relative bg-slate-900 border border-slate-800/80 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-slate-700 hover:shadow-red-950/20 flex flex-col">

            
            <div className="relative aspect-[2/3] overflow-hidden bg-slate-950">
                <img
                    src={props.movie.poster}
                    alt={props.movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                />

                
                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center gap-2">
                    <Link
                        to={`/Movie_details?id=${props.movie.id}`}
                        className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all transform translate-y-2 group-hover:translate-y-0"
                    >
                        View Details
                    </Link>
                    <button
                        onClick={() => WatchlistService.toggleWatchlist(props.movie.id)}
                        className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-all transform translate-y-2 group-hover:translate-y-0"
                    >{WatchlistService && WatchlistService.isInWatchlist(props.movie.id) ? 'Remove Watchlist' : '+ Watchlist'}
                    </button>
                </div>

                
                <div className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md text-amber-400 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-500/20">
                    <span>⭐</span>
                    <span>{props.movie.rating}</span>
                </div>

                
                <div className="absolute top-2.5 right-2.5 bg-slate-900/90 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-700">
                    {props.movie.type}
                </div>
            </div>

            
            <div className="p-3 flex flex-col justify-between flex-1">
                <div>
                    <h3 className="font-bold text-slate-100 text-sm truncate group-hover:text-red-500 transition-colors">
                        {props.movie.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                        <span>{props.movie.year}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-300 font-medium">{props.movie.genre[0]}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Moviecard