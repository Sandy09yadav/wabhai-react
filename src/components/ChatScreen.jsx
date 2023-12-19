import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
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
import CardList from './CardList';
import Profile from '../Sections/Profile';
import EmojiPicker from '../Buttons/EmojiPicker';
import { useAuthKey } from './AuthKeyProvider';
// import FileInput from '../Buttons/FileInput';

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
  '@media all': {
    minHeight: 45,
  },
}));

const ProfileContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
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
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const { authKey, updateAuthKey } = useAuthKey();
  const RECEIVER_MOBILE = '917073751663';
  console.log(authKey, 'khasgdhs ')

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleEmojiClick = () => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };

  // const handleFileChange = (file) => {
  //   setSelectedFile(file);
  // };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile);
    }
  };
  const handleMessageUpload = async () => {
    if (message.trim() !== '') {
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      console.log("yha s aja bhaiii", authKey);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, isMe: true, time: formattedTime },
      ]);

      setMessage('');

      const newMessage = {
        apiAuthkey: authKey,
        receiverMobile: RECEIVER_MOBILE,
        msg: message,
        isMe: true,
        time: formattedTime,
      };

      console.log('newMessage', newMessage);

      var formdata = new FormData();
      formdata.append("apiAuthkey", authKey);
      formdata.append("receiverMobile", RECEIVER_MOBILE);
      formdata.append("msg", message);
      formdata.append("isMe", true);
      formdata.append("time", formattedTime);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      try {
        const response = await fetch("https://app.rapbooster.com/api/sendMsg", requestOptions);

        if (response.ok) {
          const result = await response.json();
          const messageId = result.messageId;

          console.log('API Response:', result);

          // Call the function to check the message status
          setTimeout(async () => {
            await checkMessageStatus(messageId);
          }, 5000);

        } else {
          // Handle non-OK response
          console.log('API Error:', response.status, response.statusText);
        }
      } catch (error) {
        // Handle fetch error
        console.error('Fetch Error:', error);
      }

    }
  };

  const checkMessageStatus = async (messageId) => {
    var formdata = new FormData();
    formdata.append("apiAuthkey", authKey);
    formdata.append("messageId", messageId);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    try {
      const checkMsgStatusResponse = await fetch("https://app.rapbooster.com/api/checkMsgStatus", requestOptions);

      if (checkMsgStatusResponse.ok) {
        const result = await checkMsgStatusResponse.text();
        console.log('Check Message Status Response:', result);
      } else {
        // Handle non-OK response
        console.log('Check Message Status Error:', checkMsgStatusResponse.status, checkMsgStatusResponse.statusText);
      }
    } catch (error) {
      // Handle fetch error
      console.error('Check Message Status Fetch Error:', error);
    }
  };

  useEffect(() => {
    console.log('Entering useEffect');
    const handleKeyPress = (e) => {
      console.log('Key pressed:', e.key);
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleMessageUpload();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      console.log('Cleaning up useEffect');
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [updateAuthKey]);

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <StyledAppBar position="static">
        <StyledToolbar>
          <ProfileContainer onClick={handleProfileClick}>
            <ProfileImage src={activeChat?.imageSrc} alt="Profile Image" />
            <Typography
              variant="h9"
              noWrap
              component="div"
              sx={{ flexGrow: 1, alignSelf: 'auto', color: 'black' }}
            >
              {activeChat?.phoneNumber}
            </Typography>
          </ProfileContainer>
          <IconButton size="large" aria-label="search" color="inherit">
            <SearchIcon style={{ color: '#636363', padding: '5px 5px 5px 5px' }} />
          </IconButton>
        </StyledToolbar>

        {anchorEl && <Profile activeChat={activeChat} anchorEl={anchorEl} onClose={handleProfileClose} />}
      </StyledAppBar>
      {/* Chats */}

      <ChatContent>
        {/* Your chat content goes here */}
        <CardList messages={messages} />
      </ChatContent>


      {/* <FileInput onFileChange={handleFileChange} /> */}
      <EmojiPicker
        onSelectEmoji={handleEmojiSelect}
        open={isEmojiPickerOpen}
        onClose={() => setIsEmojiPickerOpen(false)}
        pickerStyle={{ position: 'relative', bottom: '0', left: '0' }}
      />
      {/* Input Container */}
      <InputContainer>
        <ActionButtons>
          <IconButton aria-label="emoji" style={{ padding: '10px 10px 10px 10px' }} onClick={handleEmojiClick} >
            <InsertEmoticonIcon />
          </IconButton>
          <IconButton aria-label="attachment" style={{ padding: '10px 10px 10px 10px' }} onClick={handleUpload} >
            <AttachmentIcon />
          </IconButton>
        </ActionButtons>
        <InputField
          placeholder="Type a message"
          multiline
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SendButton aria-label="send" style={{ padding: '10px 10px 10px 10px' }} onClick={handleMessageUpload} >
          <SendIcon />
        </SendButton>
      </InputContainer>


    </Box>
  )
}

export default ChatScreen
