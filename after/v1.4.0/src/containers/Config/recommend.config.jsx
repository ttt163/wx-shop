/**
 * Author：tantingting
 * Time：2017/8/21
 * Description：Description
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, Table, Modal, Select, Form, Upload, Icon } from 'antd'
import {URL} from '../../public/index'
// import {getRecommendList} from '../../actions/recommend.action'
import {getRecommendList, addRecommendItem, editRecommendItem, editListItem, addRecommendQuery, addRecommend, delRecommendItem, getGoodsList, editRecommendSort} from '../../actions/recommend.action'
// import ImgUpLoad from './upload.config'
// import ImgUpLoadItem from './uploadImg.config'
import './config.scss'
// import $ from 'jquery'
const FormItem = Form.Item
const Option = Select.Option
let columns = []
const confirm = Modal.confirm
const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 17}
}
class RecommendConfig extends Component {
    constructor () {
        super()
        this.state = {
            'visible': false,
            previewVisible: false,
            previewImage: '',
            file: null,
            fileList: []
        }
    }
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        })
    }
    beforeUpload = (file, fileList) => {
        this.setState({'file': file})
    }
    handleChange = ({fileList}) => {
        let _fileList = fileList.slice(1)
        fileList.length < 2 ? this.setState({fileList}) : this.setState({fileList: _fileList})
    }
    componentWillMount () {
        const {dispatch} = this.props
        columns = [{
            title: '推荐位显示顺序',
            dataIndex: 'name',
            width: '15%',
            render: (text, record) => {
                return <Input style={{'width': '50%'}} value={record.lk_recom_sort} onBlur={(e) => dispatch(editRecommendSort({'lk_recom_sort': e.target.value}, record.lk_recom_id, record.key))} onChange={(e) => this.changeSort(e, record.key, record.lk_recom_sort)} />
            }
        }, {
            title: '商品ID',
            className: 'column-money',
            dataIndex: 'lk_goods_id'
        }, {
            title: '商品名称',
            dataIndex: 'lk_goods_name'
        }, {
            title: '推荐位图片',
            width: '95px',
            height: '95px',
            dataIndex: 'lk_recom_file',
            render: (text, record) => {
                return <div className="recom-img-box"><img alt="图片不存在" src={!record.lk_recom_file ? '' : `${URL}${record.lk_recom_file}`} /></div>
            }
        }, {
            title: '操作',
            render: (text, record) => {
                return <div className="goods-operate">
                    <a className="mr15" onClick={() => {
                        this.getEditData(record)
                    }}>修改关联</a>
                    <a onClick={() => this.delRecomItem(record)}>删除</a>
                </div>
            }
        }]
        dispatch(getRecommendList())
    }
    componentDidMount () {
        const {dispatch} = this.props
        var _data = {
            'lk_game_id': $.cookie('gameId'),
            'lk_goods_static': '1'
        }
        dispatch(getGoodsList({..._data}))
    }
    componentWillUnmount () {
        const {dispatch} = this.props
        dispatch(addRecommend({'list': []}))
    }
    /* 删除 */
    delRecomItem (record) {
        const {dispatch} = this.props
        confirm({
            title: '提示',
            content: `确认要删除吗 ?`,
            onOk () {
                dispatch(delRecommendItem({'lk_recom_id': record.lk_recom_id}, record.key))
            },
            onCancel () {}
        })
    }
    getEditData (item) {
        const {dispatch} = this.props
        dispatch(addRecommendQuery(item))
        dispatch(addRecommend({'type': 'edit'}))
        this.setState({
            'visible': true,
            'fileList': !item.lk_recom_file ? [] : [{
                uid: -1,
                name: '',
                status: 'done',
                url: `${URL}${item.lk_recom_file}`
            }]
        })
    }
    changeSort = (e, index, id) => {
        this.props.dispatch(editListItem({'lk_recom_sort': e.target.value}, index))
    }
    submitForm = (e) => {
        const { form, dispatch, recommend, query } = this.props
        form.validateFields((err, fieldValues) => {
            if (err) {
                return
            }
            // let values = {...fieldValues, 'lk_goods_id': goodsItem[1], 'lk_items_name': goodsItem[0]}
            let files = this.state.file
            let goodsInfo = fieldValues.lk_goods_id.split('&&')
            // return
            let formData = new FormData()
            if (!files) {
                formData.append('lk_recom_file', fieldValues.lk_recom_file)
            } else {
                formData.append('lk_recom_file', files)
            }
            formData.append('lk_goods_id', goodsInfo[0])
            formData.append('lk_goods_name', goodsInfo[1])
            if (recommend.type === 'edit') {
                formData.append('lk_recom_id', query.lk_recom_id)
                dispatch(editRecommendItem(formData, query.lk_recom_id, query.key))
            } else {
                dispatch(addRecommendItem(formData))
            }
            this.setState({visible: false, file: null, fileList: []})
            // recommend.type === 'edit' ? dispatch(editRecommendItem(formData, query.lk_recom_id, query.key)) : dispatch(addRecommendItem(formData))
            form.resetFields()
        })
    }
    render () {
        const {list, dispatch, recommend, goodsList, query} = this.props
        const {getFieldDecorator} = this.props.form
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        return <div className="recommend-config common">
            <Button type="primary" icon="plus" onClick={() => { dispatch(addRecommend({'type': 'add'})); this.setState({'visible': !this.state.visible}) }}>新增推荐位</Button>
            <Table className="center-table mt30" columns={columns} dataSource={list.map((item, index) => ({...item, 'key': index}))} bordered pagination={false}/>
            {/*
                新增/修改推荐位
            */}
            <Modal className="common" title={recommend.type === 'edit' ? '编辑推荐位' : '新增推荐位'} visible={this.state.visible} onOk={(e) => this.submitForm(e)} onCancel={() => { this.setState({ 'visible': false }); dispatch(addRecommend({'query': {}})) }}
                okText="确认"
                cancelText="取消"
            >
                <Form encType="multipart/form-data" id="uploadForm">
                    <FormItem label="商品ID" {...formItemLayout}>
                        {getFieldDecorator('lk_goods_id', {
                            rules: [{
                                required: true, message: '请选择商品ID！'
                            }],
                            initialValue: query.lk_goods_id ? `${query.lk_goods_id}&&${query.lk_goods_name}` : ''
                        })(<Select name="goodsId" style={{'width': '100%'}}>
                            {
                                goodsList.map((item, index) => <Option value={`${item.lk_goods_id}&&${item.lk_goods_name}`} key={`${item.lk_goods_id}`}>{item.lk_goods_name}</Option>)
                            }
                        </Select>)}
                        <div >（请关联新的推荐位商品ID，只能关联出售中的商品）</div>
                    </FormItem>
                    <FormItem label="推荐位图" {...formItemLayout}>
                        <div>（尺寸1500*400，格式JPEG和PNG，大小2M以下)</div>
                        {getFieldDecorator('lk_recom_file', {
                            rules: [{
                                required: true, message: '请选择推荐位！'
                            }],
                            initialValue: query.lk_recom_file
                        })(
                            <div className="clearfix">
                                <Upload
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    listType="picture-card"
                                    fileList={this.state.fileList}
                                    beforeUpload={this.beforeUpload}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                >
                                    {this.state.fileList.length >= 3 ? null : uploadButton}
                                </Upload>
                                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                                </Modal>
                            </div>
                        )}
                    </FormItem>
                </Form>
                {/* <Row className="form-group">
                    <Col className="form-label" span={6} >商品ID</Col>
                    <Col className="form-control" span={15} >
                        <Select style={{'width': '100%'}}>
                            <Option value="1">商品ID1</Option>
                            <Option value="2">商品ID2</Option>
                            <Option value="3">商品ID3</Option>
                            <Option value="4">商品ID4</Option>
                        </Select>
                    </Col>
                    <Col className="form-control" offset={6} span={18}>（请关联新的推荐位商品ID，只能关联出售中的商品）</Col>
                </Row>
                <Row>
                    <Col className="form-label" span={6} >推荐位图</Col>
                    <Col className="form-control" span={18} >
                        （尺寸512*512，格式JPEG和PNG，大小2M以下
                    </Col>
                    <Col className="form-control" span={18} offset={6} >
                        <ImgUpLoad fileList={this.state.fileList} action="//jsonplaceholder.typicode.com/posts/" />
                    </Col>
                </Row> */}
            </Modal>
        </div>
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        recommend: state.recommend,
        query: state.recommend.query,
        list: state.recommend.list,
        goodsList: !state.recommend.goodsList ? [] : state.recommend.goodsList
    }
}

export default connect(mapStateToProps)(Form.create()(RecommendConfig))
