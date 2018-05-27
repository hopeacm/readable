import React from 'react';

const PostDetailController = ({
    isSyncingPost,      // state (boolean)
    addComment,         // function ()
    editPost,           // function ()
    syncPost,           // function ()
    deletePost,         // function ()
}) => {
    return (
        <div className="post-detail-controller dropdown is-left is-hoverable">
            <div className="dropdown-trigger">
                <a
                    className={`button ${
                        isSyncingPost
                            ? 'is-loading'
                            : ''
                        } is-medium`
                    }
                    title="show more options"
                    >
                    <span className="icon">
                        <i className='fas fa-caret-down'></i>
                    </span>
                </a>
            </div>
            <div className="dropdown-menu" role="menu">
                <div className="dropdown-content has-text-left">
                    <a
                        className="dropdown-item"
                        onClick={addComment}
                        title="add comment"
                        >
                        <span className="icon">
                            <i className='fas fa-comment'></i>
                        </span>
                        Add Comment
                    </a>
                    <a
                        className="dropdown-item"
                        onClick={editPost}
                        title="edit post"
                        >
                        <span className="icon">
                            <i className='fas fa-edit'></i>
                        </span>
                        Edit Post
                    </a>
                    <hr className="dropdown-divider" />
                    <a
                        className="dropdown-item"
                        onClick={syncPost}
                        title="sync post"
                        >
                        <span className="icon">
                            <i className='fas fa-sync'></i>
                        </span>
                        Sync Post
                    </a>
                    <a
                        className="dropdown-item"
                        onClick={deletePost}
                        title="delete post"
                        >
                        <span className="icon">
                            <i className='fas fa-trash'></i>
                        </span>
                        Delete Post
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PostDetailController;