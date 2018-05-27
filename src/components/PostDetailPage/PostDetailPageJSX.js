import React from 'react';

import {
    extractPostDetailProperties
} from '../../utils/helpers';
import PostDetailControllerJSX from './PostDetailControllerJSX';
import CommentListView from '../CommentList/CommentListView';
import CommentModalView from '../CommentModal/CommentModalView';
import './PostDetailPageJSX.css';

const PostButtonGroupJSX = (
    upVote,
    addComment,
    downVote
) => {
    return (
        <div className="is-clearfix">
            <div className="field is-grouped is-pulled-right">
                <div className="control">
                    <a
                        className="button is-medium is-link"
                        onClick={upVote}
                        title="like"
                        >
                        <span className="icon">
                            <i className="fas fa-thumbs-up"></i>
                        </span>
                        &nbsp;&nbsp;Like
                    </a>
                </div>
                <div className="control">
                    <a
                        className="button is-medium is-link"
                        onClick={addComment}
                        title="add comment"
                        >
                        <span className="icon">
                            <i className="fas fa-comment"></i>
                        </span>
                        &nbsp;&nbsp;Add Comment
                    </a>
                </div>
                <div className="control">
                    <a
                        className="button is-medium"
                        onClick={downVote}
                        title="dislike"
                        >
                        <span className="icon">
                            <i className="fas fa-thumbs-down"></i>
                        </span>
                        &nbsp;&nbsp;Dislike
                    </a>
                </div>
            </div>
        </div>
    );
};

const PostDetailPreJSX = (
    isSyncingPost,
    addComment,
    editPost,
    syncPost,
    deletePost,
    post,
    upVote,
    downVote
) => {
    const { 
        timestamp,
        title,
        body,
        author,
        categoryNameTitle,
        voteScoreIcon,
        voteScoreText,
        commentCountIcon,
        commentCountText
    } = extractPostDetailProperties(post);

    const propsPostDetailControllerJSX = {
        isSyncingPost,
        addComment,
        editPost,
        syncPost,
        deletePost
    };
    return (
        <div className="post-detail-content">
            <div className="content">
                <header>
                    <div>
                        <h1 className="header is-size-3">
                        {title}
                        </h1>
                        <div className="post-detail-controller">
                            <PostDetailControllerJSX {...propsPostDetailControllerJSX} />
                        </div>
                    </div>
                    <p className="subheader-1 is-size-6">
                        {timestamp} | {author}
                    </p>
                    <p className="subheader-2 is-size-6">
                        <span className="icon">
                            <i className='fas fa-tag'></i>
                        </span>
                        &nbsp;{categoryNameTitle} ∙ 
                        <span className="icon">
                            <i className={`fas ${voteScoreIcon}`}></i>
                        </span>
                        &nbsp;{ `${voteScoreText} ∙ ` }
                        <span className="icon">
                            <i className={`fas ${commentCountIcon}`}></i>
                        </span>
                        &nbsp;{ commentCountText }
                    </p>
                </header>
                <p>{body}</p>
            </div>
            { PostButtonGroupJSX(
                upVote,
                addComment,
                downVote
            ) }
        </div>
    );
};

const PostDetailJSX = (
    isSyncingPost,
    addComment,
    editPost,
    syncPost,
    deletePost,
    post,
    upVote,
    downVote
) => {
    return (
        <div className="post-detail">
            <div className="container">
                { !post
                    ?   <div className="no-content has-text-centered">
                            <p className="is-size-4 is-size-5-mobile">No Post!</p>
                            <p className="is-size-4 is-size-5-mobile">Please Check Your Post ID!</p>
                        </div>
                    : null
                }
                { post
                    ?   PostDetailPreJSX(
                            isSyncingPost,
                            addComment,
                            editPost,
                            syncPost,
                            deletePost,
                            post,
                            upVote,
                            downVote
                        )
                    : null
                }
            </div>
        </div>
    );
};

const PostDetailPageJSX = ({
    isSyncingPost,              // state (boolean)
    addComment,                 // function ()
    editPost,                   // function ()
    syncPost,                   // function ()
    deletePost,                 // function ()
    post,                       // props (object)
    upVote,                     // function ()
    downVote,                   // function ()
}) => {
    return (
        <div className="post-detail-page">
            { PostDetailJSX(
                isSyncingPost,
                addComment,
                editPost,
                syncPost,
                deletePost,
                post,
                upVote,
                downVote
            )}
            { post
                ?   <div className="post-detail-supplement">
                        <hr className="hr" />
                        <CommentListView id={post.id} />
                        <CommentModalView />
                    </div>
                : null
            }
        </div>
    );
};

export default PostDetailPageJSX;