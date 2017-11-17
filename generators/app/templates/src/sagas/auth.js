import {put, call, takeLatest} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as actionTypes from '../actions/auth';
import authService from '../services/authService';

export function* login({username, password}) {
    try {
        const res = yield call(authService.login, username, password);
        if (res && res.rtn === 0) {
            const user = res.result;
            yield put({ type: actionTypes.LOGIN_SUCCESS, user });
        } else {
            yield put({ type: actionTypes.LOGIN_FAIL, msg: res.message });
        }
        return res;
    } catch (err) {
        yield put({ type: actionTypes.LOGIN_FAIL, msg: err.message });
    }
}

function* logout() {
    try {
        const res = yield call(authService.logout);
        if (res && res.rtn === 0) {
            yield put({ type: actionTypes.LOGOUT_SUCCESS });
            yield put(push('/login'));
        } else {
            yield put({ type: actionTypes.LOGOUT_FAIL, msg: res.message });
        }
    } catch (err) {
        yield put({ type: actionTypes.LOGOUT_FAIL, msg: err.message });
    }
}

function* checkSelf() {
    try {
        const res = yield call(authService.getSelf);
        if (res && res.rtn === 0) {
            yield put({ type: actionTypes.GET_SELF_SUCCESS, user: res.result });
        } else {
            yield put({ type: actionTypes.GET_SELF_FAIL, msg: res.message });
        }
    } catch (err) {
        yield put({ type: actionTypes.GET_SELF_FAIL, msg: err.message });
    }
}

function* jumpTo({url}){
    yield put(push(url));
}

export default function* AuthFlow() {
    yield takeLatest(actionTypes.LOGOUT_START, logout);
    yield takeLatest(actionTypes.GET_SELF_START, checkSelf);
    yield takeLatest(actionTypes.LOGIN_START, login);
    yield takeLatest(actionTypes.JUMP_TO ,jumpTo)
}
