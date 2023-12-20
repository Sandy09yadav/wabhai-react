import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import InputBase from '@mui/material/InputBase';
import SendIcon from '@mui/icons-material/Send';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachmentIcon from '@mui/icons-material/Attachment';
import CardList from './CardList';
import Profile from '../Sections/Profile';
import EmojiPicker from '../Buttons/EmojiPicker';
import { useAuthKey } from './AuthKeyProvider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FilePreview from './FileChoose';

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
  const [selectedFileType, setSelectedFileType] = useState('image');
  const [displayedFileType, setDisplayedFileType] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [fileChooseVisible, setFileChooseVisible] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  // const [caption, setCaption] = useState('');

  const { authKey, updateAuthKey } = useAuthKey();
  const RECEIVER_MOBILE = '917073751663';
  console.log(authKey, 'khasgdhs ')

  const fileInputRef = React.useRef(null);
  // const menuAnchorRef = useRef(null);
  const filePreviewRef = React.useRef(null);
  useEffect(() => {
    const handleClick = (event) => {
      // Check if the clicked element is inside the file preview box
      if (filePreviewRef.current && !filePreviewRef.current.contains(event.target)) {
        // If filePreview is true, set it to false when the user clicks outside the file preview box
        setFilePreview(false);
      }
    };

    // Add a click event listener to the entire document
    document.addEventListener('click', handleClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [filePreview]);
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
    console.log(filePreview,'file preview')
    setFilePreview(false)
    setMessage((prevMessage) => prevMessage + emoji);
  };

  const handleAttachmentClick = (event) => {
    // fileInputRef.current.click();
    setAnchorElMenu(event.currentTarget);
    setDisplayedFileType(null);
  };

  const handleMenuItemClick = (fileType) => {
    // Handle the selected file type as needed (e.g., update state)
    setSelectedFileType(fileType);
    setDisplayedFileType(fileType);

    // Trigger the file input directly
    setAnchorElMenu(null);

    setTimeout(() => {
      fileInputRef.current.click();
    }, 0);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileChooseVisible(true);
    setFilePreview(file);
  };

  const acceptedFileTypes = {
    image: 'image/*, video/*',
    audio: 'audio/*',
    document: '.pdf, .doc, .docx',
  };

  const handleMessageUpload = async (file) => {
    if (message?.trim() !== '') {
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
      formdata.append("fileType", "");
      formdata.append("mimeType", "");
      formdata.append("fileName", "");

      if (selectedFile) {
        formdata.append("file", selectedFile);
      }

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
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh',position:'relative' }}>
      <StyledAppBar position="static">
        <StyledToolbar>
          <ProfileContainer onClick={handleProfileClick} style={{ padding: '10px' }}>
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
          {/* <IconButton size="large" aria-label="search" color="inherit">
            <SearchIcon style={{ color: '#636363', padding: '5px 5px 5px 5px' }} />
          </IconButton> */}
        </StyledToolbar>

        {anchorEl && <Profile activeChat={activeChat} anchorEl={anchorEl} onClose={handleProfileClose} />}
      </StyledAppBar>
      {/* Chats */}
      {/* <Box sx={{ flexGrow: 1, overflowY: 'auto' }}> */}

      <Box sx={{ flexGrow: 1, overflowY: 'auto',position:'relative' }}>

        <ChatContent>
          {/* Your chat content goes here */}
          <CardList messages={messages} />
        </ChatContent>
      </Box>
      <div style={{ position: 'absolute', left: '10px', bottom: '10%',maxWidth:"52%" }}>
        {/* Display the file preview component */}
        {filePreview && (
          <FilePreview
            file={filePreview}
            onClose={() => setFilePreview(null)}
            handleMessageUpload={handleMessageUpload}
            message={message}setMessage={setMessage}
            filePreviewRef={filePreviewRef}
          // style={{ position: 'absolute' }}
          />
        )}

    
      {/* <FileInput onFileChange={handleFileChange} /> */}
      <EmojiPicker
        onSelectEmoji={handleEmojiSelect}
        open={isEmojiPickerOpen}
        onClose={() => setIsEmojiPickerOpen(false)} 
        pickerStyle={{ position: 'relative', bottom: '0', left: '0' }}
        previewConfig={{
          defaultEmoji: '1f60a', // defaults to: "1f60a"
          defaultCaption: 'hi', // defaults to: "What's your mood?"
          showPreview: false
        }}
      />
  </div>
      {/* </Box> */}
      {/* Input Container */}
      <InputContainer>
        <ActionButtons>
          <IconButton aria-label="emoji" style={{ padding: '10px 10px 10px 10px' }} onClick={handleEmojiClick} >
            <InsertEmoticonIcon />
          </IconButton>
          <IconButton aria-label="attachment" style={{ padding: '10px 10px 10px 10px' }} onClick={handleAttachmentClick} >
            <AttachmentIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElMenu}
            open={Boolean(anchorElMenu)}
            onClose={() => setAnchorElMenu(null)}
            style={{ width: '300px', height: 'auto', borderRadius: '5px' }}
          >
            <MenuItem onClick={() => handleMenuItemClick('image')}>Image & Video</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('audio')}>Audio</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('document')}>Document</MenuItem>
          </Menu>
          <input
            type="file"
            accept={acceptedFileTypes[selectedFileType]}
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileInputChange}
          />
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
