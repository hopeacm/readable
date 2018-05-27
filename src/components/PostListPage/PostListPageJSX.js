import React from 'react';
import sortBy from 'sort-by';

import ListControllerJSX from '../Widgets/ListController/ListControllerJSX';
import PostJSX from './PostJSX';
import PostEditPageView from '../PostEditPage/PostEditPageView';
import CommentModalView from '../CommentModal/CommentModalView';
import './PostListPageJSX.css';

const PostListControllerJSX = (
    isSyncingList,
    sortByLatest,
    sortByMostPopular,
    addPost,
    syncPostList
) => {
    const props = {
        isSyncingList,
        listNameNames: ['', 'posts'],
        sortByLatest,
        sortByMostPopular,
        addItem: addPost,
        syncList: syncPostList
    }
    return ListControllerJSX(props);
}

const PostListPreJSX = (
    sortByName,
    posts,
    categoriesObject,
    deletePost,
    upVote,
    addComment,
    downVote
) => {
    return (
        <div>
            { !(posts && posts.length > 0)
                ?   <div className="no-content has-text-centered">
                        <p className="is-size-3 is-size-4-mobile">No Posts Are Founded!</p>
                    </div>
                : null
            }
            <div className="columns is-multiline is-desktop">
                { posts && posts.length > 0 
                    ? posts.sort(sortBy(sortByName)).reverse().map((post, index) => {
                        const props = {
                            key: post.id,
                            post,
                            category: categoriesObject && categoriesObject[post.category]
                                ? categoriesObject[post.category]
                                : {},
                            deletePost: () => deletePost(post.id),
                            upVote: () => upVote(post.id),
                            addComment: () => addComment(post.id),
                            downVote: () => downVote(post.id)
                        };
                        return (
                            <PostJSX {...props} />
                        );
                    }) : null
                }
            </div>
        </div>
    );
};

const PostListPageJSX = ({
    isSyncingList,      // state (boolean)
    sortByLatest,       // function ()
    sortByMostPopular,  // function ()
    addPost,            // function ()
    syncPostList,       // function ()
    sortByName,         // state (string)
    posts,              // props (array)
    categoriesObject,   // props (object)
    deletePost,         // function (id)
    upVote,             // function (id)
    addComment,         // function (id)
    downVote,           // function (id)
}) => {
    return (
        <div>
            <div id="top" className="post-list">
                <div className="container">
                    { PostListControllerJSX(
                        isSyncingList,
                        sortByLatest,
                        sortByMostPopular,
                        addPost,
                        syncPostList
                    ) }
                    { PostListPreJSX(
                        sortByName,
                        posts,
                        categoriesObject,
                        deletePost,
                        upVote,
                        addComment,
                        downVote
                    ) }
                </div>
                <CommentModalView />
            </div>
            <hr className="hr" />
            <div id="addpost">
                <PostEditPageView isHome />
            </div>
        </div>
    );
};

export default PostListPageJSX;