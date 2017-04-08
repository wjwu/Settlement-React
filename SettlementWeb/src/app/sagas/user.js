const md5 = require('md5');
import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as apiClient from '../utils/apiClient';
import { success, error } from '../actions/message';
import actions, { QUERY_USERS, CREATE_USER, UPDATE_USER } from '../actions/user';

function* queryUsers(action) {
	try {
		yield put(actions.successQueryUsers());
		const result = yield call(apiClient.get, 'user', action.payload);
		yield put(actions.successQueryUsers(result));
	} catch (e) {
		yield put(actions.failureQueryUsers());
		yield put(error(e));
	}
}

function* createUser(action) {
	try {
		let request = action.request;
		request.password = md5(request.password);
		yield put(actions.successCreateUser());
		const result = yield call(apiClient.post, 'user', action.payload);
		yield put(actions.successCreateUser(result));
		yield put(actions.success());
	} catch (e) {
		yield put(actions.failureCreateUser());
		yield put(error(e));
	}
}

function* updateUser(action) {
	try {
		yield put(actions.successUpdateUser());
		const result = yield call(apiClient.put, 'user', action.payload);
		yield put(actions.successUpdateUser(result));
		yield put(actions.success());
	} catch (e) {
		yield put(actions.failureUpdateUser());
		yield put(actions.error(e));
	}
}

// export const updateUserPwd = (request, success, error) => {
// 	return dispatch => {
// 		dispatch({
// 			type: success_UPDATE_USER_PWD,
// 		})
// 		request.oldPassword = md5(request.oldPassword)
// 		request.newPassword = md5(request.newPassword)
// 		apiClient.patch('user/password', request).then(result => {
// 			dispatch({
// 				type: success_UPDATE_USER_PWD,
// 				result: result
// 			})
// 			success()
// 				// dispatch({
// 				// 	type: SHOW_MESSAGE,
// 				// 	msgType: 'success',
// 				// 	msg: '修改成功！'
// 				// })
// 		}, error => {
// 			// dispatch({
// 			// 	type: ERROR_UPDATE_USER_PWD
// 			// })
// 			// dispatch({
// 			// 	type: SHOW_MESSAGE,
// 			// 	msgType: 'error',
// 			// 	msg: error
// 			// })
// 			error(error)
// 		})
// 	}
// }

export default function* userSaga() {
	yield takeEvery(QUERY_USERS, queryUsers);
	yield takeEvery(CREATE_USER, createUser);
	yield takeEvery(UPDATE_USER, updateUser);
}