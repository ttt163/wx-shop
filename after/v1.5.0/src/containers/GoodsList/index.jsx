/**
 * Author：zhoushuanglong
 * Time：2017/8/10
 * Description：goods manage
 */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Radio, Form, Select, Button, Input, Table, Modal } from 'antd'
import $ from 'jquery'
import { hashHistory } from 'react-router'
// import menuData from '../../public/menuData'
import { navigation, breadcrumb } from '../../actions/index'

import './index.scss'
// import { gameIdCookie, GOODSTYPE } from '../../public/index'
import { gameIdCookie, GOODSTYPE, URL, axiosAjax, formatDate } from '../../public/index'
import { goodsDelete, goodsStatus, goodsListGet, selectGoodGet } from '../../actions/goodsList'
import GoodsDetail from '../../components/GoodsDetail'
import { columnListGet } from '../../actions/columnList'
import ShowImg from '../../components/showImgModal/ShowImg'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const Option = Select.Option
const confirm = Modal.confirm
class GoodsList extends Component {
    constructor (props) {
        super()
        let navArr = !$.cookie('shopNav') ? [] : $.cookie('shopNav').split(',')
        let role = parseInt($.cookie('role'))
        this.columns = [{
            title: '商品名称',
            render: (text, record) => {
                return <div>
                    {parseInt(record.lk_rush_static) === 1 ? <span className="sale-text">限售</span> : ''}
                    {parseInt(record.lk_user_group) === 2 ? <span className="test-text">测试</span> : ''}
                    {parseInt(record.lk_goods_hot) === 2 ? <span className="hot-text">热卖</span> : ''}
                    {parseInt(record.lk_file_switch) === 1 ? <span className="img-text">大图</span> : ''}
                    <div>{record.lk_goods_name}</div>
                </div>
            }
        }, {
            title: '商品图片',
            className: 'goods_file',
            render: (text, record) => {
                return <img src={record.lk_goods_file ? URL + record.lk_goods_file : ''} alt=""/>
            }
        }, {
            title: '商品类型',
            render: (record) => {
                return !record.lk_goods_type || record.lk_goods_type === null ? '普通商品' : GOODSTYPE[record.lk_goods_type]
            }
        }, {
            title: '商品活动ID',
            dataIndex: 'lk_activite_id'
        }, {
            title: '商品专栏',
            dataIndex: 'lk_column_name'
        }, {
            title: '售价/原价',
            render: (text, record) => {
                return <div className="goods-price">
                    <span>{record.lk_goods_sprice}</span>
                    <span>{record.lk_goods_oprice}</span>
                </div>
            }
        }, {
            title: '定时任务',
            render: (text, record) => {
                return (
                    parseInt(record.lk_time_switch) === 1 ? (
                        <div className={this.isInDate(record.lk_begin_time, record.lk_end_time) === 1 ? 'timed-task before' : this.isInDate(record.lk_begin_time, record.lk_end_time) === 2 ? 'timed-task indate' : 'timed-task outdate'}>
                            <div>{formatDate(record.lk_begin_time)}</div>
                            <div>/</div>
                            <div>{formatDate(record.lk_end_time)}</div>
                        </div>
                    ) : ''
                )
            }
        }, {
            title: '商品状态',
            render: (text, record) => {
                let status = ''
                switch (record.lk_goods_static) {
                    case '1':
                        status = <span className="saleing">出售中</span>
                        break
                    case '2':
                        status = '已下架'
                        break
                }
                return status
            }
        }, {
            title: '实际销量',
            dataIndex: 'lk_goods_asales',
            render: (text, record) => {
                if (!parseInt(record.lk_goods_asales)) {
                    return parseInt(record.lk_rush_static) === 1 ? <div>0&nbsp;/&nbsp;<span className="orange-color">{record.lk_rush_num}</span></div> : <div>0</div>
                } else {
                    return parseInt(record.lk_rush_static) === 1 ? <div>{record.lk_goods_asales}&nbsp;/&nbsp;<span className="orange-color">{record.lk_rush_num}</span></div> : <div>{record.lk_goods_asales}</div>
                }
            }
        }, {
            title: '显示销量',
            dataIndex: 'lk_goods_dsales',
            render: (text, record) => {
                if (!record.lk_goods_asales || record.lk_goods_asales === 0) {
                    return 0
                } else {
                    return record.lk_goods_dsales
                }
            }
        }, {
            title: '操作',
            render: (text, record, index) => {
                return <div className="goods-operate">
                    {
                        parseInt(record.lk_file_switch) === 1 ? (
                            <div>
                                <a onClick={() => this.showLageImg(`${URL}${record.lk_goods_file2}`)}>预览大图</a>
                            </div>
                        ) : ''
                    }
                    <a onClick={() => {
                        this.props.actions.selectGoodGet(record)
                        this.setState({visible: true})
                    }}>详情</a>
                    {
                        role === 1 ? (
                            <a onClick={() => {
                                this.props.actions.selectGoodGet(record)
                                this.handleEdit('edit')
                            }}>编辑</a>
                        ) : (
                            navArr.indexOf('goods-edit') !== -1 ? (
                                <a onClick={() => {
                                    this.props.actions.selectGoodGet(record)
                                    this.handleEdit('edit')
                                }}>编辑</a>
                            ) : ''
                        )
                    }
                    <a onClick={() => {
                        this.showConfirm(text)
                    }}>{text.lk_goods_static === '1' ? '商品下架' : '重新上架'}</a>
                    <a onClick={() => {
                        this.deleteConfirm(text)
                    }}>删除</a>
                </div>
            }
        }]
        this.state = {
            'currPage': 1,
            'pageSize': 10,
            'totalCount': 0,
            selectedRowKeys: [],
            query: {},
            visible: false,
            status: false,
            all: '',
            onSale: '',
            offSale: '',
            lageImgShow: false,
            lageImgUrl: ''
        }
    }
    showModal = () => {
        this.setState({
            visible: true
        })
    }
    handleOk = (e) => {
        this.setState({
            visible: false
        })
    }
    handleCancel = (e) => {
        this.setState({
            visible: false
        })
    }

