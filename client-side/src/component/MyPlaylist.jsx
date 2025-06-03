import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';

const MyPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const storedPlaylists = JSON.parse(localStorage.getItem('playlists') || '[]');
    setPlaylists(storedPlaylists);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
     
      {playlists.length === 0 ? (
        <Typography>No playlists yet.</Typography>
      ) : (
        playlists.map((playlist, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              🎵 {playlist.name}
            </Typography>
            <Grid container spacing={2}>
              {playlist.songs.map((song, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Card sx={{ display: 'flex' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 100 }}
                      image={song.artworkUrl100}
                      alt={song.trackName}
                    />
                    <CardContent>
                      <Typography variant="subtitle1">{song.trackName}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {song.artistName}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      )}
    </Box>
  );
};

export default MyPlaylists;
