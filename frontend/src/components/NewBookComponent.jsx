import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
export default function NewBookComponent() {
  const [storyInput, setStoryInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStartStory = async () => {
    if (!storyInput.trim()) return;

    setIsLoading(true);
    try {
      const userId = JSON.parse(localStorage.getItem("user")).id;
      console.log("User ID:", userId);
      // TODO: Replace with actual API call using your axiosInstance
      const response = await axiosInstance.post(
        `secure/generate-story/${userId}`,
        {
          theme: storyInput.trim(),
        },
      );
      console.log("Story created:", response.data);
    } catch (error) {
      console.error("Error creating story:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileClick = () => {
    // Replace with your navigation logic (e.g., router.push('/edit-account'))
    console.log("Navigate to edit-account");
  };

  const handleBreadcrumbClick = () => {
    // Replace with your navigation logic (e.g., router.push('/bookshelf'))
    console.log("Navigate to bookshelf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>

      {/* Account Profile */}
      <button
        onClick={handleProfileClick}
        className="absolute top-6 right-6 z-10 group"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#5C5E81] cursor-pointer shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
          <img
            src="/"
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.style.background =
                "linear-gradient(135deg, #5C5E81, #838FAF)";
              e.target.parentElement.innerHTML =
                '<div class="w-full h-full flex items-center justify-center text-white font-bold text-lg">U</div>';
            }}
          />
        </div>
      </button>

      {/* Header & Content Wrapper */}
      <div className="flex flex-col flex-grow px-5 pb-8 md:px-8">
        {/* Header */}
        <div className="relative pt-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5C5E81] tracking-wide mb-2 animate-fade-in">
            TypeToTale
          </h1>
          <p className="text-sm md:text-lg text-[#8C8DA3] tracking-wide animate-fade-in-delay">
            Start typing to begin telling a story together!
          </p>
        </div>

        {/* Breadcrumb */}
        <nav className="hidden md:flex items-center text-lg mt-8 ml-2 mb-8">
          <button
            onClick={handleBreadcrumbClick}
            className="text-[#8C8DA3] hover:text-[#5C5E81] transition-colors duration-200"
          >
            <span className="text-xl">Bookshelf</span>
          </button>
          <span className="mx-3 text-[#8C8DA3]">›</span>
          <span className="text-xl text-[#5C5E81] font-semibold">
            Create a Story
          </span>
        </nav>

        {/* Centered Story Box */}
        <div className="flex flex-1 justify-center items-center px-2">
          <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl w-full max-w-2xl p-8 md:p-12 border border-white/20 relative">
            {/* Decorative gradient border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#5C5E81] via-[#838FAF] to-[#5C5E81] p-[2px]">
              <div className="bg-white rounded-3xl w-full h-full"></div>
            </div>

            <div className="relative z-10">
              {/* Title & Description */}
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#5C5E81] mb-4 leading-tight">
                  Let's Start Your Story!
                </h2>
                <p className="text-lg text-[#8C8DA3] leading-relaxed">
                  Enter a theme word and watch your imagination come to life
                </p>
              </div>

              {/* Input Section */}
              <div className="space-y-6">
                <div className="relative group">
                  <input
                    type="text"
                    value={storyInput}
                    onChange={(e) => setStoryInput(e.target.value)}
                    placeholder="Adventure, Princess, Magic, Science..."
                    className="w-full py-4 px-6 rounded-2xl text-lg text-[#5C5E81] bg-gray-50 
                    placeholder-[#9D9191] border-2 border-transparent focus:border-[#838FAF] 
                    focus:outline-none focus:bg-white transition-all duration-300 
                    group-hover:shadow-md focus:shadow-lg"
                    onKeyPress={(e) => e.key === "Enter" && handleStartStory()}
                    disabled={isLoading}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5C5E81]/20 to-[#838FAF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Character count or validation feedback */}
                <div className="text-right">
                  <span className="text-sm text-[#8C8DA3]">
                    {storyInput.length > 0 && `${storyInput.length} characters`}
                  </span>
                </div>
              </div>

              {/* START Button */}
              <div className="flex justify-center mt-10">
                <button
                  onClick={handleStartStory}
                  disabled={!storyInput.trim() || isLoading}
                  className="bg-gradient-to-r from-[#5C5E81] to-[#838FAF] text-white 
                  px-12 py-4 rounded-full text-lg font-bold tracking-wide
                  transform transition-all duration-300 
                  hover:scale-105 hover:shadow-xl 
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                  focus:outline-none focus:ring-4 focus:ring-[#5C5E81]/30
                  relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating Story...
                      </>
                    ) : (
                      "START YOUR ADVENTURE"
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              {/* Additional Tips */}
              <div className="mt-8 text-center">
                <p className="text-sm text-[#8C8DA3] leading-relaxed">
                  💡 <strong>Pro tip:</strong> Try words like "mystery",
                  "friendship", or "dragons" for exciting stories!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.6s ease-out 0.2s both;
        }
      `}</style>
    </div>
  );
}
