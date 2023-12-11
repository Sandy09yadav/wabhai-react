import * as React from 'react';
import './ChatList.css';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '22ch',
      '&:focus': {
        width: '22ch',
      },
    },
  },
}));

const ChatList = () => {
  return (
    <div className='chatlist'>
      <div className='head'>
        <h5>Chat</h5>
        <div className='icons'>
          <p>cd</p>
          <p>cd</p>
        </div>
      </div>
      <div className='input'>
        <Search>
          <SearchIconWrapper>
            {/* <SearchIcon /> */}
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search or start a new chat"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </div>
    </div>
  )
}

export default ChatList
