import {
    LOAD_CATEGORIES
} from '../actions';
import update from 'immutability-helper';
import { arrayToObject } from '../utils/helpers';

const initialCategoriesState = {
    categories: {}
};

function categoriesState (state = initialCategoriesState, action) {
    const { categories } = action;

    switch (action.type) {
        case LOAD_CATEGORIES:
            return categories
                ? update(state, { categories: { $set: arrayToObject(categories, 'name') } })
                : state;

        default:
            return state;
    }
}

export default categoriesState;