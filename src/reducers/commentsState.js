import {
    LOAD_COMMENTS,
    UPVOTE_COMMENT,
    DOWNVOTE_COMMENT,
    CREATEMODIFY_COMMENT,
    DELETE_COMMENT
} from '../actions';
import update from 'immutability-helper';
import { arrayToObject } from '../utils/helpers';

const initialCommentsState = {
    comments: {}
};

function commentsState(state = initialCommentsState, action) {
    const { comments, id, comment } = action;
    switch (action.type) {
        case LOAD_COMMENTS:
            return comments
                ? update(state, { comments: { $set: arrayToObject(comments, 'id') } })
                : state;

        case UPVOTE_COMMENT:
            if (!(id in state.comments)) {
                return state;
            }
            return update(state, { comments: { [id]: { voteScore: { $set: state.comments[id].voteScore + 1 } } } });

        case DOWNVOTE_COMMENT:
            if (!(id in state.comments)) {
                return state;
            }
            return update(state, { comments: { [id]: { voteScore: { $set: state.comments[id].voteScore - 1 } } } });

        case CREATEMODIFY_COMMENT:
            if (!comment) {
                return state;
            }
            return !(comment.id in state.comments)
                ? update(state, { comments: { $merge: arrayToObject([comment], 'id') } })
                : update(state, { comments: { [comment.id]: { $set: comment } } })

        case DELETE_COMMENT:
            if (!(id in state.comments)) {
                    return state;
                }
            return update(state, { comments: { $unset: [id] } });

        default:
            return state;
    }
}

export default commentsState;