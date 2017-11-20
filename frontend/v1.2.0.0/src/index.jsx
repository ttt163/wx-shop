/**
 * Author：zhoushuanglong
 * Time：2017/7/27
 * Description：outer jsx
 */

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
// import initReactFastclick from 'react-fastclick'
import $ from 'jquery'

import 'babel-polyfill'
import rootRoutes from './routes'
import store from './store/index'

import './public/index.scss'

import './public/iconfont.scss'

const history = syncHistoryWithStore(hashHistory, store)
// initReactFastclick()
/* window.addEventListener('popstate', function (e) {
    // alert('我监听到了浏览器的返回按钮事件啦')
    // console.log(history.state)
    console.log(e)
    if (location.href.indexOf('tapList') !== -1) {
        console.log(111)
        window.history.replaceState({}, '', '#')
    }
    // window.history.pushState(state, 'title', '#')
}, false)
window.addEventListener('hashchange', function (ev) {
    console.log(2222)
    console.log(ev)
}) */

$('body').append('<div id="root"></div>')
render(<Provider store={store}>
    <Router history={history}>
        {rootRoutes}
    </Router>
</Provider>, document.getElementById('root'))
