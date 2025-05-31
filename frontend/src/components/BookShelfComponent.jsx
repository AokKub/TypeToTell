import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function BookShelfComponent() {
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [renameInput, setRenameInput] = useState('');
  const [selectedBookIndex, setSelectedBookIndex] = useState(null);

  const [bookNames, setBookNames] = useState([
    "Name",
    "Name",
    "Name",
    "Name",
    "Name",
    "Name",
  ]);

  // เปิด modal พร้อมตั้งค่า input
  function openRenameModal(index) {
    setSelectedBookIndex(index);
    setRenameInput(bookNames[index]);
    setIsRenameModalOpen(true);
  }

  // ปิด modal
  function closeRenameModal() {
    setIsRenameModalOpen(false);
    setSelectedBookIndex(null);
    setRenameInput('');
  }

  // เปลี่ยนชื่อหนังสือ
  function handleRename() {
    if (renameInput.trim() === '') return; // ไม่ให้ตั้งชื่อว่าง
    setBookNames((prev) => {
      const newBooks = [...prev];
      newBooks[selectedBookIndex] = renameInput.trim();
      return newBooks;
    });
    closeRenameModal();
  }

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* profile */}
      <Link to="/edit-account" className="absolute top-6 right-6">
        <div className="w-12 h-12 rounded-full overflow-hidden border-1 border-[#5C5E81] cursor-pointer">
          <img
            src="/" 
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      <div className="pr-5 pb-13 pl-5 md:pt-13 lg:pt-13 pt-20">
        {/* Header */}
        <div
          className="absolute top-6 left-8 text-[35px] font-bold text-[#5C5E81] tracking-wide"
          style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.5)' }}
        >
          TypeToTale
        </div>

        {/* title */}
        <div className="absolute top-[70px] py-2 left-8 font-medium text-[15px] text-[#8C8DA3] tracking-wide">
          Start to type to start telling a story together!
        </div>

        {/* Breadcrumb */}
        <div className="items-center text-lg mt-10 md:mt-18 text-[#5C5E81] ml-10 mb-5 md:flex">
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
            <Link to="/add-book">
              <button className="bg-[#5C5E81] text-white px-3 py-1 rounded-[24px] flex items-center">
                <span className="font-bold text-[16px] tracking-wide"> + new book</span>
              </button>
            </Link>
          </div>

          {/* Add book (desktop) */}
          <div className="hidden lg:flex items-center">
            <Link to="/add-book">
              <button className="bg-[#5C5E81] text-white px-4 py-1.5 rounded-[24px] flex items-center">
                <span className="font-bold text-[20px] tracking-wide">+ new book</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 ml-10 mr-10 mt-10">
          {bookNames.map((name, index) => (
            <div key={index} className="flex flex-col items-center">

              <Link
                to={`/book-detail/${index}`}
                className="relative w-[150px] h-[200px] rounded-[10px] group cursor-pointer block"
              >
                {/* Shadow */}
                <div className="absolute top-2 left-2 w-full h-full bg-[#BFBFBF] rounded-md opacity-100 z-0"></div>

                {/* Spine */}
                <div
                  className="absolute left-0 top-0 w-[15px] h-full bg-[#494141] rounded-l-md z-10
                  group-hover:scale-[1.02] group-hover:origin-left transition-transform duration-200"
                ></div>

                {/* Cover */}
                <div
                  className="absolute left-[15px] top-0 right-0 h-full bg-[#5C5E81] rounded-r-md z-15
                  group-hover:scale-[1.02] group-hover:origin-left transition-transform duration-200"
                ></div>
              </Link>

              {/* Book name */}
              {/* เปลี่ยนจาก Link เป็น div เพื่อ handle click เปิด modal */}
              <div
                onClick={() => openRenameModal(index)}
                className="block mt-4 max-w-[100px] cursor-pointer text-[#9D9191] text-[15px] font-medium text-center select-none"
                title="Click to rename"
              >
                {name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rename Modal (ไม่มี background overlay) */}
      {isRenameModalOpen && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-white shadow-lg rounded-2xl p-6 w-[400px] border border-gray-300">
            <h2 className="text-xl font-bold text-[#5C5E81] mb-4 text-center">Rename Book</h2>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="rename"
                className="flex-grow px-4 py-2 border font-light text-[14px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C5E81]"
                value={renameInput}
                onChange={(e) => setRenameInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRename();
                  if (e.key === "Escape") closeRenameModal();
                }}
                autoFocus
              />
              <button
                className="bg-[#5C5E81] text-[15px] text-white px-4 py-2 rounded-[50px] whitespace-nowrap"
                onClick={handleRename}
              >
                Rename
              </button>
            </div>

            <div className="flex justify-center mt-4">
              <button
                className="text-[15px] px-4 py-2 text-[#D37070] underline"
                onClick={closeRenameModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
