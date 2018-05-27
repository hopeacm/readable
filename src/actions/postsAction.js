import {
    getPosts as getPostsN,
    votePost as votePostN,
    createModifyPost as createModifyPostN,
    deletePost as deletePostN
} from '../utils/ReadableAPI';
import { insertErrorMessage } from './messagesAction';
import { emptyFunction } from "../utils/helpers";

export const LOAD_POSTS = 'LOAD_POSTS';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const UPCOMMENT_POST = 'UPCOMMENT_POST';
export const DOWNCOMMENT_POST = 'DOWNCOMMENT_POST';
export const CREATEMODIFY_POST = 'CREATEMODIFY_POST';
export const DELETE_POST = 'DELETE_POST';

export function loadPosts (posts) {
    return {
        type: LOAD_POSTS,
        posts
    };
}

export function loadPostsAPI (
    done=emptyFunction, rejected=emptyFunction
) {
    return (dispatch, getState) => {
        getPostsN({})
            .then(posts => {
                const myPosts = posts.filter(post => !post.deleted);
                dispatch(loadPosts(myPosts));
                done(myPosts);
            })
            .catch(error => {
                dispatch(insertErrorMessage('Cannot load posts', error));
                rejected(error);
            });
    };
}

export function upVotePost (id) {
    return {
        type: UPVOTE_POST,
        id
    };
}

export function upVotePostAPI (
    id, done=emptyFunction, rejected=emptyFunction
) {
    return (dispatch, getState) => {
        votePostN(id, true)
            .then(post => {
                dispatch(upVotePost(post.id));
                done(post);
            })
            .catch(error => {
                dispatch(insertErrorMessage('Cannot like post', error));
                rejected(error);
            });
    };
}

export function downVotePost (id) {
    return {
        type: DOWNVOTE_POST,
        id
    };
}

export function downVotePostAPI (
    id, done=emptyFunction, rejected=emptyFunction
) {
    return (dispatch, getState) => {
        votePostN(id, false)
            .then(post => {
                dispatch(downVotePost(post.id));
                done(post);
            })
            .catch(error => {
                dispatch(insertErrorMessage('Cannot dislike post', error));
                rejected(error);
            });
    };
}

export function upCommentPost (id) {
    return {
        type: UPCOMMENT_POST,
        id
    };
}

export function downCommentPost (id) {
    return {
        type: DOWNCOMMENT_POST,
        id
    };
}

export function createModifyPost (post) {
    return {
        type: CREATEMODIFY_POST,
        post
    }
}

export function createModifyPostAPI (
    post, done=emptyFunction, rejected=emptyFunction
) {
    return (dispatch, getState) => {
        createModifyPostN(post)
            .then(post => {
                dispatch(createModifyPost(post));
                done(post);
            })
            .catch(error => {
                dispatch(insertErrorMessage('Cannot push post', error));
                rejected(error);
            });
    };
}

export function deletePost (id) {
    return {
        type: DELETE_POST,
        id
    };
}

export function deletePostAPI (
    id, done=emptyFunction, rejected=emptyFunction
) {
    return (dispatch, getState) => {
        deletePostN(id)
            .then(post => {
                dispatch(deletePost(id));
                done(post);
            })
            .catch(error => {
                dispatch(insertErrorMessage('Cannot delete post', error));
                rejected(error);
            });
    };
}