import { TOGGLE_DARK_MODE } from '../actions';

const toggleDarkMode = (payload: boolean) => {
    console.log('IN ACTION CREATOR', payload);
    return {
        type: TOGGLE_DARK_MODE,
        payload,
    };
};

export { toggleDarkMode };
