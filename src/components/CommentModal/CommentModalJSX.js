import React from 'react';

import NotificationJSX from '../Widgets/Notification/NotificationJSX';
import TextFieldJSX from '../Widgets/InputFields/TextFieldJSX';
import TextAreaFieldJSX from '../Widgets/InputFields/TextAreaFieldJSX';
import './CommentModalJSX.css';

const CommentModalContentJSX = (
    messages,
    deleteMessage,
    id,
    isSyncingComment,
    syncComment,
    deleteComment,
    disabledAuthor,
    isFirstTimeAuthor,
    isValidAuthor,
    author,
    changeAuthor,
    isFirstTimeBody,
    isValidBody,
    body,
    changeBody,
    submitComment,
    clearComment,
    closeModal,
) => {
    const props = {
        messages,
        deleteMessage
    };

    const propsTextFieldJSX = {
        disabled: disabledAuthor,
        isFirstTime: isFirstTimeAuthor,
        isValid: isValidAuthor,
        fieldName: 'author',
        fieldNameIcon: 'fa-user',
        value: author,
        change: changeAuthor
    };

    const propsTextAreaFieldJSX = {
        disabled: false,
        isFirstTime: isFirstTimeBody,
        isValid: isValidBody,
        fieldName: 'comment',
        value: body,
        rows: 3,
        change: changeBody
    };
    return (
        <div className="modal-content">
            { props.messages && props.messages.length > 0
                ? <NotificationJSX {...props} />
                : null
            }
            <h1 className="is-size-3">
                { id ? 'Edit' : 'Add'} Comment&nbsp;
                { id
                    ?   <a
                            className={`button ${
                                isSyncingComment
                                    ? 'is-loading'
                                    : ''
                                } is-medium`
                            }
                            onClick={syncComment}
                            title="sync comment"
                            >
                            <span className="icon">
                                <i className='fas fa-sync'></i>
                            </span>
                        </a>
                    : null
                }&nbsp;
                { id
                    ?   <a
                            className="button is-medium is-danger"
                            onClick={deleteComment}
                            title="delete comment"
                            >
                            <span className="icon">
                                <i className='fas fa-trash'></i>
                            </span>
                        </a>
                    : null
                }&nbsp;
            </h1>
            <TextFieldJSX {...propsTextFieldJSX} />
            <TextAreaFieldJSX {...propsTextAreaFieldJSX} />
            <div className="is-clearfix">
                <div className="field is-grouped is-pulled-right">
                    <div className="control">
                        <a
                            className="button is-link"
                            onClick={submitComment}
                            title="submit comment"
                            >Submit
                        </a>
                    </div>
                    <div className="control">
                        <a
                            className="button"
                            onClick={clearComment}
                            title="clear comment"
                            >Clear
                        </a>
                    </div>
                    <div className="control">
                        <a
                            className="button is-text"
                            onClick={closeModal}
                            title="close modal"
                            >Close
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CommentModalJSX = ({
    isModalOpen,        // props (boolean)
    messages,           // state (array)
    deleteMessage,      // function (id) 
    id,                 // props (string)
    isSyncingComment,   // state (boolean)
    syncComment,        // function ()
    deleteComment,      // function ()
    disabledAuthor,     // props (boolean)
    isFirstTimeAuthor,  // state (boolean)
    isValidAuthor,      // state (boolean)
    author,             // state (string)
    changeAuthor,       // function (event)
    isFirstTimeBody,    // state (boolean)
    isValidBody,        // state (boolean)
    body,               // state (string)
    changeBody,         // function (event)
    submitComment,      // function ()
    clearComment,       // function ()
    closeModal,         // function ()
}) => {
    return (
        <div className="comment-modal">
            <div
                className={`modal ${
                    isModalOpen
                        ? 'is-active'
                        : ''
                    }`
                }>
                <div className="modal-background"></div>
                { CommentModalContentJSX(
                    messages,
                    deleteMessage,
                    id,
                    isSyncingComment,
                    syncComment,
                    deleteComment,
                    disabledAuthor,
                    isFirstTimeAuthor,
                    isValidAuthor,
                    author,
                    changeAuthor,
                    isFirstTimeBody,
                    isValidBody,
                    body,
                    changeBody,
                    submitComment,
                    clearComment,
                    closeModal,
                ) }
                <a
                    className="modal-close is-large"
                    onClick={closeModal}
                    title="close modal"
                    >Close
                </a>
            </div>
        </div>
    );
};

export default CommentModalJSX;