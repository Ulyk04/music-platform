import React, { useState, useEffect } from 'react';
import {
  Box, Typography, List, ListItem, Checkbox, TextField, Button
} from '@mui/material';
import MusicCards from './MusicCards';


const CreatePlaylist = () => {
  const [favoriteSongs, setFavoriteSongs] = useState({});
  const [selectedTracks, setSelectedTracks] = useState({});
  const [playlistName, setPlaylistName] = useState('');

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteSongs');
    setFavoriteSongs(storedFavorites ? JSON.parse(storedFavorites) : {});
  }, []);

  const toggleSelectTrack = (trackId) => {
    setSelectedTracks((prev) => ({
      ...prev,
      [trackId]: !prev[trackId],
    }));
  };

  const handleCreatePlaylist = () => {
    if (!playlistName.trim()) return;

    const selectedSongs = Object.entries(favoriteSongs)
      .filter(([trackId]) => selectedTracks[trackId])
      .map(([trackId, song]) => song);

    const newPlaylist = {
      name: playlistName,
      songs: selectedSongs,
      createdAt: new Date().toISOString(),
    };

    const storedPlaylists = JSON.parse(localStorage.getItem('playlists') || '[]');
    storedPlaylists.push(newPlaylist);
    localStorage.setItem('playlists', JSON.stringify(storedPlaylists));

    setPlaylistName('');
    setSelectedTracks({});
    alert('Playlist created successfully!');
  };

  return (
    <Box sx={{ p: 2 }}>
     

      <TextField
        label="Playlist Name"
        fullWidth
        sx={{ mb: 3 }}
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />

      <List>
        {Object.values(favoriteSongs).map((song) => (
          <ListItem
            key={song.trackId}
            secondaryAction={
              <Checkbox
                edge="end"
                checked={!!selectedTracks[song.trackId]}
                onChange={() => toggleSelectTrack(song.trackId)}
              />
            }
          >
            <MusicCards
              title={song.trackName}
              artist={song.artistName}
              albumArt={song.artworkUrl100}
            />
          </ListItem>
        ))}
      </List>

      <Button
        variant="contained"
        onClick={handleCreatePlaylist}
        disabled={!playlistName.trim()}
      >
        Create Playlist
      </Button>
    </Box>
  );
};

export default CreatePlaylist;
