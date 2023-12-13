import messages from '../messages.json';
import React from 'react'
import SentCard from '../ChatMessages/SentCard';
import RecievedCard from '../ChatMessages/RecievedCard';

const CardList = () => {
    return (
        <div>
            {messages.map((message, index) => {
                const { isMe, text, time } = message;
                return (
                    <React.Fragment key={index}>
                        {isMe ? (
                            <SentCard message={text} date={time} />
                        ) : (
                            <RecievedCard message={text} date={time} />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default CardList
