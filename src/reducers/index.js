import { combineReducers } from 'redux';

import categoriesState from './categoriesState';
import messagesState from './messagesState';
import postsState from './postsState';
import commentsState from './commentsState';
import commentModalState from './commentModalState';

export default combineReducers({
    categoriesState,
    messagesState,
    postsState,
    commentsState,
    commentModalState
});