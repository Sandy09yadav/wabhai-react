import React from 'react'
import { styled } from '@mui/material/styles';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';

const StyledContainer = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
    maxWidth: 'calc(100% - 15px)',
});

const SentCardContainer = styled('div')({
    // maxWidth: 'calc(75%)',
    margin: '15px 15px 5px 15px',
    borderRadius: '8px',
    backgroundColor: '#D9FDD3',
    padding: '5px 10px 20px 10px',
    position: 'relative',
});

const CardContent = styled('div')({
    maxWidth: '100%',
    overflowWrap: 'break-word',
});

const SentCard = ({ message, date, image, video, file }) => {
    console.log('Data in SentCard:', { message, date, image, video, file });
    const containerMaxWidth = image || video || (file && file.type.startsWith('image/')) || (file && file.type.startsWith('video/')) ? 'calc(25vw)' : 'calc(50vw)';
    // console.log(file.name, 'image is it?')
    const containerMinWidth = 'calc(4vw)';

    const renderMedia = () => {
        if (file) {
            if (file.type.startsWith('image/')) {
                return <img src={URL.createObjectURL(file)} alt="yoursentimage" style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px' }} />;
            } else if (file.type.startsWith('video/')) {
                return (
                    <video width="100%" controls style={{ maxWidth: '100%', borderRadius: '5px' }}>
                        <source src={URL.createObjectURL(file)} type={file.type} />
                    </video>
                );
            } else if (file.type.startsWith('audio/')) {
                // Handle audio file
                return (
                    <audio controls style={{ minWidth: '300px', borderRadius: '5px' }}>
                        <source src={URL.createObjectURL(file)} type={file.type} />
                    </audio>
                );
            } else if (file.type === 'application/pdf') {
                // Handle PDF document
                return (
                    <document >
                        <source src={URL.createObjectURL(file)} type={file.type} />
                    </document>
                );
            } else if (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                // Handle DOC and DOCX documents
                return (
                    <document >
                        <source src={URL.createObjectURL(file)} type={file.type} />
                    </document>
                );
            } else {
                console.log(file.name)
            }
        }

        return null;
    };

    return (
        <StyledContainer>
            <SentCardContainer style={{ maxWidth: containerMaxWidth, minWidth: containerMinWidth, }} >
                {renderMedia()}
                <CardContent style={{ fontSize: '15px' }}>{message}</CardContent>
                <div
                    style={{
                        position: 'absolute',
                        // bottom: '2px',
                        right: '10px',
                        display: 'flex',
                    }}
                >
                    <div style={{ fontSize: '12px', color: 'grey' }}>{date}</div>
                    <div style={{ marginLeft: '5px' }}>
                        <DoneAllOutlinedIcon style={{ fontSize: '16px', color: 'grey' }} />
                    </div>
                </div>
            </SentCardContainer>
        </StyledContainer >
    )
}

export default SentCard