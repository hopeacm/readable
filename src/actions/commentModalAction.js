import {
    getComments as getCommentsN
} from '../utils/ReadableAPI';
import { insertErrorMessage } from './messagesAction';
import { normalize, emptyFunction } from "../utils/helpers";

export const OPEN_COMMENT_MODAL = 'OPEN_COMMENT_MODAL';
export const CLOSE_COMMENT_MODAL = 'CLOSE_COMMENT_MODAL';

export function openCommentModal (comment) {
    return {
        type: OPEN_COMMENT_MODAL,
        comment
    };
}

export function openCommentModalAPI (
    parentId, id, done=emptyFunction, rejected=emptyFunction
) {
    if (normalize(parentId).length === 0 ||
        normalize(id).length === 0
    ){
        return {
            type: OPEN_COMMENT_MODAL,
            comment: { parentId }
        };
     }
     return (dispatch, getState) => {
        getCommentsN({ parentId, id })
            .then(comments => {
                const myComments = comments.filter(comment => 
                    !comment.deleted && !comment.parentDeleted);
                const myComment = myComments && myComments.length > 0
                    ? myComments[0]
                    : { parentId };
                dispatch(openCommentModal(myComment));
                done(myComment);
            })
            .catch(error => {
                dispatch(insertErrorMessage('Cannot load comment', error));
                dispatch(openCommentModal({ parentId }));
                rejected(error);
            });
    };
}

export function closeCommentModal () {
    return {
        type: CLOSE_COMMENT_MODAL
    };
}