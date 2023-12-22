import React, { useState } from 'react';
import Picker from 'emoji-picker-react';


const EmojiPicker = ({ onSelectEmoji, open, onClose, isEmojiPickerOpenRef }) => {
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        onSelectEmoji(emojiObject.emoji);
        onClose();
    };

    return (
        <>
            {open && (
                < Picker
                    ref={isEmojiPickerOpenRef}
                    onEmojiClick={onEmojiClick}
                    pickerStyle={{ position: 'absolute', bottom: '48px', left: '0', height: 'auto', }}
                />
            )}
        </>
    )
}

export default EmojiPicker


