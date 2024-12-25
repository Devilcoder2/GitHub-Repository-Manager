import { CHANGE_SORTING_ORDER } from '../actions';

const changeSortingOrder = (payload: number) => {
    return {
        type: CHANGE_SORTING_ORDER,
        payload,
    };
};

export { changeSortingOrder };
