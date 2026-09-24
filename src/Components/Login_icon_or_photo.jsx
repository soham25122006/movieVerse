import { Link, useLocation } from 'react-router-dom';

function Login_icon_or_photo() {
    const location = useLocation();

    return (
        <>
            {location.pathname === "/profile" ? (
                <Link to="/Login" className="text-xs font-semibold px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-800 transition-colors">
                    Account Login
                </Link>
            ) : (
                <Link to="/profile" className="hidden sm:flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-all">
                    <img id="nav-profile-avatar" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="Profile" className="w-7 h-7 rounded-lg object-cover" referrerPolicy="no-referrer" />
                    <span className="text-xs font-semibold text-slate-200 pr-1">Alex</span>
                </Link>
            )}
        </>
    );
}

export default Login_icon_or_photo;