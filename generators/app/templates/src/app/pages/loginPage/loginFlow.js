import { takeLatest, put, take, call } from 'redux-saga/effects';
import { login } from '../../../sagas/auth';
import AppConst from '../../../constants';
import { message } from 'antd';

const { USER_TYPE, ROUTE_ROLE } = AppConst;

export const JUMP_TO_INDEX = `${__filenamespace}/JUMP_TO_INDEX`;
export const REGISTER_USER_SUBMIT = `${__filenamespace}/REGISTER_USER_SUBMIT`;
export const LOGIN_SUBMIT = `${__filenamespace}/LOGIN_SUBMIT`;
export const JUMP_TO = `${__filenamespace}/JUMP_TO`;

export const jumpToIndex = (payload) => ({
    type: JUMP_TO_INDEX,
    payload
});


export const loginSubmit = (payload) => ({
    type: LOGIN_SUBMIT,
    payload
});

export const registerUserSubmit = (params) => ({
    type: REGISTER_USER_SUBMIT,
    payload: params
});

function* loginSubmitSaga( {payload} ) {
    let result = yield call(login, payload);
    if(result.rtn !== 0){
        message.error("账号或密码错误");
    }
}

function* jumpToIndexSaga({ payload }) {
    const user = payload;
    switch (user.type) {
        case USER_TYPE.TASK_ADMIN:
            hashHistory.push('/' + ROUTE_ROLE.TASK_ADMIN);
            break;
        case USER_TYPE.USER_ADMIN:
            hashHistory.push('/' + ROUTE_ROLE.USER_ADMIN);
            break;
        case USER_TYPE.ANNOTATOR:
            hashHistory.push('/' + ROUTE_ROLE.ANNOTATOR);
            break;
        case USER_TYPE.ANNOTATION_ADMIN:
            hashHistory.push('/' + ROUTE_ROLE.ANNOTATION_ADMIN);
            break;
    }
}

function* registerUserSubmitSaga({ payload }) {
    yield put({ type: REGISTER_USER_START, payload });
    const result = yield take([ADD_USER_SUCCESS, ADD_USER_FAIL]);
    if (result.type === ADD_USER_SUCCESS) {
        message.info("注册用户成功");
        yield call(login, payload);
    } else if (result.type === ADD_USER_FAIL) {
        message.error(`注册用户失败，${result.msg}`);
    }
}

export function* registerUserFlow() {
    yield takeLatest(REGISTER_USER_SUBMIT, registerUserSubmitSaga);
}

export function* loginFlow() {
    yield takeLatest(JUMP_TO_INDEX, jumpToIndexSaga);
}

export function* loginSubmitFlow() {
    yield takeLatest(LOGIN_SUBMIT, loginSubmitSaga);
}
