import { capitalize } from "../utils/helpers";

export const INSERT_MESSAGE = 'INSERT_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

export function insertMessage (message) {
    return {
        type: INSERT_MESSAGE,
        message
    };
}

export function insertErrorMessage (errorTitle, error) {
    const errorMessage = capitalize(error.message);
    return (dispatch, getState) => {
        dispatch(insertMessage({
            status: 'is-danger',
            body: `**${errorTitle}** : `
                + (errorMessage.length !== 0 ? errorMessage : 'Unexpected error!')
        }));
    };
}

export function deleteMessage (id) {
    return {
        type: DELETE_MESSAGE,
        id
    };
}