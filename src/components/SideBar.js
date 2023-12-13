import React from 'react';
import styled from 'styled-components';
import './SideBar.css';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

const Container = styled.div`
    
`

const SideBar = () => {
    return (
        <Container className='sidebar'>
            <IconButton aria-label="attachment" style={{ padding: '5px 5px 5px 5px' }} >
                <ChatRoundedIcon style={{ color: 'black' }} />
            </IconButton>
            <div>
                <IconButton aria-label="attachment" style={{ padding: '5px 5px 5px 5px' }} >
                    <SettingsIcon style={{ color: 'black' }} />
                </IconButton>
                <IconButton aria-label="attachment" style={{ padding: '5px 5px 5px 5px' }} >
                    <AccountCircleRoundedIcon style={{ color: 'black' }} />
                </IconButton>
            </div>
        </Container>
    )
}

export default SideBar
