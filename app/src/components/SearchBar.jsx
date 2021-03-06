import React, { useState, useEffect, useContext } from 'react';
import { ContextArtistId } from '../App';
import { useHistory } from 'react-router-dom';

import ArrowIcon from '../images/arrow.png';
import './SearchBar.css'

function SearchBar() {
  const [searchInput, setInput] = useState('');
  const [songs, setSongs] = useState();
  const [artist, setArtist] = useState();
  const [currentVideoId, setCurrentVideoId] = useState();
  const [context, setContext] = useContext(ContextArtistId);
  const history = useHistory();

  async function searchSong() {
    let response = await fetch(
      'https://yt-music-api.herokuapp.com/api/yt/songs/' + searchInput
    );
    let result = await response.json();
    setSongs(result.content);
  }
  async function searchArtist() {
    let response = await fetch(
      'https://yt-music-api.herokuapp.com/api/yt/artists/' + searchInput
    );
    let result = await response.json();
    setArtist(result.content);
    console.log(result.content);
  }

  function songClick(song) {
    console.log(song.name);
    setCurrentVideoId(song.videoId);
    console.log(song.artist.browseId);
  }
  function artistClick(artist) {
    setContext(artist.browseId);
    history.push('/artist');
  }
  return (
    <div className='searchbar'>
      <div className='hello'>
      <a href="/">
       <img src={ArrowIcon} className='arrow-bar'/>
       </a>
      <input
        type='text'
        placeholder='Artists or songs'
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            searchArtist();
            searchSong();
          }
        }}
      />

      <hr />
      </div>
      
      {artist &&
        artist.map((artist) => (
          <div className='search-artist-song'>
              <img src={artist.thumbnails[0].url} />
            <div className='thumbnails' onClick={() => artistClick(artist)}>
              {artist.name}
              <p style={{ fontSize: '12px' }}>Artist</p>
            </div>
            <hr />
            </div>
      
        ))}

      {songs &&
        songs.map((song) => (
          <div className='search-artist-song' >
            <img src={song.thumbnails[0].url} />
            <div className='thumbnails' onClick={() => songClick(song)}>
            {song.name}
              <p style={{ fontSize: '12px' }}>Song</p>
              </div>
            <hr />
          </div>
        ))}
    </div>
  );
}

export default SearchBar;
