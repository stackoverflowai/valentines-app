import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Utensils, Calendar, Camera, ChevronRight, ChevronLeft, Sparkles, Globe, Tv, Star } from 'lucide-react';

/**
 * CUSTOMIZE YOUR DATA HERE
 */
const wrappedData = {
  partnerName: "Valentine",
  totalDays: 463,
  restaurants: [
    { name: "Le Comptoir de la Gastronomie", sub: "Best Foie Gras Ever" },
    { name: "Laem Charoen Thai Seafood", sub: "Beginning of Thailand Trip!!" },
    { name: "Pano (West Kowloon)", sub: "A Memorable Date Night" }
  ],
  destinations: [
    { name: "Thailand", sub: "tanning, grab motorcycles and baht" },
    { name: "Beijing", sub: "Walking 20k steps a day" },
    { name: "Hong Kong", sub: "We always come back here" },
    { name: "Hainan", sub: "Beach day!" },
    { name: "The Bedroom", sub: "Our most visited territory" }
  ],
  shows: [
    { name: "The Sound of Your Heart", sub: "Funniest show ever" },
    { name: "Alice in Borderlands", sub: "We actually binged this one" },
    { name: "Unnatural", sub: "Memorable crime show" }
  ],
  memories: [
    "Drake and driving",
    "Playing with lots of cats",
    "Chefing it up in the Harbor Plaza North Point"
  ],
  // Replace these URLs with your actual photo links
  imageUrls: {
    photo1: "/IMG_1428.jpeg",
    photo2: "/IMG_9261.JPG",
    photo3: "/IMG_9239.JPG"
  }
};

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  const totalSlides = 10;
  const slideDuration = 6000; // 6 seconds per slide

  // Handle slide navigation
  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
      setProgress(0);
    }
  }, [currentSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      setProgress(0);
    }
  }, [currentSlide]);

  // Timer logic
  useEffect(() => {
    if (isAccepted) return;

    const interval = 50; // Update every 50ms
    const step = (interval / slideDuration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentSlide, nextSlide, isAccepted]);

  // Playful "No" button dodge
  const moveNoButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoButtonPos({ x, y });
  };

  const renderProgressBars = () => (
    <div className="fixed top-4 inset-x-0 flex px-4 gap-1.5 z-50">
      {Array.from({ length: totalSlides }).map((_, i) => (
        <div key={i} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-75"
            style={{
              width: i < currentSlide ? '100%' : i === currentSlide ? `${progress}%` : '0%'
            }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-dvh min-h-dvh w-full bg-black text-white font-sans overflow-hidden select-none touch-none">
      {renderProgressBars()}

      {/* Slide Navigation Zones */}
      <div className="absolute inset-0 flex z-30">
        <div className="w-1/2 h-full" onClick={prevSlide} />
        <div className="w-1/2 h-full" onClick={nextSlide} />
      </div>

      <main className="h-full w-full relative">
        {/* Slide 0: Intro */}
        {currentSlide === 0 && (
          <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-center">
            <div className="animate-bounce mb-6">
              <Sparkles size={64} className="text-yellow-300" />
            </div>
            <h1 className="text-6xl font-black tracking-tighter uppercase leading-none mb-4">
              Your 2025<br />Wrapped
            </h1>
            <p className="text-xl font-medium opacity-90">For my favorite human.</p>
          </div>
        )}

        {/* Slide 1: Days Stat */}
        {currentSlide === 1 && (
          <div className="h-full w-full flex flex-col items-center justify-center bg-emerald-500 p-8 text-center">
            <Calendar size={80} className="mb-8 text-black opacity-20" />
            <p className="text-2xl font-bold text-black uppercase tracking-widest mb-2">We spent</p>
            <div className="text-9xl font-black text-white drop-shadow-lg leading-none">
              {wrappedData.totalDays}
            </div>
            <p className="text-2xl font-bold text-black uppercase tracking-widest mt-2">days together</p>
            <p className="mt-12 text-lg bg-black/10 p-4 rounded-2xl font-semibold">
              That's 666,720 minutes of peak happiness.
            </p>
          </div>
        )}

        {/* Slide 2: Top Restaurants */}
        {currentSlide === 2 && (
          <div className="h-full w-full flex flex-col justify-center bg-orange-500 p-8">
            <Utensils size={40} className="mb-6" />
            <h2 className="text-5xl font-black uppercase mb-12 leading-tight">Your Top<br />Tastes</h2>
            <div className="space-y-8">
              {wrappedData.restaurants.map((item, idx) => (
                <div key={idx} className="flex items-start gap-6 animate-fadeIn" style={{ animationDelay: `${idx * 200}ms` }}>
                  <span className="text-5xl font-black text-black/30">{idx + 1}</span>
                  <div>
                    <p className="text-2xl font-bold">{item.name}</p>
                    <p className="text-black/60 font-medium">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Slide 3: Top Destinations */}
        {currentSlide === 3 && (
          <div className="h-full w-full flex flex-col justify-center bg-blue-600 p-8">
            <Globe size={40} className="mb-6" />
            <h2 className="text-5xl font-black uppercase mb-12 leading-tight">Top<br />Destinations</h2>
            <div className="space-y-8">
              {wrappedData.destinations.map((item, idx) => (
                <div key={idx} className="flex items-start gap-6 animate-fadeIn" style={{ animationDelay: `${idx * 200}ms` }}>
                  <span className="text-5xl font-black text-black/30">{idx + 1}</span>
                  <div>
                    <p className="text-2xl font-bold">{item.name}</p>
                    <p className="text-white/70 font-medium">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Slide 4: Top Shows */}
        {currentSlide === 4 && (
          <div className="h-full w-full flex flex-col justify-center bg-indigo-700 p-8">
            <Tv size={40} className="mb-6" />
            <h2 className="text-5xl font-black uppercase mb-12 leading-tight">Shows We<br />Binged</h2>
            <div className="space-y-8">
              {wrappedData.shows.map((item, idx) => (
                <div key={idx} className="flex items-start gap-6 animate-fadeIn" style={{ animationDelay: `${idx * 200}ms` }}>
                  <div className="h-12 w-1 bg-white/30 rounded-full" />
                  <div>
                    <p className="text-2xl font-bold">{item.name}</p>
                    <p className="text-white/60 font-medium">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Slide 5: Favorite Moments */}
        {currentSlide === 5 && (
          <div className="h-full w-full flex flex-col justify-center bg-pink-500 p-8">
            <Star size={40} className="mb-6" />
            <h2 className="text-5xl font-black uppercase mb-8 leading-tight">Favorite<br />Memories</h2>
            <div className="space-y-6">
              {wrappedData.memories.map((memory, idx) => (
                <div key={idx} className="animate-fadeIn bg-black/10 p-4 rounded-xl border border-white/10" style={{ animationDelay: `${idx * 300}ms` }}>
                  <p className="text-lg font-semibold italic">"{memory}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Slide 6: Photo 1 */}
        {currentSlide === 6 && (
          <div className="h-full w-full relative">
            <img
              src={wrappedData.imageUrls.photo1}
              className="h-full w-full object-cover"
              alt="Memory 1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-20 left-8">
              <Camera className="mb-4 text-pink-400" />
              <h2 className="text-4xl font-black uppercase leading-tight">
                One for the<br />books.
              </h2>
            </div>
          </div>
        )}

        {/* Slide 7: Photo 2 */}
        {currentSlide === 7 && (
          <div className="h-full w-full relative">
            <img
              src={wrappedData.imageUrls.photo2}
              className="h-full w-full object-contain"
              alt="Memory 2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-20 left-8">
              <Sparkles className="mb-4 text-yellow-500" />
              <h2 className="text-4xl font-black uppercase leading-tight">
                The best<br />vibes.
              </h2>
            </div>
          </div>
        )}

        {/* Slide 8: Photo 3 */}
        {currentSlide === 8 && (
          <div className="h-full w-full relative">
            <img
              src={wrappedData.imageUrls.photo3}
              className="h-full w-full object-cover"
              alt="Memory 3"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-20 left-8">
              <Heart className="mb-4 text-red-500 fill-current" />
              <h2 className="text-4xl font-black uppercase leading-tight">
                And many more<br />to come.
              </h2>
            </div>
          </div>
        )}

        {/* Slide 9: The Reveal */}
        {currentSlide === 9 && (
          <div className="h-full w-full flex flex-col items-center justify-center bg-white text-black p-8 text-center z-40 relative">
            {!isAccepted ? (
              <>
                <div className="mb-8 animate-pulse">
                  <Heart size={80} className="text-red-500 fill-current" />
                </div>
                <h2 className="text-3xl font-bold italic mb-2">So... after reviewing the data...</h2>
                <h1 className="text-5xl font-black uppercase leading-none mb-12">
                  Will you be my <span className="text-red-500">Valentine</span>?
                </h1>

                <div className="flex flex-col w-full gap-4 max-w-xs relative">
                  <button
                    onClick={() => setIsAccepted(true)}
                    className="bg-black text-white font-black py-5 rounded-full text-2xl shadow-xl active:scale-95 transition-transform"
                  >
                    YES! ❤️
                  </button>

                  <button
                    onMouseEnter={moveNoButton}
                    onTouchStart={moveNoButton}
                    style={{ transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)` }}
                    className="border-2 border-black/10 text-black/30 font-bold py-3 rounded-full text-sm transition-all duration-200"
                  >
                    No thanks
                  </button>
                </div>
              </>
            ) : (
              <div className="animate-fadeIn">
                <div className="text-8xl mb-6">🥂</div>
                <h1 className="text-6xl font-black uppercase mb-4 text-pink-600">Best Choice!</h1>
                <p className="text-xl font-bold">I can't wait to see you.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-12 text-black/40 font-bold uppercase tracking-widest text-xs"
                >
                  Replay Our Year
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Navigation Indicators */}
      <div className="fixed bottom-6 inset-x-0 flex justify-center gap-8 text-white/30 z-20 pointer-events-none">
        <ChevronLeft size={20} />
        <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Tap to navigate</span>
        <ChevronRight size={20} />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
