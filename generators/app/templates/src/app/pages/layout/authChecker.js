'use strict';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getself } from '../../../actions/auth';
import { jumpToIndex } from '../loginPage/loginFlow';
import AppConsts from '../../../constants';
const { USER_TYPE, ROUTE_ROLE } = AppConsts;

class AuthChecker extends PureComponent {
    componentDidMount() {
        const { isAuthed, getself, user, jumpToIndex } = this.props;
        if (!isAuthed) {
            getself();
        } else {
            jumpToIndex(user);
        }
    }

    hasRoutePermission (user, location){
        const path = location.pathname.split('/')[1];
        switch (user.type) {
            case USER_TYPE.TASK_ADMIN:
                return path === ROUTE_ROLE.TASK_ADMIN;
            case USER_TYPE.USER_ADMIN:
                return path === ROUTE_ROLE.USER_ADMIN;
            case USER_TYPE.ANNOTATOR:
                return path === ROUTE_ROLE.ANNOTATOR;
            case USER_TYPE.ANNOTATION_ADMIN:
                return path === ROUTE_ROLE.ANNOTATION_ADMIN;
            default:
                return false;
        }
    };

    componentWillReceiveProps(nextProps) {
        const { isLoading, isAuthed, router, user, jumpToIndex, location } = nextProps;
        
        if (!isLoading && !isAuthed) {
            router.push("/login");
        } else if (isAuthed && (location.pathname === "/")) {
            jumpToIndex(user);
        }
    }

    render() {
        const { children, isAuthed } = this.props;
        return (
            (isAuthed) ? children : null
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.auth,
        ...ownProps
    };
};

export default connect(mapStateToProps, {
    getself,
    jumpToIndex
})(AuthChecker);
