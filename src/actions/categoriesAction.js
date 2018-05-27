import { 
    getCategories as getCategoriesN
} from '../utils/ReadableAPI';
import { insertErrorMessage } from './messagesAction';
import { emptyFunction } from "../utils/helpers";

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

export function loadCategories (categories) {
    return {
        type: LOAD_CATEGORIES,
        categories
    };
}

export function loadCategoriesAPI (
    done=emptyFunction, rejected=emptyFunction
) {
    return (dispatch, getState) => {
        getCategoriesN()
            .then(categories => {
                dispatch(loadCategories(categories));
                done(categories);
            })
            .catch(error => {
                dispatch(insertErrorMessage('Cannot load categories', error));
                rejected(error);
            });
    };
}