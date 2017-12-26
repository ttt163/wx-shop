/**
 * Author：tantingting
 * Time：2017/8/21
 * Description：Description
 */
import React, { Component } from 'react'
import { Upload, Icon, Modal, message } from 'antd'

class ImgUpLoad extends Component {
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

    render () {
        const {previewVisible, previewImage, fileList} = this.state
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        return <div className="clearfix">
            <Upload
                action={this.props.action}
                listType="picture-card"
                fileList={fileList}
                beforeUpload={this.beforeUpload}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
            >
                {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
        </div>
    }
}

export default ImgUpLoad
