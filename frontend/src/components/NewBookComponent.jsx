import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function NewBookComponent() {
  const [storyInput, setStoryInput] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* account profile */}
      <Link to="/edit-account" className="absolute top-6 right-6">
        <div className="w-12 h-12 rounded-full overflow-hidden border-1 border-[#5C5E81] cursor-pointer">
          <img
            src="/"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Header & Content Wrapper */}
      <div className="flex flex-col flex-grow pr-5 pb-13 pl-5 md:pt-13 lg:pt-13">
        {/* Header */}
        <div
          className="absolute top-6 left-8 text-[35px] font-bold text-[#5C5E81] tracking-wide"
          style={{ textShadow: "2px 2px 6px rgba(0, 0, 0, 0.5)" }}
        >
          TypeToTale
        </div>
        <div className="absolute top-[70px] py-2 left-8 font-medium text-[10px] sm:text-[15px] text-[#8C8DA3] tracking-wide">
          Start to type to start telling a story together!
        </div>

        {/* Breadcrumb */}
        <div className="items-center text-lg mt-30 font-bold md:mt-18 ml-10 md:flex">
            <Link to="/bookshelf" className="text-[23px] font-bold text-[#8C8DA3]">
              Bookshelf
            </Link>
          <span className="mx-2 text-[#5C5E81]">{">"}</span>
          <span className="text-[23px] text-[#5C5E81]">create a story</span>
        </div>

        {/* Centered Story Box */}
        <div className="flex flex-1 justify-center items-center px-5">
          <div
            className="bg-[#838FAF] text-white rounded-[15px] 
            w-[360px] sm:w-full sm:max-w-xl h-auto 
            p-6 flex flex-col justify-between"
          >
            {/* Title & Input */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                Let’s start your story!
              </h2>
              <p className="text-xs sm:text-sm mb-4 sm:mb-6">
                Type the theme word... and let the story begin!
              </p>

              {/* Input with Icon */}
              <div className="relative">
                <input
                  type="text"
                  value={storyInput}
                  onChange={(e) => setStoryInput(e.target.value)}
                  placeholder="e.g. Adventure, Princess, Magic, Science etc."
                  className="w-full py-2 sm:py-3 px-5 pr-12 rounded-[15px] 
                  text-[#5C5E81] bg-white placeholder-[#9D9191] focus:outline-none"
                />
              </div>
            </div>

            {/* START Button */}
            <div className="flex justify-center mt-6">
              <button className="bg-[#5C5E81] text-white px-6 py-2 rounded-full font-semibold tracking-wide hover:scale-105 transition-transform duration-200">
                START
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
