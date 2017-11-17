import React from 'react';
import { Link } from 'react-router';

export default ({ path, menuItem }) => {
    return (
        <li>
            <Link className="side-bar-link"
                  to={`/${path}/${menuItem.URL}`}
                  activeClassName="active">
                <i className={`icon iconfont ${menuItem.ICON}`}/>
                <span className="menu-item-text">{menuItem.NAME}</span>
            </Link>
        </li>
    );
}