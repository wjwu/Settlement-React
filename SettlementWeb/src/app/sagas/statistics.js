import { call, put, takeEvery } from 'redux-saga/effects';
import * as apiClient from '../utils/apiClient';
import { error } from '../actions/message';
import actions, { QUERY_STATISTICS, QUERY_USER_STATISTICS } from '../actions/statistics';

function* queryStats(action) {
	try {
		yield put(actions.requestQueryStatistics());
		const result = yield call(apiClient.get, 'statistics', action.payload);
		yield put(actions.successQueryStatistics(result));
	} catch (e) {
		yield put(actions.failureQueryStatistics());
		yield put(error(e));
	}
}

function* queryUserStats(action) {
	try {
		yield put(actions.requestQueryUserStatistics());
		const result = yield call(apiClient.get, 'user/statistics', action.payload);
		yield put(actions.successQueryUserStatistics(result));
	} catch (e) {
		yield put(actions.failureQueryUserStatistics());
		yield put(error(e));
	}
}

export default function* statsSaga() {
	yield takeEvery(QUERY_STATISTICS, queryStats);
	yield takeEvery(QUERY_USER_STATISTICS, queryUserStats);
}