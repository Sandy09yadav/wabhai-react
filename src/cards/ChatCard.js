import React from 'react';
import './ChatCard.css'
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const StyledCard = styled('div')(({ isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '0 6px 0 3px',
  transition: 'background-color 0.3s, border-radius 0.3s',
  borderRadius: '10px',
  backgroundColor: isActive ? '#d9d9d9' : 'transparent',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
  },
}));

const ProfileContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '8px',
});

const ProfileImage = styled(Avatar)({
  borderRadius: '50%',
  marginRight: '8px',
});

const ChatCard = ({ imageSrc, phoneNumber, otherText, date, onClick, isActive }) => {
  return (
    <div className='chatcard' onClick={onClick}>
      <StyledCard isActive={isActive}>
        <ProfileContainer>
          <ProfileImage src={imageSrc} alt="Profile Image" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              // variant="h10"
              noWrap
              component="div"
              sx={{ flexGrow: 1, alignSelf: 'flex-start', color: 'black', fontSize: '15px' }}
            >
              {phoneNumber}
            </Typography>
            <Typography sx={{ color: 'gray', fontSize: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {otherText}
            </Typography>
          </div>
        </ProfileContainer>
        <Typography sx={{ color: 'gray', fontSize: '14px' }}>
          {date}
        </Typography>
      </StyledCard>
    </div>
  )
}

export default ChatCard
