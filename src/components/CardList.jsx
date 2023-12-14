import messages from '../messages.json';
import React from 'react'
import SentCard from '../ChatMessages/SentCard';
import RecievedCard from '../ChatMessages/RecievedCard';

const CardList = () => {
    return (
        <div>
            {messages.map((data, index) => {
                const { isMe } = data;
                return (
                    <React.Fragment key={index}>
                        {isMe ? (
                            <SentCard message={data.text} date={data.time} image={data.image} video={data.video} />
                        ) : (
                            <RecievedCard message={data.text} date={data.time} image={data.image} video={data.video} />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default CardList
