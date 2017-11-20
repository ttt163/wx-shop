/**
 * Author：tantingting
 * Time：2017/8/21
 * Description：Description
 */
import React, { Component } from 'react'
import { Icon, Modal, message } from 'antd'

class ImgUpLoadItem extends Component {
    constructor (props) {
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [...props.fileList]
        }
    }

    handleCancel = () => this.setState({previewVisible: false})

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        })
    }

    handleChange = ({fileList}) => {
        console.log(fileList)
        let _fileList = fileList.slice(1)
        fileList.length < 2 ? this.setState({fileList}) : this.setState({fileList: _fileList})
    }

    beforeUpload (file) {
        const isImg = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isImg) {
            message.error('只能上传格式JPEG和PNG的文件!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            message.error('图片必须小于2MB!')
        }
        console.log(file)
        return isImg && isLt2M
    }
    customRequest (e) {
        console.log(e)
    }
    test () {}
    render () {
        const {previewVisible, previewImage} = this.state
        return <div className="clearfix">
            <div className="ant-upload ant-upload-select ant-upload-select-picture-card" onClick={() => this.test()}>
                <span tabIndex="0" className="ant-upload" role="button">
                    <input type="file"  accept="" style={{display: 'none'}} onClick={() => this.upLoadFile()} />
                    <div>
                        <Icon type="plus"/>
                        <div className="ant-upload-text">Upload</div>
                    </div>
                </span>
            </div>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
        </div>
    }
}

export default ImgUpLoadItem
