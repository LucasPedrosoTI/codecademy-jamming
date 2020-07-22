import React from "react";
import "./styles.css";
const parser = new DOMParser();

const UserPlaylist = ({ playlist }) => {
  return (
    <div className="playlist-info">
      <h2>{playlist.name}</h2>
      <img
        className="playlist-image"
        src={playlist.image.url}
        alt={playlist.name}
      />
      <div className="playlist-text">
        <p>Playlist by {playlist.owner}</p>
        <p>
          {
            parser.parseFromString(
              `<!doctype html><body><p>${playlist.description}</p>`,
              "text/html"
            ).body.textContent
          }
        </p>
      </div>
    </div>
  );
};

export default UserPlaylist;
