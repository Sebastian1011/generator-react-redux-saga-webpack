import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Steps, Select, Form, Input, Button } from 'antd';
import authService from '../../../services/authService';
import './register_form.scss';
const { Option } = Select;
const { Item: FormItem } = Form;
const { Step } = Steps;


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
    }
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 10
        },
        sm: {
            span: 14,
            offset: 6
        }
    }
};

class RegisterForm extends Component {
    static propTypes = {
        onConfirm: PropTypes.func,
        inviteCode: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            step: 0
        };
    }

    nextPage = () => {
        const { step } = this.state;
        this.props.form.validateFieldsAndScroll(['username', 'truename', 'password', 'confirm'], (err, values) => {
            if (!err) {
                this.setState({
                    step: step + 1
                });
            }
        });
    };

    prevPage = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    };

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback(new Error('两次输入的密码不一致'));
        } else {
            callback();
        }
    };

    confirm = () => {
        const { onConfirm, form, inviteCode } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                onConfirm(Object.assign({ code: inviteCode }, values));
                form.resetFields();
                this.setState({
                    step: 0
                });
            }
        });
    };

    checkUsername = (rule, value, callback) => {
        let errors = [];
        authService.checkUsername(value).then((res) => {
            if (res.rtn !== 0) {
                errors.push(new Error(res.message));
            }
        }, (err) => {
            errors.push(new Error(err));
        }).finally(() => {
            callback(errors);
        });
    };

    render() {
        const { step } = this.state;
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86'
        })(
            <Select style={{ width: 60 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
            );

        return (
            <Form className="register-form" onSubmit={this.handleSubmit}>
                <Steps current={step}>
                    <Step title="个人信息" />
                    <Step title="付款信息" />
                </Steps>
                <div className={classnames({ 'hidden': step !== 0 })}>
                    <FormItem
                        {...formItemLayout}
                        label="用户名&nbsp;"
                        hasFeedback
                    >
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名!', whitespace: true },
                            { validator: this.checkUsername, message: "用户名已存在!" },
                            { max: 30, message: "用户名不超过30个字符!" }
                        ]
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="真实姓名&nbsp;"
                        hasFeedback
                    >
                        {getFieldDecorator('truename', {
                            rules: [{ required: true, message: '请输入真实姓名!', whitespace: true }]
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码&nbsp;"
                        hasFeedback
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: '请输入密码!'
                            }, {
                                validator: this.checkConfirm
                            }]
                        })(
                            <Input type="password" />
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="确认密码&nbsp;"
                        hasFeedback
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: '请再次输入密码!'
                            }, {
                                validator: this.checkPassword
                            }]
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                            )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" onClick={this.nextPage}>下一页</Button>
                    </FormItem>
                </div>
                <div className={classnames({ 'hidden': step !== 1 })}>
                    <FormItem
                        {...formItemLayout}
                        label="电话&nbsp;"
                    >
                        {getFieldDecorator('phone_number', {
                            rules: [{ required: true, message: '请输入电话号码' }]
                        })(
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="邮箱&nbsp;"
                        hasFeedback
                    >
                        {getFieldDecorator('email_address', {
                            rules: [{
                                type: 'email', message: '请输入邮箱地址'
                            }, {
                                required: true, message: '请输入邮箱地址!'
                            }]
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="支付宝账号&nbsp;"
                        hasFeedback
                    >
                        {getFieldDecorator('alipay_account', {
                            rules: [{ required: true, message: '请输入支付宝账号!', whitespace: true }]
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="secondary" onClick={this.prevPage}>上一页</Button>
                        <Button type="primary" onClick={this.confirm}>确认</Button>
                    </FormItem>
                </div>
            </Form>
        );
    }
}

export default Form.create()(RegisterForm);
