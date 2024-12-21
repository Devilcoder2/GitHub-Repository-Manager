/* eslint-disable @typescript-eslint/no-explicit-any */
import { INCREMENT, DECREMENT } from '../actions/index';
import { CountState } from '../interfaces/index';

const initialState: CountState = {
    count: 0,
};

const countReducer = (state = initialState, action: any): CountState => {
    switch (action.type) {
        case INCREMENT:
            return { count: state.count + 1 };
        case DECREMENT:
            return { count: state.count - 1 };
        default:
            return state;
    }
};

export { countReducer };
