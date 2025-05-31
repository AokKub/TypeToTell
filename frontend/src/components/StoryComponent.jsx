import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance"; // Update path as needed

export default function StoryTypingChallenge() {
  const [userInput, setUserInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [typingSession, setTypingSession] = useState(null);
  const [validParagraphs, setValidParagraphs] = useState([]);
  const [invalidParagraphs, setInvalidParagraphs] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch typing session data from your backend
  useEffect(() => {
    const fetchTypingSession = async () => {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          setError("No typing session ID provided");
          return;
        }

        // Call your backend API
        const response = await axiosInstance.get(
          `/secure/typing-session/${id}`,
        );
        console.log("Typing session response:", response.data.book);
        if (response.data.status && response.data.book) {
          const session = response.data.book.session;
          setTypingSession(session);
          // Split stories into paragraphs using | as delimiter
          // You can modify this based on how you store the paragraphs
          const validParas = session.validStory.split("|").map((p) => p.trim());
          const invalidParas = session.invalidStory
            .split("|")
            .map((p) => p.trim());

          setValidParagraphs(validParas);
          setInvalidParagraphs(invalidParas);
          setIsCompleted(session.status);
        } else {
          setError("Failed to load typing session");
        }
      } catch (err) {
        console.error("Error fetching typing session:", err);
        setError("Failed to connect to server. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTypingSession();
  }, [id]);

  // Complete session when all paragraphs are done
  const completeSession = async () => {
    try {
      // Update session status to completed
      await axiosInstance.put(`/secure/typing-session/${id}`, {
        status: true,
      });

      setIsCompleted(true);
      setShowSuccess(true);
      setTimeout(() => {
        navigate(`/complete-story/${id}`);
      }, 2000);
    } catch (err) {
      console.error("Error completing session:", err);
      // Continue anyway - the user completed the challenge
      setTimeout(() => {
        navigate("/complete-story");
      }, 2000);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    const currentValidParagraph = validParagraphs[currentIndex];

    if (value.trim() === currentValidParagraph?.trim()) {
      if (currentIndex < validParagraphs.length - 1) {
        setShowSuccess(true);
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
          setUserInput("");
          setShowSuccess(false);
        }, 800);
      } else {
        setTimeout(() => {
          completeSession();
        }, 800);
      }
    }
  };

  const getErrorCount = () => {
    const currentInvalidParagraph = invalidParagraphs[currentIndex];
    const currentValidParagraph = validParagraphs[currentIndex];

    if (!currentInvalidParagraph || !currentValidParagraph) return 0;

    const invalidWords = currentInvalidParagraph.split(" ");
    const validWords = currentValidParagraph.split(" ");
    let errorCount = 0;

    for (let i = 0; i < Math.max(invalidWords.length, validWords.length); i++) {
      if (invalidWords[i] !== validWords[i]) {
        errorCount++;
      }
    }
    return errorCount;
  };

  const getMatchPercentage = () => {
    const currentValidParagraph = validParagraphs[currentIndex];
    if (!userInput.trim() || !currentValidParagraph) return 0;

    const inputWords = userInput.trim().split(" ");
    const validWords = currentValidParagraph.split(" ");
    let matches = 0;

    const minLength = Math.min(inputWords.length, validWords.length);
    for (let i = 0; i < minLength; i++) {
      if (inputWords[i] === validWords[i]) matches++;
    }

    return Math.round((matches / validWords.length) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="text-slate-600 text-lg font-medium">
            Loading your challenge...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-slate-400 text-2xl">📚</span>
          </div>
          <div className="text-slate-700 text-lg font-semibold mb-2">
            No Challenge Found
          </div>
          <div className="text-slate-500 mb-6">
            We couldn't find the typing session you're looking for.
          </div>
          <Link
            to="/bookshelf"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200 font-medium"
          >
            Browse Challenges
          </Link>
        </div>
      </div>
    );
  }

  const currentInvalidParagraph = invalidParagraphs[currentIndex];
  const errorCount = getErrorCount();
  const matchPercentage = getMatchPercentage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/bookshelf"
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <span className="text-xl">←</span>
              <span className="font-medium">Back to Bookshelf</span>
            </Link>
            <div className="text-slate-300">|</div>
            <div className="text-slate-700 font-semibold">
              {typingSession?.theme}
            </div>
          </div>

          <Link to="/edit-account" className="group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold hover:shadow-lg transition-all duration-200 group-hover:scale-105">
              <span className="text-sm">👤</span>
            </div>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            TypeToTale
          </h1>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto">
            Master your typing skills through storytelling
          </p>
        </div>

        {/* Main Challenge Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  Spot & Fix the Errors
                </h2>
                <p className="text-indigo-100 text-lg">
                  Find and correct the mistakes in this paragraph
                </p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {errorCount}
                </div>
                <div className="text-indigo-200 text-sm">Errors Found</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {matchPercentage}%
                </div>
                <div className="text-indigo-200 text-sm">Match Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {userInput.length}
                </div>
                <div className="text-indigo-200 text-sm">Characters</div>
              </div>
            </div>
          </div>

          <div className="p-10">
            {/* Desktop Layout: Side by Side with improved spacing */}
            <div className="grid lg:grid-cols-2 lg:gap-12 space-y-8 lg:space-y-0">
              {/* Left Side - Error Text Display */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span>Text with Errors</span>
                  </h3>
                  <div className="flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    <span>
                      {errorCount} error{errorCount !== 1 ? "s" : ""} found
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-8 min-h-[300px] relative overflow-hidden">
                  <div className="prose prose-lg text-slate-800 leading-relaxed font-medium">
                    {currentInvalidParagraph}
                  </div>
                </div>
              </div>

              {/* Right Side - User Input Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                    <span
                      className={`w-3 h-3 rounded-full ${showSuccess ? "bg-green-500" : "bg-blue-500"}`}
                    ></span>
                    <span>Your Corrected Version</span>
                  </h3>
                  {showSuccess && (
                    <div className="flex items-center space-x-2 text-green-600 animate-bounce">
                      <span className="text-2xl">✅</span>
                      <span className="font-bold text-lg">Perfect!</span>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <textarea
                    value={userInput}
                    onChange={handleChange}
                    placeholder="Type the corrected paragraph here..."
                    className={`w-full h-[300px] p-8 text-lg text-slate-800 bg-gradient-to-br border-2 rounded-2xl focus:outline-none resize-none transition-all duration-300 font-medium leading-relaxed ${showSuccess
                        ? "from-green-50 to-green-100 border-green-400 shadow-green-200 shadow-lg"
                        : matchPercentage >= 80
                          ? "from-blue-50 to-blue-100 border-blue-400 shadow-blue-200 shadow-lg"
                          : "from-slate-50 to-slate-100 border-slate-300 focus:border-indigo-400 focus:shadow-indigo-200 focus:shadow-lg hover:border-slate-400"
                      }`}
                    disabled={isCompleted}
                  />

                  {/* Character count and status indicator */}
                  <div className="absolute bottom-4 right-4 flex items-center space-x-3">
                    <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">
                      <div
                        className={`w-3 h-3 rounded-full animate-pulse ${matchPercentage >= 90
                            ? "bg-green-500"
                            : matchPercentage >= 70
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                      ></div>
                      <span className="text-sm font-medium text-slate-600">
                        {userInput.length} chars
                      </span>
                    </div>
                  </div>

                  {/* Real-time feedback */}
                  {userInput.length > 0 && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2">
                      <div className="text-sm font-bold text-slate-700">
                        {matchPercentage}% match
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Completion Message */}
            {isCompleted && (
              <div className="mt-10 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <span className="text-green-600 text-2xl">🎉</span>
                </div>
                <div>
                  <div className="text-green-800 font-bold text-xl">
                    Challenge Completed!
                  </div>
                  <div className="text-green-600 text-lg">
                    Redirecting to your story...
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Helper Tips */}
            <div className="mt-10 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-xl">💡</span>
                </div>
                <div className="text-blue-800 space-y-3">
                  <h4 className="font-bold text-lg">Pro Tips:</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>
                        Look carefully for spelling mistakes and typos
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Check for missing or extra words</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Pay attention to punctuation marks</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Match spacing and capitalization exactly</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
