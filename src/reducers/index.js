// reducers update the store/state in redux based on the information received from the actions

// a reducer takes in two things:

// 1. the action (info about what happend)
// 2. copy of current state

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import posts from './posts';
import comments from './comments';

const rootReducer = combineReducers({posts, comments, routing: routerReducer});

export default rootReducer;
