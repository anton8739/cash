import {applyMiddleware, combineReducers, createStore} from "redux";
import mainPageReducer from "./reducers/mainPageReducer";
import {reducer as formReducer} from 'redux-form';
import authReducer from "./reducers/authReducer";
let reducers =combineReducers({
    main : mainPageReducer,
    auth : authReducer,
    form : formReducer
})

export let store =createStore(reducers);