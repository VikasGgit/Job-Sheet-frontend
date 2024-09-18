import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex flex-row justify-between">
      <input
        className="w-[90%] border border-gray-400 rounded-md"
        type="text"
        placeholder="Search By client ID or client name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className="bg-blue-900 w-[10%] ml-2 p-1 rounded-md text-white">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
