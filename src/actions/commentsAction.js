import {
    getComments as getCommentsN,
    voteComment as voteCommentN,
    createModifyComment as createModifyCommentN,
    deleteComment as deleteCommentN
} from '../utils/ReadableAPI';
import { insertErrorMessage } from './messagesAction';
import { upCommentPost, downCommentPost } from './postsAction';
import {
    normalize,
    emptyFunction
} from "../utils/helpers";

export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const CREATEMODIFY_COMMENT = 'CREATEMODIFY_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export function loadComments (comments) {
    return {
        type: LOAD_COMMENTS,
        comments
    };
}

export function loadCommentsAPI (
    parentId, done=emptyFunction, rejected=emptyFunction
) {
    parentId = normalize(parentId).length > 0 ? parentId : null;
    return (dispatch, getState) => {
        getCommentsN({ parentId })
            .then(comments => {
                const myComments = comments.filter(comment => 
                    !comment.deleted && !comment.parentDeleted);
                dispatch(loadComments(myComments));
                done(myComments);
            })
            .catch(error => {
                dispatch(insertErrorMessage('Cannot load comments', error));
                rejected(error);
            });
    };
}

export function upVoteComment (id) {
    return {
        type: UPVOTE_COMMENT,
        id
    };
}

export function upVoteCommentAPI (
    id, done=emptyFunction, rejected=emptyFunction
) {
    return (dispatch, getState) => {
        voteCommentN(id, true)
            .then(comment => {
                dispatch(upVoteComment(comment.id));
                done(comment);
            })
            .catch(error => {
                dispatch(insertErrorMessage('Cannot like comment', error));
                rejected(error);
            });
    };
}

export function downVoteComment (id) {
    return {
        type: DOWNVOTE_COMMENT,
        id
    };
}

export function downVoteCommentAPI (
    id, done=emptyFunction, rejected=emptyFunction
) {
    return (dispatch, getState) => {
        voteCommentN(id, false)
            .then(comment => {
                dispatch(downVoteComment(comment.id));
                done(comment);
            })
            .catch(error => {
                dispatch(insertErrorMessage('Cannot dislike comment', error));
                rejected(error);
            });
    };
}

export function createModifyComment (comment) {
    return {
        type: CREATEMODIFY_COMMENT,
        comment
    }
}

export function createModifyCommentAPI (
    comment, done=emptyFunction, rejected=emptyFunction
) {
    return (dispatch, getState) => {
        createModifyCommentN(comment)
            .then(comment => {
                dispatch(createModifyComment(comment));
                dispatch(upCommentPost(comment.parentId));
                done(comment);
            })
            .catch(error => {
                dispatch(insertErrorMessage('Cannot push comment', error));
                rejected(error);
            });
    };
}

export function deleteComment (id) {
    return {
        type: DELETE_COMMENT,
        id
    };
}

export function deleteCommentAPI (
    parentId, id, done=emptyFunction, rejected=emptyFunction
) {
    return (dispatch, getState) => {
        deleteCommentN(id)
            .then(comment => {
                dispatch(deleteComment(id));
                dispatch(downCommentPost(comment.parentId));
                done(comment);
            })
            .catch(error => {
                dispatch(insertErrorMessage('Cannot delete comment', error));
                rejected(error);
            });
    };
}