/**
 * Author：tantingting
 * Time：2018/3/1
 * Description：Description
 */
import React, { Component } from 'react'
import { Input, Modal, Form, Radio, Select } from 'antd'
import {userRole} from '../../public/config'
import {connect} from 'react-redux'
import { permissionUpdate, permissionAdd } from '../../actions/permission'
import {hashHistory} from 'react-router'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const { TextArea } = Input

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 15}
}

class UserInfo extends Component {
    submitForm = () => {
        const {form, depObj, type, dispatch} = this.props
        let _this = this
        form.validateFields((err, values) => {
            // console.log(values)
            if (err) {
                return
            }
            let sendData = Object.assign({}, values)
            sendData = {
                ...sendData,
                division_name: depObj[sendData.division_id]
            }
            // console.log(sendData)
            type === 'edit' ? dispatch(permissionUpdate(sendData, () => {
                // close()
                _this.cancel()
                if (sendData.email === $.cookie('email')) {
                    if (parseInt(sendData.role) !== 1) {
                        hashHistory.push('/login')
                    }
                }
            })) : dispatch(permissionAdd(sendData, () => _this.cancel()))
        })
    }
    cancel = () => {
        const {form, close} = this.props
        form.resetFields()
        close()
    }
    render () {
        const {form, visible, data, depList, type} = this.props
        const {getFieldDecorator} = form
        return (
            <Modal
                className="common update-permission"
                title={`${type === 'edit' ? '修改' : '新增'}用户信息`}
                visible = {visible}
                onOk={() => this.submitForm()}
                onCancel={() => { this.cancel() }}
                okText="确认"
                cancelText="取消"
            >
                <Form>
                    <FormItem label="邮箱账号" {...formItemLayout}>
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: '请输入正确的邮箱账号'
                            }, {
                                required: true, message: '请输入邮箱账号'
                            }],
                            initialValue: !data.email ? '' : data.email
                        })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="角色">
                        {getFieldDecorator('role', {
                            rules: [{
                                required: true, message: '请选择角色'
                            }],
                            initialValue: !data.role ? '0' : `${data.role}`
                        })(
                            <RadioGroup>
                                {
                                    Object.keys(userRole).map((item) => {
                                        return <Radio key={item} value={item}>{userRole[item]}</Radio>
                                    })
                                }
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="所属部门">
                        {getFieldDecorator('division_id', {
                            rules: [{
                                required: true, message: '请选择所属部门'
                            }],
                            initialValue: !data.division_id ? '' : `${data.division_id}`
                        })(
                            <Select placeholder="请选择所属部门">
                                {
                                    depList.map((item) => {
                                        return <Option key={item.division_id}>{item.division_name}</Option>
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="备注">
                        {getFieldDecorator('remark', {
                            initialValue: !data.remark ? '' : data.remark
                        })(
                            <TextArea rows="6" placeholder="请输入备注内容" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        depObj: state.permissionData.depObj,
        depList: state.permissionData.depList
    }
}
export default connect(mapStateToProps)(Form.create()(UserInfo))
