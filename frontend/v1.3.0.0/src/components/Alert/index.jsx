/**
 * Author：tantingting
 * Time：2017/8/23
 * Description：Description
 */
import React, { Component } from 'react'
import './index.scss'

class Alert extends Component {
    constructor () {
        super()
        this.state = {
            'isShow': false
        }
    }
    componentWillReceiveProps (nextProps) {
        this.setState({'isShow': nextProps.data.isShow})
        /* if (nextProps.data.isShow !== this.props.data.isShow) {
            this.setState({'isShow': nextProps.data.isShow})
        } */
    }
    close () {
        const { data, onClose } = this.props
        onClose()
        this.setState({'isShow': false})
        if (data.callBack != null) {
            data.callBack()
        }
    }
    render () {
        const { data } = this.props
        return <div className="alert-main" onClick={() => this.close()} style={{'display': !this.state.isShow ? 'none' : 'block'}}>
            <div>
                <div>
                    <div className="close" onClick={() => { this.close() }}>
                        <i className="iconfont icon-close"></i>
                    </div>
                    <div className="content">
                        <div>
                            <i className="iconfont icon-tip"></i>
                            <div>{data.msg}</div>
                        </div>
                        {
                            !data.tip ? '' : <p>提示：{data.tip}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Alert
