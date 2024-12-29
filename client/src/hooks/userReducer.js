const SET_USER = 'currentUser/set';
const CLEAR_USER = 'currentUser/clear';

export const setCurrentUser = (item) => ({
    type: SET_USER,
    payload: item
});

export const clearCurrentUser = () => ({
    type: CLEAR_USER
});

const initialState = {
    selected: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                selected: action.payload,
            };
        case CLEAR_USER:
            return {
                ...state,
                selected: null,
            };
        default:
            return state;
    }
};

export default userReducer;