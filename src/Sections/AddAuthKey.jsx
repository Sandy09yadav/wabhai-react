import * as React from 'react';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import { useAuthKey } from '../components/AuthKeyProvider';
// import { Input } from '@mui/material';

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

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '7px',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    border: `1px solid #cdcdcd`,
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(0)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '22ch',
            '&:focus': {
                width: '22ch',
            },
        },
    },
}));

const AddAuthKey = ({ anchorEl, onClose, handleAuthKeyChange, isAuthKeyProvided, setAuthKeyProvided }) => {
    const { updateAuthKey } = useAuthKey();
    const [authKey, setauthKey] = useState('');

    const handleAuthKeyChangeInternal = async () => {
        console.log('handleAuthKeyChangeInternal called');
        await updateAuthKey(authKey);
        console.log('authKey before:', authKey);
        localStorage.setItem('authKey', authKey);
        console.log('authKey after:', authKey);
        await handleAuthKeyChange(authKey);
        onClose();
        if (authKey.length == 0) {

            setAuthKeyProvided(false)
        }
        console.log('handleAuthKeyChangeInternal finished');
    };

    const handleInputChange = (event) => {
        setauthKey(event.target.value);
    };

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
                <AddAuthKeyContainer>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ alignSelf: 'baseline', color: 'black' }}
                    >
                        New Auth Key
                    </Typography>
                    <Search>
                        <StyledInputBase
                            placeholder="Add New Key"
                            inputProps={{ 'aria-label': 'search' }}
                            value={authKey}
                            onChange={handleInputChange}
                        />
                    </Search>
                    <Button
                        variant="Add New Key"
                        onClick={handleAuthKeyChangeInternal}
                        style={{
                            justifyContent: 'flex-start',
                            maxWidth: 'fit-content',
                            boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 3px ',
                            margin: '2px'
                        }}>
                        Add Key
                    </Button>
                </AddAuthKeyContainer>
            </Container>
        </Popover>
    )
}

export default AddAuthKey
