import React,{ useState } from 'react'
import "./Searchbar.scss";
  function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = () => {
      onSearch(searchTerm); 
    };

    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    );
  };

export default SearchBar