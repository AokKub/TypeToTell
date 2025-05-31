import React from "react";

export default function TypeToTaleCover() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#8AA0BD] py-16">
      <div className="relative w-[520px] h-[600px] transform -rotate-3 shadow-2xl">
        <div className="absolute left-0 top-0 h-full w-[105px] bg-[#5C5E81] rounded-l-md" />
        <div className="absolute left-[90px] top-0 h-full w-[430px] bg-white rounded-r-md flex flex-col justify-between items-center py-6 px-4">
          <div className="flex-1 flex flex-col justify-center items-center">
            <p className="text-center text-[#5C5E81] font-serif text-[40px]">
              Your keyboard<br />
              is the pen.<br />
              Your thoughts,<br />
              the story.
            </p>
          </div>
          <a href="#" className="text-sm text-[#838FAF] underline">click to flip</a>
        </div>
      </div>
      <div className="absolute top-4 left-4 text-white font-bold text-[35px] ml-4">
        TypeToTale
      </div>
    </div>
  );
}
