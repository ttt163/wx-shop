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
import $ from 'jquery'

import 'babel-polyfill'
import rootRoutes from './routes'
import store from './store/index'

import './public/index.scss'

const history = syncHistoryWithStore(hashHistory, store)

$('body').append('<div id="root"></div>')
render(<Provider store={store}>
    <Router history={history}>
        {rootRoutes}
    </Router>
</Provider>, document.getElementById('root'))
