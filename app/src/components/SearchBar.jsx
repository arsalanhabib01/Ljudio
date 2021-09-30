import React, { useState, useEffect } from 'react';

function SearchBar() {
  const [searchInput, setInput] = useState('');
  const [songs, setSongs] = useState();
  const [artist, setArtist] = useState();
  const [currentVideoId, setCurrentVideoId] = useState();

  async function searchSong() {
    let response = await fetch(
      'https://yt-music-api.herokuapp.com/api/yt/songs/' + searchInput
    );
    let result = await response.json();
    console.log(result.content);
    setSongs(result.content);
  }
  async function searchArtist() {
    let response = await fetch(
      'https://yt-music-api.herokuapp.com/api/yt/artists/' + searchInput
    );
    let result = await response.json();
    console.log(result.content);
    setArtist(result.content);
  }

  function songClick(song) {
    console.log(song.name);
    setCurrentVideoId(song.videoId);
    console.log(song.artist.browseId);
  }
  function artistClick(artist) {
    console.log(artist.browseId);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="search songs"
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            searchArtist();
            searchSong();
          }
        }}
      />

      <hr />

      {artist &&
        artist.map((artist) => (
          <div onClick={() => artistClick(artist)}>
            {artist.name}
            <p style={{ fontSize: '10px' }}>Artist</p>
            <hr />
          </div>
        ))}

      {songs &&
        songs.map((song) => (
          <div onClick={() => songClick(song)}>
            {song.name}
            <p style={{ fontSize: '10px' }}>Song</p>
            <hr />
          </div>
        ))}
    </div>
  );
}

export default SearchBar;