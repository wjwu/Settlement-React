import { call, put, takeEvery } from 'redux-saga/effects';
import * as apiClient from '../utils/apiClient';
import { success, error } from '../actions/message';
import actions, {
	QUERY_BASES,
	QUERY_SOURCES,
	QUERY_COSTS,
	CREATE_DICTIONARY,
	UPDATE_DICTIONARY
} from '../actions/dictionary';

function* queryBases(action) {
	try {
		yield put(actions.requestQueryBases());
		let request = action.payload || {};
		request.type = 'base';
		const result = yield call(apiClient.get, 'dictionary', request);
		yield put(actions.successQueryBases(result));
	} catch (e) {
		yield put(actions.failureQueryBases());
		yield put(error(e));
	}
}

function* querySources(action) {
	try {
		yield put(actions.requestQuerySources());
		let request = action.payload || {};
		request.type = 'source';
		const result = yield call(apiClient.get, 'dictionary', request);
		yield put(actions.successQuerySources(result));
	} catch (e) {
		yield put(actions.failureQuerySources());
		yield put(error(e));
	}
}

function* queryCosts(action) {
	try {
		yield put(actions.beignQueryCosts());
		let request = action.payload || {};
		request.type = 'cost';
		const result = yield call(apiClient.get, 'dictionary', request);
		yield put(actions.successQueryCosts(result));
	} catch (e) {
		yield put(actions.failureQueryCosts());
		yield put(error(e));
	}
}

function* createDictionary(action) {
	try {
		yield put(actions.requestCreateDictionary());
		const result = yield call(apiClient.post, 'dictionary', action.payload);
		yield put(actions.successCreateDictionary());
		yield put(success());
	} catch (e) {
		yield put(actions.failureCreateDictionary());
		yield put(error(e));
	}
}

function* updateDictionary(action) {
	try {
		yield put(actions.requestUpdateDictionary());
		const result = yield call(apiClient.put, 'dictionary', action.payload);
		yield put(actions.successUpdateDictionary());
		yield put(success());
	} catch (e) {
		yield put(actions.failureUpdateDictionary());
		yield put(error(e));
	}
}

export default function* dictionarySaga() {
	yield takeEvery(QUERY_BASES, queryBases);
	yield takeEvery(QUERY_SOURCES, querySources);
	yield takeEvery(QUERY_COSTS, queryCosts);
	yield takeEvery(CREATE_DICTIONARY, createDictionary);
	yield takeEvery(UPDATE_DICTIONARY, updateDictionary);
}