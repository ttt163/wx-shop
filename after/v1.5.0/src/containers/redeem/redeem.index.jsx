/**
 * Author：tantingting
 * Time：2017/11/30
 * Description：Description
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Row, Col, Input, Button, Table} from 'antd'
import {axiosAjax, GOODSTATUS, formatDate, toFixed2} from '../../public/index'
// import './index.scss'
const columns = [{
    title: '子道具ID',
    dataIndex: 'item_code',
    key: '1'
}, {
    title: '子道具名称',
    dataIndex: 'item_name',
    key: '2'
}, {
    title: '子道具数量',
    dataIndex: 'item_num',
    key: '3'
}]
class RedeemData extends Component {
    constructor () {
        super()
        this.state = {
            actCode: '',
            tableData: [],
            codeInfo: {}
        }
    }
    getCodeInfo (actCode) {
        // const {codeInfo} = this.state
        if (!actCode) {
            this.setState({'codeInfo': {}, 'tableData': []})
            return
        }
        axiosAjax('GET', '/check_code', {'lk_act_code': actCode}, (res) => {
            // console.log(res)
            if (res.code === 200) {
                let _data = res.data
                this.setState({'codeInfo': _data, 'tableData': !_data.c_data || !_data.c_data.data ? [] : _data.c_data.data})
            } else {
                this.setState({'codeInfo': {'c_data': {}, 'p_data': {}}, 'tableData': []})
            }
            // let data = res.data
        })
    }
    render () {
        const {actCode, codeInfo, tableData} = this.state
        let cData = codeInfo.c_data
        let pData = !codeInfo.p_data ? {} : codeInfo.p_data
        return <div className="redeem">
            <Row>
                <Col className="lh32 text-right mr5" span="2">兑换码：</Col>
                <Col span="4">
                    <Input value={actCode} onChange={(e) => this.setState({'actCode': e.target.value})} placeholder="请输入需要查询的兑换码"/>
                </Col>
                <Col className="lh32 text-left" offset="1" span="2">
                    <Button type="primary" onClick={() => this.getCodeInfo(actCode)}>查询</Button>
                </Col>
            </Row>
            {
                !cData ? '' : (
                    <div className="mt60">
                        <Row>
                            <Col offset="1" span="18">
                                <div className="content-block mb30">
                                    <div className="title">
                                        <h4>兑换信息</h4>
                                    </div>
                                    <div className="box">
                                        <Row>
                                            <Col className="form-label" span={3} >兑换状态：</Col>
                                            <Col className="lh32" span={5} >{cData.serial_state === '0' ? <span className="red-color">未兑换</span> : cData.serial_state === '1' ? '已兑换' : <span className="zs-color">不存在</span>}</Col>
                                            <Col className="form-label" span={3} >兑换账号：</Col>
                                            <Col className="lh32" span={5} >{!cData.use_user_name || cData.serial_state === '0' ? '' : cData.use_user_name}</Col>
                                            <Col className="form-label" span={3} >兑换时间：</Col>
                                            <Col className="lh32" span={5} >{!cData.use_time || cData.serial_state === '0' ? '' : cData.use_time}</Col>
                                        </Row>
                                        <Row className="mt15">
                                            {/* <Col className="form-label" span={3} >买家昵称：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_passportName}</Col> */}
                                            <Col className="form-label" span={3} >兑换内容：</Col>
                                            <Col className="lh32" span={16} >
                                                {
                                                    !tableData.length ? '' : <Table pagination={false} size="small" bordered dataSource={tableData.map((item, index) => ({...item, 'key': index}))} columns={columns} />
                                                }
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className="content-block mb30">
                                    <div className="title">
                                        <h4>商品信息</h4>
                                    </div>
                                    <div className="box">
                                        <Row>
                                            {/* <Col className="form-label" span={3} >买家昵称：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_passportName}</Col> */}
                                            <Col className="form-label" span={3} >商品名称：</Col>
                                            <Col className="lh32" span={5} >{!pData.lk_goods_name ? '' : pData.lk_goods_name}</Col>
                                            <Col className="form-label" span={3} >商品状态：</Col>
                                            <Col className="lh32" span={5} >{!pData.lk_goods_static ? '' : GOODSTATUS[pData.lk_goods_static]}</Col>
                                            <Col className="form-label" span={3} >活动ID：</Col>
                                            <Col className="lh32" span={5} >{!pData.lk_activite_id ? '' : pData.lk_activite_id}</Col>
                                        </Row>
                                        <Row>
                                            {/* <Col className="form-label" span={3} >买家昵称：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_passportName}</Col> */}
                                            <Col className="form-label" span={3} >商品原价：</Col>
                                            <Col className="lh32" span={5} >{!pData.lk_goods_oprice ? '' : toFixed2(pData.lk_goods_oprice)}</Col>
                                            <Col className="form-label" span={3} >商品售价：</Col>
                                            <Col className="lh32" span={5} >{!pData.lk_goods_sprice ? '' : toFixed2(pData.lk_goods_sprice)}</Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className="content-block mb30">
                                    <div className="title">
                                        <h4>购买信息</h4>
                                    </div>
                                    <div className="box">
                                        <Row>
                                            {/* <Col className="form-label" span={3} >买家昵称：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_passportName}</Col> */}
                                            <Col className="form-label" span={3} >下单时间：</Col>
                                            <Col className="lh32" span={5} >{!pData.lk_order_time ? '' : formatDate(pData.lk_order_time, '.')}</Col>
                                            <Col className="form-label" span={3} >订单编号：</Col>
                                            <Col className="lh32" span={5} >{!pData.lk_order_id ? '' : pData.lk_order_id}</Col>
                                            <Col className="form-label" span={3} >购买账号：</Col>
                                            <Col className="lh32" span={5} >{!pData.lk_passportName ? '' : pData.lk_passportName}</Col>
                                        </Row>
                                        <Row>
                                            {/* <Col className="form-label" span={3} >买家昵称：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_passportName}</Col> */}
                                            <Col className="form-label" span={3} >选择平台：</Col>
                                            <Col className="lh32" span={5} >{!pData.lk_terrace ? '' : pData.lk_terrace}</Col>
                                            <Col className="form-label" span={3} >联系电话：</Col>
                                            <Col className="lh32" span={5} >{!pData.lk_tel ? '' : pData.lk_tel}</Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                )
            }
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        loginInfo: state.loginInfo
    }
}

export default connect(mapStateToProps)(RedeemData)
