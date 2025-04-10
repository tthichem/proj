import React, { useState, useEffect } from "react";
import "./Search.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Search = () => {
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search !== "") {
      fetch(`http://localhost:3000/api/modules/search?query=${search}`)
        .then((res) => res.json())
        .then((result) => console.log(result));
    }
  }, [search]);

  return (
    <div>
      <div className="search-input-div">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          autoComplete="off"
          onChange={handleChange}
          value={search}
        />
        <div className="search-icon">
          <FaSearch />
        </div>
      </div>
      <div className="search-result">
        <a href="#" target="_blank" className="suggestion">
          suggestion
        </a>
      </div>
    </div>
  );
};

export default Search;
