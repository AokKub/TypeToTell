import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 🧭 import useNavigate

const paragraphs = [
  "Hi. I’m Dino, the family dog I help keep people safe, especially on the rod. Take a look at my diary to see what I did last week.",
  "On Monday, I helped a little boy cross the road by barking at a speeding car.",
  "Tuesday was fun—I joined the police patrol and wore a shiny vest.",
  "On Wednesday, I stopped traffic when a cat ran into the road.",
  "Thursday, I taught school kids how to safely use the crosswalk.",
  "Friday, I received a badge from the mayor for being a safety hero!",
  "Saturday was relaxing. I napped after a big breakfast.",
  "Sunday, I played fetch with the neighbor’s kids in the park.",
  "Then, I attended a road safety rally and waved my tail at everyone.",
  "Afterward, I visited the vet for a check-up and some treats.",
  "I also appeared on a TV show about brave animals.",
  "My tail wagged all day long from the attention!",
  "I met a retired guide dog who told me cool stories.",
  "We shared bones and sunbathed together.",
  "I even tried skateboarding with the teenagers at the park.",
  "That evening, I watched the sunset with my family.",
  "I barked once to remind them how much I love them.",
  "Then I curled up in my bed, dreaming of adventures.",
  "Next week is going to be even better, I just know it.",
  "Thanks for reading my story. Be safe and always look both ways!"
];

export default function StoryTypingChallenge() {
  const [userInput, setUserInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // 🧭 initialize navigate

  const currentParagraph = paragraphs[currentIndex];

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    if (value.trim() === currentParagraph) {
      if (currentIndex < paragraphs.length - 1) {
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
          setUserInput("");
        }, 300);
      } else {
        // last paragraph completed
        setTimeout(() => {
          navigate("/complete-story");
        }, 300);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      {/* Profile Avatar */}
      <Link to="/edit-account" className="absolute top-6 right-6">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-[#5C5E81] cursor-pointer">
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
              <div className="items-center text-lg mt-30 font-bold md:mt-12 ml-4 md:flex">
                <Link to="/bookshelf" className="text-[23px] font-bold text-[#8C8DA3]">
                  Bookshelf
                </Link>
                <span className="mx-2 text-[#5C5E81]">{">"}</span>
                <span className="text-[23px] text-[#5C5E81]">create a story</span>
              </div>

      {/* Story Box - Centered */}
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="bg-[#838FAF] text-white rounded-[15px] p-6 max-w-3xl w-full shadow-md">
          {/* Prompt */}
          <div className="mb-4">
            <div className="font-semibold text-base">AI-Generated</div>
            <div className="text-sm text-[#EDEDED] mb-2">
              Ready for a challenge? Finish the paragraph and make it error-free!
            </div>
            <div className="bg-white text-[#5C5E81] rounded-lg p-4 text-sm relative min-h-[100px]">
              {currentParagraph}
              <span className="absolute bottom-2 right-4 text-red-400 text-xs italic">
                hint : 4 words
              </span>
            </div>
          </div>

          {/* User Input */}
          <div>
            <div className="font-semibold text-base mb-2">Your text</div>
            <input
              type="text"
              value={userInput}
              onChange={handleChange}
              placeholder="Type the paragraph here..."
              className="w-full py-2 px-4 text-[#5C5E81] bg-white rounded-lg focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
