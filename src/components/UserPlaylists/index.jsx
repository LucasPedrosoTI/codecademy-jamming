import React from "react";
import UserPlaylist from "../UserPlaylist";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./styles.css";

const UserPlaylists = ({ userPlaylists }) => {
  return (
    <div className="user-playlists">
      <Carousel showThumbs={false}>
        {userPlaylists.map((playlist) => (
          <UserPlaylist key={playlist.id} playlist={playlist} />
        ))}
      </Carousel>
    </div>
  );
};

export default UserPlaylists;
