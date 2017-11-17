import * as actionTypes from '../actions/auth';
import update from 'immutability-helper';
const initialState = {
	isAuthed: false,
	isLoading: false,
	user: {}
};
export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGIN_START:
		case actionTypes.GET_SELF_START: {
			return update(state, {
				isLoading: { $set: true }
			});
		}
		case actionTypes.LOGIN_SUCCESS:
		case actionTypes.GET_SELF_SUCCESS: {
			const { user } = action;
			return update(state, {
				$merge: {
					isLoading: false,
					isAuthed: true,
					user: user
				}
			});
		}
		case actionTypes.LOGIN_FAIL:
		case actionTypes.GET_SELF_FAIL: {
			return update(state, {
				isLoading: { $set: false }
			});
		}
		case actionTypes.LOGOUT_SUCCESS: {
			return update(state, {
				$merge: {
					isAuthed: false,
					user: {}
				}
			});
		}
		default:
			return state
	}
};
