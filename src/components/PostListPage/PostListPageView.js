import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import {
    loadPostsAPI,
    deletePostAPI,
    upVotePostAPI,
    downVotePostAPI,
    openCommentModalAPI
} from '../../actions';
import {
    normalize
} from '../../utils/helpers';
import PostListPageJSX from './PostListPageJSX';

// this.props.category
class PostListPageView extends Component {
    state = {
        isSyncingList: false,
        redirect: '',
        sortByName: 'timestamp'
    };

    syncPostList = () => {
        if (this.state.isSyncingList) {
            return;
        }
        this.setState({ isSyncingList: true });
        const done = () => {
            this.setState({ isSyncingList: false });
        };
        const rejected = done;
        this.props.loadPostsAPI(done, rejected);
    };

    addPost = () => {
        ;
    };

    sortByLatest = () => {
        this.setState({ sortByName: 'timestamp' });
    };

    sortByMostPopular = () => {
        this.setState({ sortByName: 'voteScore' });
    };

    deletePost = (id) => {
        this.props.deletePostAPI(id);
    };

    upVote = (id) => {
        this.props.upVotePostAPI(id);
    };

    downVote = (id) => {
        this.props.downVotePostAPI(id);
    };

    addComment = (id) => {
        const parentId = id;
        this.props.openCommentModalAPI(parentId);
    }

    render() {
        const props = {
            isSyncingList: this.state.isSyncingList,
            sortByLatest: this.sortByLatest,
            sortByMostPopular: this.sortByMostPopular,
            addPost: this.addPost,
            syncPostList: this.syncPostList,
            sortByName: this.state.sortByName,
            posts: this.props.posts.filter(post => {
                if(normalize(this.props.category).length === 0) {
                    return !post.deleted;
                }
                return !post.deleted && post.category === this.props.category;
            }),
            categoriesObject: this.props.categoriesObject,
            deletePost: this.deletePost,
            upVote: this.upVote,
            addComment: this.addComment,
            downVote: this.downVote,
        };
        return (
            <div className="HigherPostList">
                { normalize(this.state.redirect).length > 0
                    ? <Redirect push to={this.state.redirect} />
                    : null
                }
                <PostListPageJSX {...props} />
            </div>
        );
    }
}

function mapStateToProps ({ postsState, categoriesState, commentsState }) {
    const myPosts = postsState
        ? Object.values(postsState.posts)
        : [];
    const myCategoriesObject = categoriesState
        ? categoriesState.categories
        : {};
    return {
        posts: myPosts && myPosts.length > 0 ? myPosts : [],
        categoriesObject: myCategoriesObject
    };
}

function mapDispatchToProps (dispatch) {
    return {
        loadPostsAPI: (done, rejected) => {
            dispatch(loadPostsAPI(done, rejected));
        },
        deletePostAPI: (id, done, rejected) => {
            dispatch(deletePostAPI(id, done, rejected));
        },
        upVotePostAPI: (id, done, rejected) => {
            dispatch(upVotePostAPI(id, done, rejected));
        },
        downVotePostAPI: (id, done, rejected) => {
            dispatch(downVotePostAPI(id, done, rejected));
        },
        openCommentModalAPI: (parentId, id, done, rejected) => {
            dispatch(openCommentModalAPI(parentId, id, done, rejected));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListPageView);