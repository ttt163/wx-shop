/**
 * Author：zhoushuanglong
 * Time：2017/8/18
 * Description：goods add
 */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Tabs, Form, Select, Input, Upload, Icon, Modal, Radio, Button, Switch, Row, Col, DatePicker } from 'antd'
import moment from 'moment'
import { hashHistory } from 'react-router'
import menuData from '../../public/menuData'
import { GOODSTYPE, URL, QUOTATYPE, formatDate } from '../../public/index'
import DynamicFieldSet from './goods.dynamicField'
// import $ from 'jquery'

import './index.scss'
import RichEditor from '../../components/RichEditor'
import { navigation, breadcrumb } from '../../actions/index'
import { goodsUpdate, goodsAdd, selectGoodGet } from '../../actions/goodsList'
import { columnListGet } from '../../actions/columnList'
// import GoodsUpLoadImg from './goods.uploadImg'
const RangePicker = DatePicker.RangePicker
const formItemLayout = {
    labelCol: {span: 2},
    wrapperCol: {span: 22}
}

// const formItemButton = {
//     wrapperCol: {offset: 2, span: 22}
// }
const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss'
const TabPane = Tabs.TabPane
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

let FieldsProps = {
    'FormItem': FormItem,
    'formItemLayout': formItemLayout,
    'formItemGood': {
        labelCol: {span: 10},
        wrapperCol: {span: 14}
    },
    'formItemNum': {
        labelCol: {span: 10},
        wrapperCol: {span: 13}
    }
}

let fieldsData = []

