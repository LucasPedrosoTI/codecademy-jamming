import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import "./App.css";

import SearchBar from "../../components/SearchBar";
import SearchResults from "../../components/SearchResults";
import Playlist from "../../components/Playlist";
import Loading from "../../components/Loading/Loading";
import UserPlaylists from "../../components/UserPlaylists";

import { Spotify } from "../../util/Spotify";

// const playlistTracksData = [
//   { id: 1, name: "music", artist: "John", album: "album" },
//   { id: 2, name: "music2", artist: "John", album: "album2" },
// ];

const playlists = [
  {
    description: "",
    id: "1Ddp42RNhmkNpjemixxd9c",
    image: {
      height: 640,
      url:
        "https://mosaic.scdn.co/640/ab67616d0000b2731784842…c3ed9f7aaab67616d0000b273f72b466f20c5cf3562cb9bc6",
      width: 640,
    },
    name: "⭐️",
    owner: "camilisromao",
  },
  {
    description: "",
    id: "54CZ9gaZbdLFQM4jrNniOd",
    image: {
      height: 640,
      url:
        "https://mosaic.scdn.co/640/ab67616d0000b273063fdd2…459d5b5abab67616d0000b273e3af7a9341760340fc7a8dc5",
      width: 640,
    },
    name: "Reggae & P Rock Nac. & Pop 🍀",
    owner: "Lucas Pedroso",
  },
  {
    description: "As melhores do funk!!!",
    id: "4YobWETUsUEnoIZsRUpdxI",
    image: {
      height: null,
      url: "https://i.scdn.co/image/ab67706c0000bebb03cf9b28b5ec3f6be414e222",
      width: null,
    },
    name: "FUNK 2020 - 🔞 Combatchy ",
    owner: "Andressa Raffler",
  },
];

const App = () => {
  const alert = useAlert();
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState([]);

  const isExisting = (savedTrack, track) => savedTrack.id === track.id;

  const addTrack = (track) => {
    if (playlistTracks.find((savedTrack) => isExisting(savedTrack, track)))
      return;

    const updatedSearchResults = searchResults.filter(
      (savedTrack) => savedTrack.id !== track.id
    );

    setSearchResults(updatedSearchResults);
    window.localStorage.setItem(
      "playlistTracks",
      JSON.stringify([...playlistTracks, track])
    );
    setPlaylistTracks([...playlistTracks, track]);
  };

  const removeTrack = (track) => {
    const updatedPlaylist = playlistTracks.filter(
      (currentTrack) => currentTrack.id !== track.id
    );
    setSearchResults([track, ...searchResults]);

    window.localStorage.setItem(
      "playlistTracks",
      JSON.stringify(updatedPlaylist)
    );
    setPlaylistTracks(updatedPlaylist);
  };

  const updatePlaylistName = (name) => {
    window.localStorage.setItem("playlistName", name);
    setPlaylistName(name);
  };

  const generateURIArray = (array) => {
    return array.map((item) => item.uri);
  };

  const search = async (term) => {
    try {
      const results = await Spotify.search(term);
      setSearchResults(results);
    } catch (error) {
      alert.error(error.message);
      setSearchResults([]);
    }
  };

  const savePlaylist = async (playlistTracks) => {
    if (playlistTracks.length === 0) {
      return alert.error("Please add at least one track to the playlist 😓");
    }

    if (!playlistName) {
      return alert.error("Please add a name for the playlist 😓");
    }

    setIsAdding(true);

    try {
      const uris = generateURIArray(playlistTracks);
      await Spotify.savePlaylist(playlistName, uris).then(() => {
        alert.success("Playlist saved successfully 😍", {
          onOpen: () => {
            setPlaylistName("");
            setPlaylistTracks([]);
            setIsAdding(false);
            window.localStorage.removeItem("playlistTracks");
            window.localStorage.removeItem("playlistName");
          },
        });
      });
    } catch (error) {
      alert.error("Are you sure this is a valid playlist? 😓");
      setIsAdding(false);
    }
  };

  const fetchPlaylists = async () => {
    return await Spotify.fetchPlaylists();
  };

  useEffect(() => {
    const playlistStore = JSON.parse(
      window.localStorage.getItem("playlistTracks")
    );
    const playlistNameStorage = window.localStorage.getItem("playlistName");

    if (playlistStore !== null) {
      setPlaylistTracks(playlistStore);
    }

    if (playlistNameStorage !== null) {
      setPlaylistName(playlistNameStorage);
    }

    fetchPlaylists().then((data) => {
      setUserPlaylists(data);
    });
  }, []);

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />

          <Playlist
            playlistName={playlistName}
            onChangeName={updatePlaylistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onSave={savePlaylist}
            isAdding={isAdding}
            loading={<Loading />}
          />
        </div>
        <UserPlaylists userPlaylists={userPlaylists} />
      </div>
    </div>
  );
};

export default App;
