import React from 'react'
import { Link } from 'react-router-dom'
function Login() {
    return (
        <div className="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen flex flex-col selection:bg-red-600 selection:text-white">

            <main className="flex-1 max-w-md w-full mx-auto px-4 py-12 flex flex-col justify-center">

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/10 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="text-center mb-8">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-lg">
                            ME
                        </div>
                        <h1 className="text-2xl font-black text-white tracking-tight">Welcome Back</h1>
                        <p className="text-slate-400 text-xs mt-1">Login to access your personal watchlist & history</p>
                    </div>

                    <form id="login-form" className="space-y-5">
                        <div>
                            <label htmlFor="login-username" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Username or Email</label>
                            <input
                                type="text"
                                id="login-username"
                                placeholder="e.g. Alex Rivera"
                                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label htmlFor="login-password" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Password</label>
                            <input
                                type="password"
                                id="login-password"
                                placeholder="••••••••"
                                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm shadow-xl transition-all hover:scale-[1.02]"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="relative my-6 text-center">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
                        <span className="relative bg-slate-900 px-3 text-slate-500 text-xs font-semibold uppercase">Or Quick Test</span>
                    </div>

                    <button
                        // onClick={() => {
                        //     document.getElementById('login-username').value = 'Alex Rivera'
                        //     document.getElementById('login-password').value = 'password123'
                        //     document.getElementById('login-form').dispatchEvent(new Event('submit'))
                        // }}
                        className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold border border-slate-700 transition-all flex items-center justify-center gap-2">
                        <span>⚡ Quick Demo Account Login</span>
                    </button>

                </div>

            </main>

            <footer className="bg-slate-950 border-t border-slate-900 mt-12 py-8 text-slate-500 text-xs text-center">
                &copy; 2026 Movie Explorer. Local Storage Authentication.
            </footer>

        </div>
    )
}

export default Login