import React, { Component } from 'react';

import { connect } from 'react-redux';
import { deleteMessage } from '../../../actions';
import TopBarJSX from './TopBarJSX';

class TopBarView extends Component {
    state = {
        isNavBarOpen: false
    };

    toggleNavBarOpen = () => {
        this.setState((prevState) => ({
            isNavBarOpen: !prevState.isNavBarOpen
        }));
    };

    render() {
        const props = {
            ...this.state,
            toggleNavBarOpen: this.toggleNavBarOpen,
            categories: this.props.categories,
            messages: this.props.messages,
            deleteMessage: this.props.deleteMessage
        };
        return <TopBarJSX {...props} />;
    }
}

function mapStateToProps ({ categoriesState, messagesState }) {
    const myCategories = categoriesState
        ? Object.values(categoriesState.categories)
        : [];
    const myMessages = messagesState
        ? Object.values(messagesState.messages)
        : [];
    return {
        categories: myCategories && myCategories.length > 0 ? myCategories : [],
        messages: myMessages && myMessages.length > 0 ? myMessages : []
    };
}

function mapDispatchToProps (dispatch) {
    return {
        deleteMessage: (id) => {
            dispatch(deleteMessage(id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBarView);