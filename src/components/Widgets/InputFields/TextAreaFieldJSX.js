import React from 'react';

const TextAreaFieldJSX = ({
    disabled,       // props (boolean)
    isFirstTime,    // state (boolean)
    isValid,        // state (boolean)
    fieldName,      // props (string)
    value,          // state (string) 
    rows,           // props (int)
    change,         // function (event)
}) => {
    return (
        <div className="textarea-field">
            <div className="field">
                <div className="control">
                    <textarea
                        className={`textarea ${
                            isFirstTime
                                ? ''
                                : isValid
                                    ? 'is-success'
                                    : 'is-danger'
                            } is-medium`
                        }
                        placeholder={`please input your ${fieldName}`}
                        value={value}
                        rows={`${rows}`}
                        onChange={change}
                        title={`input your ${fieldName}`}
                        disabled={disabled}
                        >
                    </textarea>
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

export default TextAreaFieldJSX;