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

const OverlayContainer = styled('div')({
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: '1000',
  pointerEvents: 'none',
});

const CenteredDiv = styled('div')({
  position: 'relative',
  // width: '52%',
  background: '#fff',
  padding: '20px',
  zIndex: '1001',
  pointerEvents: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});



const ChatScreen = ({ activeChat }) => {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [selectedFileType, setSelectedFileType] = useState('image');
  const [displayedFileType, setDisplayedFileType] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [message, setMessage] = useState('');
  const [caption, setCaption] = useState('');
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

  const isEmojiPickerOpenRef = React.useRef(null);
  useEffect(() => {
    const handleClick = (event) => {
      // Check if the clicked element is inside the file preview box
      if (isEmojiPickerOpenRef.current && !isEmojiPickerOpenRef.current.contains(event.target)) {
        // If isEmojiPickerOpen is true, set it to false when the user clicks outside the file preview box
        setIsEmojiPickerOpen(false);
      }
    };

    // Add a click event listener to the entire document
    document.addEventListener('click', handleClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isEmojiPickerOpen]);

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
    console.log(filePreview, 'file preview')
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
    const mimetype = file.type;
    const [fileType] = mimetype.split('/');

    setSelectedFile(file);
    setSelectedFileType(fileType);
    setFileChooseVisible(true);
    setFilePreview(file);
  };

  const clearFilePreview = () => {
    setSelectedFile(null);
    setFileChooseVisible(false);
    setFilePreview(null);
    // Add any additional state updates related to file clearing
  };

  const acceptedFileTypes = {
    image: 'image/*, video/*',
    audio: 'audio/*',
    document: '.pdf, .doc, .docx',
  };

  const handleMessageUpload = async (file) => {
    if ((message?.trim() !== '' || caption !== undefined) && (selectedFile || file)) {
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      console.log("yha s aja bhaiii", authKey);
      console.log("file ka nam aayega", file.name);

      console.log(selectedFile, "selectedFile before name")
      // const fileName = selectedFile.name || '';

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: selectedFile ? (caption !== undefined ? caption : '') : message, isMe: true, time: formattedTime, file: selectedFile },
      ]);

      setMessage('');
      setCaption('');
      clearFilePreview();

      var formdata = new FormData();
      formdata.append("apiAuthkey", authKey);
      formdata.append("receiverMobile", RECEIVER_MOBILE);

      formdata.append("msg", selectedFile ? caption : message);
      formdata.append("isMe", true);
      formdata.append("time", formattedTime);
      formdata.append("fileType", selectedFileType);
      console.log(selectedFile, "selectedFile after name")

      if (selectedFile) {
        formdata.append("file", selectedFile);
        formdata.append("mimeType", selectedFile ? selectedFile.type : '');
        formdata.append("fileName", file.Name);
        console.log(selectedFile, "selectedFile inside name")
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
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
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

      <Box sx={{ flexGrow: 1, overflowY: 'auto', position: 'relative' }}>

        <ChatContent>
          {/* Your chat content goes here */}
          <CardList messages={messages} selectedFile={selectedFile} />
        </ChatContent>
      </Box>
      {/* <div style={{ position: 'absolute', left: '30%', bottom: '30%', maxWidth: "52%" }}> */}
      {/* Display the file preview component */}
      {filePreview && (
        <OverlayContainer>
          <CenteredDiv>
            <FilePreview
              file={filePreview}
              onClose={() => setFilePreview(null)}
              handleMessageUpload={handleMessageUpload}
              clearFilePreview={clearFilePreview}
              caption={caption} setCaption={setCaption}
            // filePreviewRef={filePreviewRef}
            // handleReturnToMedia={handleReturnToMedia}
            // handleDiscard={handleDiscard} 
            />
          </CenteredDiv>
        </OverlayContainer>
      )}
      {/* </div> */}

      <div style={{ position: 'absolute', left: '0%', bottom: '6.6%', maxWidth: "52%" }}>
        {/* <OverlayContainer>
        <CenteredDiv> */}
        {/* <FileInput onFileChange={handleFileChange} /> */}
        <EmojiPicker
          onSelectEmoji={handleEmojiSelect}
          open={isEmojiPickerOpen}
          onClose={() => setIsEmojiPickerOpen(null)}
          pickerStyle={{ position: 'relative', bottom: '0', left: '0' }}
          isEmojiPickerOpenRef={isEmojiPickerOpenRef}
        />
      </div>
      {/* </CenteredDiv>
      </OverlayContainer> */}
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
          placeholder={'Type a message'}
          multiline
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SendButton aria-label="send" style={{ padding: '10px 10px 10px 10px' }} onClick={handleMessageUpload} >
          <SendIcon />
        </SendButton>
      </InputContainer>

    </Box >
  )
}

export default ChatScreen
