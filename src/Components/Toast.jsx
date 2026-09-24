import { useMovieContext } from '../context/MovieContext';

function Toast() {
  const { toasts, removeToast } = useMovieContext();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => {
        const bgClass =
          toast.type === 'success'
            ? 'bg-emerald-600'
            : toast.type === 'error'
            ? 'bg-red-600'
            : 'bg-slate-800 border border-slate-700';

        return (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={`${bgClass} text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-medium flex items-center gap-2.5 animate-toast pointer-events-auto cursor-pointer transition-transform hover:scale-105`}
          >
            <span>{toast.type === 'success' ? '✓' : toast.type === 'error' ? '⚠️' : 'ℹ️'}</span>
            <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Toast;
