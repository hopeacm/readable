import React from 'react';
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import sortBy from 'sort-by';

import { title } from '../../../utils/helpers';
import NotificationJSX from '../Notification/NotificationJSX';
import './TopBarJSX.css';

const NavBarCategoriesJSX = (
    categories
) => {
    return (
        <div className="navbar-dropdown is-boxed">
            { categories && categories.length > 0
                ? categories.sort(sortBy('name')).map(category => 
                    <Link
                        key={category.path}
                        className="navbar-item"
                        to={`/${category.path}`}
                        title={`select ${category.name}`}
                        >{ title(category.name) }
                    </Link>
                ) : null
            }
        </div> 
    );
};

const NavBarJSX = (
    isNavBarOpen,
    toggleNavBarOpen,
    categories
) => {
    return (
        <nav className="navbar is-transparent">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/" title="select home">
                    READABLE
                </Link>
                <div
                    className="navbar-burger burger"
                    onClick={toggleNavBarOpen}
                    title="select menu"
                    >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div
                className={`navbar-menu ${
                    isNavBarOpen ? 'is-active' : ''
                }`}
                >
                <div className="navbar-start">
                    <Link className="navbar-item" to="/" title="select home">
                        <span className="icon">
                            <i className="fas fa-home"></i>
                        </span>
                        &nbsp;Home
                    </Link>
                    <div className="navbar-item has-dropdown is-hoverable">
                        <Link className="navbar-link" to="/" title="select category">
                            <span className="icon">
                                <i className="fas fa-tags"></i>
                            </span>
                            &nbsp;Category
                        </Link>
                        { NavBarCategoriesJSX(categories) }
                    </div>
                </div>
                <div className="navbar-end">
                    <HashLink className="navbar-item" to="/#addpost" title="add post">
                        <span className="icon">
                            <i className="fas fa-edit"></i>
                        </span>
                        &nbsp;Add Post
                    </HashLink>
                </div>
            </div>
        </nav>
    );
};

const TopBarJSX = ({
    messages,           // props (array)
    deleteMessage,      // function (id)
    isNavBarOpen,       // state (boolean)
    toggleNavBarOpen,   // function ()
    categories,         // props (array) 
}) => {
    const props = {
        messages,
        deleteMessage
    };
    return (
        <div className="top-bar">
            <NotificationJSX {...props} />
            { NavBarJSX(
                isNavBarOpen,
                toggleNavBarOpen,
                categories
            ) }
        </div>
    );
};

export default TopBarJSX;