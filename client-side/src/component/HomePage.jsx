import { InputAdornment, TextField , Box } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import MusicCards from './MusicCards'
import MusicNote from '@mui/icons-material/MusicNote';

const HomePage = () => {
  return (
    <div>
        <TextField
            id='input-with-icon-textfield'
            label='Search'
            sx={{width: '100%' , mb: 10}}
            slotProps={{
                input: {
                    startAdornment:(
                        <InputAdornment position='start'>
                            <SearchIcon />
                        </InputAdornment>
                    )
                }
            }}
        />
        <Box>
            <Box>
                <MusicCards icon={MusicNote} title='Song Title' artist='Artist Name' />
                <MusicCards icon={MusicNote} title='Song Title' artist='Artist Name' />
                <MusicCards icon={MusicNote} title='Song Title' artist='Artist Name' />
                <MusicCards icon={MusicNote} title='Song Title' artist='Artist Name' />
            </Box>
        </Box>
    </div>
  )
}

export default HomePage