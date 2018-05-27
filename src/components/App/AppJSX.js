import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import TopBarView from '../Widgets/TopBar/TopBarView';
import PostListPageView from '../PostListPage/PostListPageView';
import PostEditPageView from '../PostEditPage/PostEditPageView';
import PostDetailPageView from '../PostDetailPage/PostDetailPageView';
import './AppJSX.css';

const HOC = ({
    exact,      // props (boolean)
    path,       // props (string)
    render,     // function ()
}) => {
    return (
        <Route exact={exact} path={path} render={(props) =>
            <div className="main-page">
                <TopBarView />
                <div className="main">
                    {render(props)}
                </div>
                <div className="main-footer"></div>
            </div>
        } />
    );
}

const AppJSX = () => {
    return (
        <div className="app">
            <BrowserRouter>
                <div>
                    <HOC exact path="/" render={() =>
                        <PostListPageView category="" />
                    } />
                    <HOC exact path="/:category" render={(props) => 
                        <PostListPageView category={props.match.params.category} />
                    } />
                    <HOC exact path="/:category/:id/edit" render={(props) => 
                        <PostEditPageView
                            category={props.match.params.category}
                            id={props.match.params.id}
                            />
                    } />                    
                    <HOC exact path="/:category/:id/" render={(props) => 
                        <PostDetailPageView
                            category={props.match.params.category}
                            id={props.match.params.id}
                        />
                    } />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default AppJSX;