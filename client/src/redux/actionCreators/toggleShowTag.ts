import { TOGGLE_SHOW_TAGS } from '../actions';

const toggleShowTag = (payload: boolean) => {
    return {
        type: TOGGLE_SHOW_TAGS,
        payload,
    };
};

export { toggleShowTag };
