import React from "react";
import TrackList from "../TrackList";

import "./styles.css";
const Playlist = ({
  onChangeName,
  playlistTracks,
  playlistName,
  onRemove,
  onSave,
  isAdding,
  loading,
}) => {
  const handleChangeName = (evt) => {
    onChangeName(evt.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(playlistTracks);
  };

  if (isAdding) {
    return <div className="Playlist">{loading}</div>;
  }

  return (
    <form className="Playlist" onSubmit={handleSubmit}>
      <input
        value={playlistName}
        placeholder={"New Playlist"}
        onChange={(e) => handleChangeName(e)}
      />

      {playlistTracks.length > 0 ? (
        <TrackList
          isRemoval={true}
          onRemove={onRemove}
          tracks={playlistTracks}
        />
      ) : (
        <p className="mt">Search for a music and add to the playlist</p>
      )}

      <button type="submit" className="Playlist-save">
        SAVE TO SPOTIFY
      </button>
    </form>
  );
};

export default Playlist;
