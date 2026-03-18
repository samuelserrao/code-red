/* eslint-disable @next/next/no-img-element */
import { Play, Search, Video, Compass, Star, Clapperboard, MonitorPlay } from 'lucide-react';

export default function TV() {
  const trending = [
    {
      id: 1,
      cover: 'https://image.tmdb.org/t/p/w780/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg',
      title: 'Severance',
      genre: 'Drama • Sci-Fi'
    },
    {
      id: 2,
      cover: 'https://image.tmdb.org/t/p/w780/xZvnz1hzI9ghjJ8R7A6mFvWlINi.jpg',
      title: 'Silo',
      genre: 'Sci-Fi • Mystery'
    },
    {
      id: 3,
      cover: 'https://image.tmdb.org/t/p/w780/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
      title: 'Ted Lasso',
      genre: 'Comedy • Drama'
    },
    {
      id: 4,
      cover: 'https://image.tmdb.org/t/p/w780/p1omwE5ijHwHhNqEDzU5r8jGfJ1.jpg',
      title: 'The Morning Show',
      genre: 'Drama'
    },
    {
      id: 5,
      cover: 'https://image.tmdb.org/t/p/w780/7eT014N0BExP2lU2f7RWeX0vU9h.jpg',
      title: 'Foundation',
      genre: 'Sci-Fi • Adventure'
    },
    {
      id: 6,
      cover: 'https://image.tmdb.org/t/p/w780/nQCSOMF4E7Yd7I3l1s8kU24rrdB.jpg',
      title: 'For All Mankind',
      genre: 'Sci-Fi'
    },
    {
      id: 7,
      cover: 'https://image.tmdb.org/t/p/w780/yB1P9UaM41lFmsLqM45xL6h8Z1P.jpg',
      title: 'Pachinko',
      genre: 'Drama • History'
    },
    {
      id: 8,
      cover: 'https://image.tmdb.org/t/p/w780/gLwX4q6kC4hVqB9z6rP9tZ5r4yA.jpg',
      title: 'Slow Horses',
      genre: 'Thriller • Drama'
    },
    {
      id: 9, 
      cover: 'https://image.tmdb.org/t/p/w780/mY7pS7owm9L7ov2T137U68D8p9d.jpg',
      title: 'Prehistoric Planet',
      genre: 'Documentary'
    },
    {
      id: 10,
      cover: 'https://image.tmdb.org/t/p/w780/dQ7Oof89h20k5fF6yv27x3vY7oN.jpg',
      title: 'Masters of the Air',
      genre: 'War • Drama'
    }
  ];

  return (
    <div className="w-full h-full flex bg-[#1c1c1e] text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-52 bg-[#2d2d2d]/80 border-r border-white/10 flex flex-col pt-10 drag-handle backdrop-blur-md">
         <div className="px-4 mb-4">
           <div className="relative">
             <Search size={14} className="absolute left-2 top-1.5 text-gray-400" />
             <input type="text" placeholder="Search" className="w-full bg-black/20 border border-white/10 rounded-md pl-7 pr-2 py-1 outline-none text-sm focus:ring-1 focus:ring-blue-500" />
           </div>
         </div>
         <div className="flex-1 overflow-y-auto px-2 space-y-0.5 text-sm">
            <div className="text-xs font-semibold text-gray-400 px-2 py-1 mt-2">Apple TV</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/10 text-white font-medium cursor-pointer"><MonitorPlay size={16} /> Watch Now</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 text-gray-300 cursor-pointer"><Compass size={16} /> Originals</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 text-gray-300 cursor-pointer"><Star size={16} /> Store</div>
            
            <div className="text-xs font-semibold text-gray-400 px-2 py-1 mt-4">Library</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 text-gray-300 cursor-pointer"><Video size={16} /> Recently Added</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 text-gray-300 cursor-pointer"><Clapperboard size={16} /> Movies</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 text-gray-300 cursor-pointer">TV Shows</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 text-gray-300 cursor-pointer">Downloaded</div>
         </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
           <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-blue-900/40 to-transparent pointer-events-none" />
           
           <div className="relative z-10">
             <h1 className="text-3xl font-bold mb-6">Watch Now</h1>
             
             {/* Hero Header */}
             <div className="w-full aspect-video md:aspect-[21/9] bg-gray-900 rounded-xl mb-10 overflow-hidden relative shadow-2xl group cursor-pointer border border-white/10">
                <img src="https://image.tmdb.org/t/p/original/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg" alt="Hero" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-6 left-8">
                   <div className="text-xs font-bold tracking-widest text-white/70 mb-1 uppercase">Apple Original</div>
                   <h2 className="text-4xl font-bold text-white mb-2 shadow-sm drop-shadow-lg">Severance</h2>
                   <p className="text-white/90 font-medium max-w-lg line-clamp-2 mb-4 drop-shadow-md">Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives.</p>
                   <button className="bg-white text-black px-6 py-2 rounded-[24px] font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors shadow-lg">
                     <Play size={16} className="fill-black" /> Play Episode 1
                   </button>
                </div>
             </div>

             <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-2">Trending Now</h2>
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {trending.map(show => (
                  <div key={show.id} className="group cursor-pointer">
                    <div className="aspect-video bg-gray-800 rounded-xl mb-3 border border-white/10 overflow-hidden shadow-lg relative transition-all group-hover:shadow-2xl group-hover:border-white/20">
                      <img src={show.cover} alt="Cover" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Play size={44} className="fill-white opacity-95 drop-shadow-xl hover:scale-110 transition-transform duration-200 text-white" />
                      </div>
                    </div>
                    <div className="text-[15px] font-semibold truncate px-1 drop-shadow-sm">{show.title}</div>
                  </div>
                ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
