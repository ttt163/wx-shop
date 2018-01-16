/**
 * Author：tantingting
 * Time：2017/12/27
 * Description：Description
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Table, Modal, Radio } from 'antd'
import './config.scss'
// import {getColumnList} from '../../actions/column.action'
import {GOODSTATUS, GOODSTYPE, URL} from '../../public/index'
import {edittGoodsList, editColumnGoodsSort} from '../../actions/goods.action'
let columns = []
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
class GoodsSort extends Component {
    constructor (props) {
        super(props)
        this.state = {
            'goodsType': '1',
            currPage: 1,
            'currList': props.onSale
        }
    }
    componentWillMount () {
        columns = [{
            title: '商品名称',
            key: 1,
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
            key: 2,
            className: 'goods_file',
            render: (text, record) => {
                return <img style={{'width': '60px'}} src={record.lk_goods_file ? URL + record.lk_goods_file : ''} alt=""/>
            }
        }, {
            title: '商品类型',
            key: 3,
            render: (record) => {
                return !record.lk_goods_type || record.lk_goods_type === null ? '普通商品' : GOODSTYPE[record.lk_goods_type]
            }
        }, {
            title: '商品状态',
            key: 4,
            render: (text, record) => {
                return <span className={record.lk_goods_static === '1' ? 'blue-color' : 'gray-color'}>{GOODSTATUS[record.lk_goods_static]}</span>
            }
        }, {
            title: '商品显示顺序',
            key: 5,
            width: '20%',
            dataIndex: 'lk_column_sort',
            render: (text, record) => {
                return <Input value={record.lk_goods_sort} onBlur={(e) => this.editSort(e, record.lk_goods_id)} onChange={(e) => { this.changeSort(e, record) }} style={{'width': '50%'}} />
            }
        }]
    }
    editSort (e, goodsId) {
        const {dispatch, data} = this.props
        dispatch(editColumnGoodsSort({'lk_goods_sort': e.target.value, 'lk_goods_id': goodsId, lk_column_id: data.lk_column_id}))
    }
    changeSort (e, data) {
        const {dispatch} = this.props
        const {goodsType} = this.state
        dispatch(edittGoodsList({'lk_goods_sort': e.target.value}, data.key, goodsType))
    }
    changeType (e) {
        const {onSale, offSale} = this.props
        this.setState({
            'goodsType': e.target.value,
            'currList': parseInt(e.target.value) === 1 ? onSale : offSale
        })
        // dispatch(getGoodsList({
        //     'lk_game_id': $.cookie('gameId'),
        //     'lk_column_id': !data || !data.lk_column_id ? '' : data.lk_column_id,
        //     'lk_goods_static': e.target.value
        // }))
    }
    closeGoodsModal () {
        const {close} = this.props
        close()
        this.setState({
            'goodsType': '1'
        })
    }
    render () {
        const {visible, data, onSale, offSale} = this.props
        const {goodsType} = this.state
        let currList = parseInt(goodsType) === 1 ? onSale : offSale
        return (
            <Modal width={1000} className="common" title={`商品排序 ——${!data || !data.lk_column_name ? '' : data.lk_column_name}`} visible={visible} footer={null} onOk={() => this.closeGoodsModal()} onCancel={() => this.closeGoodsModal()} okText="确认" cancelText="取消">
                <div className="mlr30">
                    <RadioGroup size="large" value={goodsType} onChange={(e) => this.changeType(e)}>
                        {
                            Object.keys(GOODSTATUS).map((item, index) => (<RadioButton key={item} value={item}>{GOODSTATUS[item]}&nbsp;{parseInt(item) === 1 ? onSale.length : offSale.length}</RadioButton>))
                        }
                    </RadioGroup>
                    <Table className="center-table mt20" columns={columns} dataSource={!currList.length ? [] : currList.map((item, index) => ({...item, key: index}))} bordered pagination={{pageSize: 5}}/>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        list: !state.goodsData.list ? [] : state.goodsData.list,
        onSale: !state.goodsData.onSale ? [] : state.goodsData.onSale,
        offSale: !state.goodsData.offSale ? [] : state.goodsData.offSale
    }
}

export default connect(mapStateToProps)(GoodsSort)
