/**
 * Author：zhoushuanglong
 * Time：2017/8/21
 * Description：goods detail
 */

import React, { Component } from 'react'
import { Table, Row, Col, Card } from 'antd'
import RichEditor from '../../components/RichEditor'
import { selectGoodGet } from '../../actions/goodsList'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {GOODSTYPE, URL} from '../../public/index'

import './index.scss'
// import $ from 'jquery'

class GoodsDetail extends Component {
    constructor () {
        super()
        this.columns = [{
            title: '子道具 ID',
            dataIndex: 'lk_itemCode_id'
        }, {
            title: '子道具数量',
            dataIndex: 'lk_itemCode_num'
        }]
    }
    componentWillUnmount () {
        this.props.actions.selectGoodGet({})
    }
    render () {
        let data = this.props.data
        let itemCode = []
        let key = !data.keys ? [] : data.keys.split(',')
        key.map((k, index) => {
            let obj = {}
            obj.key = index
            obj.lk_itemCode_id = data[`lk_itemCode_${index + 1}`].split(',')[0]
            obj.lk_itemCode_num = data[`lk_itemCode_${index + 1}`].split(',')[1]
            itemCode.push(obj)
        })
        let typeText = () => {
            switch (data.lk_quota_type) {
                case 'r':
                    return <span>角色</span>
                case 'w':
                    return <span>周</span>
                case 'd':
                    return <span>日</span>
                default:
                    return false
            }
        }
        let src = URL + data.lk_goods_file
        let oprice = data.lk_goods_oprice ? <em className="price-original">¥{`${data.lk_goods_oprice}`}</em> : ''
        return <div className="goods-detail">
            <Row className="goods-detail-info">
                <Col span={3}>
                    <div className="goods-img">
                        {data.lk_goods_file === '' ? <img src="http://reeoo.qiniudn.com/PracticalVR.png!main"/> : <img src= {src} />}
                        {parseInt(data.lk_goods_hot) === 2 ? <div className="hot-img"></div> : ''}
                        <div className="goods-root">{data.lk_goods_quota === 'android' ? '仅限安卓' : '仅限IOS'}</div>
                    </div>
                </Col>
                <Col span={21}>
                    <Row>
                        <Col span={24}>
                            <h3>{data.lk_goods_name}&nbsp;&nbsp;【{!data.lk_goods_type ? '普通商品' : GOODSTYPE[data.lk_goods_type]}】</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={9}>
                            <p>{`专栏类型：${data.lk_column_name}`}</p>
                            <p>{`限购平台：${data.lk_goods_quota === 'android' ? '安卓' : 'iOS'}`}</p>
                        </Col>
                        <Col span={8}>
                            {data.lk_goods_type === '2' ? <p>{`透传字段：${!data.lk_attch_code ? '' : data.lk_attch_code}`}</p> : <p>{`商品活动ID：${data.lk_activite_id}`}</p>}
                            <p>限购数量：按{typeText() || '角色'}限购，每{typeText() || '角色'}限购 <span> {data.lk_quota_count} </span> 个</p>
                        </Col>
                        <Col span={7} className="text-right">
                            <em className="price-show">¥{`${data.lk_goods_sprice}`}</em>
                            {oprice}
                            {
                                <span className={data.lk_goods_static === '1' ? 'goods-state on' : 'goods-state'}>
                                    {data.lk_goods_static === '1' ? '出售中' : '已下架'}
                                </span>
                            }
                            {/* <Button type="primary" size="large">{data.lk_goods_static === '1' ? '出售中' : '已下架'}</Button> */}
                        </Col>
                    </Row>
                </Col>
            </Row>
            {data.lk_goods_type === '2' ? '' : (
                <Row>
                    <Col span="24">
                        <Table className="itemCodeTable" columns={this.columns} pagination={false} dataSource={itemCode} bordered/>
                    </Col>
                </Row>
            )}
            <Row>
                <Col span="24">
                    <Card className="goods-detail-description" title="商品描述">
                        <RichEditor setRichHtml={data.lk_goods_describe} readOnly={true} />
                    </Card>
                </Col>
            </Row>
        </div>
    }
}

const mapStateToProps = () => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ selectGoodGet }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsDetail)
