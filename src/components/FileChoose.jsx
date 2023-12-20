import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const InputField = styled(InputBase)({
    flex: 1,
    marginRight: '8px',
    // border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '4px 8px',
});

const SendButton = styled(IconButton)({
    marginLeft: '8px',
});

const FilePreview = ({ file, onClose, handleMessageUpload, message,setMessage,filePreviewRef }) => {

    const handleClose = () => {
        // You can perform any cleanup or additional actions here
        onClose();
    };

    const handleSendClick = () => {
        // Call the provided handleMessageUpload function with the current state values
        handleMessageUpload(file);
        // You can perform ny cleanup or additional actions here
        onClose();
    };

    return (
        <Box
        ref={filePreviewRef}
            sx={{
                position: 'relative',
                bottom: 0,
                left: 10,
                width: '60%',
                height: '60%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                zIndex: 9999,
            }}
            
        >
            <div
                style={{
                    alignSelf: 'flex-end',
                    fontSize: '20px',
                }}
            >
                <CloseIcon style={{ color: '#636363', padding: '5px 5px 5px 5px' }} onClick={handleClose} />
            </div>
            {file && (
                <div>
                    {file.type.startsWith('image/') ? (
                        <img src={URL.createObjectURL(file)} alt="File Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    ) : file.type.startsWith('video/') ? (
                        <video controls style={{ maxWidth: '100%', maxHeight: '100%' }}>
                            <source src={URL.createObjectURL(file)} type={file.type} />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <p>Preview not available for this file type</p>
                    )}
                </div>
            )}
            <div>
                <InputField
                    placeholder="Type a message"
                    multiline
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <SendButton aria-label="send" style={{ padding: '10px 10px 10px 10px' }} onClick={handleSendClick} >
                    <SendIcon />
                </SendButton>
            </div>
        </Box>
    );
};

export default FilePreview;