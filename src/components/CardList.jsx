// import messages from '../messages.json';
import React from 'react'
import SentCard from '../ChatMessages/SentCard';
import RecievedCard from '../ChatMessages/RecievedCard';

const CardList = ({messages}) => {
    return (
        <div>
            {messages.map((data, index) => {
                const { isMe, text, time, image, video } = data;
                return (
                    <React.Fragment key={index}>
                        {isMe ? (
                            <SentCard message={text} date={time} image={image} video={video} />
                        ) : (
                            <RecievedCard message={text} date={time} image={image} video={video} />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default CardList
