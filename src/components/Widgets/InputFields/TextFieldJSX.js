import React from 'react';

const TextFieldJSX = ({
    disabled,       // props (boolean)
    isFirstTime,    // state (boolean)
    isValid,        // state (boolean)
    fieldName,      // props (string)
    fieldNameIcon,  // props (string)
    value,          // state (string)
    change,         // function (event)
}) => {
    return (
        <div className="text-field">
            <div className="field">
                <div className="control has-icons-left has-icons-right">
                    <input
                        className={`input ${
                            isFirstTime
                                ? ''
                                : isValid
                                    ? 'is-success'
                                    : 'is-danger'
                            } is-medium`
                        }
                        type="text"
                        placeholder={`please input your ${fieldName}`}
                        value={value}
                        onChange={change}
                        title={`input your ${fieldName}`}
                        disabled={disabled}
                        />
                    <span className="icon is-small is-left">
                        <i
                            className={`fas ${fieldNameIcon}`
                            }
                        ></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i
                            className={`fas ${
                                isFirstTime
                                    ? ''
                                    : isValid
                                        ? 'fa-check'
                                        : 'fa-exclamation-triangle'
                                }`
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

export default TextFieldJSX;