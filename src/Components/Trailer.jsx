import { useMovieContext } from '../context/MovieContext';

function Trailer() {
  const { trailerData, closeTrailer } = useMovieContext();

  if (!trailerData.isOpen) return null;

  return (
    <div
      id="trailer-modal"
      onClick={(e) => {
        if (e.target.id === 'trailer-modal') closeTrailer();
      }}
      className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
    >
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <h3 id="trailer-modal-title" className="font-bold text-slate-100 text-sm sm:text-base truncate pr-4">
            {trailerData.title || 'Movie Trailer'}
          </h3>
          <button
            onClick={closeTrailer}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 text-base font-bold cursor-pointer transition-colors"
            title="Close Trailer (Esc)"
          >
            ✕
          </button>
        </div>
        <div className="relative aspect-video w-full bg-black">
          <iframe
            id="trailer-iframe"
            src={trailerData.trailerUrl}
            title={trailerData.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default Trailer;