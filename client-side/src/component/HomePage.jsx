import { InputAdornment, TextField , Box , List ,IconButton, ListItem , Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react' 
import SearchIcon from '@mui/icons-material/Search'
import MusicCards from './MusicCards'
import MusicNote from '@mui/icons-material/MusicNote';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState(''); 
    const [searchResults, setSearchResults] = useState([]);
    const [playingSong, setPlayingSong] = useState(null); 
    const [isPlaying, setIsPlaying] = useState(false);
    const [favoriteSongs, setFavoriteSongs] = useState(() =>{
        try{
            const storedFavorites = localStorage.getItem('favoriteSongs');
            return storedFavorites ? JSON.parse(storedFavorites) : {};
        }catch(error) {
            console.error('Error parsing favorite songs from localStorage:', error);
            return {};
        }
    });
    const audioRef = useRef(new Audio()); 

    useEffect(() => {
        try {
            localStorage.setItem('favoriteSongs', JSON.stringify(favoriteSongs));
        } catch (error) {
            console.error("Failed to save favorite songs to localStorage", error);
        }
    }, [favoriteSongs]);

    const handleSearch = async (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        if (term.trim() === '') {
            setSearchResults([]);
            return;
        }

        try {
           
            const response = await fetch(`https://music-platform-backend.onrender.com/api/search?term=${encodeURIComponent(term)}`);
            const data = await response.json();
            setSearchResults(data.results || []);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
        }
    }

   
    const handlePlay = (songToPlay) => { 
      
        const proxiedAudioUrl = `https://music-platform-backend.onrender.com/api/play-audio?url=${encodeURIComponent(songToPlay.previewUrl)}`;

       
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
    }

    const handleToggleFavorite = (song) => {
        setFavoriteSongs(prevFavorites => {
            const newFavorites = { ...prevFavorites };
            if (newFavorites[song.trackId]) {  
                delete newFavorites[song.trackId];
            } else {
                newFavorites[song.trackId] = song;
            }
            return newFavorites;
        });
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
    } ,[]);

  return (
    <Box sx={{p: 2}} >
        <TextField
            id='search-music-textfield'
            label='Search Music' 
            value={searchTerm}
            onChange={handleSearch}
            sx={{width: '100%' , mb: 4}} 
            InputProps={{ 
                startAdornment:(
                    <InputAdornment position='start'>
                        <SearchIcon />
                    </InputAdornment>
                )
            }}
        />
        <Box>
            {searchResults.length > 0 ? (
            <List>
                {searchResults.map((song) => (
                <ListItem
                    key={song.trackId}
                    secondaryAction={
                    song.previewUrl && (
                        <IconButton
                        edge="end"
                        aria-label="play/pause"
                      
                        onClick={() => handlePlay(song)} 
                        >
                       
                        {playingSong && playingSong.trackId === song.trackId && isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                        </IconButton>
                    )
                    }
                >
                    <MusicCards
                    icon={MusicNote}
                    title={song.trackName}
                    artist={song.artistName}
                    albumArt={song.artworkUrl100} 
                    isFavorite={!!favoriteSongs[song.trackId]}
                    onToggleFavorite={() => handleToggleFavorite(song)}
                    />
                </ListItem>
                ))}
            </List>
            ) : (
            <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
                Start typing to find music...
            </Typography>
            )}
        </Box> 
    </Box>
  )
}

export default HomePage