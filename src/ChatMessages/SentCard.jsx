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

const SentCard = ({ message, date, image, video }) => {
    const containerMaxWidth = image || video ? 'calc(25vw)' : 'calc(50vw)';

    return (
        <StyledContainer>
            <SentCardContainer style={{ maxWidth: containerMaxWidth }} >
                {image && <img src={image} alt="yoursentimage" style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px' }} />}
                {video && (
                    <video width="100%" controls style={{ maxWidth: '100%', borderRadius: '5px' }}>
                        <source src={video} type="video/mp4" />
                    </video>
                )}
                <CardContent style={{ fontSize: '15px' }}>{message}</CardContent>
                <div
                    style={{
                        position: 'absolute',
                        // bottom: '2px',
                        right: '10px',
                        display: 'flex',
                    }}
                >
                    <div style={{ fontSize: '13px', color: 'grey' }}>{date}</div>
                    <div style={{ marginLeft: '5px' }}>
                        <DoneAllOutlinedIcon style={{ fontSize: '20px', color: 'grey' }} />
                    </div>
                </div>
            </SentCardContainer>
        </StyledContainer >
    )
}

export default SentCard