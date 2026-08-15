import React from 'react'
import { Link } from 'react-router-dom'
import Hero_banner from '../Components/Hero_banner'
import Main_category_sections from '../Components/Main_category_sections'
import Trailer from '../Components/trailer'
function Home() {
    return (
        <div className="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen flex flex-col selection:bg-red-600 selection:text-white">
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">

                <Hero_banner/>

                <Main_category_sections/>
                
                <Trailer/>

            </main>
            
        </div>

    )
}
export default Home