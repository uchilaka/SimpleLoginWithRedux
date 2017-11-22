import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import NavBar from './components/NavBar';
import { A, B } from './components/ExampleComponents';
import SomeComponent from './components/ExampleComponents';

import { Provider } from 'react-redux';
import {
    Switch,
    Route,
    HashRouter as Router
} from 'react-router-dom';

// setup redux store 
import { appStore } from './redux/factory';

ReactDOM.render((
    <Provider store={appStore}>
        <Router>
            <main>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={() => <SomeComponent />} />
                    <Route path="/first" component={() => <A />} />
                    <Route path="/second" component={() => <B />} />
                </Switch>
            </main>
        </Router>
    </Provider>
), document.getElementById('root'));

registerServiceWorker();
