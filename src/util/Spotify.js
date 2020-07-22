var accessToken, headers;
const clientId = "4be93ff5e96340bb826006e7d3eb409b";
const redirectUri =
  process.env.NODE_ENV === "production"
    ? "http://lucas-jammming.surge.sh"
    : "http://localhost:3000/";
const baseUrl = "https://api.spotify.com/v1";

const getAccessToken = () => {
  accessToken = window.localStorage.getItem("access_token");

  if (accessToken) {
    window.sessionStorage.clear();
    return accessToken;
  }

  if (window.location.href.match(/access_token=([^&]*)/) && !accessToken) {
    const url = window.location.href.split("=");
    let expiresIn = url[3];
    accessToken = url[1].replace("&token_type", "");
    window.setTimeout(() => {
      accessToken = "";
      window.localStorage.clear();
    }, expiresIn * 1000);

    window.history.pushState("Access Token", null, "/");
    window.localStorage.setItem("access_token", accessToken);
    window.sessionStorage.clear();
    return accessToken;
  }

  if (!accessToken && !window.location.href.match(/access_token=([^&]*)/)) {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

    window.alert("Let's log you in first ✅");
  }
};

const getUserId = async () => {
  const response = await fetch(`${baseUrl}/me`, { headers });

  const { id } = await response.json();

  return id;
};

const getPlaylistId = async (playlistName) => {
  const userId = await getUserId();
  const body = JSON.stringify({
    name: playlistName,
  });

  const response = await fetch(
    `https://cors-anywhere.herokuapp.com/${baseUrl}/users/${userId}/playlists`,
    {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body,
    }
  );
  const { id } = await response.json();

  return id;
};

const checkUris = (uris) => {
  const tester = /^spotify:track:/gm;
  return uris.filter((uri) => tester.test(uri));
};

const fetchSampleTrack = async (tracks) => {
  return await tracks.map(async (track) => {
    const response = await fetch(`${baseUrl}/tracks/${track.id}`, { headers });
    const { preview_url } = await response.json();
    return { ...track, preview_url };
  });
};

export const Spotify = {
  async search(term) {
    if (!term.trim()) throw new Error("Provide at least one character 🤔");
    window.sessionStorage.setItem("search", term);
    var finalTracks = [];
    accessToken = accessToken ?? getAccessToken();

    headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await fetch(`${baseUrl}/search?type=track&q=${term}`, {
        headers,
      });

      if (response.status === 401) {
        const { error } = await response.json();

        if (error.message.includes("Invalid access token")) {
          throw new Error("Invalid access token");
        }

        if (error.message.includes("The access token expired")) {
          window.localStorage.clear();
          window.location.reload();
          throw new Error("The access token expired");
        }
      }

      const { tracks } = await response.json();

      if (tracks.items.length === 0) {
        throw new Error("No items found");
      }

      const normalizedTracks = tracks.items.map((track) => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        };
      });

      const promiseOfTracks = await fetchSampleTrack(normalizedTracks);

      console.log(await this.fetchPlaylists());

      return Promise.allSettled(promiseOfTracks).then((result) => {
        result.forEach((track) => finalTracks.push(track.value));
        return finalTracks;
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async savePlaylist(playlistName, uris) {
    const checkedUris = checkUris(uris);

    if (!playlistName || checkedUris.length === 0)
      throw new Error("Algo está errado 💭");

    const body = JSON.stringify({
      uris: checkedUris,
    });

    try {
      const playlistId = await getPlaylistId(playlistName);

      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/${baseUrl}/playlists/${playlistId}/tracks`,
        {
          method: "POST",
          headers: { ...headers, "Content-Type": "application/json" },
          body,
        }
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async fetchPlaylists() {
    accessToken = accessToken ?? getAccessToken();

    headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    try {
      const response = await fetch(`${baseUrl}/me/playlists`, { headers });

      if (response.status === 401) {
        const { error } = await response.json();

        if (error.message.includes("Invalid access token")) {
          throw new Error("Invalid access token");
        }

        if (error.message.includes("The access token expired")) {
          window.localStorage.clear();
          window.location.reload();
          throw new Error("The access token expired");
        }
      }

      const { items } = await response.json();

      return items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          image: item.images[0],
          owner: item.owner.display_name,
          description: item.description,
        };
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
};
