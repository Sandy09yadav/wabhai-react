// import messages from '../messages.json';
import React from 'react'
import SentCard from '../ChatMessages/SentCard';
import RecievedCard from '../ChatMessages/RecievedCard';

const CardList = ({ messages, selectedFile }) => {
    console.log(messages,'message m kya hai bhai')
    return (
        <div>
            {messages.map((data, index) => {
                const { isMe, text, time, image, video, file } = data;
                return (
                    <React.Fragment key={index}>
                        {isMe ? (
                            <SentCard message={text} date={time} image={image} video={video} file={file} />
                        ) : (
                            <RecievedCard message={text} date={time} image={image} video={video} file={file} />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default CardList
