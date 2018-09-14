/**
 * Author：tantingting
 * Time：2017/8/21
 * Description：Description
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Input, Form, Button, Upload, Icon, Modal, message } from 'antd'
import './config.scss'
import {axiosFormData, URL} from '../../public/index'
import {addGameData} from '../../actions/other.action'
// import $ from 'jquery'
// import ImgUpLoad from './upload.config'
const FormItem = Form.Item
const formItemLayout = {
    labelCol: {span: 2},
    wrapperCol: {span: 12}
}
class GameConfig extends Component {
    constructor () {
        super()
        this.state = {
            'isEdit': false,
            'file': null,
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: `${URL}${$.cookie('gameIcon')}`
            }]
        }
    }
    handleCancel = () => this.setState({ previewVisible: false })
    beforeUpload = (file, fileList) => {
        this.setState({'file': file})
    }
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        })
    }

    handleChange = ({fileList}) => {
        let _fileList = fileList.slice(1)
        fileList.length < 2 ? this.setState({fileList}) : this.setState({fileList: _fileList})
    }
    /*
    * 添加游戏
    * */
    submitForm = () => {
        const { form, dispatch } = this.props
        form.validateFields((err, fieldValues) => {
            if (err) {
                return
            }
            let files = this.state.file
            var formData = new FormData()
            formData.append('lk_game_file', files)
            formData.append('lk_game_name', fieldValues.lk_game_name)
            // formData.append('lk_game_id', fieldValues.lk_game_id)
            axiosFormData('POST', '/api_game_up', formData, function (res) {
                if (res.code === 200) {
                    message.success('修改成功！')
                    dispatch(addGameData({'gameName': fieldValues.lk_game_name, 'gameIcon': res.data.lk_game_file}))
                    $.cookie('gameName', fieldValues.lk_game_name)
                    $.cookie('gameIcon', res.data.lk_game_file)
                    /* if (file !== null) {

                    } */
                    // $.cookie('gameIcon', gameIcon)
                    // form.resetFields()
                } else {
                    message.warning(res.message)
                }
            })
            // this.setState({ visible: false })
            // this.setState({'isEdit': !this.state.isEdit})
        })
    }
    render () {
        const {getFieldDecorator} = this.props.form
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        return <div className="game-config common">
            <Form>
                <FormItem label="游戏名称" {...formItemLayout}>
                    {getFieldDecorator('lk_game_name', {
                        rules: [{
                            required: true, message: '请输入游戏名称！'
                        }],
                        initialValue: $.cookie('gameName')
                    })(
                        <Row>
                            <Col span={12} ><Input defaultValue={$.cookie('gameName')} /></Col>
                        </Row>
                        /* <Row>
                            <Col className="form-control" span={8} >{!this.state.isEdit ? <span className="lh32">黎明之光</span> : <Input defaultValue="黎明之光" />}</Col>
                            <Col span={2} className="lh32" >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={() => { !this.state.isEdit ? this.setState({'isEdit': !this.state.isEdit}) : this.submitForm() }}
                                >
                                    {!this.state.isEdit ? '修改' : '保存'}
                                </Button>
                                {/!* <a href="javascript:void(0)" onClick={() => { !this.state.isEdit ? this.setState({'isEdit': !this.state.isEdit}) : this.submitForm() }}>{!this.state.isEdit ? '修改' : '保存'}</a> *!/}
                            </Col>
                        </Row> */
                    )}
                </FormItem>
                {/* <FormItem label="游戏ID" {...formItemLayout}>
                    {getFieldDecorator('lk_game_id', {
                        rules: [{
                            required: true, message: '请输入游戏ID！'
                        }],
                        initialValue: ''
                    })(
                        <Row>
                            <Col span={12} ><Input /></Col>
                        </Row>
                    )}
                </FormItem> */}
                <FormItem label="游戏图标" {...formItemLayout}>
                    <div>（尺寸512*512，格式JPEG和PNG，大小2M以下)</div>
                    {getFieldDecorator('lk_game_file', {
                        initialValue: $.cookie('gameIcon')
                    })(
                        <div className="clearfix">
                            <Upload
                                action="//jsonplaceholder.typicode.com/posts/"
                                listType="picture-card"
                                fileList={this.state.fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                                beforeUpload={this.beforeUpload}
                            >
                                {this.state.fileList.length >= 3 ? null : uploadButton}
                            </Upload>
                            <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                            </Modal>
                        </div>
                    )}
                </FormItem>
                <FormItem>
                    <Row>
                        <Col offset={2}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={() => { this.submitForm() }}
                            >
                                保存
                            </Button>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
            {/* <Row className="form-group">
                <Col className="form-label" span={2} >游戏名称</Col>
                <Col className="form-control" span={4} >{!this.state.isEdit ? <span className="lh32">黎明之光</span> : <Input defaultValue="黎明之光" />}</Col>
                <Col span={2} className="lh32" ><a href="javascript:void(0)" onClick={() => this.setState({'isEdit': !this.state.isEdit})}>{!this.state.isEdit ? '修改' : '保存'}</a></Col>
            </Row>
            <Row>
                <Col className="form-label" span={2} >游戏图标</Col>
                <Col className="form-control" span={12} >
                    （尺寸512*512，格式JPEG和PNG，大小2M以下
                </Col>
                <Col className="form-control" span={12} >
                    <ImgUpLoad fileList={this.state.fileList} action="//jsonplaceholder.typicode.com/posts/" />
                </Col>
            </Row> */}
        </div>
    }
}
const mapStateToProps = (state) => {
    return {
        loginInfo: state.loginInfo
    }
}

export default connect(mapStateToProps)(Form.create()(GameConfig))
