import { CHANGE_SORTING_ORDER } from '../actions';

const sortingOrderInitialState = 0;

const changeSortingOrderReducer = (
    initialState: number = sortingOrderInitialState,
    action: { type: string; payload: number }
) => {
    switch (action.type) {
        case CHANGE_SORTING_ORDER:
            return action.payload;

        default:
            return initialState;
    }
};

export { changeSortingOrderReducer };
