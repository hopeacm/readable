import React from 'react';
import { Link } from 'react-router-dom'

import {
    extractPostProperties
} from '../../utils/helpers';

const PostDropdownJSX = (
    id,
    categoryPath,
    deletePost
) => {
    return (
        <div className="dropdown is-right is-hoverable">
            <div className="dropdown-trigger">
                <a
                    className="card-header-icon"
                    title="show more options"
                    >
                    <span className="icon">
                        <i className="fas fa-angle-down"></i>
                    </span>
                </a>
            </div>
            <div className="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    <Link
                        className="dropdown-item"
                        to={`/${categoryPath}/${id}`}
                        title="show detail"
                        >
                        <span className="icon">
                            <i className="fas fa-file"></i>
                        </span>
                        &nbsp;Show Detail
                    </Link>
                    <Link
                        className="dropdown-item"
                        to={`/${categoryPath}/${id}/edit`}
                        title="edit post"
                        >
                        <span className="icon">
                            <i className="fas fa-edit"></i>
                        </span>
                        &nbsp;Edit Post
                    </Link>
                    <hr className="dropdown-divider" />
                    <a
                        className="dropdown-item"
                        onClick={deletePost}
                        title="delete post"
                        >
                        <span className="icon">
                            <i className="fas fa-trash"></i>
                        </span>
                        &nbsp;Delete Post
                    </a>
                </div>
            </div>
        </div>
    );
};

const PostFooterJSX = (
    upVote,
    addComment,
    downVote
) => {
    return (
        <footer className="card-footer">
            <a
                className="card-footer-item has-text-dark"
                onClick={upVote}
                title="like"
                >
                <span className="icon">
                    <i className="fas fa-thumbs-up"></i>
                </span>
                Like
            </a>
            <a
                className="card-footer-item has-text-link"
                onClick={addComment}
                title="add comment"
                >
                <span className="icon">
                    <i className="fas fa-comment"></i>
                </span>
                Add Comment
            </a>
            <a
                className="card-footer-item has-text-dark"
                onClick={downVote}
                title="dislike"
                >
                <span className="icon">
                    <i className="fas fa-thumbs-down"></i>
                </span>
                Dislike
            </a>
        </footer>
    );
};

const PostJSX = ({
    post,               // props (object)
    category,           // props (object)
    deletePost,         // function ()
    upVote,             // function ()
    addComment,         // function ()
    downVote,           // function ()
}) => {
    const { 
        id,
        timestamp,
        title,
        body,
        author,
        categoryName,
        categoryPath,
        categoryNameTitle,
        voteScoreIcon,
        voteScoreText,
        commentCountIcon,
        commentCountText
    } = extractPostProperties(post, category);
    return (
        <div className="column is-half-desktop">
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        <Link
                            className="dropdown-item"
                            to={`/${categoryPath}/${id}`}
                            title="show detail"
                            >
                            {title}
                        </Link>
                    </p>
                    { PostDropdownJSX(id, categoryPath, deletePost) }
                </header>
                <div className="card-content">
                    <div className="content">
                        <p>{timestamp} | {author}</p>
                        <p>{body}
                            <Link
                                to={`/${categoryPath}`}
                                title={`select ${categoryName}`}
                                >
                                &nbsp;#{categoryName}
                            </Link>
                        </p>
                        <p>
                            <span className="icon">
                                <i className="fas fa-tag"></i>
                            </span>
                            &nbsp;{ `${categoryNameTitle} ∙ ` }
                            <span className="icon">
                                <i className={`fas ${voteScoreIcon}`}></i>
                            </span>
                            &nbsp;{ `${voteScoreText} ∙ ` }
                            <span className="icon">
                                <i className={`fas ${commentCountIcon}`}></i>
                            </span>
                            &nbsp;{ commentCountText }
                        </p>
                    </div>
                </div>
                { PostFooterJSX (
                    upVote,
                    addComment,
                    downVote
                ) }
            </div>
        </div>
    );
};

export default PostJSX;