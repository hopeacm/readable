import React from 'react';

import { normalize, title } from '../../../utils/helpers';
import './ListControllerJSX.css';

const ListController = ({
    isSyncingList,      // state (boolean)
    listNameNames,      // props (array)
    sortByLatest,       // function ()
    sortByMostPopular,  // function ()
    addItem,            // function ()
    syncList,           // function ()
}) => {
    return (
        <div className="list-controller is-clearfix">
            <div className="is-pulled-right">
                <div className="dropdown is-right is-hoverable">
                    <div className="dropdown-trigger">
                        <a
                            className={`button ${
                                isSyncingList
                                    ? 'is-loading'
                                    : ''
                                } is-medium`
                            }
                            title="show more options"
                            >
                            <span className="icon">
                                <i className='fas fa-cog'></i>
                            </span>
                        </a>
                    </div>
                    <div className="dropdown-menu" role="menu">
                        <div className="dropdown-content has-text-left">
                            <a
                                className="dropdown-item"
                                onClick={sortByLatest}
                                title="sort by latest"
                                >
                                <span className="icon">
                                    <i className='fas fa-clock'></i>
                                </span>
                                Sort By Latest
                            </a>
                            <a
                                className="dropdown-item"
                                onClick={sortByMostPopular}
                                title="sort by most popular"
                                >
                                <span className="icon">
                                    <i className='fas fa-fire'></i>
                                </span>
                                Sort By Most Popular
                            </a>
                            <hr className="dropdown-divider" />
                            { normalize(listNameNames[0]).length > 0
                                ?   <a
                                        className="dropdown-item"
                                        onClick={addItem}
                                        title={`add ${listNameNames[0]}`}
                                        >
                                        <span className="icon">
                                            <i className='fas fa-edit'></i>
                                        </span>
                                        Add {title(listNameNames[0])}
                                    </a>
                                : null
                            }
                            <a
                                className="dropdown-item"
                                onClick={syncList}
                                title={`sync ${listNameNames[1]}`}
                                >
                                <span className="icon">
                                    <i className='fas fa-sync'></i>
                                </span>
                                Sync {title(listNameNames[1])}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListController;