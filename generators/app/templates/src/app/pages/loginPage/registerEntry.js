import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Form, Input, Button, Modal, message } from 'antd';
import authService from '../../../services/authService';
import RegisterForm from './registerForm';
import { registerUserSubmit } from './loginFlow';
import AppConst from '../../../constants';

const { Item: FormItem } = Form;

class RegisterEntry extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showRegisterModal: false,
			inviteCode: ''
		};
	}

	onRegister = (values) => {
		const { registerUserSubmit, form } = this.props;
		let errors = [];
        authService.checkUsername(values.username).then((res) => {
            if (res.rtn !== 0) {
                message.error("用户名被占用");
			}
			else {
				if (typeof values.type === "undefined") {
					values.type = AppConst.USER_TYPE.ANNOTATOR;
				}
				registerUserSubmit(values);
				this.setState({
					showRegisterModal: false,
					inviteCode: ''
				});
				form.resetFields();
			}
        }, (err) => {
			errors.push(new Error(err));
			message.error("error");
		});
	};

	handleCancel = () => {
		this.setState({
			showRegisterModal: false
		});
	}

	handleCreateUser = (e) => {
		e.stopPropagation();
		e.preventDefault();
		const { form } = this.props;
		form.validateFields((errs, values) => {
			if (errs) return;
			let errors = [];

			authService.checkInviteCode(values.inviteCode).then((res) => {
				if (res.rtn !== 0) {
					errors.push("无效邀请码");
					form.setFields({
						inviteCode: {
							errors
						}
					});
				} else {
					this.setState({
						showRegisterModal: true,
						inviteCode: values.inviteCode
					});
				}
			});
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const { showRegisterModal, inviteCode } = this.state;
		return (
			<Form onSubmit={this.handleCreateUser}>
				<FormItem>
					{
						getFieldDecorator('inviteCode', {
							rules: [{ required: true, message: '请输入邀请码!', whitespace: true }]
						})(
							<Input type="text" name="inviteCode" placeholder="请输入邀请码" />
							)
					}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit" className="login-form-button">
						注册
								</Button>
				</FormItem>
				<Modal visible={showRegisterModal} title="请完善你的信息" footer={null} onCancel={this.handleCancel}>
					<RegisterForm onConfirm={this.onRegister} inviteCode={inviteCode} />
				</Modal>
			</Form>
		);
	}
}

export default Form.create({})(connect(null, {
	registerUserSubmit
})(RegisterEntry));