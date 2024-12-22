import { TOGGLE_SHOW_TAGS } from '../actions';

const toggleShowTag = (payload: boolean) => {
    console.log('IN ACTION CREATOR', payload);
    return {
        type: TOGGLE_SHOW_TAGS,
        payload,
    };
};

export { toggleShowTag };