// let uuid = 0
class GoodsEdit extends Component {
    state = {
        richHtml: this.props.selectGood.lk_goods_describe,
        mobileHtml: this.props.selectGood.lk_mob_desc,
        update: false,
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }],
        file: '',
        fileList2: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }],
        file2: '',
        type: 'r'
    }
    handleCancel = () => this.setState({previewVisible: false})
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        })
    }
    removeImg = (file, type) => {
        const {setFieldsValue} = this.props.form
        if (type === '2') {
            setFieldsValue({lk_goods_file2: ''})
            this.setState({file2: ''})
        } else {
            setFieldsValue({lk_goods_file: ''})
            this.setState({file: ''})
        }
    }
    handleChange = ({fileList}, type) => {
        let _fileList = fileList.slice(1)
        let _listName = type === '2' ? 'fileList2' : 'fileList'
        this.setState({[_listName]: fileList.length < 2 ? fileList : _fileList})
        // fileList.length < 2 ? this.setState({fileList}) : this.setState({[_listName]: _fileList})
    }
    beforeUpload = (file, type) => {
        if (type === '2') {
            this.setState({file2: file})
        } else {
            this.setState({file: file})
        }
    }
    setFieldData (data) {
        fieldsData = data
    }
    submitEdit = (e) => {
        const {selectGood} = this.props
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((error, values) => {
            // console.log(error)
            // console.log(values)
            let err = error
            if (err !== null && values.lk_goods_type !== '1' && err['lk_quota_count']) {
                delete err['lk_quota_count']
                delete values['lk_quota_count']
            }
            err = !err || JSON.stringify(err) === '{}' ? null : err
            if (!err) {
                let columns = values.lk_column_id.split('&&')
                let keys = values.keys
                if (!keys) {} else {
                    for (let i = 0; i < keys.length; i++) {
                        delete values[`id_${keys[i]}`]
                        delete values[`num_${keys[i]}`]
                    }
                }
                let sendData = Object.assign({
                    'lk_goods_describe': this.state.richHtml,
                    'lk_mob_desc': `${this.state.mobileHtml}`
                }, values)
                // console.log(JSON.stringify(values))
                sendData = {
                    ...sendData,
                    'lk_column_id': parseInt(columns[0]),
                    'lk_column_name': columns[1]
                }
                if (!this.state.update) {
                    sendData = {
                        ...sendData,
                        'lk_goods_file': this.state.file
                    }
                } else {
                    sendData = {
                        ...sendData,
                        'lk_goods_file': !this.state.file ? selectGood.lk_goods_file : this.state.file,
                        'lk_goods_id': selectGood.lk_goods_id
                    }
                }
                if (sendData.lk_goods_increment === '') {
                    sendData = {
                        ...sendData,
                        'lk_goods_increment': 0
                    }
                }
                // 普通商品才有道具id
                let itemCode = {}
                let _keys = []
                for (let i = 0; i < fieldsData.length; i++) {
                    let _thisItem = `lk_itemCode_${i + 1}`
                    itemCode = {
                        ...itemCode,
                        [_thisItem]: `${fieldsData[i].id},${fieldsData[i].num}`
                    }
                    _keys.push(i + 1)
                }
                sendData = {
                    ...sendData,
                    ...itemCode,
                    keys: _keys.join(',')
                }
                // v1.3 20171129
                let fileSwidth = 2
                let file2 = ''
                let timeSwidth = 2
                let _start = ''
                let _end = ''
                if (values.lk_file_switch === true) {
                    fileSwidth = 1
                    file2 = !this.state.file2 ? selectGood.lk_goods_file2 : this.state.file2
                }
                if (values.lk_time_switch === true) {
                    timeSwidth = 1
                    _start = values.goods_dateTime[0].format(dateTimeFormat)
                    _end = values.goods_dateTime[1].format(dateTimeFormat)
                }
                sendData = {
                    ...sendData,
                    lk_goods_hot: values.lk_goods_hot === true ? 2 : 1,
                    lk_goods_file2: file2,
                    lk_file_switch: fileSwidth,
                    lk_time_switch: timeSwidth,
                    lk_begin_time: _start,
                    lk_end_time: _end
                }
                delete sendData.goods_dateTime
                let formData = new FormData()
                // console.log(sendData)
                for (let key in sendData) {
                    formData.append(key, sendData[key])
                }
                this.state.update ? this.props.actions.goodsUpdate(formData) : this.props.actions.goodsAdd(formData)
            }
        })
    }

    componentWillMount () {
        this.props.actions.columnListGet()
        let data = this.props.selectGood
        if (data.lk_goods_name) {
            let src = URL + data.lk_goods_file
            this.state.fileList[0].url = src
            this.setState({
                update: true,
                type: data.lk_quota_type || 'r'
            })
        }
        if (parseInt(data.lk_file_switch) === 1) {
            let src = URL + data.lk_goods_file2
            this.state.fileList2[0].url = src
        }
    }
    componentWillUnmount () {
        this.props.actions.selectGoodGet({})
    }

    getRichHtml = (html, mobileHtml) => {
        let text = JSON.parse(html).blocks[0].text.trim()
        this.setState({
            richHtml: text ? html : '',
            mobileHtml: mobileHtml
        })
    }
    selectType = (val) => {
        this.setState({
            type: val
        })
    }
    render () {
        let selectData = this.props.selectGood
        const {getFieldDecorator, getFieldValue} = this.props.form
        // console.log(getFieldValue('lk_begin_time'))
        FieldsProps = {
            ...FieldsProps,
            'selectGood': selectData,
            'update': this.state.update,
            'form': this.props.form
        }
        const {previewVisible, previewImage, fileList, fileList2} = this.state
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        /* let typeDesc = () => {
            switch (this.state.type) {
                case 'r':
                    return <span> </span>
                case 'w':
                    return <span> ，每周一 00:00 重置</span>
                case 'd':
                    return <span> ，每天 00:00 重置</span>
                default:
                    return false
            }
        } */
        /* let typeText = () => {
            switch (this.state.type) {
                case 'r':
                    return <span>角色</span>
                case 'w':
                    return <span>周</span>
                case 'd':
                    return <span>日</span>
                default:
                    return false
            }
        } */
        return <div className="goods-edit">
            <Form>
                <Tabs defaultActiveKey="basic" tabPosition="left">
                    <TabPane tab="基本信息" key="basic">
                        <FormItem label="商品名称" {...formItemLayout}>
                            {getFieldDecorator('lk_goods_name', {
                                initialValue: this.state.update ? selectData.lk_goods_name : '',
                                rules: [{
                                    required: true, message: '请输入商品名称'
                                }]
                            })(<Input placeholder="请填写商品名称"/>)}
                        </FormItem>
                        <FormItem label="商品类型" {...formItemLayout} extra="（商品创建完成后，再次编辑商品时将不能编辑商品类型，请创建商品时注意）">
                            {getFieldDecorator('lk_goods_type', {
                                initialValue: !this.state.update || !selectData.lk_goods_type ? '1' : selectData.lk_goods_type,
                                rules: [{
                                    required: true, message: '请选择商品类型'
                                }]
                            })(
                                <RadioGroup disabled={this.state.update}>
                                    {
                                        Object.keys(GOODSTYPE).map((item, index) => (<RadioButton key={item} value={item}>{GOODSTYPE[item]}</RadioButton>))
                                    }
                                </RadioGroup>
                            )}
                        </FormItem>
                        {
                            getFieldValue('lk_goods_type') === '1' ? (
                                <DynamicFieldSet {...FieldsProps} setFieldData={(data) => this.setFieldData(data)} />
                            ) : ''
                        }
                        {
                            getFieldValue('lk_goods_type') === '2' ? '' : (
                                <div>
                                    {/* <FormItem label="商品道具ID" {...formItemLayout}>
                                        <Button disabled={this.state.keys.length === 10} type="dashed" onClick={this.add} style={{ width: '43%' }}>
                                            <Icon type="plus" /> 增加道具
                                        </Button>
                                    </FormItem>
                                    {formItems} */}
                                    <FormItem label="商品活动ID" {...formItemLayout}>
                                        {getFieldDecorator('lk_activite_id', {
                                            initialValue: this.state.update ? selectData.lk_activite_id : '',
                                            rules: [{
                                                pattern: /^[0-9]*$/, message: '请输入正整数'
                                            }, {
                                                required: true, message: '请输入商品活动ID'
                                            }]
                                        })(<Input placeholder="请填写商品活动ID"/>)}
                                    </FormItem>
                                </div>
                            )
                        }
                        {
                            getFieldValue('lk_goods_type') !== '2' ? '' : (
                                <FormItem label="透传字段" {...formItemLayout} extra="（商品创建完成后，再次编辑商品时将不能编辑透传字段，请创建商品时注意）">
                                    {getFieldDecorator('lk_attch_code', {
                                        initialValue: this.state.update ? selectData.lk_attch_code : ''
                                    })(
                                        <Input disabled={this.state.update} placeholder="请填写透传字段"/>
                                    )}
                                </FormItem>
                            )
                        }
                        <FormItem label="所属专栏" {...formItemLayout}>
                            {getFieldDecorator('lk_column_id', {
                                initialValue: this.state.update ? `${selectData.lk_column_id}&&${selectData.lk_column_name}` : '',
                                rules: [{
                                    required: true, message: '请选择专栏'
                                }]
                            })(<Select placeholder="请选择专栏类型">
                                <Option key='-1' value=''>请选择专栏</Option>
                                {this.props.columnListArr.map((d, i) => {
                                    return <Option
                                        key={d.lk_column_id}
                                        value={`${d.lk_column_id}&&${d.lk_column_name}`}>{d.lk_column_name}</Option>
                                })}
                            </Select>)}
                        </FormItem>
                        <FormItem className="formData" label="商品图片" {...formItemLayout}>
                            <div>（尺寸400*400，格式JPEG和PNG，大小2M以下)</div>
                            {getFieldDecorator('lk_goods_file', {
                                initialValue: this.state.update ? fileList : '',
                                rules: [{
                                    required: true, message: '请选择图片'
                                }]
                            })(<div className="clearfix">
                                <Upload
                                    beforeUpload={this.beforeUpload}
                                    action="/api_upload_file"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onRemove={(file) => this.removeImg(file)}
                                    onChange={(fileList) => this.handleChange(fileList)}
                                >
                                    {fileList.length >= 3 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                                </Modal>
                            </div>)}
                        </FormItem>
                        <FormItem labelCol={{span: 2}} wrapperCol={{span: 22}} label="预览大图">
                            <Col span="1">
                                {getFieldDecorator('lk_file_switch', { initialValue: !(!this.state.update || selectData.lk_file_switch !== 1), valuePropName: 'checked' })(
                                    <Switch checkedChildren="开" unCheckedChildren="关" />
                                )}
                            </Col>
                            <Col span="20">（尺寸560*700，格式JPEG和PNG，大小1M以下)</Col>
                        </FormItem>
                        {
                            !getFieldValue('lk_file_switch') ? ''
                                : <div style={{marginTop: '-20px'}}>
                                    <FormItem className="formData" wrapperCol={{span: 22, offset: 2}}>
                                        {getFieldDecorator('lk_goods_file2', {
                                            initialValue: this.state.update ? fileList2 : '',
                                            rules: [{
                                                required: true, message: '请选择图片'
                                            }]
                                        })(<div className="clearfix">
                                            <Upload
                                                beforeUpload={(file) => this.beforeUpload(file, '2')}
                                                action="/api_upload_file"
                                                listType="picture-card"
                                                fileList={fileList2}
                                                onPreview={this.handlePreview}
                                                onRemove={(file) => this.removeImg(file, '2')}
                                                onChange={(fileList2) => this.handleChange(fileList2, '2')}
                                            >
                                                {fileList2.length >= 3 ? null : uploadButton}
                                            </Upload>
                                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                                <img alt="example" style={{width: '100%'}} src={previewImage}/>
                                            </Modal>
                                        </div>)}
                                    </FormItem>
                                </div>
                        }
                        <FormItem label="商品介绍" {...formItemLayout}>
                            {getFieldDecorator('lk_goods_describe', {
                                initialValue: this.state.richHtml || '',
                                rules: [{
                                    required: true, message: '请输入商品介绍'
                                }]
                            })(<RichEditor setRichHtml={this.state.update ? selectData.lk_goods_describe : ''} getRichHtml={this.getRichHtml}/>)}
                        </FormItem>
                    </TabPane>
                    <TabPane tab="销售信息" key="sales">
                        <FormItem label="商品售价" {...formItemLayout}>
                            {getFieldDecorator('lk_goods_sprice', {
                                initialValue: this.state.update ? selectData.lk_goods_sprice : '',
                                rules: [{
                                    pattern: /^\d+(\.\d{1,2})?$/, message: '请输入数字类型'
                                }, {
                                    required: true, message: '请输入商品售价'
                                }]
                            })(<Input placeholder="请填写商品售价"/>)}
                        </FormItem>
                        <FormItem label="商品原价" {...formItemLayout}>
                            {getFieldDecorator('lk_goods_oprice', {
                                initialValue: this.state.update ? (selectData.lk_goods_oprice === null ? '' : selectData.lk_goods_oprice) : '',
                                rules: [{
                                    pattern: /^\d+(\.\d{1,2})?$/, message: '请输入数字类型'
                                }]
                            })(<Input placeholder="请输入商品原价"/>)}
                        </FormItem>
                        <FormItem label="显示销量增量" {...formItemLayout}>
                            {getFieldDecorator('lk_goods_increment', {
                                initialValue: this.state.update ? selectData.lk_goods_increment : 0,
                                rules: [{
                                    pattern: /^[0-9]*$/, message: '请输入正整数'
                                }, {
                                    required: true, message: '请输入显示销量增量'
                                }]
                            })(<Input placeholder="请输入显示销量增量"/>)}
                        </FormItem>
                        {
                            getFieldValue('lk_goods_type') !== '1' ? '' : (
                                <div>
                                    <FormItem label="限购类型" {...formItemLayout}>
                                        {getFieldDecorator('lk_quota_type', {
                                            initialValue: this.state.update ? selectData.lk_quota_type : 'r',
                                            rules: [{
                                                required: true, message: '请选择限购类型'
                                            }],
                                            onChange: (val) => {
                                                this.selectType(val)
                                            }
                                        })(<Select style={{maxWidth: '150px'}} placeholder="请选择限购类型">
                                            {
                                                Object.keys(QUOTATYPE).map((k, index) => <Option key={k}>按{QUOTATYPE[k]}限购</Option>)
                                            }
                                        </Select>)}
                                    </FormItem>
                                    <FormItem label="限购数量" {...formItemLayout}>
                                        <div>每{QUOTATYPE[this.state.type]}限购&nbsp;&nbsp;
                                            {getFieldDecorator('lk_quota_count', {
                                                initialValue: this.state.update ? selectData.lk_quota_count : '',
                                                rules: [{
                                                    pattern: /^[0-9]*$/, message: '请输入正整数'
                                                }, {
                                                    required: true, message: '请输入限购数量'
                                                }]
                                            })(<Input style={{maxWidth: '100px'}}/>)}
                                            &nbsp;&nbsp;个<span>{this.state.type === 'w' ? '，每周一 00:00 重置' : this.state.type === 'd' ? '，每天 00:00 重置' : ''}</span>
                                        </div>
                                    </FormItem>
                                </div>
                            )
                        }
                        <FormItem label="限购平台" {...formItemLayout}>
                            {getFieldDecorator('lk_goods_quota', {
                                initialValue: 'iOS',
                                rules: [{
                                    required: true, message: '请选择限购平台'
                                }]
                            })(<RadioGroup size="large">
                                { /* <RadioButton value="android">安卓</RadioButton> */ }
                                <RadioButton value="iOS">iOS</RadioButton>
                            </RadioGroup>)}
                        </FormItem>
                        <FormItem label="商品状态" {...formItemLayout}>
                            {getFieldDecorator('lk_goods_static', {
                                initialValue: this.state.update ? selectData.lk_goods_static : '2',
                                rules: [{
                                    required: true, message: '请选择商品状态'
                                }]
                            })(<RadioGroup size="large">
                                <RadioButton value="1">销售中</RadioButton>
                                <RadioButton value="2">已下架</RadioButton>
                            </RadioGroup>)}
                        </FormItem>
                        {/* <FormItem label="热卖标记" {...formItemLayout}>
                            {getFieldDecorator('lk_goods_hot', {
                                initialValue: !this.state.update || !selectData.lk_goods_hot ? '1' : `${selectData.lk_goods_hot}`
                            })(<RadioGroup size="large">
                                {
                                    Object.keys(HOTTYPE).map((item, index) => (<RadioButton key={item} value={item}>{HOTTYPE[item]}</RadioButton>))
                                }
                            </RadioGroup>)}
                        </FormItem> */}
                        <Row>
                            <Col span="3">
                                <FormItem label="定时任务" labelCol={{span: 16}} wrapperCol={{span: 8}}>
                                    {getFieldDecorator('lk_time_switch', { initialValue: !(!this.state.update || selectData.lk_time_switch !== 1), valuePropName: 'checked' })(
                                        <Switch checkedChildren="开" unCheckedChildren="关" />
                                    )}
                                </FormItem>
                            </Col>
                            {
                                !getFieldValue('lk_time_switch') ? ''
                                    : <Col span="6">
                                        <FormItem
                                            rapperCol={{'span': 24}}
                                        >
                                            {getFieldDecorator('goods_dateTime', {
                                                initialValue: !this.state.update || !selectData.lk_end_time || !selectData.lk_begin_time ? '' : [moment(formatDate(selectData.lk_begin_time), dateTimeFormat), moment(formatDate(selectData.lk_end_time), dateTimeFormat)],
                                                rules: [{ type: 'array', required: true, message: '请选择上下架时间!' }]
                                            })(
                                                <RangePicker showTime format={dateTimeFormat} placeholder={['上架时间', '下架时间']} />
                                            )}
                                        </FormItem>
                                    </Col>
                            }
                        </Row>
                        <FormItem label="热卖标记" {...formItemLayout}>
                            {getFieldDecorator('lk_goods_hot', { initialValue: !(!this.state.update || selectData.lk_goods_hot !== 2), valuePropName: 'checked' })(
                                <Switch checkedChildren="开" unCheckedChildren="关" />
                            )}
                        </FormItem>
                    </TabPane>
                </Tabs>
                <div className="goods-edit-button">
                    <Button
                        disabled={ this.state.richHtml ? 0 : 1 }
                        type="primary"
                        size="large"
                        icon="save"
                        htmlType="submit"
                        onClick={this.submitEdit}>保存</Button>
                    <Button type="primary" size="large" icon="delete" onClick={() => {
                        this.props.actions.navigation(menuData[0].children[0].key, menuData[1].key)
                        this.props.actions.breadcrumb([menuData[1].text, menuData[1].children[0].text])
                        hashHistory.push('/goods-list')
                    }}>取消</Button>
                </div>
            </Form>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        goodsListArr: state.goodsListArr,
        columnListArr: state.columnListArr,
        selectGood: state.selectGood
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ navigation, breadcrumb, goodsUpdate, goodsAdd, selectGoodGet, columnListGet }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(GoodsEdit))
