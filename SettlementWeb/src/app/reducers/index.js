import { combineReducers } from 'redux';

import message from './message';
import dictionary from './dictionary';
import group from './group';
import user from './user';
import sheet from './sheet';
import stats from './statistics';

export default combineReducers({
	message,
	dictionary,
	group,
	user,
	sheet,
	stats
});