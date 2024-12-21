import { INCREMENT, DECREMENT } from '../actions/index';

const increment = () => ({
    type: INCREMENT,
});

const decrement = () => ({
    type: DECREMENT,
});

export { increment, decrement };
