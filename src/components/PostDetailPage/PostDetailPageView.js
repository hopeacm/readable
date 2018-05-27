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
import { normalize } from '../../utils/helpers';
import PostDetailPageJSX from './PostDetailPageJSX';

// this.props.category
// this.props.id
class PostDetailPageView extends Component {    
    state = {
        isSyncingPost: false,
        toAddPost: false,
        toHomePage: false
    };

    syncPost = () => {
        if (this.state.isSyncingPost) {
            return;
        }
        this.setState({ isSyncingPost: true });
        const done = () => {
            this.setState({ isSyncingPost: false });
        };
        const rejected = done;
        this.props.loadPostsAPI(done, rejected);
    };

    editPost = () => {
        this.setState({ toAddPost: true });
    };

    deletePost = () => {
        const id = this.props.id;
        if (normalize(id).length > 0) {
            const done = (post) => {
                this.setState({
                    toHomePage: true
                });
            }
            this.props.deletePostAPI(id, done);
            return {
                type: null
            }
        }
        this.setState({
            toHomePage: true
        });  
    };

    upVote = () => {
        const id = this.props.id;
        if (normalize(id).length === 0) {
            return;
        }
        this.props.upVotePostAPI(id);
    };

    downVote = () => {
        const id = this.props.id;
        if (normalize(id).length === 0) {
            return;
        }
        this.props.downVotePostAPI(id);
    };

    addComment = () => {
        this.props.openCommentModalAPI(this.props.id);
    };

    render() {
        const category = this.props.category;
        const id = this.props.id;
        const postsObject = this.props.postsObject;
        const props = {
            isSyncingPost: this.state.isSyncingPost,
            addComment: this.addComment,
            editPost: this.editPost,
            syncPost: this.syncPost,
            deletePost: this.deletePost,
            post: id && (id in postsObject)
                    && normalize(category).length > 0
                    && postsObject[id].category === category
                ? this.props.postsObject[id]
                : null,
            upVote: this.upVote,
            downVote: this.downVote
        };
        return (
            <div className="HigherPostDetailPage">
                { this.state.toHomePage
                    ? <Redirect push to="/" />
                    : null
                }
                { this.state.toAddPost && normalize(id).length > 0
                    ? <Redirect push to={`/${category}/${id}/edit`} />
                    : null
                }
                <PostDetailPageJSX {...props} />
            </div>
        );
    }
}

function mapStateToProps ({ postsState, commentsState }) {
    const myPostsObject = postsState
        ? postsState.posts
        : {};
    return {
        postsObject: myPostsObject,
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

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailPageView);