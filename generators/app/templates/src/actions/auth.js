import { push } from 'react-router-redux';

export const LOGIN_START = `${__filenamespace}/LOGIN_START `;
export const LOGIN_SUCCESS = `${__filenamespace}/LOGIN_SUCCESS `;
export const LOGIN_FAIL = `${__filenamespace}/LOGIN_FAIL`;
export const LOGOUT_START = `${__filenamespace}/LOGOUT_START `;
export const LOGOUT_SUCCESS = `${__filenamespace}/LOGOUT_SUCCESS `;
export const LOGOUT_FAIL = `${__filenamespace}/LOGOUT_FAIL`;
export const GET_SELF_START = `${__filenamespace}/GET_SELF_START`;
export const GET_SELF_SUCCESS = `${__filenamespace}/GET_SELF_SUCCESS`;
export const GET_SELF_FAIL = `${__filenamespace}/GET_SELF_FAIL`;
export const JUMP_TO = `${__filenamespace}/JUMP_TO`;

export const login = (username, password) => ({
	type: LOGIN_START,
	username,
	password
});

export const logout = () => ({
	type: LOGOUT_START,
});

export const getself = () => ({
	type: GET_SELF_START
});

export const jumpTo = url => ({
    type: JUMP_TO,
    url
});
