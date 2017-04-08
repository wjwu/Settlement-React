import { call, put, takeEvery } from 'redux-saga/effects';
import * as apiClient from '../utils/apiClient';
import { success, error } from '../actions/message';
import actions, {
	GET_SHEET,
	QUERY_SHEETS,
	CREATE_SHEET,
	UPDATE_SHEET
} from '../actions/sheet';

function* getSheet(action) {
	try {
		yield put(actions.requestGetSheet());
		const result = yield call(apiClient.get, `sheet/${action.id}`);
		yield put(actions.successGetSheet(result));
	} catch (e) {
		yield put(actions.failureGetSheet());
		yield put(error(e));
	}
}

function* querySheets(action) {
	try {
		yield put(actions.requestQuerySheets());
		const result = yield call(apiClient.get, 'sheet', action.request);
		yield put(actions.successQuerySheets(result));
	} catch (e) {
		yield put(actions.failureQuerySheets());
		yield put(error(e));
	}
}

function* createSheet(action) {
	try {
		yield put(actions.requestCreateSheet());
		yield call(apiClient.post, 'sheet', action.request);
		yield put(actions.successCreateSheet());
		yield put(success());
	} catch (e) {
		yield put(actions.failureCreateSheet());
		yield put(error(e));
	}
}

function* updateSheet(action) {
	try {
		yield put(actions.requestUpdateSheet());
		yield call(apiClient.put, 'sheet', action.request);
		yield put(actions.successUpdateSheet());
		yield put(success());
	} catch (e) {
		yield put(actions.failureUpdateSheet());
		yield put(error(e));
	}
}

// export const deleteSheet = (id) => {
// 	return () => {
// 		return apiClient.del(`sheet/${id}`)
// 	}
// }

function* updateSheetAuditStatus(action) {
	try {
		yield put(actions.requestUpdateSheet());
		yield call(apiClient.patch, 'sheet', action.request);
		yield put(actions.successUpdateSheet());
		yield put(actions.success());
	} catch (e) {
		yield put(actions.failureUpdateSheet());
		yield put(error(e));
	}
}

export default function* sheetSaga() {
	yield takeEvery(GET_SHEET, getSheet);
	yield takeEvery(QUERY_SHEETS, querySheets);
	yield takeEvery(CREATE_SHEET, createSheet);
	yield takeEvery(UPDATE_SHEET, updateSheet);
}