import React, { Component } from 'react';
import update from 'immutability-helper';

import { connect } from 'react-redux';
import {
    openCommentModalAPI,
    closeCommentModal,
    deleteCommentAPI,
    createModifyCommentAPI
} from '../../actions';
import {
    getUUID32,
    arrayToObject,
    normalize
} from '../../utils/helpers';
import CommentModalJSX from './CommentModalJSX';

class CommentModalView extends Component {
    static getDerivedStateFromProps (nextProps, prevState) {
        if (normalize(prevState.parentId).length > 0 &&
            (!nextProps || !nextProps.comment ||
                normalize(nextProps.comment.parentId).length === 0)
        ){
            return {
                parentId: '',
                id: '',
                disabledAuthor: false,
                isFirstTimeAuthor: true,
                isValidAuthor: false,
                author: '',
                isFirstTimeBody: true,
                isValidBody: false,
                body: '',
                messagesObject: {}
            };
        }
        if (normalize(prevState.parentId).length > 0) {
            return null;
        }
        if (!nextProps || !nextProps.comment ||
            normalize(nextProps.comment.parentId).length === 0
        ) {
            return null;
        }
        const parentId = nextProps.comment.parentId;
        const id = normalize(nextProps.comment.id).length > 0 
            ? nextProps.comment.id
            : '';    
        const commentAuthor = normalize(nextProps.comment.author);
        const commentBody = normalize(nextProps.comment.body);
        return {
            parentId,
            id,
            disabledAuthor: commentAuthor.length > 0,
            isFirstTimeAuthor: commentAuthor.length === 0,
            isValidAuthor: commentAuthor.length > 0,
            author: commentAuthor,
            isFirstTimeBody: commentBody.length === 0,
            isValidBody: commentBody.length > 0,
            body: commentBody
        };
    }

    commentModalCloseState = {
        parentId: '',
        id: '',
        disabledAuthor: false,
        isFirstTimeAuthor: true,
        isValidAuthor: false,
        author: '',
        isFirstTimeBody: true,
        isValidBody: false,
        body: '',
        messagesObject: {}
    };

    state = {
        isSyncingComment: false,
        ...this.commentModalCloseState
    };

    deleteMessage = (id) => {
        if (!(id in this.state.messagesObject)) {
            return;
        }
        this.setState((prevState) =>
            update(prevState, { messagesObject: {$unset: [id]} })
        );
    };

    displayError = (errorTitle, error) => {
        const myMessage = {
            id: getUUID32(),
            timestamp: Date.now(),
            status: 'is-danger',
            body: `**${errorTitle}** : `
                + (error.length !== 0 ? error : 'Unexpected error!')
        };
        this.setState((prevState) => 
            update(prevState, { messagesObject: {$merge: arrayToObject([myMessage], 'id')} })
        );
    };

    syncComment = () => {
        if (this.state.isSyncingComment) {
            return;
        }
        const parentId = this.state.parentId;
        const id = this.state.id;
        if (normalize(parentId).length === 0 ||
            normalize(id).length === 0
        ) {
            return;
        }
        this.setState({ isSyncingComment: true });
        const done = (comment) => {
            if (!('id' in comment)) {
                this.setState({
                    isSyncingComment: false,
                    ...this.commentModalCloseState
                });
                return {
                    type: null
                };
            }
            const commentAuthor = normalize(comment.author);
            const commentBody = normalize(comment.body);
            this.setState({
                isSyncingComment: false,
                ...this.commentModalCloseState,
                disabledAuthor: commentAuthor.length > 0,
                isFirstTimeAuthor: commentAuthor.length === 0,
                isValidAuthor: commentAuthor.length > 0,
                author: commentAuthor,
                isFirstTimeBody: commentBody.length === 0,
                isValidBody: commentBody.length > 0,
                body: commentBody
            });
        };
        const rejected = (error) => {
            this.displayError(error, 'Cannot sync comment');
            this.setState({
                isSyncingComment: false
            });
        };
        this.props.openCommentModalAPI(parentId, id, done, rejected);
    };

