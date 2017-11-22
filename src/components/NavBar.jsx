import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    mapDispatchToProps,
    mapStateToProps
} from '../redux/factory';

import {
    logoutUser,
    loginUser
} from '../redux/actions';

class NavBarComponent extends React.Component {

    static propTypes = {
        onLogInWithPromise: PropTypes.func.isRequired,
        onLogOut: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }),
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch } = this.props;
        // Check if user is already logged in 
        const userInfo = localStorage.getItem('user');
        if (userInfo) {
            dispatch(loginUser(JSON.parse(userInfo)));
        }
    }

    login() {
        const { onLogInWithPromise } = this.props;
        console.info('Loggin in...');
        onLogInWithPromise({ names: { first: 'John', last: 'Cusac' } })
            .then(user => {
                // do something with user
                console.warn('User logged in successfully -> %o', user);
            })
            .catch(err => {
                // do something if login fails
                console.error('Login error -> %o', err);
            });
    }

    logout() {
        const { dispatch } = this.props;
        dispatch(logoutUser());
    }

    render() {
        const { session } = this.props;
        console.info('Props @%s -> %o', this.displayName, this.props);
        let user;
        if (session) {
            console.warn('Session -> %o', session);
            user = session.user;
        }

        return (
            <nav>
                <strong>App Logo</strong>
                {user ? (
                    <div>
                        Welcome, {user.names.first}! &nbsp;
                        <button onClick={this.logout.bind(this)}>Logout</button>
                    </div>
                ) : (
                        <div>
                            <button type="button" onClick={this.login.bind(this)}>Login</button>
                        </div>
                    )}
            </nav>
        )
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBarComponent));
