/**
 * Movie Explorer - Movie Data Module
 * Clean, modular array of movie objects for dynamic rendering.
 * Easily convertible to React state or API response later.
 */

const moviesData = [
  {
    id: "m1",
    title: "Dune: Part Two",
    year: 2024,
    rating: 8.6,
    runtime: "2h 46m",
    genre: ["Science Fiction", "Adventure", "Action"],
    categories: ["trending", "popular", "scifi", "top_rated"],
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&q=80",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future.",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Javier Bardem", "Austin Butler"],
    trailerUrl: "https://www.youtube.com/embed/Way9Dexny3w",
    type: "Movie"
  },
  {
    id: "m2",
    title: "Oppenheimer",
    year: 2023,
    rating: 8.9,
    runtime: "3h 00m",
    genre: ["Biography", "Drama", "History"],
    categories: ["trending", "popular", "top_rated"],
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr.", "Florence Pugh"],
    trailerUrl: "https://www.youtube.com/embed/uYPbbksJxIg",
    type: "Movie"
  },
  {
    id: "m3",
    title: "Cyberpunk: Edgerunners",
    year: 2024,
    rating: 8.7,
    runtime: "1 Season",
    genre: ["Science Fiction", "Action", "Animation"],
    categories: ["tvshows", "webseries", "scifi", "trending"],
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1600&q=80",
    description: "A street kid trying to survive in a technology and body modification-obsessed city of the future. Having everything to lose, he chooses to stay alive by becoming an edgerunner.",
    director: "Hiroyuki Imaishi",
    cast: ["KENN", "Aoi Yuuki", "Hiroki Touchi", "Michiko Kaiden"],
    trailerUrl: "https://www.youtube.com/embed/JtqIas3bYhg",
    type: "Web Series"
  },
  {
    id: "m4",
    title: "Interstellar",
    year: 2014,
    rating: 8.7,
    runtime: "2h 49m",
    genre: ["Science Fiction", "Drama", "Adventure"],
    categories: ["old", "top_rated", "scifi", "popular"],
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&q=80",
    description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
    trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E",
    type: "Movie"
  },
  {
    id: "m5",
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    runtime: "2h 32m",
    genre: ["Action", "Crime", "Drama"],
    categories: ["old", "top_rated", "action", "popular"],
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&q=80",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine", "Maggie Gyllenhaal"],
    trailerUrl: "https://www.youtube.com/embed/EXeTwQWrcwY",
    type: "Movie"
  },
  {
    id: "m6",
    title: "Stranger Things",
    year: 2025,
    rating: 8.7,
    runtime: "4 Seasons",
    genre: ["Horror", "Science Fiction", "Drama"],
    categories: ["tvshows", "webseries", "horror", "scifi", "popular"],
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&q=80",
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    director: "The Duffer Brothers",
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder", "David Harbour"],
    trailerUrl: "https://www.youtube.com/embed/b9EkMc79ZSU",
    type: "TV Show"
  },
  {
    id: "m7",
    title: "Deadpool & Wolverine",
    year: 2024,
    rating: 7.9,
    runtime: "2h 08m",
    genre: ["Action", "Comedy", "Science Fiction"],
    categories: ["trending", "popular", "action", "comedy"],
    poster: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&q=80",
    description: "Wolverine is recovering from his injuries when he crosses paths with the loudmouth, Deadpool. They team up to defeat a common enemy.",
    director: "Shawn Levy",
    cast: ["Ryan Reynolds", "Hugh Jackman", "Emma Corrin", "Morena Baccarin"],
    trailerUrl: "https://www.youtube.com/embed/73_1biulk6s",
    type: "Movie"
  },
  {
    id: "m8",
    title: "The Conjuring: Last Rites",
    year: 2025,
    rating: 8.1,
    runtime: "1h 58m",
    genre: ["Horror", "Mystery", "Thriller"],
    categories: ["upcoming", "horror", "trending"],
    poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80",
    description: "Paranormal investigators Ed and Lorraine Warren take on one final terrifying case involving mysterious demonic entities haunting an ancient rural estate.",
    director: "Michael Chaves",
    cast: ["Patrick Wilson", "Vera Farmiga", "Ben Hardy", "Mia Tomlinson"],
    trailerUrl: "https://www.youtube.com/embed/k10ETZ41q5o",
    type: "Movie"
  },
  {
    id: "m9",
    title: "La La Land",
    year: 2016,
    rating: 8.0,
    runtime: "2h 08m",
    genre: ["Romance", "Comedy", "Music"],
    categories: ["romance", "comedy", "old"],
    poster: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=80",
    description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
    director: "Damien Chazelle",
    cast: ["Ryan Gosling", "Emma Stone", "John Legend", "J.K. Simmons"],
    trailerUrl: "https://www.youtube.com/embed/0pdqE8C25DA",
    type: "Movie"
  },
  {
    id: "m10",
    title: "Avatar: Fire and Ash",
    year: 2025,
    rating: 8.8,
    runtime: "3h 10m",
    genre: ["Science Fiction", "Action", "Adventure"],
    categories: ["upcoming", "scifi", "action"],
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
    description: "Jake Sully and Neytiri encounter a new, aggressive nomadic tribe of Na'vi known as the Ash People in the volcanic biome of Pandora.",
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver", "Stephen Lang"],
    trailerUrl: "https://www.youtube.com/embed/d9MyW72ELq0",
    type: "Movie"
  },
  {
    id: "m11",
    title: "The Super Mario Bros. Movie 2",
    year: 2026,
    rating: 8.3,
    runtime: "1h 35m",
    genre: ["Comedy", "Animation", "Adventure"],
    categories: ["upcoming", "comedy"],
    poster: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1600&q=80",
    description: "Mario, Luigi, and Princess Peach set off on a new galactic adventure beyond the Mushroom Kingdom to stop a mystical threat.",
    director: "Aaron Horvath, Michael Jelenic",
    cast: ["Chris Pratt", "Anya Taylor-Joy", "Charlie Day", "Jack Black"],
    trailerUrl: "https://www.youtube.com/embed/RjNcFCi-14M",
    type: "Movie"
  },
  {
    id: "m12",
    title: "Inception",
    year: 2010,
    rating: 8.8,
    runtime: "2h 28m",
    genre: ["Science Fiction", "Action", "Adventure"],
    categories: ["old", "top_rated", "action", "scifi"],
    poster: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&q=80",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"],
    trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0",
    type: "Movie"
  },
  {
    id: "m13",
    title: "The Last of Us",
    year: 2024,
    rating: 8.8,
    runtime: "2 Seasons",
    genre: ["Action", "Drama", "Horror"],
    categories: ["tvshows", "webseries", "horror", "action", "popular"],
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=1600&q=80",
    description: "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
    director: "Craig Mazin, Neil Druckmann",
    cast: ["Pedro Pascal", "Bella Ramsey", "Gabriel Luna", "Kaitlyn Dever"],
    trailerUrl: "https://www.youtube.com/embed/uLtkt8BonwM",
    type: "Web Series"
  },
  {
    id: "m14",
    title: "The Hangover",
    year: 2009,
    rating: 7.7,
    runtime: "1h 40m",
    genre: ["Comedy"],
    categories: ["comedy", "old"],
    poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=80",
    description: "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing.",
    director: "Todd Phillips",
    cast: ["Bradley Cooper", "Ed Helms", "Zach Galifianakis", "Justin Bartha"],
    trailerUrl: "https://www.youtube.com/embed/tcdUcbd2d2M",
    type: "Movie"
  },
  {
    id: "m15",
    title: "Past Lives",
    year: 2023,
    rating: 7.9,
    runtime: "1h 46m",
    genre: ["Romance", "Drama"],
    categories: ["romance", "top_rated"],
    poster: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80",
    description: "Nora and Hae Sung, two deeply connected childhood friends, are wrested apart after Nora's family emigrates from South Korea. Two decades later, they are reunited in New York.",
    director: "Celine Song",
    cast: ["Greta Lee", "Teo Yoo", "John Magaro"],
    trailerUrl: "https://www.youtube.com/embed/kA244xewHis",
    type: "Movie"
  },
  {
    id: "m16",
    title: "A Quiet Place: Day One",
    year: 2024,
    rating: 7.2,
    runtime: "1h 40m",
    genre: ["Horror", "Science Fiction", "Thriller"],
    categories: ["horror", "trending", "scifi"],
    poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&q=80",
    description: "Experience the day the world went silent in this terrifying installment about monstrous creatures with ultra-sensitive hearing invading New York City.",
    director: "Michael Sarnoski",
    cast: ["Lupita Nyong'o", "Joseph Quinn", "Alex Wolff", "Djimon Hounsou"],
    trailerUrl: "https://www.youtube.com/embed/YPY7J-flzE8",
    type: "Movie"
  }
];

// Helper Functions
function getAllMovies() {
  return moviesData;
}

function getMovieById(id) {
  return moviesData.find(movie => movie.id === id) ?? moviesData[0];
}

function getMoviesByCategory(categoryKey) {
  if (categoryKey === "all") return moviesData;
  return moviesData.filter(movie => movie.categories && movie.categories.includes(categoryKey));
}

function searchMoviesQuery(query) {
  if (!query || query.trim() === "") return [];
  const q = query.toLowerCase().trim();
  return moviesData.filter(movie => {
    return (
      movie.title.toLowerCase().includes(q) ??
      movie.genre.some(g => g.toLowerCase().includes(q)) ??
      movie.director.toLowerCase().includes(q) ??
      movie.cast.some(c => c.toLowerCase().includes(q)) ??
      movie.description.toLowerCase().includes(q)
    );
  });
}

// Make available globally for vanilla JS scripts
export const MovieService = {
  getAllMovies,
  getMovieById,
  getMoviesByCategory,
  searchMoviesQuery,
  moviesData
};
;