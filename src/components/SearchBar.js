import React from 'react';
import { motion } from 'framer-motion';
import { TextField, InputAdornment, IconButton, Chip } from '@mui/material';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search articles, topics, or experiences..."
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClearSearch}
                edge="end"
                size="small"
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px',
            backgroundColor: 'white',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
            },
          },
        }}
      />
      
      {searchQuery && (
        <motion.div 
          className="mt-4 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Chip
            label={`Searching for: "${searchQuery}"`}
            color="primary"
            variant="outlined"
            className="text-sm"
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchBar;
