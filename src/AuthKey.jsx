import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import './AuthKey.css';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useAuthKey } from './components/AuthKeyProvider';

const Container = styled('div')({
    padding: '16px',
});

const AddAuthKeyContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '18vw',
    // maxHeight: '40vh',
    overflow: 'auto',
    gap: '15px',
});

const AuthKey = ({ isAuthKeyProvided, setAuthKeyProvided }) => {
    const [authKey, setAuthKey] = useState('');
    const { updateAuthKey } = useAuthKey();

    const handleAuthKeyChange = (e) => {
        const newValue = e.target?.value || '';
        setAuthKey(newValue);
    };

    const handleAuthKeyChangeAuthKey = async () => {
        await updateAuthKey(authKey);
        localStorage.setItem('authKey', authKey);
        handleAuthKeyChange(authKey);
        if (authKey.length == 0) {

            setAuthKeyProvided(false)
        } else if (authKey.length > 0) {
            setAuthKeyProvided(true)
        }
        console.log(authKey, 'AuthKey ka console');
    };

    useEffect(() => {
        const storedAuthKey = localStorage.getItem('authKey');
        if (storedAuthKey) {
            setAuthKey(storedAuthKey);
        }
    }, []);

    return (
        <div>
            <div className="AuthKey-container">
                <div className="AuthKey-content">
                    <Container>
                        <AddAuthKeyContainer>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ alignSelf: 'baseline', color: 'black' }}
                            >
                                New Auth Key
                            </Typography>
                            <TextField
                                hiddenLabel
                                defaultValue="Enter Your Auth Key"
                                value={authKey}
                                onChange={handleAuthKeyChange}
                                style={{ border: 'none', }}
                            />
                            <Button
                                variant="Add New Chat"
                                onClick={handleAuthKeyChangeAuthKey}
                                style={{
                                    justifyContent: 'flex-start',
                                    maxWidth: 'fit-content',
                                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 3px ',
                                    margin: '2px',
                                    color: '#000',
                                }}>
                                Add Key
                            </Button>
                        </AddAuthKeyContainer>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default AuthKey;