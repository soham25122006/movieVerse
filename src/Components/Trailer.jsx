import React from 'react'

// function initTrailerModal() {
//     const modal = document.getElementById("trailer-modal");
//     const closeBtn = document.getElementById("trailer-modal-close");

//     if (closeBtn && modal) {
//         closeBtn.addEventListener("click", closeTrailerModal);
//         modal.addEventListener("click", (e) => {
//             if (e.target === modal) closeTrailerModal();
//         });
//     }
// }

// function openTrailerModal(trailerUrl, title) {
//     const modal = document.getElementById("trailer-modal");
//     const iframe = document.getElementById("trailer-iframe");
//     const modalTitle = document.getElementById("trailer-modal-title");

//     if (modal && iframe) {
//         if (modalTitle) modalTitle.textContent = `${title} - Official Trailer`;
//         // Set auto play parameter
//         const embedUrl = trailerUrl.includes("?") ? `${trailerUrl}&autoplay=1` : `${trailerUrl}?autoplay=1`;
//         iframe.src = embedUrl;
//         modal.classList.remove("hidden");
//         modal.classList.add("flex");
//     }
// };

// function closeTrailerModal() {
//     const modal = document.getElementById("trailer-modal");
//     const iframe = document.getElementById("trailer-iframe");
//     if (modal && iframe) {
//         iframe.src = "";
//         modal.classList.add("hidden");
//         modal.classList.remove("flex");
//     }
// }
import { AppModule } from '../js/app'

function Trailer() {
    return (
        <div id="trailer-modal" className="hidden fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl animate-fade-in flex flex-col">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
                    <h3 id="trailer-modal-title" className="font-bold text-slate-100 text-sm sm:text-base">Movie Trailer</h3>
                    <button onClick={()=>{AppModule.closeTrailerModal()}} className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 text-base font-bold">
                        ✕
                    </button>
                </div>
                <div className="relative aspect-video w-full bg-black">
                    <iframe
                        id="trailer-iframe"
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

export default Trailer