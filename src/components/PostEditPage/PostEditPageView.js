import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
    loadPostsAPI,
    deletePostAPI,
    createModifyPostAPI
} from '../../actions';
import {
    normalize
} from '../../utils/helpers';
import PostEditPageJSX from './PostEditPageJSX';

// this.props.isHome
// this.props.category
// this.props.id
class PostEditPageView extends Component {
    static getDerivedStateFromProps (nextProps, prevState) {
        if (!prevState.isFirstTimeId) {
            return null;
        }
        const claimCategory = nextProps.category;
        const id = nextProps.id;
        if (normalize(id).length === 0) {
            return null;
        }
        if (!nextProps || !nextProps.postsObject || 
            Object.keys(nextProps.postsObject).length === 0
        ) {
            return null;
        }
        if (!(id in nextProps.postsObject)) {
            return null;
        }
        const post = nextProps.postsObject[id];
        if (normalize(claimCategory).length > 0 && claimCategory !== post.category) {
            return null;
        }
        const { category, author, title, body } = post;
        let categoryState = {};
        let authorState = {};
        let titleState = {};
        let bodyState = {};
        if (normalize(category).length > 0) {
            categoryState = {
                disabledCategory: true,
                isFirstTimeCategory: false,
                isValidCategory: true,
                category
            };
        }
        if (normalize(author).length > 0) {
            authorState = {
                disabledAuthor: true,
                isFirstTimeAuthor: false,
                isValidAuthor: true,
                author
            };
        }
        if (normalize(title).length > 0) {
            titleState = {
                isFirstTimeTitle: false,
                isValidTitle: true,
                title
            };
        }
        if (normalize(body).length > 0) {
            bodyState = {
                isFirstTimeBody: false,
                isValidBody: true,
                body
            };
        }
        return {
            isFirstTimeId: false,
            id,
            ...categoryState,
            ...authorState,
            ...titleState,
            ...bodyState
        };
    }

    postEditCloseState = {
        isFirstTimeId: true,
        id: '',
        disabledCategory: false,
        isFirstTimeCategory: true,
        isValidCategory: false,
        category: '',
        disabledAuthor: false,
        isFirstTimeAuthor: true,
        isValidAuthor: false,
        author: '',
        isFirstTimeTitle: true,
        isValidTitle: false,
        title: '',
        isFirstTimeBody: true,
        isValidBody: false,
        body: ''
    };

    state = {
        isSyncingPost: false,
        ...this.postEditCloseState,
        toHomePage: false
    };

    changeCategory = (event) => {
        if (this.state.disabledCategory) {
            return;
        }
        this.setState({
            isFirstTimeCategory: false,
            isValidCategory: normalize(event.target.value).length !== 0,
            category: event.target.value
        });
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

    changeTitle = (event) => {
        this.setState({
            isFirstTimeTitle: false,
            isValidTitle: normalize(event.target.value).length !== 0,
            title: event.target.value
        });
    };

    changeBody = (event) => {
        this.setState({
            isFirstTimeBody: false,
            isValidBody: normalize(event.target.value).length !== 0,
            body: event.target.value
        });
    };

    syncPost = () => {
        if (this.state.isSyncingPost) {
            return;
        }
        this.setState({
            isFirstTimeId: true,
            isSyncingPost: true
        });
        const done = () => {
            this.setState({ isSyncingPost: false });
        };
        const rejected = done;
        this.props.loadPostsAPI(done, rejected);
    };

    close = () => {
        if (this.props.isHome) {
            this.setState({
                ...this.postEditCloseState
            });
            return;
        }
        this.setState({
            ...this.postEditCloseState,
            toHomePage: true
        });
    };

    deletePost = () => {
        const id = this.state.id;
        if (normalize(id).length === 0) {
            return;
        }
        const done = this.close;
        this.props.deletePostAPI(id, done);
    };

    clearPost = () => {
        let categoryState = {};
        let authorState = {};
        let titleState = {};
        let bodyState = {};
        if (!this.state.disabledCategory) {
            categoryState = {
                isFirstTimeCategory: true,
                isValidCategory: false,
                category: ''
            };
        }
        if (!this.state.disabledAuthor) {
            authorState = {
                isFirstTimeAuthor: true,
                isValidAuthor: false,
                author: ''
            };
        }
        titleState = {
            isFirstTimeTitle: true,
            isValidTitle: false,
            title: ''
        };
        bodyState = {
            isFirstTimeBody: true,
            isValidBody: false,
            body: ''
        };
        this.setState({
            ...categoryState,
            ...authorState,
            ...titleState,
            ...bodyState
        });  
    };

    submitPost = () => {
        const id = normalize(this.state.id).length > 0 ? this.state.id : null;
        const category = normalize(this.state.category);
        const author = normalize(this.state.author);
        const title = normalize(this.state.title);
        const body = normalize(this.state.body);
        if (!this.state.isValidCategory ||
            !this.state.isValidAuthor ||
            !this.state.isValidTitle ||
            !this.state.isValidBody
        ) {
            this.setState({
                isFirstTimeCategory: false,
                isFirstTimeAuthor: false,
                isFirstTimeTitle: false,
                isFirstTimeBody: false
            });
            return;
        }
        const post = { id, category, author, title, body };
        const done = this.close;
        this.props.createModifyPostAPI(post, done);
    };

    render() {
        const props = {
            isHome: this.props.isHome,
            toHomePage: this.state.toHomePage,
            id: this.state.id,
            isSyncingPost: this.state.isSyncingPost,
            syncPost: this.syncPost,
            deletePost: this.deletePost,
            categories: this.props.categories,
            disabledCategory: this.state.disabledCategory,
            isFirstTimeCategory: this.state.isFirstTimeCategory,
            isValidCategory: this.state.isValidCategory,
            category: this.state.category,
            changeCategory: this.changeCategory,
            disabledAuthor: this.state.disabledAuthor,
            isFirstTimeAuthor: this.state.isFirstTimeAuthor,
            isValidAuthor: this.state.isValidAuthor,
            author: this.state.author,
            changeAuthor: this.changeAuthor,
            isFirstTimeTitle: this.state.isFirstTimeTitle,
            isValidTitle: this.state.isValidTitle,
            title: this.state.title,
            changeTitle: this.changeTitle,
            isFirstTimeBody: this.state.isFirstTimeBody,
            isValidBody: this.state.isValidBody,
            body: this.state.body,
            changeBody: this.changeBody,
            submitPost: this.submitPost,
            clearPost: this.clearPost,
            close: this.close
        };
        return (
            <PostEditPageJSX {...props} />
        );
    }
}

function mapStateToProps ({ postsState, categoriesState }) {
    const myPostsObject = postsState
        ? postsState.posts
        : {};
    const myCategories = categoriesState
        ? Object.values(categoriesState.categories)
        : [];
    return {
        postsObject: myPostsObject,
        categories: myCategories && myCategories.length > 0 ? myCategories : [],
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
        createModifyPostAPI: (post, done, rejected) => {
            dispatch(createModifyPostAPI(post, done, rejected));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEditPageView);