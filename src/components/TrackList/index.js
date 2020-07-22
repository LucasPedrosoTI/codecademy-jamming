import React from "react";

import "./styles.css";
import Track from "../Track";

const TrackList = ({ tracks, onAdd, onRemove, isRemoval }) => {
  if (tracks.length === 0) {
    return <div>Oooops! No tracks found!</div>;
  }

  return (
    <div className="TrackList">
      {tracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          onAdd={onAdd}
          onRemove={onRemove}
          isRemoval={isRemoval}
        />
      ))}
    </div>
  );
};

export default TrackList;
