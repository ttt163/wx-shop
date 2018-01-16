/**
 * Author：tantingting
 * Time：2017/12/1
 * Description：Description
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.scss'
import {REDEEMTYPE} from '../../public/index'
import copy from 'copy-to-clipboard'
import Tip from '../../components/Tip/index'
import NoData from '../../components/NoData/index'
// import { Link } from 'react-router'
import {getRedeembData, addRedeemData} from '../../actions/redeem.action'
import {addOtherData} from '../../actions/index'
class RedeemIndex extends Component {
    constructor (props) {
        super(props)
        this.state = {
            currTap: 'all',
            tipIsShow: false
        }
    }
    changeTap (key) {
        this.setState({currTap: key})
    }
    copyText (text) {
        copy(text)
        this.setState({tipIsShow: true})
    }
    componentWillMount () {
        const {dispatch} = this.props
        dispatch(addOtherData({'title': '我的兑换码'}))
        dispatch(addOtherData({'LoadingShow': true}))
        dispatch(getRedeembData())
        dispatch(getRedeembData())
    }
    componentWillUnmount () {
        this.props.dispatch(addRedeemData({'list': []}))
    }
    render () {
        // const {all} = this.props
        const {currTap} = this.state
        let _tapData = this.props[currTap]
        return <div className="h100">
            <div className="redeem">
                <div className="tap">
                    {
                        Object.keys(REDEEMTYPE).map((k, i) => (
                            <div key={i} onClick={() => this.changeTap(k)} className={currTap === k ? 'active' : ''}>{REDEEMTYPE[k]}</div>
                        ))
                    }
                    {/* <div onClick={() => this.changeTap('1')} className={this.state.currTap === '1' ? 'active' : ''}>已兑换（2）</div> */}
                </div>
                <div className="contain">
                    {/* <NoData text='没有对应的兑换码信息！' /> */}
                    <div>
                        {/* <div className={this.state.currTap === '1' ? 'item used' : 'item'} >
                            <div className="info">
                                <div>兑换码商品兑换码商品</div>
                                <h4>XXHHXXHH</h4>
                                <div>DD12312313333</div>
                            </div>
                            <div onClick={() => this.state.currTap !== '1' ? this.copyText('XXHHXXHH') : ''} className="btn">点击<br />复制</div>
                        </div> */}
                        {
                            !_tapData.length ? <NoData text='没有对应的兑换码信息！' /> : _tapData.map((item, index) => (
                                <div key={index} className={!parseInt(item.status) ? 'item' : 'item used'}>
                                    <div className="info">
                                        <h5>{item.goods_name}</h5>
                                        <h4>{item.code}</h4>
                                        <div>订单：{item.order_id}</div>
                                    </div>
                                    <div onClick={() => !parseInt(item.status) ? this.copyText(item.code) : ''} className="btn">复制<br />兑换码</div>
                                </div>
                            ))
                        }
                        {/* used */}
                        {/* <div className="item used">
                            <div className="info">
                                <div>兑换码商品兑换码商品</div>
                                <h4 id="copyText">XXHHXXHH</h4>
                                <div>DD12312313333</div>
                            </div>
                            <div className="btn">点击<br />复制</div>
                        </div> */}
                    </div>
                    {/* <div><NoData text='没有对应的兑换码信息！' /></div>
                    <div><NoData text='没有对应的兑换码信息！' /></div> */}
                </div>
            </div>
            <Tip text="已复制" isShow={this.state.tipIsShow} onClose={() => this.setState({tipIsShow: false})} />
        </div>
    }
}
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        all: state.redeemData.list,
        not: state.redeemData.list.filter((item, index) => {
            return parseInt(item.status) === 0
        }),
        has: state.redeemData.list.filter((item, index) => {
            return parseInt(item.status) === 1
        })
    }
}
export default connect(mapStateToProps)(RedeemIndex)
