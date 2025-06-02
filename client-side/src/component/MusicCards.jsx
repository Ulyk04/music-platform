
import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import PropTypes from 'prop-types';

const MusicCards = ({ icon: IconComponent, title, artist, albumArt }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1.5,
        borderBottom: '1px solid #eee',
        '&:last-child': { borderBottom: 'none' },
        width: '100%',
      }}
    >
      {albumArt ? (
        <Avatar src={albumArt} alt={title} sx={{ mr: 2, width: 56, height: 56 }} />
      ) : (
        <Box sx={{ mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, bgcolor: 'grey.200', borderRadius: '50%' }}>
          {IconComponent && <IconComponent sx={{ fontSize: 30, color: 'grey.600' }} />}
        </Box>
      )}

      <Box>
        <Typography variant="h6" component="div" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {artist}
        </Typography>
      </Box>
    </Box>
  );
};

MusicCards.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  albumArt: PropTypes.string, 
};

export default MusicCards;