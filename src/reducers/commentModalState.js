import {
    OPEN_COMMENT_MODAL,
    CLOSE_COMMENT_MODAL
} from '../actions';
import update from 'immutability-helper';

const initialCommentModalState = {
    isModalOpen: false,
    comment: {}
};

function commentModalState (state = initialCommentModalState, action) {
    const { comment } = action;

    switch (action.type) {
        case OPEN_COMMENT_MODAL:
            return update(state, { isModalOpen: {$set: true}, comment: {$set: comment} });

        case CLOSE_COMMENT_MODAL:
            return update(state, { isModalOpen: {$set: false}, comment: {$set: {}} });

        default:
            return state;
    }
}

export default commentModalState;