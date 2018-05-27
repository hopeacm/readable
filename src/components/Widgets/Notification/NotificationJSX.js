import React from 'react';
import sortBy from 'sort-by';

import {
    capitalize
} from '../../../utils/helpers';
import './NotificationJSX.css';

const NotificationJSX = ({
    messages,       // props (array)
    deleteMessage,  // function (id)
}) => {
    return (
        <div className="message">
            { messages && messages.length > 0
                ?   <div className="message-list">
                        { messages.sort(sortBy('timestamp')).reverse().map(
                            message =>
                                <div
                                    key={message.id}
                                    className={`notification ${message.status}`}
                                    >
                                    <a
                                        className="delete"
                                        onClick={() => deleteMessage(message.id)}
                                        title="close message"
                                        >Close</a>
                                    { capitalize(message.body) }
                                </div>
                        )}
                    </div>
                : null
            } 
        </div>
    );
};

export default NotificationJSX;