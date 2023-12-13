import React from 'react'
import { styled } from '@mui/material/styles';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';

const StyledContainer = styled('div')({
    display: 'flex',
    justifyContent: 'flex-start',
    maxWidth: 'calc(100% - 45px)',
});

const SentCard = () => {
    return (
        <StyledContainer >
            <div
                style={{
                    maxWidth: 'calc(100% - 45px)',
                    margin: '0 15px 5px 15px',
                    borderRadius: '8px',
                    backgroundColor: 'lightgreen',
                    padding: '5px 10px 20px 10px',
                    position: 'relative',
                }}
            >
                <div style={{ fontSize: '16px' }}>asdhghgsd</div>
                <div
                    style={{
                        position: 'absolute',
                        bottom: '2px',
                        right: '10px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ fontSize: '13px', color: 'white' }}>12/12/12</div>
                    <div style={{ marginLeft: '5px' }}>
                        <KeyboardDoubleArrowRightRoundedIcon style={{ fontSize: '20px', color: 'black' }} />
                    </div>
                </div>
            </div>
        </StyledContainer >
    )
}

export default SentCard