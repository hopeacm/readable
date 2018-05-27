import {
    INSERT_MESSAGE,
    DELETE_MESSAGE
} from '../actions';
import update from 'immutability-helper';
import { getUUID32, normalize, arrayToObject } from '../utils/helpers';

const initialMessagesState = {
    messages: {}
};

function messagesState (state = initialMessagesState, action) {
    const { message, id } = action;

    switch (action.type) {
        case INSERT_MESSAGE:
            const messageBody = normalize(message.body);
            if (messageBody.length === 0) {
                return state;
            }
            const myMessage = {
                id: (message.id ? message.id : getUUID32()),
                timestamp: (message.timestamp ? message.timestamp : Date.now()),
                status: (message.status ? message.status : ''),
                body: messageBody
            };
            return update(state, { messages: {$merge: arrayToObject([myMessage], 'id')} });

        case DELETE_MESSAGE:
            if (!(id in state.messages)) {
                return state;
            }
            return update(state, { messages: {$unset: [id]} });

        default:
            return state;
    }
}

export default messagesState;