import { combineReducers } from 'redux';

import user from './user';
import tracks from './tracks';

export default combineReducers({ user, tracks });