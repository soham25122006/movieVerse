function About() {
    return (
        <div className="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen flex flex-col selection:bg-red-600 selection:text-white">

            <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                        About The Project
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                        Discover, Organize & Streamline Your Movie Journey
                    </h1>
                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                        Movie Explorer is a modern streaming discovery application built as a clean, modular web architecture. Designed from the ground up for seamless conversion into React components.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2  gap-8 mb-16">
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 relative overflow-hidden group hover:border-red-500/50 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-bold text-xl mb-6 border border-red-500/30">
                            🎯
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Provide movie enthusiasts with a sleek, distraction-free interface to browse trending titles, search through rich genres, and curate personal watchlists effortlessly using modern client-side technologies.
                        </p>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 relative overflow-hidden group hover:border-yellow-300/50 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold text-xl mb-6 border border-amber-500/30">
                            ⚡
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">React-Ready Architecture</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Every section, card, modal, and state manager has been deliberately organized into clean ES modules. This structure mirrors React props, state hooks, and custom components for effortless conversion.
                        </p>
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-white text-center mb-2">Technologies Used</h2>
                    <p className="text-slate-400 text-center text-sm mb-8">Pure web standards combined for maximum performance</p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center hover:border-orange-500/50 transition-colors">
                            <div className="w-10 h-10 mx-auto bg-orange-500/20 text-orange-400 font-bold rounded-lg flex items-center justify-center mb-3">
                                H5
                            </div>
                            <h4 className="font-bold text-white text-sm mb-1">HTML5</h4>
                            <p className="text-slate-500 text-xs">Semantic structure & clean layout trees</p>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center hover:border-blue-500/50 transition-colors">
                            <div className="w-10 h-10 mx-auto bg-blue-500/20 text-blue-400 font-bold rounded-lg flex items-center justify-center mb-3">
                                C3
                            </div>
                            <h4 className="font-bold text-white text-sm mb-1">CSS3</h4>
                            <p className="text-slate-500 text-xs">Custom scrollbars, glassmorphism & overlays</p>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center hover:border-yellow-500/50 transition-colors">
                            <div className="w-10 h-10 mx-auto bg-yellow-500/20 text-yellow-500 font-bold rounded-lg flex items-center justify-center mb-3">
                                JS
                            </div>
                            <h4 className="font-bold text-white text-sm mb-1">JavaScript ES6+</h4>
                            <p className="text-slate-500 text-xs">Modular logic, DOM manipulation & LocalStorage</p>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center hover:border-cyan-500/50 transition-colors">
                            <div className="w-10 h-10 mx-auto bg-cyan-500/20 text-cyan-400 font-bold rounded-lg flex items-center justify-center mb-3">
                                TW
                            </div>
                            <h4 className="font-bold text-white text-sm mb-1">Tailwind CSS</h4>
                            <p className="text-slate-500 text-xs">Utility-first responsive design framework</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-16">
                    <h3 className="text-2xl font-bold text-white mb-6">Core Features Highlight</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                        <div className="flex items-start gap-3">
                            <div className="p-1.5 bg-red-600/20 text-red-400 rounded-lg shrink-0 mt-0.5">✓</div>
                            <div>
                                <h5 className="font-semibold text-white">Dynamic Hero Banner & Categories</h5>
                                <p className="text-slate-400 text-xs mt-0.5">Featuring trending titles with background fade gradients and horizontal row scrolling.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-1.5 bg-red-600/20 text-red-400 rounded-lg shrink-0 mt-0.5">✓</div>
                            <div>
                                <h5 className="font-semibold text-white">Instant JavaScript Search</h5>
                                <p className="text-slate-400 text-xs mt-0.5">Real-time filtering across title, genre, director, cast, and story overview.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-1.5 bg-red-600/20 text-red-400 rounded-lg shrink-0 mt-0.5">✓</div>
                            <div>
                                <h5 className="font-semibold text-white">Persistent Watchlist Engine</h5>
                                <p className="text-slate-400 text-xs mt-0.5">Add or remove movies instantly with state synchronized directly to Local Storage.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-1.5 bg-red-600/20 text-red-400 rounded-lg shrink-0 mt-0.5">✓</div>
                            <div>
                                <h5 className="font-semibold text-white">Profile & History Tracker</h5>
                                <p className="text-slate-400 text-xs mt-0.5">Tracks recently opened movies, profile stats, and personal user details.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default About