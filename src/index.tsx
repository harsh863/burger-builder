import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {App} from './Containers/App/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore, compose, applyMiddleware} from "redux";
import {rootReducer} from "./Store/Reducers/root.reducer";
import reduxThunk from 'redux-thunk';

const composeEnhancers = (process.env.NODE_ENV === 'development' ?  (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] : null) || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
