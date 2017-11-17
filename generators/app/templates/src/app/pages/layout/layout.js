import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import UserInfo from './userInfo';
import { Link } from 'react-router';
import { logout } from '../../../actions/auth';
import './layout.scss';
import AppConst from '../../../constants';
import SidebarMenuItem from './sidebarMenuItem';

class Layout extends PureComponent {
    componentDidMount() {
    }

    render() {
        const { children, auth, route, logout } = this.props;
        const { user } = auth;
        const { path } = route;
        const userMenu = AppConst.MENU_ITEMS[AppConst.USER_TYPE_CONST[user.type]];

        return (
			<div className="bg-grey">
				<UserInfo user={user} logout={logout} >
					<ul className="side-bar-menu">
                        {userMenu.map((menuItem, index) => <SidebarMenuItem key={index} path={path} menuItem={menuItem}/>)}
					</ul>
				</UserInfo>
				<div className="main-content">
					<section className="page-content">
                        {children}
					</section>
				</div>
			</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, {
    logout
})(Layout);
