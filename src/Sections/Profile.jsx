import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';

const Container = styled('div')({
    padding: '16px',
});

const ProfileContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '18vw',
    // maxHeight: '40vh',
    overflow: 'auto',
});

const ProfileImage = styled(Avatar)({
    borderRadius: '50%',
    width: '100px',
    height: '100px',
});

const Profile = ({ anchorEl, onClose, activeChat }) => {
    return (
        <Popover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <Container>
                <ProfileContainer>
                    <ProfileImage src={activeChat?.imageSrc} alt="Profile Image" />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ alignSelf: 'auto', color: 'black' }}
                    >
                        {activeChat?.phoneNumber}
                    </Typography>
                    <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'baseline', marginTop: '15px', gap: '5px', }}>
                        <Typography
                            variant="h9"
                            noWrap
                            component="div"
                            sx={{ alignSelf: 'baseline', color: 'grey' }}
                        >
                            About
                        </Typography>
                        <Typography
                            variant="h7"
                            noWrap
                            component="div"
                            sx={{ alignSelf: 'baseline', color: 'black' }}
                        >
                            Hi, There I'm Using WaBhai
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'baseline', marginTop: '15px', gap: '5px', }}>
                        <Typography
                            variant="h9"
                            noWrap
                            component="div"
                            sx={{ alignSelf: 'baseline', color: 'grey' }}
                        >
                            Phone Number
                        </Typography>
                        <Typography
                            variant="h7"
                            noWrap
                            component="div"
                            sx={{ alignSelf: 'baseline', color: 'black' }}
                        >
                            +69 9876543210
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'baseline', marginTop: '15px', gap: '5px', }}>
                        <Typography
                            variant="h9"
                            noWrap
                            component="div"
                            sx={{ alignSelf: 'baseline', color: 'grey' }}
                        >
                            Disappearing Message
                        </Typography>
                        <Typography
                            variant="h7"
                            noWrap
                            component="div"
                            sx={{ alignSelf: 'baseline', color: 'black' }}
                        >
                            Off
                        </Typography>
                    </div>
                </ProfileContainer>
            </Container>
        </Popover>
    )
}

export default Profile
