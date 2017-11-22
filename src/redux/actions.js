// action types
export const ACTION_LOGIN = '_action_login';
export const ACTION_LOGOUT = '_action_logout';

// action handlers
export const loginUser = (user) => {
    return {
        type: ACTION_LOGIN,
        user: user
    }
}

export const logoutUser = () => {
    return {
        type: ACTION_LOGOUT,
        user: null
    }
};