/**
 * Author：tantingting
 * Time：2017/10/13
 * Description：Description
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Icon, Input } from 'antd'

let uuid = 1

class DynamicFieldSet extends Component {
    constructor (props) {
        super(props)
        let itemCode = []
        let _data = []
        let _thiskeys = [] // 处理后的keys
        if (!props.update) {
            itemCode = []
            _data.push({'id': '', 'num': ''})
            _thiskeys = [1]
        } else {
            let _keys = !props.selectGood.keys ? [] : props.selectGood.keys.split(',')
            uuid = _keys.length
            for (let i = 0; i < _keys.length; i++) {
                // let _k = _keys[i]
                let _k = i + 1
                let _thisItemCode = props.selectGood[`lk_itemCode_${_k}`]
                let _dataArr = _thisItemCode.split(',')
                itemCode.push(_thisItemCode)
                _data.push({'id': _dataArr[0], 'num': _dataArr[1]})
                _thiskeys.push(_k)
            }
        }
        this.state = {
            keys: _thiskeys,
            lk_itemCode: itemCode,
            data: _data
        }
        this.props.setFieldData(_data)
        props.form.getFieldDecorator('keys', { initialValue: _thiskeys })
    }
    remove = (k, index) => {
        const {form} = this.props
        const keys = form.getFieldValue('keys')
        if (keys.length === 1) {
            return
        }
        form.setFieldsValue({
            keys: keys.filter(key => key !== k)
        })
        let _data = this.state.data
        _data = [
            ..._data.slice(0, index),
            ..._data.slice(index + 1)
        ]
        this.setState({'data': _data})
        this.props.setFieldData(_data)
        if (!this.props.update) {} else {
            let _itemCode = this.state.lk_itemCode
            if (_itemCode.length > 0) {
                _itemCode = [
                    ..._itemCode.slice(0, index),
                    ..._itemCode.slice(index + 1)
                ]
                this.setState({'lk_itemCode': _itemCode})
            }
        }
    }

    add = () => {
        const {form} = this.props
        uuid++
        const keys = form.getFieldValue('keys')
        const nextKeys = keys.concat(uuid)
        form.setFieldsValue({
            keys: nextKeys
        })
        let _data = this.state.data
        _data = [..._data, {'id': '', 'num': ''}]
        this.setState({data: _data})
        this.props.setFieldData(_data)
    }
    changeData (field, value, index, key) {
        let data = {[field]: value}
        let _data = this.state.data
        let _thisData = _data[index]
        _data = [
            ..._data.slice(0, index),
            {..._thisData, ...data},
            ..._data.slice(index + 1)
        ]
        this.setState({'data': _data})
        this.props.setFieldData(_data)
        this.props.form.setFieldsValue({[`${field}_${key}`]: value})
    }
    render () {
        const {formItemGood, formItemNum, formItemLayout, form, FormItem, update} = this.props
        const {getFieldDecorator, getFieldValue} = form
        const keys = getFieldValue('keys')
        return <div>
            <FormItem label="商品道具ID" {...formItemLayout}>
                <Button disabled={keys.length === 10} type="dashed" onClick={this.add} style={{ width: '43%' }}>
                    <Icon type="plus" /> 增加道具
                </Button>
            </FormItem>
            {
                keys.map((k, index) => {
                    let itemCode = !update || !this.state.lk_itemCode[index] ? [] : this.state.lk_itemCode[index].split(',')
                    return (
                        <Row key={k}>
                            <Col span="5" offset={1}>
                                <FormItem label={`子道具 ${index + 1} ID`} {...formItemGood} required={false}>
                                    {getFieldDecorator(`id_${k}`, {
                                        initialValue: !update || !itemCode.length ? '' : itemCode[0],
                                        validateTrigger: ['onChange', 'onBlur'],
                                        rules: [{
                                            required: true,
                                            whitespace: true,
                                            message: '请输入ID'
                                        }]
                                    })(
                                        <Input onChange={(e) => this.changeData('id', e.target.value, index, k)} placeholder="请输入ID" style={{ marginRight: 8 }} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span="5" offset={1}>
                                <FormItem label={`子道具 ${index + 1} 个数`} {...formItemNum} required={false}>
                                    {getFieldDecorator(`num_${k}`, {
                                        initialValue: !update ? '' : itemCode[1],
                                        validateTrigger: ['onChange', 'onBlur'],
                                        rules: [
                                            {required: true, whitespace: true, message: '请输入道具个数'},
                                            {pattern: /^[0-9]*$/, message: '请输入正整数'}
                                        ]
                                    })(
                                        <Input onChange={(e) => this.changeData('num', e.target.value, index, k)} placeholder="请输入道具个数" style={{ marginRight: 8 }} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span="1">
                                {keys.length > 1 ? (<Icon className="dynamic-delete-button" type="minus-circle-o" disabled={keys.length === 1} onClick={() => this.remove(k, index)}/>) : null}
                            </Col>
                        </Row>
                    )
                })
            }
        </div>
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        gameListInfo: state.gameListInfo
    }
}

export default connect(mapStateToProps)(DynamicFieldSet)