    deleteComment = () => {
        const parentId = this.state.parentId;
        const id = this.state.id;
        if (normalize(id).length === 0) {
            return;
        }
        const done = (comment) => {
            if (!comment || !comment.id) {
                if(normalize(parentId).length === 0) {
                    return {
                        type: null
                    };
                }
                this.closeModal();
                return {
                    type: null
                };
            }
            this.closeModal();
        };
        const rejected = error => this.displayError(error, 'Cannot delete comment');
        this.props.deleteCommentAPI(parentId, id, done, rejected)
    };

    changeAuthor = (event) => {
        if (this.state.disabledAuthor) {
            return;
        }
        this.setState({
            isFirstTimeAuthor: false,
            isValidAuthor: normalize(event.target.value).length !== 0,
            author: event.target.value
        });
    };

    changeBody = (event) => {
        this.setState({
            isFirstTimeBody: false,
            isValidBody: normalize(event.target.value).length !== 0,
            body: event.target.value
        });
    };

    clearComment = () => {
        if (this.state.disabledAuthor) {
            this.setState({
                isFirstTimeBody: true,
                isValidBody: false,
                body: '',
                messagesObject: {}
            });
            return;
        };
        this.setState({
            disabledAuthor: false,
            isFirstTimeAuthor: true,
            isValidAuthor: false,
            author: '',
            isFirstTimeBody: true,
            isValidBody: false,
            body: '',
            messagesObject: {}
        });
    };

    submitComment = () => {
        const parentId = this.state.parentId;
        const id = this.state.id;
        const author = normalize(this.state.author);
        const body = normalize(this.state.body);
        if (normalize(parentId).length === 0 ||
            !this.state.isValidAuthor ||
            !this.state.isValidBody
        ) {
            this.setState({
                isFirstTimeAuthor: false,
                isFirstTimeBody: false
            });
            return;
        }
        const comment = {
            parentId,
            id: normalize(id).length > 0
                ? id
                : null,
            body,
            author
        };
        const done = (comment) => {
            this.closeModal();
        };
        const rejected = error => this.displayError(error, 'Cannot push comment');
        this.props.createModifyCommentAPI(comment, done, rejected); 
    };

    closeModal = () => {
        this.props.closeCommentModal();
    };

    render() {
        const props = {
            isModalOpen: this.props.isModalOpen,
            messages: Object.values(this.state.messagesObject),
            deleteMessage: this.deleteMessage,
            id: this.state.id,
            isSyncingComment: this.state.isSyncingComment,
            syncComment: this.syncComment,
            deleteComment: this.deleteComment,
            disabledAuthor: this.state.disabledAuthor,
            isFirstTimeAuthor: this.state.isFirstTimeAuthor,
            isValidAuthor: this.state.isValidAuthor,
            author: this.state.author,
            changeAuthor: this.changeAuthor,
            isFirstTimeBody: this.state.isFirstTimeBody,
            isValidBody: this.state.isValidBody,
            body: this.state.body,
            changeBody: this.changeBody,
            submitComment: this.submitComment,
            clearComment: this.clearComment,
            closeModal: this.closeModal
        };
        return (   
            <CommentModalJSX {...props} />
        );
    }
}

function mapStateToProps ({ commentModalState }) {
    const myIsModalOpen = commentModalState
        ? commentModalState.isModalOpen
        : false;
    const myComment = commentModalState
        ? commentModalState.comment
        : {};
    return {
        isModalOpen: myIsModalOpen,
        comment: myComment
    };
}

function mapDispatchToProps (dispatch) {
    return {
        openCommentModalAPI: (parentId, id, done, rejected) => {
            dispatch(openCommentModalAPI(parentId, id, done, rejected));
        },
        closeCommentModal: () => {
            dispatch(closeCommentModal());
        },
        deleteCommentAPI: (parentId, id, done, rejected) => {
            dispatch(deleteCommentAPI(parentId, id, done, rejected));
        },
        createModifyCommentAPI: (comment, done, rejected) => {
            dispatch(createModifyCommentAPI(comment, done, rejected));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentModalView);