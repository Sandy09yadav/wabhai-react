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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '7px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  border: `1px solid ${theme.palette.common.black}`,
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

  const handleCardClick = (index) => {
    setActiveCard(index);
    setActiveChat({
      imageSrc: chatData[index].imageSrc,
      phoneNumber: chatData[index].phoneNumber,
    });
  };

  const chatData = [
    {
      imageSrc: "./logo192.png",
      phoneNumber: "+91 9876543210",
      otherText: "Other Text Here for 1",
      date: "12/12/2023",
    },
    {
      imageSrc: "./path/to/your/image2.jpg",
      phoneNumber: "+91 9876543211",
      otherText: "Other Text Here for 2",
      date: "12/13/2023",
    },
    {
      imageSrc: "./logo512.png",
      phoneNumber: "+91 9876543212",
      otherText: "Other Text Here for 3",
      date: "12/14/2023",
    },
  ];

  return (
    <div className='chatlist'>
      <div className='head'>
        <h2 style={{ fontWeight: 'normal' }} >Chat</h2>
        <div className='icons'>
          <IconButton aria-label="attachment" style={{ padding: '5px 5px 5px 5px' }} >
            <BorderColorTwoToneIcon style={{ fontSize: '20px' }} />
          </IconButton>
          <IconButton aria-label="attachment" style={{ padding: '5px 5px 5px 5px' }} >
            <MoreIcon style={{ fontSize: '20px' }} />
          </IconButton>
        </div>
      </div>
      <div className='input'>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
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
      {/* <ChatScreen activeChat={activeChat} /> */}
    </div>
  )
}

export default ChatList