    // 定时任务是否在有效期内
    isInDate = (start, end) => {
        let now = new Date().getTime() / 1000
        if (now < parseInt(start)) {
            return 1
        } else if (now > parseInt(end)) {
            return -1
        } else {
            return 2
        }
    }

    componentDidMount () {
        gameIdCookie()
        this.showModal()
        window.addEventListener('keydown', this.handleKeyDown)
    }
    componentWillMount () {
        this.getGoodsSum()
        this.props.actions.columnListGet()
        const {query} = this.state
        let _sendData = {...query, 'lk_game_id': $.cookie('gameId')}
        this.setState({'query': _sendData})
        this.getList(_sendData)
        /* this.props.actions.goodsListGet({
            lk_game_id: $.cookie('gameId')
        }) */
    }
    // checkbox 选择事件
    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys})
    }
    // 显示 modal
    showModal = () => {
        this.setState({
            visible: false
        })
    }
    // modal 确定 按钮点击事件
    handleOk = (e) => {
        this.setState({
            visible: false
        })
    }
    // modal 取消 按钮点击事件
    handleCancel = (e) => {
        this.setState({
            visible: false
        })
    }
    // 大图预览
    showLageImg (imgUrl) {
        this.setState({
            lageImgShow: true,
            lageImgUrl: imgUrl
        })
    }
    // 搜索商品
    handleSubmit = () => {
        const { form } = this.props
        const {query} = this.state
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            if (values.lk_goods_static === '') {
                values = {
                    lk_column_id: parseInt(values.lk_column_id) || '',
                    lk_goods_name: values.lk_goods_name
                }
            }
            // values.lk_game_id = $.cookie('gameId')
            let _sendData = {...query, ...values}
            this.setState({'query': _sendData})
            this.getList(_sendData)
            // this.props.actions.goodsListGet(values)
            // form.resetFields()
        })
    }
    // 按enter键搜索
    handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.handleSubmit()
        }
    }
    // 新增商品
    handleEdit = (type) => {
        // this.props.actions.navigation(menuData[0].children[1].key, menuData[1].key)
        // this.props.actions.breadcrumb([menuData[1].text, menuData[1].children[0].text])
        !type ? hashHistory.push('/goods-edit') : hashHistory.push('/goods-edit/edit')
    }
    // 修改商品状态
    showConfirm = (text) => {
        let This = this
        const { form } = this.props
        const { query } = this.state
        let state = ''
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            state = values.lk_goods_static
        })
        let status = text.lk_goods_static === '1' ? '下架' : '重新上架'
        confirm({
            title: '提示',
            content: `确认要将此商品 ${status} 吗 ?`,
            onOk () {
                let arg = {}
                arg.lk_goods_id = text.lk_goods_id
                let values = {}
                values.lk_goods_static = state
                // values.lk_game_id = $.cookie('gameId')
                This.props.actions.goodsStatus(arg, () => {
                    let _sendData = {...query, ...values}
                    This.setState({'query': _sendData})
                    This.getList(_sendData)
                })
            },
            onCancel () {}
        })
    }
    // 删除商品
    deleteConfirm = (text) => {
        let This = this
        const { form } = this.props
        let status = ''
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            status = values.lk_goods_static
        })
        confirm({
            title: '提示',
            content: `确认要将此商品 删除 吗 ?`,
            onOk () {
                let arg = {}
                let values = {}
                values.lk_game_id = $.cookie('gameId')
                values.lk_goods_static = status
                arg.lk_goods_id = text.lk_goods_id
                This.props.actions.goodsDelete(arg, values)
            },
            onCancel () {}
        })
    }
    // 商品状态选择事件
    handleStaticSelect = (value) => {
        const { form } = this.props
        const {query} = this.state
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            if (values.lk_goods_static === '') {
                values = {
                    lk_column_id: parseInt(values.lk_column_id) || ''
                }
            }
            values.lk_goods_static = value
            // values.lk_game_id = $.cookie('gameId')
            let _sendData = {...query, ...values}
            this.setState({'query': _sendData})
            this.getList(_sendData)
            // this.props.actions.goodsListGet(values)
            // form.resetFields()
        })
    }

    // 专栏选择事件
    handleColumnSelect = (value) => {
        const { form } = this.props
        const {query} = this.state
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            values.lk_column_id = parseInt(value) || ''
            // values.lk_game_id = $.cookie('gameId')
            let _sendData = {...query, ...values}
            this.setState({'query': _sendData})
            this.getList(_sendData)
            // this.props.actions.goodsListGet(values)
            // form.resetFields()
        })
    }

    // 商品汇总数据
    getGoodsSum () {
        axiosAjax('post', '/goods_sum', {' lk_game_id': $.cookie('gameId')}, (res) => {
            if (res.code === 200) {
                let _data = res.data
                this.setState({
                    all: _data.goods_all,
                    onSale: _data.goods_top,
                    offSale: _data.goods_lower
                })
            }
        })
    }
    // 分页
    changePage (page) {
        const {query} = this.state
        this.setState({'currPage': page})
        this.getList({...query, 'page': page})
    }
    getList (sendData) {
        this.props.actions.goodsListGet(sendData)
        /* this.props.actions.goodsListGet(sendData, (res) => {
            this.setState({
                'totalCount': res.total,
                'pageSize': res.per_page,
                'currPage': res.current_page
            })
        }) */
    }

    render () {
        let This = this
        let modal = this.state.visible ? <Modal
            className="goods-detail-modal"
            title="商品详情"
            width="1000px"
            visible={true}
            onOk={this.handleOk}
            onCancel={this.handleCancel}>
            <GoodsDetail data={this.props.selectGood}/>
        </Modal> : ''
        const {selectedRowKeys} = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }
        const {getFieldDecorator} = this.props.form
        const {all, onSale, offSale} = this.state
        return <div className="goods-list">
            <div className="check-condition">
                <FormItem >
                    {getFieldDecorator('lk_goods_static', {
                        initialValue: '',
                        onChange: function (e) {
                            This.handleStaticSelect(e.target.value)
                        }
                    })(<RadioGroup size="large">
                        <RadioButton value="">全部商品&nbsp;&nbsp;{all}</RadioButton>
                        <RadioButton value="1">出售中&nbsp;&nbsp;{onSale}</RadioButton>
                        <RadioButton value="2">已下架&nbsp;&nbsp;{offSale}</RadioButton>
                    </RadioGroup>)}
                </FormItem>
                <div className="check-search clearfix">
                    <div className="check-search-left">
                        <div className="goodsProLabel">商品专栏：</div>
                        <FormItem>
                            {getFieldDecorator('lk_column_id', {
                                initialValue: '',
                                onChange: function (e) {
                                    This.handleColumnSelect(e)
                                }
                            })(<Select style={{minWidth: 150}}>
                                <Option value=''>请选择专栏</Option>
                                {this.props.columnListArr.map((d, i) => {
                                    return <Option
                                        key={d.lk_column_id}
                                        value={`${d.lk_column_id}`}>{d.lk_column_name}</Option>
                                })}
                            </Select>)}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('lk_goods_name', {
                                initialValue: ''
                            })(<Input placeholder="请输入商品名称"/>)}
                        </FormItem>
                        <Button type="primary" size="large" icon="search" onClick={this.handleSubmit} onKeyDown={this.handleKeyDown}>搜索</Button>
                    </div>
                    <div className="check-search-right">
                        <Button type="primary" size="large" icon="plus" onClick={() => this.handleEdit()}>新增商品</Button>
                        <Button type="primary" size="large" disabled icon="delete">删除</Button>
                        <Button type="primary" size="large" disabled icon="arrow-down">下架</Button>
                    </div>
                </div>
                <div>
                    {/* <Table rowSelection={rowSelection} columns={this.columns} dataSource={this.props.goodsListArr} bordered pagination={{current: this.state.currPage, total: this.state.totalCount, pageSize: this.state.pageSize, onChange: (page) => this.changePage(page)}}/> */}
                    <Table rowSelection={rowSelection} columns={this.columns} dataSource={this.props.goodsListArr} bordered />
                </div>
            </div>
            {modal}
            <ShowImg isShow={this.state.lageImgShow} close={() => this.setState({'lageImgShow': false})} imgUrl={this.state.lageImgUrl} />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        navArr: state.other.navArr,
        goodsListArr: state.goodsListArr,
        columnListArr: state.columnListArr,
        selectGood: state.selectGood
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({goodsDelete, goodsStatus, goodsListGet, selectGoodGet, columnListGet, navigation, breadcrumb}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(GoodsList))
