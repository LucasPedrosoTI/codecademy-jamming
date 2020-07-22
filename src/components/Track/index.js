import React from "react";

import "./styles.css";

const Track = ({ track, onAdd, onRemove, isRemoval }) => {
  const addTrack = (track) => {
    onAdd(track);
  };

  const removeTrack = (track) => {
    onRemove(track);
  };

  const renderAction = (track) => {
    return isRemoval ? (
      <button className="Track-action" onClick={() => removeTrack(track)}>
        -
      </button>
    ) : (
      <button className="Track-action" onClick={() => addTrack(track)}>
        +
      </button>
    );
  };

  return (
    <div className="container">
      <div className="Track">
        <div className="Track-information">
          <h3>{track.name}</h3>
          <p>
            {" "}
            {track.artist} | {track.album}{" "}
          </p>
        </div>

        {renderAction(track)}
      </div>
      <div className="Track-player">
        <audio controls>
          <source src={track.preview_url} type="audio/mp3" />
        </audio>
      </div>
    </div>
  );
};

export default Track;
