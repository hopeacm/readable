import React from 'react';
import sortBy from 'sort-by';

import { extractCommentProperties } from '../../utils/helpers';
import ListControllerJSX from '../Widgets/ListController/ListControllerJSX';
import './CommentListJSX.css';

const CommentListControllerJSX = (
    isSyncingComments,
    sortByLatest,
    sortByMostPopular,
    addComment,
    syncCommentList
) => {
    const props = {
        isSyncingList: isSyncingComments,
        listNameNames: ['comment', 'comments'],
        sortByLatest,
        sortByMostPopular,
        addItem: addComment,
        syncList: syncCommentList
    }
    return ListControllerJSX(props);
}

const commentJSX = (
    key,
    comment,
    upVote,
    downVote,
    editComment,
    deleteComment
) => {
    const {
        timestamp,
        body,
        author,
        voteScoreIcon,
        voteScoreText
    } = extractCommentProperties(comment);
    return (
        <div key={key} className="comment">
            <div className="comment-body">
                <q className="is-inline-block">{body}</q>
                <div className="dropdown is-right is-hoverable">
                    <div className="dropdown-trigger">
                        <span
                            className="action has-text-link"
                            title="select action"
                            >Action
                        </span> 
                    </div>
                    <div className="dropdown-menu" role="menu">
                        <div className="dropdown-content has-text-left">
                            <a
                                className="dropdown-item has-text-dark"
                                onClick={upVote}
                                title="like"
                                >
                                <span className="icon">
                                    <i className='fas fa-thumbs-up'></i>
                                </span>
                                Like
                            </a>
                            <a
                                className="dropdown-item has-text-dark"
                                onClick={downVote}
                                title="dislike"
                                >
                                <span className="icon">
                                    <i className='fas fa-thumbs-down'></i>
                                </span>
                                Dislike
                            </a>
                            <hr className="dropdown-divider" />
                            <a
                                className="dropdown-item"
                                onClick={editComment}
                                title="edit comment"
                                >
                                <span className="icon">
                                    <i className='fas fa-comment'></i>
                                </span>
                                Edit Comment
                            </a>
                            <a
                                className="dropdown-item"
                                onClick={deleteComment}
                                title="delete comment"
                                >
                                <span className="icon">
                                    <i className='fas fa-trash'></i>
                                </span>
                                Delete Comment
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="comment-footer">
                <p className="is-size-6">
                    <small>
                        {timestamp} | 
                        &nbsp;{author} | 
                        &nbsp;<span className="icon">
                            <i className={`fas ${voteScoreIcon}`}></i>
                        </span>
                        {voteScoreText}
                    </small>
                </p>
            </div>
        </div>
    );    
};

const CommentListPreJSX = (
    sortByName,
    comments,
    upVote,
    downVote,
    editComment,
    deleteComment
) => {
    return (
        <div>
            { !(comments && comments.length > 0)
                ?   <div className="no-content has-text-centered">
                        <p className="is-size-3 is-size-4-mobile">No Comments Are Founded!</p>
                    </div>
                : null
            }
            { comments && comments.length > 0
                ?   <div className="comment-list has-text-centered">
                        <h1 className="is-size-3">
                            Comments ({comments.length})
                        </h1>
                        {   comments.sort(sortBy(sortByName)).reverse().map((comment, index) => {
                                return commentJSX(
                                    comment.id,
                                    comment,
                                    () => upVote(comment.id),
                                    () => downVote(comment.id),
                                    () => editComment(comment.parentId, comment.id),
                                    () => deleteComment(comment.id)
                                );
                            })
                        }
                    </div>
                : null
            }
        </div>
    );
};

const CommentListJSX = ({
    isSyncingComments,  // state (boolean)
    sortByLatest,       // function ()
    sortByMostPopular,  // function ()
    addComment,         // function ()
    syncCommentList,    // function ()
    sortByName,         // state (string)
    comments,           // props (array)
    upVote,             // function (id)
    downVote,           // function (id)
    editComment,        // function (parentId, id)
    deleteComment,      // function (id)
}) => {
    return (
        <div className="comment-list">
            <div className="container">
                { CommentListControllerJSX(
                    isSyncingComments,
                    sortByLatest,
                    sortByMostPopular,
                    addComment,
                    syncCommentList
                ) }
                { CommentListPreJSX(
                     sortByName,
                     comments,
                     upVote,
                     downVote,
                     editComment,
                     deleteComment
                ) }
            </div>
        </div>
    );
};

export default CommentListJSX;