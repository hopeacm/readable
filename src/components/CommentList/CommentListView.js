import React, { Component } from 'react';

import { connect } from 'react-redux';
import {
    loadCommentsAPI,
    upVoteCommentAPI,
    downVoteCommentAPI,
    openCommentModalAPI,
    deleteCommentAPI
} from '../../actions';
import { normalize } from '../../utils/helpers';
import CommentListJSX from './CommentListJSX';

// this.props.id
class CommentListView extends Component {
    componentDidMount () {
        this.syncCommentList();
    }

    state = {
        isSyncingComments: false,
	    sortByName: 'timestamp'
    };

    syncCommentList = () => {
        if (this.state.isSyncingComments) {
            return;
        }
        this.setState({ isSyncingComments: true });
        const done = () => {
            this.setState({ isSyncingComments: false });
        };
        const rejected = done;
        this.props.loadCommentsAPI(this.props.id, done, rejected);
    };

    sortByLatest = () => {
        this.setState({ sortByName: 'timestamp' });
    };

    sortByMostPopular = () => {
        this.setState({ sortByName: 'voteScore' });
    };

    upVote = (id) => {
        if (normalize(id).length === 0) {
            return;
        }
        this.props.upVoteCommentAPI(id);
    };

    downVote = (id) => {
        if (normalize(id).length === 0) {
            return;
        }
        this.props.downVoteCommentAPI(id);
    };

    addComment = () => {
        this.props.openCommentModalAPI(this.props.id);
    };

    editComment = (parentId, id) => {
        this.props.openCommentModalAPI(parentId, id);
    };

    deleteComment = (id) => {
        const parentId = normalize(this.props.id).length > 0 
            ? this.props.id
            : '';
        if (normalize(id).length === 0) {
            return;
        }
        this.props.deleteCommentAPI(parentId, id);
    };

    render() {
        const props = {
            isSyncingComments: this.state.isSyncingComments,
            sortByLatest: this.sortByLatest,
            sortByMostPopular: this.sortByMostPopular,
            addComment: this.addComment,
            syncCommentList: this.syncCommentList,
            sortByName: this.state.sortByName,
            comments: this.props.comments,
            upVote: this.upVote,
            downVote: this.downVote,
            editComment: this.editComment,
            deleteComment: this.deleteComment
        };
        return <CommentListJSX {...props} />;
    }
}

function mapStateToProps ({ postsState, commentsState }) {
    const myComments = commentsState
        ? Object.values(commentsState.comments)
        : [];
    return {
        comments: myComments && myComments.length > 0 ? myComments : []
    };
}

function mapDispatchToProps (dispatch) {
    return {
        loadCommentsAPI: (parentId, done, rejected) => {
            dispatch(loadCommentsAPI(parentId, done, rejected));
        },
        upVoteCommentAPI: (id, done, rejected) => {
            dispatch(upVoteCommentAPI(id, done, rejected));
        },
        downVoteCommentAPI: (id, done, rejected) => {
            dispatch(downVoteCommentAPI(id, done, rejected));
        },
        openCommentModalAPI: (parentId, id, done, rejected) => {
            dispatch(openCommentModalAPI(parentId, id, done, rejected));
        },
        deleteCommentAPI: (parentId, id, done, rejected) => {
            dispatch(deleteCommentAPI(parentId, id, done, rejected));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListView);