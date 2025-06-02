import { InputAdornment, TextField , Box , List ,IconButton, ListItem , Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react' // Добавил useState, useRef
import SearchIcon from '@mui/icons-material/Search'
import MusicCards from './MusicCards'
import MusicNote from '@mui/icons-material/MusicNote';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState(''); // React.useState -> useState
    const [searchResults, setSearchResults] = useState([]);
    const [playingSong, setPlayingSong] = useState(null); // Будет хранить объект песни
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio()); // React.useRef -> useRef

    const handleSearch = async (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        if (term.trim() === '') {
            setSearchResults([]);
            return;
        }

        try {
            // Убедитесь, что эндпоинт на сервере `/api/search-music` или `/api/search`
            // Ваш server.js использует '/api/search', поэтому оставим так.
            const response = await fetch(`http://localhost:5000/api/search?term=${encodeURIComponent(term)}`);
            const data = await response.json();
            setSearchResults(data.results || []);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
        }
    }

    // handlePlay теперь принимает ОБЪЕКТ песни
    const handlePlay = (songToPlay) => { // Переименовал для ясности
        // URL для проксирования
        const proxiedAudioUrl = `http://localhost:5000/api/play-audio?url=${encodeURIComponent(songToPlay.previewUrl)}`;

        // Проверяем, если это та же песня и она уже играет
        if (playingSong && playingSong.trackId === songToPlay.trackId && isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            // Если это другая песня или текущая на паузе
            if (!playingSong || playingSong.trackId !== songToPlay.trackId) {
                audioRef.current.src = proxiedAudioUrl; // Используем проксированный URL
                setPlayingSong(songToPlay); // Храним ОБЪЕКТ песни
            }
            audioRef.current.play();
            setIsPlaying(true);
        }
    }

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
            audio.src = ''; // Очищаем src
        };
    } ,[]);

  return (
    <Box sx={{p: 2}} >
        <TextField
            id='search-music-textfield'
            label='Search Music' // Убрал mb: 10, поставил 4 для TextField
            value={searchTerm}
            onChange={handleSearch}
            sx={{width: '100%' , mb: 4}} 
            InputProps={{ // slotProps -> InputProps
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
                        // Передаем ОБЪЕКТ песни в handlePlay
                        onClick={() => handlePlay(song)} 
                        >
                        {/* Логика для кнопки Play/Pause:
                            playingSong должен быть объектом, и сравниваем trackId */}
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