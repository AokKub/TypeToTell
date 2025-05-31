import React from 'react';

export default function BookShelfComponent() {
  const bookNames = [
    "Name",
    "Name",
    "Name",
    "Name",
    "Name",
    "Name",
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
    <div className="pr-5 pb-13 pl-5 md:pt-13 lg:pt-13">
      {/* Header */}
      <div
        className="absolute top-6 left-8 text-[35px] font-bold text-[#5C5E81] tracking-wide"
        style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.5)' }}
      >
        TypeToTale
      </div>

      {/* Breadcrumb */}
      <div className="items-center text-lg mt-14 text-[#5C5E81] ml-10 mb-5 hidden md:flex">
        <span className="text-[23px] font-bold">Bookshelf</span>
      </div>

      {/* Main controls */}
      <div className="flex flex-col ml-10 lg:flex-row lg:items-center mr-8 lg:justify-between mb-8 gap-4">
        {/* Search and Filter */}
        <div className="flex w-full lg:flex-1">
          {/* Search */}
          <div className="relative flex-1 mr-2 text-[12px]">
            <input
              type="text"
              placeholder="Search your book!"
              className="w-full py-3 px-10 rounded-[15px] bg-[#F4F3F3] focus:outline-none"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth="1.5" stroke="currentColor"
              className="w-4 h-4 absolute left-4 top-3 text-[#9D9191]">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>

          {/* Filter Button */}
          <button className="p-1 text-[#9D9191] rounded-[15px] flex-shrink-0 min-w-[40px]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
              className="size-9">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
          </button>
        </div>

        {/* Add book (mobile) */}
        <div className="lg:hidden flex justify-end">
          <button className="bg-[#5C5E81] text-white px-3 py-1 rounded-[24px] flex items-center">
            <span className="font-bold text-[14px] tracking-wide"> + new book</span>
          </button>
        </div>

        {/* Add book (desktop) */}
        <div className="hidden lg:flex items-center">
          <button className="bg-[#5C5E81] text-white px-4 py-1.5 rounded-[24px] flex items-center">
            <span className="font-bold text-[20px] tracking-wide">+ new book</span>
          </button>
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 ml-10 mr-10 mt-10">
        {bookNames.map((name, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Book with spine and shadow */}
            <div className="relative w-[150px] h-[200px] rounded-[10px]">
              {/* Shadow */}
              <div className="absolute top-2 left-2 w-full h-full bg-[#BFBFBF] rounded-md opacity-100 z-0"></div>

              {/* Spine */}
              <div className="absolute left-0 top-0 w-[20px] h-full bg-[#494141] rounded-l-md z-10"></div>

              {/* Cover */}
              <div className="absolute left-[12px] top-0 right-0 h-full bg-[#5C5E81] rounded-r-md hover:scale-[1.02] transition-transform duration-200 cursor-pointer"></div>
            </div>

            {/* Book name */}
            <p className="mt-4 text-[#9D9191] text-[15px] font-medium text-center max-w-[100px]">
              {name}
            </p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
