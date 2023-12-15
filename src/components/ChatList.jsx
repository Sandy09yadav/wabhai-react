import * as React from 'react';
import { useState } from 'react';
import './ChatList.css';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import MoreIcon from '@mui/icons-material/MoreVert';
import ChatCard from '../cards/ChatCard';
import IconButton from '@mui/material/IconButton';
import profile from '../Profile.json';
import AddContact from '../Sections/AddContact';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '7px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  border: `1px solid #cdcdcd`,
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
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
    paddingLeft: `calc(1em + ${theme.spacing(2.5)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '22ch',
      '&:focus': {
        width: '22ch',
      },
    },
  },
}));

const ChatList = ({ setActiveChat }) => {
  const [activeCard, setActiveCard] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);


  const handleCardClick = (index) => {
    setActiveCard(index);
    setActiveChat({
      imageSrc: chatData[index].imageSrc,
      phoneNumber: chatData[index].phoneNumber,
    });
  };

  const chatData = profile.map((message, index) => ({
    imageSrc: message.profilePic,
    phoneNumber: message.name,
    otherText: message.message,
    date: message.date,
  }));

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='chatlist'>
      <div className='head'>
        <h2 style={{ fontWeight: 'normal' }} >Chat</h2>
        <div className='icons'>
          <IconButton aria-label="attachment" style={{ padding: '5px 5px 5px 5px' }} >
            <BorderColorTwoToneIcon style={{ fontSize: '20px' }} onClick={handleSettingsClick} />
          </IconButton>
          <IconButton aria-label="attachment" style={{ padding: '5px 5px 5px 5px' }} >
            <MoreIcon style={{ fontSize: '20px' }} />
          </IconButton>
        </div>
      </div>
      <div className='input'>
        <Search>
          <SearchIconWrapper>
            <SearchIcon style={{ color: '#cdcdcd', fontSize: '20px' }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search or start a new chat"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </div>
      <div className='card-container'>
        {chatData.map((data, index) => (
          <ChatCard
            key={index}
            {...data}
            onClick={() => handleCardClick(index)}
            isActive={index === activeCard}
          />
        ))}
      </div>

      <AddContact anchorEl={anchorEl} onClose={handleSettingsClose} />
    </div>
  )
}

export default ChatList
