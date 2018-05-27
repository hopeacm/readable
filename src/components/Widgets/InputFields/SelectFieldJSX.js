import React from 'react';
import sortBy from 'sort-by';

import { title } from '../../../utils/helpers';

const SelectFieldJSX = ({
    items,          // props (array) @each has name and path
    disabled,       // props (boolean)
    isFirstTime,    // state (boolean)
    isValid,        // state (boolean)
    fieldName,      // props (string)
    fieldNameIcon,  // props (string)
    value,          // state (string)
    change,         // function (event)
}) => {
    return (
        <div className="select-field">
            <div className="field">
                <div className="control has-icons-left">
                    <div className={`select ${
                            isFirstTime
                                ? ''
                                : isValid
                                    ? 'is-success'
                                    : 'is-danger'
                            } is-medium is-fullwidth`
                        }>
                        <select
                            name={fieldName}
                            value={value}
                            onChange={change}
                            title={`select ${fieldName}`}
                            disabled={disabled}
                            >
                            <option
                                key=""
                                value=""
                                title={`select ${fieldName}`}
                                >
                                Select {title(fieldName)}
                            </option>
                            {
                                items && items.length > 0
                                ?   items
                                        .sort(sortBy('name'))
                                        .map(item => 
                                        <option
                                            key={item.path}
                                            value={item.name}
                                            title={`select ${item.name}`}
                                        >
                                        {title(item.name)}
                                        </option>
                                    )
                                : null
                            }
                        </select>
                    </div>
                    <span className="icon is-small is-left">
                        <i
                            className={`fas ${fieldNameIcon}`
                            }
                        ></i>
                    </span>
                </div>
                { isFirstTime
                    ? null
                    : isValid
                        ? null
                        :   <p className="help is-danger is-size-6">
                                {`This ${fieldName} is invalid`}
                            </p>
                }
            </div>
        </div>
    );
};

export default SelectFieldJSX;