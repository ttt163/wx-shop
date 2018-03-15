/**
 * Author：tantingting
 * Time：2018/2/28
 * Description：Description
 */
import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { Link } from 'react-router'
import menuData from '../../public/menuData'
import { Menu, Icon } from 'antd'
import {getCrumbKey} from '../../public/index'
const {SubMenu, Item} = Menu

class Left extends Component {
    render () {
        const {location} = this.props
        let navArr = !$.cookie('shopNav') ? [] : $.cookie('shopNav').split(',')
        let role = parseInt($.cookie('role'))
        return <Menu
            className="shop-menu"
            selectedKeys={getCrumbKey(location)}
            defaultOpenKeys={getCrumbKey(location)}
            mode="inline">
            {menuData.map(d => {
                if (d.children) {
                    if (role !== 1) {
                        if (navArr.indexOf(d.key) !== -1) {
                            return <SubMenu
                                key={d.key}
                                title={<span><Icon type={d.icon}/>{d.text}</span>}>
                                {d.children.map(data => {
                                    if (navArr.indexOf(data.key) !== -1) {
                                        return (
                                            <Item key={data.key}>
                                                <span><Icon type={data.icon}/><span>{data.text}</span></span>
                                                <Link to = {{'pathname': data.link}}/>
                                            </Item>
                                        )
                                    }
                                })}
                            </SubMenu>
                        }
                    } else {
                        return <SubMenu
                            key={d.key}
                            title={<span><Icon type={d.icon}/>{d.text}</span>}>
                            {d.children.map(data => {
                                return (
                                    <Item key={data.key}>
                                        <span><Icon type={data.icon}/><span>{data.text}</span></span>
                                        <Link to = {{'pathname': data.link}}/>
                                    </Item>
                                )
                            })}
                        </SubMenu>
                    }
                } else {
                    if (role !== 1) {
                        if (navArr.indexOf(d.key) !== -1) {
                            return (
                                <Item key={d.key}>
                                    <span><Icon type={d.icon}/><span>{d.text}</span></span>
                                    <Link to = {{'pathname': d.link}}/>
                                </Item>
                            )
                        }
                    } else {
                        return (
                            <Item key={d.key}>
                                <span><Icon type={d.icon}/><span>{d.text}</span></span>
                                <Link to = {{'pathname': d.link}}/>
                            </Item>
                        )
                    }
                }
            })}
        </Menu>
    }
}

// const mapStateToProps = (state) => {
//     return {
//         navArr: state.other.navArr
//     }
// }

export default Left
// export default connect(mapStateToProps)(Left)
