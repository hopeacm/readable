import { getUUID8, getUUID32 } from './helpers';

const api = process.env.REACT_APP_READABLE_API_URL || 'http://localhost:3001';
let token = localStorage.token;
if (!token)
  token = localStorage.token = getUUID8();
const headers = {
    'Accept': 'application/json',
    'Authorization': token
};

const resToJSON = (res) => {
    if (!res.ok) {
        throw new Error(`(code: ${res.status}) Unexpected fetch response!`);
    }
    return res.json();
};

export const getCategories = () => {
    return fetch(`${api}/categories`, { headers })
        .then(res => resToJSON(res))
        .then(data => data.categories);
};

const isValidCategoryEx = (myCategory) => {
    return getCategories()
        .then(categories => categories.filter(category => category.name === myCategory))
        .then(categories => categories.length > 0 ? categories[0] : null);
};

const isNewPostIdEx = (myId) => {
    return getPosts({})
        .then(posts => posts.filter(post => post.id === myId))
        .then(posts => posts.length > 0 ? posts[0] : null);
};

export const getPosts = ({ category, id }) => {
    if (!category && !id) {
        return fetch(`${api}/posts`, { headers })
            .then(res => resToJSON(res));
    }
    if (category && !id) {
        return isValidCategoryEx(category)
            .then(category => {
                if (category) {
                    return fetch(`${api}/${category.path}/posts`, { headers })
                        .then(res => resToJSON(res));
                }
                return [];
            });
    }
    if (!category && id) {
        return isNewPostIdEx(id)
            .then(post => post ? [post] : []); 
    }
    return getPosts({ id })
        .then(post => post.length > 0 && post[0].category === category ? post : []);
};

const isNewCommentIdEx = (myId) => {
    return getComments({})
        .then(comments => comments.filter(comment => comment.id === myId))
        .then(comments => comments.length > 0 ? comments[0] : null);
};

export const getComments = ({ parentId, id }) => {
    if (!parentId && !id) {
        return getPosts({})
            .then(posts => Promise.all(posts.map(post => getComments({ parentId: post.id }))))
            .then(comments => [].concat(...comments));
    }
    if (parentId && !id) {
        return isNewPostIdEx(parentId)
            .then(post => {
                if (post) {
                    return fetch(`${api}/posts/${post.id}/comments`, { headers })
                        .then(res => resToJSON(res));
                }
                return [];
            });
    }
    if (!parentId && id) {
        return isNewCommentIdEx(id)
            .then(comment => comment ? [comment] : []);
    }
    return getComments({ id })
        .then(comments => comments.length > 0 && comments[0].parentId === parentId ? comments : []);
};

// Must have a valid category.
// If id exists, then id must be new.
const createNewPost = (category, id, timestamp, title, body, author) => {
    return fetch(`${api}/posts`, { 
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            category,
            id: (id ? id : getUUID32()),
            timestamp: (timestamp ? timestamp : Date.now()),
            title: (title ? title : 'Untitled'),
            body: (body ? body : 'No Post Text'),
            author: (author ? author : 'Unknown')
        })
    }).then(res => resToJSON(res));
};

// The id must be existed.
const modifyPost = (id, title, body) => {
    return fetch(`${api}/posts/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            body
        })
    }).then(res => resToJSON(res));
};

// For modifying post, we cannot alter one's category.
export const createModifyPost = ({ category, id, timestamp, title, body, author }) => {
    if (!id) {
        return isValidCategoryEx(category)
            .then(category => {
                if (!category) {
                    throw new Error('Your input category is invalid!');
                }
                return createNewPost(category.name, id, timestamp, title, body, author);
            });
    }

    return isNewPostIdEx(id)
        .then(post => {
            if (!post) {
                return isValidCategoryEx(category).then(category => {
                    if (!category) {
                        throw new Error('Your input category is invalid!');
                    }
                    return createNewPost(category.name, id, timestamp, title, body, author);
                });
            }
            return modifyPost(id, title, body);
        });
};

// Must have a valid parentId.
// If id exists, then id must be new.
const createNewComment = (parentId, id, timestamp, body, author) => {
    return fetch(`${api}/comments`, { 
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            parentId,
            id: (id ? id : getUUID32()),
            timestamp: (timestamp ? timestamp : Date.now()),
            body: (body ? body : 'No Comment Text'),
            author: (author ? author : 'Unknown')
        })
    }).then(res => resToJSON(res));
};

// The id must be existed.
const modifyComment = (id, timestamp, body) => {
    return fetch(`${api}/comments/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            timestamp: (timestamp ? timestamp : Date.now()),
            body
        })
    }).then(res => resToJSON(res));
};

// For modifying comment, we cannot alter one's parentId.
export const createModifyComment = ({ parentId, id, timestamp, body, author }) => {
    if (!id) {
        return isNewPostIdEx(parentId)
            .then(post => {
                if (!post) {
                    throw new Error('Your input parentId is invalid!');
                }
                return createNewComment(post.id, id, timestamp, body, author);
            });
    }

    return isNewCommentIdEx(id)
        .then(comment => {
            if (!comment) {
                return isNewPostIdEx(parentId).then(post => {
                    if (!post) {
                        throw new Error('Your input parentId is invalid!');
                    }
                    return createNewComment(post.id, id, timestamp, body, author);
                });
            }
            return modifyComment(id, timestamp, body);
        });
};

export const votePost = (id, isUp) => {
    return isNewPostIdEx(id).then(post => {
        if (!post) {
            throw new Error('Your input postId is invalid!');
        }
        return fetch(`${api}/posts/${id}`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                option: isUp ? 'upVote' : 'downVote'
            })
        }).then(res => resToJSON(res));
    });
};

export const voteComment = (id, isUp) => {
    return isNewCommentIdEx(id).then(comment => {
        if (!comment) {
            throw new Error('Your input commentId is invalid!');
        }
        return fetch(`${api}/comments/${id}`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                option: isUp ? 'upVote' : 'downVote'
            })
        }).then(res => resToJSON(res));
    });
};

export const deletePost = (id) => {
    return isNewPostIdEx(id).then(post => {
        if (!post) {
            return;
        }
        return fetch(`${api}/posts/${id}`, {
            method: 'DELETE',
            headers
        }).then(res => resToJSON(res));
    });
};

export const deleteComment = (id) => {
    return isNewCommentIdEx(id).then(comment => {
        if (!comment) {
            return;
        }
        return fetch(`${api}/comments/${id}`, {
            method: 'DELETE',
            headers
        }).then(res => resToJSON(res));
    });
};