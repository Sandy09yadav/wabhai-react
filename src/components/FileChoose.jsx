import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import FileViewer from 'react-file-viewer';
import SendIcon from '@mui/icons-material/Send';
import DiscardReturn from '../Buttons/DiscardReturn';

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

const FilePreview = ({ file, onClose, handleMessageUpload, caption, setCaption, clearFilePreview }) => {

    const [showPopup, setShowPopup] = useState(false);

    const filePreviewRef = React.useRef(null);
    useEffect(() => {
        const handleClick = (event) => {
            // Check if the clicked element is inside the file preview box
            if (filePreviewRef.current && !filePreviewRef.current.contains(event.target)) {
                // If filePreview is true, set it to false when the user clicks outside the file preview box
                setShowPopup(true);
                console.log(showPopup, 'kya dikkat h')
            }
        };

        // Add a click event listener to the entire document
        document.addEventListener('click', handleClick);

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [filePreviewRef, showPopup]);

    const handleDiscard = () => {
        clearFilePreview();
        // onClose();
        console.log(showPopup, 'pop3 pop3 pop3')
        setShowPopup(false);
        console.log(showPopup, 'pop2 pop2 pop2')
    };

    const handleReturnToMedia = () => {
        setShowPopup(false);
        console.log(showPopup, 'pop pop pop')
    };

    // const handleClose = () => {
    //     clearFilePreview();
    //     onClose();
    // };

    const handleSendClick = () => {
        handleMessageUpload(file);
        onClose();
    };

    const filePreviewProps = {
        fileType: file.type,
        filePath: URL.createObjectURL(file),
        onError: (e) => console.error('Error while trying to preview the file', e),
    };



    return (
        <Box
            ref={filePreviewRef}
            sx={{
                position: 'relative',
                bottom: 0,
                // left: 10,
                width: '40vw',
                height: '50vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                zIndex: 9999,
            }}

        >
            {showPopup && (
                <DiscardReturn onDiscard={handleDiscard} onReturnToMedia={handleReturnToMedia} />
            )}
            <div
                style={{
                    alignSelf: 'flex-end',
                    fontSize: '20px',
                }}
            >
                {/* <CloseIcon style={{ color: '#636363', padding: '5px 5px 5px 5px' }} onClick={handleClose} /> */}
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
                    ) : file.type.startsWith('audio/') ? (
                        <audio controls style={{ width: '300px', height: '60px' }}>
                            <source src={URL.createObjectURL(file)} type={file.type} />
                            Your browser does not support the audio tag.
                        </audio>
                    ) : file.type.startsWith('application/pdf' || 'application/doc' || 'application/docx') ? (
                        <FileViewer {...filePreviewProps} />
                    ) : (
                        <p>Preview not available for this file type</p>
                    )}
                </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', }}>
                <InputField
                    placeholder="Type a caption(Optional)"
                    multiline
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    style={{ width: '33vw' }}
                />
                <SendButton aria-label="send" style={{ padding: '10px 10px 10px 10px' }} onClick={handleSendClick} >
                    <SendIcon />
                </SendButton>
            </div>
        </Box>
    );
};

export default FilePreview;