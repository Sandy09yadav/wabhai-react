import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import './SideBar.css';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import IconButton from '@mui/material/IconButton';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddAuthKey from '../Sections/AddAuthKey';
import AuthKeyProvider from './AuthKeyProvider';
// import AuthKey from '../AuthKey';

const Container = styled.div`
    
`

const SideBar = ({ handleAuthKeyChange,isAuthKeyProvided, setAuthKeyProvided }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleSettingsClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSettingsClose = () => {
        setAnchorEl(null);
    };
    return (
        <Container className='sidebar'>
            <IconButton aria-label="attachment" style={{ padding: '5px 5px 5px 5px' }} >
                <MessageOutlinedIcon style={{ color: '#a7a7a7' }} />
            </IconButton>
            <div>
                <IconButton aria-label="attachment" style={{ padding: '5px 5px 5px 5px' }} onClick={handleSettingsClick} >
                    <SettingsOutlinedIcon style={{ color: '#838383' }} />
                </IconButton>
                <IconButton aria-label="attachment" style={{ padding: '5px 5px 5px 5px' }} >
                    <AccountCircleRoundedIcon style={{ color: '#95959' }} />
                </IconButton>
                {/* <AuthKey></AuthKey> */}
            </div>

            {/* Settings Popover */}
            <AddAuthKey anchorEl={anchorEl} onClose={handleSettingsClose} handleAuthKeyChange={handleAuthKeyChange}  isAuthKeyProvided={isAuthKeyProvided} setAuthKeyProvided={setAuthKeyProvided} />
        </Container>
    )
}

export default SideBar
