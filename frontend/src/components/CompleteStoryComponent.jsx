import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CompleteStoryComponent() {
  const [storyInput, setStoryInput] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* profile */}
      <Link to="/edit-account" className="absolute top-6 right-6">
        <div className="w-12 h-12 rounded-full overflow-hidden border-1 border-[#5C5E81] cursor-pointer">
          <img src="/" alt="Profile" className="w-full h-full object-cover" />
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
        <div className="absolute top-[70px] py-2 left-8 font-medium text-[12px] sm:text-[14px] text-[#8C8DA3] tracking-wide">
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
        <div className="flex flex-1 justify-center items-center px-5 mt-5">
          <div className="bg-[#838FAF] text-white rounded-[25px] w-full max-w-[900px] h-auto p-8 shadow-2xl">
            {/* Title */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Complete!</h2>
              <p className="text-sm sm:text-base mb-8 opacity-90">
                The last word is typed... your story is complete!
              </p>

              {/* Story Content Box */}
              <div className="bg-white text-gray-700 rounded-[20px] p-6 mb-8 shadow-lg">
                <p className="text-base leading-relaxed">
                  Hi. I'm Dino, the family dog. I help keep people safe, especially on the roads.
                  Take a look at my diary to see what I did last week.
                  Hi. I'm Dino, the family dog. I help keep people safe, especially on the roads.
                  Take a look at my diary to see what I did last week.
                  Hi. I'm Dino, the family dog. I help keep people safe, especially on the roads.
                  Take a look at my diary to see what I did last week.
                  Hi. I'm Dino, the family dog. I help keep people safe, especially on the roads.
                  Take a look at my diary to see what I did last week.
                </p>
              </div>
            </div>

            {/* SAVE Button */}
            <div className="flex justify-center">
            <Link to="/bookshelf">
              <button className="bg-[#5C5E81] text-white px-8 py-3 rounded-full font-semibold text-lg tracking-wide hover:scale-105 transition-transform duration-200 shadow-lg">
                save
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
