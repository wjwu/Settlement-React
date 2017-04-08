import { call, put, takeEvery } from 'redux-saga/effects';
import * as apiClient from '../utils/apiClient';
import { success, error } from '../actions/message';
import actions, {
	GET_GROUP,
	QUERY_GROUPS,
	CREATE_GROUP,
	UPDATE_GROUP,
	DELETE_GROUP,
} from '../actions/group';

function* getGroup(action) {
	try {
		yield put(actions.requestGetGroup());
		const result = yield call(apiClient.get, `group/${action.payload.id}`);
		yield put(actions.successGetGroup(result));
	} catch (e) {
		yield put(actions.failureGetGroup());
		yield put(error(e));
	}
}

function* queryGroups(action) {
	try {
		yield put(actions.requestQueryGroups());
		const result = yield call(apiClient.get, 'group', action.payload);
		yield put(actions.successQueryGroups(result));
	} catch (e) {
		yield put(actions.failureQueryGroups());
		yield put(error(e));
	}
}

function* createGroup(action) {
	try {
		yield put(actions.requestCreateGroup());
		yield call(apiClient.post, 'group', action.payload);
		yield put(actions.successCreateGroup());
		yield put(success());
	} catch (e) {
		yield put(actions.failureCreateGroup());
		yield put(error(e));
	}
}

function* updateGroup(action) {
	try {
		yield put(actions.requestUpdateGroup());
		yield call(apiClient.put, 'group', action.payload);
		yield put(actions.successUpdateGroup());
		yield put(success());
	} catch (e) {
		yield put(actions.failureUpdateGroup());
		yield put(error(e));
	}
}

//todo reload groups and users
function* deleteGroup(action) {
	try {
		yield put(actions.requestDeleteGroup());
		yield call(apiClient.del, `group/${action.payload}`);
		yield put(actions.successDeleteGroup());
		yield put(success());
	} catch (e) {
		yield put(actions.failureDeleteGroup());
		yield put(error(e));
	}
}

export default function* groupSaga() {
	yield takeEvery(GET_GROUP, getGroup);
	yield takeEvery(QUERY_GROUPS, queryGroups);
	yield takeEvery(CREATE_GROUP, createGroup);
	yield takeEvery(UPDATE_GROUP, updateGroup);
	yield takeEvery(DELETE_GROUP, deleteGroup);
}