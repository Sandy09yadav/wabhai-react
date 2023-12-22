import React from 'react'

const DiscardReturn = ({ onDiscard, onReturnToMedia }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
        }}>
            <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center', background: '#fff',
                padding: '20px',
                borderRadius: '5px'
            }}>
                <p>Do you want to discard or return to media?</p>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                    }}
                >
                    <button
                        onClick={onDiscard}
                    >
                        Discard
                    </button>
                    <button
                        onClick={onReturnToMedia}
                    >
                        Return to Media
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DiscardReturn
