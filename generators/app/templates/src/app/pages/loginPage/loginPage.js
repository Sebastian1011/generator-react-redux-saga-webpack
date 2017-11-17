import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { login, getself, jumpTo } from '../../../actions/auth';
import './login.scss'
import { Form, Icon, Input, Button, Tabs } from 'antd';
import RegisterEntry from './registerEntry';
import { jumpToIndex, loginSubmit  } from './loginFlow';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const FIELD_STYLE = { fontSize: 14, color: "#108ee9"};

class LoginPage extends PureComponent {
	constructor(props) {
		super(props);
	}

	jumpTo(user) {
		const { jumpToIndex } = this.props;
		jumpToIndex(user);
	}

	componentDidMount() {
		const { isAuthed, getself, user } = this.props;
		if (!isAuthed) {
			getself();
		} else {
			this.jumpTo(user);
		}
	}

	componentWillReceiveProps(nextProps) {
		const { isAuthed, user } = nextProps;
		if (isAuthed) {
			this.jumpTo(user);
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { loginSubmit, form } = this.props;
		form.validateFields((err, values) => {
			if (err) return;
			loginSubmit(values);
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="login-wrapper">
				<h1 className="login-title">kakapo</h1>
				<Tabs defaultActiveKey="2" tabPosition="top" animated={false}>
					<TabPane tab="注册" key="1">
						<RegisterEntry/>
					</TabPane>
					<TabPane tab="登录" key="2">
						<Form onSubmit={this.handleSubmit}>
							<FormItem>
								{getFieldDecorator('username', {
									rules: [{ required: true, message: '请输入用户名!' }],
								})(
									<Input type="text" name="username" placeholder="请输入用户名"
										prefix={<Icon type="user" style={FIELD_STYLE} />}
									/>
									)}
							</FormItem>
							<FormItem>
								{getFieldDecorator('password', {
									rules: [{ required: true, message: '请输入密码!' }]
								})(
									<Input type="password" name="password" placeholder="请输入密码"
										prefix={<Icon type="lock" style={FIELD_STYLE} />}
									/>
									)}
							</FormItem>
							<FormItem>
								<Button type="primary" htmlType="submit" className="login-form-button">
									登录
								</Button>
							</FormItem>
						</Form>
					</TabPane>
				</Tabs>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		...state.auth,
		...ownProps
	}
};

export default Form.create()(connect(mapStateToProps, {
	login,
	getself,
	jumpToIndex,
	loginSubmit,
    jumpTo
})(LoginPage));
