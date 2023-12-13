import * as React from 'react';
import { styled } from '@mui/material/styles';
// import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import InputBase from '@mui/material/InputBase';
import SendIcon from '@mui/icons-material/Send';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachmentIcon from '@mui/icons-material/Attachment';
import SentCard from '../ChatMessages/SentCard';

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'white',
  border: '1px rgb(232, 232, 232) solid',
  borderLeft: '0',
  boxShadow: 'none',
});

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 45,
  },
}));

const ProfileContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const ProfileImage = styled(Avatar)({
  borderRadius: '50%',
  marginRight: '8px',
});

const ChatContent = styled('div')({
  flexGrow: 1,
  overflowY: 'auto',
  backgroundImage: 'url("./bg.png")',
  backgroundSize: 'auto',
  backgroundRepeat: 'repeat',
  backgroundPosition: 'left top',
});

const InputContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginTop: '8px',
  backgroundColor: 'white',
  padding: '10px 10px 10px 10px',
  borderTop: '1px rgb(232, 232, 232) solid',
});

const InputField = styled(InputBase)({
  flex: 1,
  marginRight: '8px',
  // border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '4px 8px',
});

const ActionButtons = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const SendButton = styled(IconButton)({
  marginLeft: '8px',
});

const ChatScreen = ({ activeChat }) => {

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <StyledAppBar position="static">
        <StyledToolbar>
          <ProfileContainer>
            <ProfileImage src={activeChat?.imageSrc} alt="Profile Image" />
            <Typography
              variant="h9"
              noWrap
              component="div"
              sx={{ flexGrow: 1, alignSelf: 'flex-end', color: 'black' }}
            >
              {activeChat?.phoneNumber}
            </Typography>
          </ProfileContainer>
          <IconButton size="large" aria-label="search" color="inherit">
            <SearchIcon style={{ color: 'black', padding: '5px 5px 5px 5px' }} />
          </IconButton>
        </StyledToolbar>
      </StyledAppBar>
      {/* Chats */}

      <ChatContent>
        {/* Your chat content goes here */}
        <SentCard />
      </ChatContent>

      {/* Input Container */}
      <InputContainer>
        <ActionButtons>
          <IconButton aria-label="emoji" style={{ padding: '10px 10px 10px 10px' }} >
            <InsertEmoticonIcon />
          </IconButton>
          <IconButton aria-label="attachment" style={{ padding: '10px 10px 10px 10px' }} >
            <AttachmentIcon />
          </IconButton>
        </ActionButtons>
        <InputField placeholder="Type a message" multiline />
        <SendButton aria-label="send" style={{ padding: '10px 10px 10px 10px' }} >
          <SendIcon />
        </SendButton>
      </InputContainer>
    </Box>
  )
}

export default ChatScreen
