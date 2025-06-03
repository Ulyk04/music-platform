
import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, IconButton } from '@mui/material';
import MusicCards from './MusicCards'; 
import MusicNote from '@mui/icons-material/MusicNote';
import DeleteIcon from '@mui/icons-material/Delete'; 
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const Library = () => {
    const [favoriteSongs, setFavoriteSongs] = useState({});
    const [playingSong, setPlayingSong] = useState(null); 
    const [isPlaying, setIsPlaying] = useState(false); 
    const audioRef = React.useRef(new Audio()); 

    useEffect(() => {
        
        const loadFavorites = () => {
            try {
                const storedFavorites = localStorage.getItem('favoriteSongs');
                setFavoriteSongs(storedFavorites ? JSON.parse(storedFavorites) : {});
            } catch (error) {
                console.error("Failed to load favorite songs from localStorage", error);
                setFavoriteSongs({});
            }
        };

        loadFavorites();

    }, []);

   
    const handleRemoveFavorite = (trackId) => {
        setFavoriteSongs(prevFavorites => {
            const newFavorites = { ...prevFavorites };
            delete newFavorites[trackId];
            localStorage.setItem('favoriteSongs', JSON.stringify(newFavorites)); 
            return newFavorites;
        });
       
        if (playingSong && playingSong.trackId === trackId) {
            audioRef.current.pause();
            setIsPlaying(false);
            setPlayingSong(null);
        }
    };

  
    const handlePlay = (songToPlay) => {
        const proxiedAudioUrl = `http://localhost:5000/api/play-audio?url=${encodeURIComponent(songToPlay.previewUrl)}`;

        if (playingSong && playingSong.trackId === songToPlay.trackId && isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            if (!playingSong || playingSong.trackId !== songToPlay.trackId) {
                audioRef.current.src = proxiedAudioUrl;
                setPlayingSong(songToPlay);
            }
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        const handleEnded = () => {
            setIsPlaying(false);
            setPlayingSong(null);
        };
        const handlePlayEvent = () => {
            setIsPlaying(true);
        };
        const handlePauseEvent = () => {
            setIsPlaying(false);
        };

        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('play', handlePlayEvent);
        audio.addEventListener('pause', handlePauseEvent);

        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('play', handlePlayEvent);
            audio.removeEventListener('pause', handlePauseEvent);
            audio.pause();
            audio.src = '';
        };
    }, []);


    const songsArray = Object.values(favoriteSongs); 

    return (
        <Box sx={{ p: 2 }}>
            

            {songsArray.length > 0 ? (
                <List>
                    {songsArray.map((song) => (
                        <ListItem
                            key={song.trackId}
                            secondaryAction={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    {song.previewUrl && (
                                        <IconButton
                                            edge="end"
                                            aria-label="play/pause"
                                            onClick={() => handlePlay(song)}
                                        >
                                            {playingSong && playingSong.trackId === song.trackId && isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                                        </IconButton>
                                    )}
                                    <IconButton
                                        edge="end"
                                        aria-label="remove from favorites"
                                        onClick={() => handleRemoveFavorite(song.trackId)} 
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            }
                        >
                            <MusicCards
                                icon={MusicNote}
                                title={song.trackName}
                                artist={song.artistName}
                                albumArt={song.artworkUrl100}
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
                    Your library is empty. Add some songs!
                </Typography>
            )}
        </Box>
    );
};

export default Library;