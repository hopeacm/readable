import React, { Component } from 'react';

import { connect } from 'react-redux';
import {
    loadCategoriesAPI,
    loadPostsAPI
} from '../../actions';

import AppJSX from './AppJSX';

class App extends Component {
    componentDidMount () {
        this.props.loadCategoriesAPI();
        this.props.loadPostsAPI();
    }

    render() {
        return (
            <div className="App">
                <AppJSX />
            </div>
        );
    }
}

function mapStateToProps () {
    return {};
}

function mapDispatchToProps (dispatch) {
    return {
        loadCategoriesAPI: (done, rejected) => {
            dispatch(loadCategoriesAPI(done, rejected));
        },
        loadPostsAPI: (done, rejected) => {
            dispatch(loadPostsAPI(done, rejected));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
