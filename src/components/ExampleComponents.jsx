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

class ComponentA extends React.Component {

    static propTypes = {
        onLoginWithPromise: PropTypes.func.isRequired,
        onLogOut: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }),
        dispatch: PropTypes.func.isRequired
    }

    displayName = 'ComponentA'

    componentDidMount() {
        console.info('Props @%s -> %o', this.displayName, this.props);
    }

    render() {
        return (
            <div>
                <h1>Component A</h1>
            </div>
        )
    }
}

class ComponentB extends React.Component {
    displayName = 'ComponentB'

    componentDidMount() {
        console.info('Props @%s -> %o', this.displayName, this.props);
    }
    render() {
        return (
            <div>
                <h1>Component B</h1>
                <a href="#/first">Back to home</a>
            </div>
        )
    }
}

export const StaticComponent = () => {
    return (
        <div>
            <h1>A component without State (Static)</h1>
        </div>
    )
}

export class AnExampleComponent extends React.Component {
    render() {
        return (
            <div>
                <h1>Example Component</h1>
            </div>
        )
    }
}

export class DefaultComponent extends React.Component {
    displayName = 'DefaultComponent'

    componentDidMount() {
        console.info('Props @%s -> %o', this.displayName, this.props);
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
            <div>
                {(user && user.names) ? (
                    <div>
                        <h1>Welcome, {user.names.first}!</h1>
                        <a href="#/second">Second Component</a><br />
                    </div>
                ) : (
                        <div>
                            <h1>Default Component</h1>
                        </div>
                    )}
            </div>
        )
    }
}

// export as default component
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DefaultComponent));
// binding compontents to redux engine
export const A = withRouter(connect(mapStateToProps, mapDispatchToProps)(ComponentA));
export const B = withRouter(connect(mapStateToProps, mapDispatchToProps)(ComponentB));