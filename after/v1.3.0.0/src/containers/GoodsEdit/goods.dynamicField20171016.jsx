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
        console.log(props)
        this.state = {
            keys: !props.selectGood || !props.selectGood.keys ? [0] : props.selectGood.keys.split(',').map(i => parseInt(i)),
            lk_itemCode: ['0-16-0-0-0-0 ,5', '0-6-0-0-0-0 ,200', '0-5-0-0-0-0 ,100000'],
            data: [{'id': '', 'num': ''}]
        }
    }
    remove = (k, index) => {
        const {form} = this.props
        console.log(form.getFieldsValue())
        // const keys = this.state.keys
        const keys = form.getFieldValue('keys')
        // We need at least one passenger
        if (keys.length === 1) {
            return
        }

        // can use data-binding to set
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
    changeData (data, index) {
        // console.log(this.props.form.getFieldsValue())
        let _data = this.state.data
        let _thisData = _data[index]
        _data = [
            ..._data.slice(0, index),
            {..._thisData, ...data},
            ..._data.slice(index + 1)
        ]
        console.log(_data)
        this.setState({'data': _data})
        this.props.setFieldData(_data)
    }
    render () {
        const {formItemGood, formItemNum, formItemLayout, form, FormItem} = this.props
        const {getFieldDecorator, getFieldValue} = form
        // let k = this.state.keys
        getFieldDecorator('keys', { initialValue: [1] })
        const keys = getFieldValue('keys')
        console.log(this.state.data)
        return <div>
            <FormItem label="商品道具ID" {...formItemLayout}>
                <Button disabled={keys.length === 10} type="dashed" onClick={this.add} style={{ width: '43%' }}>
                    <Icon type="plus" /> 增加道具
                </Button>
            </FormItem>
            {
                keys.map((k, index) => {
                    return (
                        <Row key={k}>
                            <Col span="5" offset={1}>
                                <FormItem label={`子道具 ${index + 1} ID`} {...formItemGood} required={false}>
                                    {getFieldDecorator(`id_${k}`, {
                                        initialValue: '',
                                        validateTrigger: ['onChange', 'onBlur'],
                                        rules: [{
                                            required: true,
                                            whitespace: true,
                                            message: '请输入ID'
                                        }]
                                    })(
                                        <Input onChange={(e) => this.changeData({'id': e.target.value}, index)} placeholder="请输入ID" style={{ marginRight: 8 }} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span="5" offset={1}>
                                <FormItem label={`子道具 ${index + 1} 个数`} {...formItemNum} required={false}>
                                    {getFieldDecorator(`num_${k}`, {
                                        initialValue: '',
                                        validateTrigger: ['onChange', 'onBlur'],
                                        rules: [
                                            {required: true, whitespace: true, message: '请输入道具个数'},
                                            {pattern: /^[0-9]*$/, message: '请输入正整数'}
                                        ]
                                    })(
                                        <Input onChange={(e) => this.changeData({'num': e.target.value}, index)} placeholder="请输入道具个数" style={{ marginRight: 8 }} />
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
    return {
        gameListInfo: state.gameListInfo
    }
}

export default connect(mapStateToProps)(DynamicFieldSet)
