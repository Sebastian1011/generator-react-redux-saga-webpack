import React from 'react';
import { Col, Icon } from 'antd';
import { Link } from 'react-router';
import AppConst from '../../../constants';
const { USER_ROLE } = AppConst;

export default ({ children, user, logout }) => {
    return (
        <div className="role-content">
            <div className="clearfix login-info">
                <div className="user-role-type" >
                    <div className="username" title={user.username}>{user.username}</div>
                    <div>{USER_ROLE[user.type]}</div>
                </div>
                <div className="user-actions">
                    <div>
                        <Link to="/changePassword">修改密码</Link>
                    </div>
                    <div>
                        <a className="logout" onClick={logout}>登出</a>
                    </div>
                </div>
            </div>
            { children }
        </div>
    );
}