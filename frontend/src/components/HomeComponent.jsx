import React, { useState } from "react";

export default function HomePageComponent() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse sm:block hidden"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <div
            key={`lg-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse lg:block hidden"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="flex items-center justify-center min-h-screen py-8 sm:py-16 px-4 relative z-10">
        <div
          className={`relative transition-all duration-700 ${isHovered ? "scale-105" : "scale-100"} ${isHovered ? "lg:scale-105" : "lg:scale-100"} ${isHovered ? "md:scale-102" : "md:scale-100"} ${isHovered ? "sm:scale-101" : "sm:scale-100"}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Book container with 3D perspective */}
          <div
            className={`relative w-[280px] h-[350px] sm:w-[360px] sm:h-[450px] md:w-[440px] md:h-[520px] lg:w-[520px] lg:h-[600px] transform transition-all duration-1000 ${
              isFlipped ? "rotate-y-180" : "-rotate-1 sm:-rotate-2 lg:-rotate-3"
            } shadow-xl sm:shadow-2xl hover:shadow-3xl`}
            style={{
              transformStyle: "preserve-3d",
              filter:
                "drop-shadow(0 15px 35px rgba(0, 0, 0, 0.4)) sm:drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))",
            }}
          >
            {/* Book spine with gradient */}
            <div className="absolute left-0 top-0 h-full w-[60px] sm:w-[80px] lg:w-[105px] bg-gradient-to-b from-slate-700 via-slate-600 to-slate-800 rounded-l-md border-r-2 border-slate-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 rounded-l-md"></div>
            </div>

            {/* Front cover */}
            <div
              className={`absolute left-[50px] sm:left-[70px] lg:left-[90px] top-0 h-full w-[230px] sm:w-[290px] md:w-[370px] lg:w-[430px] bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-r-md flex flex-col justify-between items-center py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 transition-opacity duration-500 ${isFlipped ? "opacity-0" : "opacity-100"}`}
            >
              <div className="flex-1 flex flex-col justify-center items-center space-y-3 sm:space-y-4 lg:space-y-6">
                <div className="text-center space-y-1 sm:space-y-2">
                  <h1 className="text-slate-700 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-wide">
                    Your keyboard
                  </h1>
                  <p className="text-slate-600 text-sm sm:text-lg md:text-xl lg:text-2xl font-light italic">
                    is the pen.
                  </p>
                </div>

                <div className="h-px w-12 sm:w-16 lg:w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent my-3 sm:my-4 lg:my-6"></div>

                <div className="text-center space-y-1 sm:space-y-2">
                  <h2 className="text-slate-700 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-wide">
                    Your thoughts,
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-lg md:text-xl lg:text-2xl font-light italic">
                    the story.
                  </p>
                </div>
              </div>

              {/* Interactive flip button */}
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="text-slate-500 hover:text-slate-700 transition-all duration-300 group flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  click to flip
                </span>
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-180 transition-transform duration-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>

            {/* Back cover - shown when flipped */}
            <div
              className={`absolute left-[50px] sm:left-[70px] lg:left-[90px] top-0 h-full w-[230px] sm:w-[290px] md:w-[370px] lg:w-[430px] bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-r-md flex flex-col justify-center items-center py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 transition-opacity duration-500 ${isFlipped ? "opacity-100" : "opacity-0"}`}
            >
              <div className="text-center space-y-4 sm:space-y-6 lg:space-y-8 text-white">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-light tracking-wide">
                  Where stories come alive
                </h3>
                <div className="space-y-2 sm:space-y-3 lg:space-y-4 text-sm sm:text-base lg:text-lg opacity-90">
                  <p>Transform your ideas into captivating narratives</p>
                  <p>Let creativity flow through every keystroke</p>
                  <p>Your imagination, unlimited</p>
                </div>
                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="mt-4 sm:mt-6 lg:mt-8 px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-lg text-white transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                >
                  Start Writing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand title with enhanced styling */}
      <div className="absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-8 z-20">
        <h1 className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl tracking-wider">
          <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            TypeToTale
          </span>
        </h1>
        <div className="h-0.5 sm:h-1 w-16 sm:w-20 lg:w-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-1 sm:mt-2 animate-pulse"></div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-bl from-white/10 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
    </div>
  );
}
