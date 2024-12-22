import { CHANGE_SORTING_ORDER } from '../actions';

const changeSortingOrder = (payload: number) => {
    console.log('IN ACTION CREATOR', payload);
    return {
        type: CHANGE_SORTING_ORDER,
        payload,
    };
};

export { changeSortingOrder };
