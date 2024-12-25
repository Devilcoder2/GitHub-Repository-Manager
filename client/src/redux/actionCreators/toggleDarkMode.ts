import { TOGGLE_DARK_MODE } from '../actions';

const toggleDarkMode = (payload: boolean) => {
    return {
        type: TOGGLE_DARK_MODE,
        payload,
    };
};

export { toggleDarkMode };
