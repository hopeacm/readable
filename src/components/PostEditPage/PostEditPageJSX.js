import React from 'react';
import { Redirect } from 'react-router';
import { HashLink } from 'react-router-hash-link';

import { normalize } from '../../utils/helpers';
import SelectFieldJSX from '../Widgets/InputFields/SelectFieldJSX';
import TextFieldJSX from '../Widgets/InputFields/TextFieldJSX';
import TextAreaFieldJSX from '../Widgets/InputFields/TextAreaFieldJSX';
import './PostEditPageJSX.css';

const PostEditPageJSX = ({
    isHome,             // props (boolean)
    toHomePage,         // state (boolean)
    id,                 // props (string)
    isSyncingPost,      // state (boolean)
    syncPost,           // function ()
    deletePost,         // function ()
    categories,         // props (array) @each has name and path
    disabledCategory,   // props (boolean)
    isFirstTimeCategory,// state (boolean)
    isValidCategory,    // state (boolean)
    category,           // state (string)
    changeCategory,     // function (event)
    disabledAuthor,     // props (boolean)
    isFirstTimeAuthor,  // state (boolean)
    isValidAuthor,      // state (boolean)
    author,             // state (string)
    changeAuthor,       // function (event)
    isFirstTimeTitle,   // state (boolean)
    isValidTitle,       // state (boolean)
    title,              // state (string)
    changeTitle,        // function (event)
    isFirstTimeBody,    // state (boolean)
    isValidBody,        // state (boolean)
    body,               // state (string)
    changeBody,         // function (event)
    submitPost,         // function ()
    clearPost,          // function ()
    close,              // function ()
}) => {
    const propsSelectFieldJSX = {
        items: categories,
        disabled: disabledCategory,
        isFirstTime: isFirstTimeCategory,
        isValid: isValidCategory,
        fieldName: 'category',
        fieldNameIcon: 'fa-tag',
        value: category,
        change: changeCategory
    };

    const propsTextFieldJSX_1 = {
        disabled: disabledAuthor,
        isFirstTime: isFirstTimeAuthor,
        isValid: isValidAuthor,
        fieldName: 'author',
        fieldNameIcon: 'fa-user',
        value: author,
        change: changeAuthor
    };

    const propsTextFieldJSX_2 = {
        disabled: false,
        isFirstTime: isFirstTimeTitle,
        isValid: isValidTitle,
        fieldName: 'title',
        fieldNameIcon: 'fa-heading',
        value: title,
        change: changeTitle
    };

    const propsTextAreaFieldJSX = {
        disabled: false,
        isFirstTime: isFirstTimeBody,
        isValid: isValidBody,
        fieldName: 'post',
        value: body,
        rows: 5,
        change: changeBody
    };
    return (
        <div className="post-edit">
            <div className="container">
                { toHomePage ? <Redirect to="/" /> : null }
                <div className="edit-content">
                    <h1 className="is-size-3 has-text-centered">
                        { normalize(id).length > 0 ? 'Edit' : 'Add'} Post&nbsp;
                    </h1>
                    <h1 className="is-size-3 has-text-right">
                        { normalize(id).length > 0
                            ?   <a
                                    className={`button ${
                                        isSyncingPost
                                            ? 'is-loading'
                                            : ''
                                        } is-medium`
                                    }
                                    onClick={syncPost}
                                    title="sync post"
                                    >
                                    <span className="icon">
                                        <i className='fas fa-sync'></i>
                                    </span>
                                </a>
                            : null
                        }&nbsp;
                        { normalize(id).length > 0
                            ?   <a
                                    className="button is-medium is-danger"
                                    onClick={deletePost}
                                    title="delete post"
                                    >
                                    <span className="icon">
                                        <i className='fas fa-trash'></i>
                                    </span>
                                </a>
                            : null
                        }&nbsp;
                    </h1>
                    <SelectFieldJSX {...propsSelectFieldJSX} />
                    <TextFieldJSX {...propsTextFieldJSX_1} />
                    <TextFieldJSX {...propsTextFieldJSX_2} />
                    <TextAreaFieldJSX {...propsTextAreaFieldJSX} />
                    <div className="field is-grouped is-pulled-right">
                        <div className="control">
                            <a
                                className="button is-link"
                                onClick={submitPost}
                                title="submit post"
                                >Submit
                            </a>
                        </div>
                        <div className="control">
                            <a
                                className="button"
                                onClick={clearPost}
                                title="clear post"
                                >Clear
                            </a>
                        </div>
                        { isHome
                            ?   <div className="control">
                                    <HashLink
                                        className="button is-text"
                                        to="/#top"
                                        title="go to top"
                                        >Go to Top
                                    </HashLink>
                                </div>
                            :   <div className="control">
                                    <a
                                        className="button is-text"
                                        onClick={close}
                                        title="close modal"
                                        >Close
                                    </a>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostEditPageJSX;