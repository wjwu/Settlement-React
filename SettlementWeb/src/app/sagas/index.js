import { fork } from 'redux-saga/effects';

import userSaga from './user';
import groupSaga from './group';
import dictionarySaga from './dictionary';
import statsSaga from './statistics';
import sheetSaga from './sheet';

export default function* sagas() {
	yield [
		fork(userSaga),
		fork(groupSaga),
		fork(dictionarySaga),
		fork(statsSaga),
		fork(sheetSaga)
	];
}