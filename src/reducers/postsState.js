import {
    LOAD_POSTS,
    UPVOTE_POST,
    DOWNVOTE_POST,
    UPCOMMENT_POST,
    DOWNCOMMENT_POST,
    CREATEMODIFY_POST,
    DELETE_POST
} from '../actions';
import update from 'immutability-helper';
import { arrayToObject } from '../utils/helpers';

const initialPostsState = {
    posts: {}
};

function postsState(state = initialPostsState, action) {
    const { posts, id, post } = action;
    switch (action.type) {
        case LOAD_POSTS:
            return posts
                ? update(state, { posts: { $set: arrayToObject(posts, 'id') } })
                : state;

        case UPVOTE_POST:
            if (!(id in state.posts)) {
                return state;
            }
            return update(state, { posts: { [id]: { voteScore: { $set: state.posts[id].voteScore + 1 } } } });

        case DOWNVOTE_POST:
            if (!(id in state.posts)) {
                return state;
            }
            return update(state, { posts: { [id]: { voteScore: { $set: state.posts[id].voteScore - 1 } } } });

        case UPCOMMENT_POST:
            if (!(id in state.posts)) {
                return state;
            }
            return update(state, { posts: { [id]: { commentCount: { $set: state.posts[id].commentCount + 1 } } } });

        case DOWNCOMMENT_POST:
            if (!(id in state.posts)) {
                return state;
            }
            return update(state, { posts: { [id]: { commentCount: { $set: state.posts[id].commentCount - 1 } } } });

        case CREATEMODIFY_POST:
            if (!post) {
                return state;
            }
            return !(post.id in state.posts)
                ? update(state, { posts: { $merge: arrayToObject([post], 'id') } })
                : update(state, { posts: { [post.id]: { $set: post } } })

        case DELETE_POST:
            if (!(id in state.posts)) {
                    return state;
                }
            return update(state, { posts: { $unset: [id] } });

        default:
            return state;
    }
}

export default postsState;