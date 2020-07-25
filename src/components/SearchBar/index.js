import React, { useState, useEffect } from "react";

import "./styles.css";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const search = (e) => {
    e.preventDefault();
    setTerm("");
    onSearch(term);
  };

  const handleTermChange = (evt) => {
    setTerm(evt.target.value);
  };

  useEffect(() => {
    const storageTerm = window.sessionStorage.getItem("search");
    if (storageTerm) {
      return setTerm(storageTerm);
    }
    return;
  }, []);

  return (
    <form data-testid="search_form" className="SearchBar" onSubmit={search}>
      <input
        value={term}
        placeholder="Enter A Song, Album, or Artist"
        onChange={(evt) => handleTermChange(evt)}
        data-testid="search_input"
      />

      <button
        type="submit"
        className="SearchButton"
        data-testid="search_button"
      >
        SEARCH
      </button>
    </form>
  );
};

export default SearchBar;
