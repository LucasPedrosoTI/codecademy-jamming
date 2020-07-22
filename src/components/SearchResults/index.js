import React from "react";

import "./styles.css";
import TrackList from "../TrackList";

const SearchResults = ({ searchResults, onAdd }) => (
  <div className="SearchResults">
    <h2>Results</h2>
    {searchResults.length > 0 ? (
      <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false} />
    ) : (
      <p className="mt">Make a search on the input above</p>
    )}
  </div>
);

export default SearchResults;
