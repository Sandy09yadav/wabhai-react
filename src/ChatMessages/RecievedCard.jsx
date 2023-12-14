import React from 'react'
import { styled } from '@mui/material/styles';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';

const StyledContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  maxWidth: 'calc(100% - 45px)',
});

const RecievedCardContainer = styled('div')({
  // maxWidth: 'calc(75%)',
  margin: '15px 15px 5px 15px',
  borderRadius: '8px',
  backgroundColor: '#f1f1f1',
  padding: '5px 10px 20px 10px',
  position: 'relative',
});

const CardContent = styled('div')({
  maxWidth: '100%',
  overflowWrap: 'break-word',
});

const RecievedCard = ({ message, date, image, video }) => {
  const containerMaxWidth = image || video ? 'calc(25vw)' : 'calc(50vw)';

  return (
    <StyledContainer >
      <RecievedCardContainer
        style={{ maxWidth: containerMaxWidth }}
      >
        {image && <img src={image} alt="yoursentimage" style={{ width: '100%', height: 'auto', borderRadius: '5px' }} />}
        {video && (
          <video width="100%" controls style={{ borderRadius: '5px' }}>
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
      </RecievedCardContainer>
    </StyledContainer >
  )
}

export default RecievedCard
