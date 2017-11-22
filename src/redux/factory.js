// define reducers 
import {
    ACTION_LOGIN,
    ACTION_LOGOUT,
    // action handlers
    loginUser,
    logoutUser
} from './actions';

import { createStore, combineReducers } from 'redux';

// shares all redux changes with connected components
export const mapStateToProps = (state, lastProps) => {
    console.info('Last properties -> %o', lastProps);
    console.info('State -> %o', state);
    return state;
}

// shares all helper functions with your connected components
export const mapDispatchToProps = (dispatch) => {
    return {
        onLogInWithPromise: (user) => {
            return new Promise((ok, reject) => {
                // dispatch the new user 
                dispatch(loginUser(user));
                // return successfull login credentials
                return ok(user);
            });
        },
        onLogOut: () => {
            // dispatch logout action 
            dispatch(logoutUser());
        },
        dispatch
    }
}

// define reducer (which handles action types)
const auth = (state = null, action) => {
    switch (action.type) {
        case ACTION_LOGIN:
            localStorage.setItem('user', JSON.stringify(action.user));
            //console.warn('User login should happen [%s] -> %o', action.type, action);
            return Object.assign({}, state, { user: action.user });
        //return state;

        case ACTION_LOGOUT:
            // lets see what happens here ;)    
            localStorage.setItem('user', null);
            return null;

        default:
            return state;
    }
}

// combine reducers (tells the app where to "store" the changes in properties across bound app components)
export const appReducers = combineReducers({
    session: auth
});

export const appStore = createStore(appReducers);