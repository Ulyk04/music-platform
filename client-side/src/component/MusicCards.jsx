import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React from 'react'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

const MusicCards = ({icon , title , artist}) => {
  return (
    <div>
        <List sx={{cursor:'pointer'}} >
            <ListItem
                secondaryAction={
                    <IconButton>
                        <FavoriteBorder />
                    </IconButton>
                }
            >
                <ListItemAvatar>
                    <Avatar>
                        {React.createElement(icon)}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={title} secondary={artist}/>
            </ListItem>
        </List>
    </div>
  )
}

export default MusicCards