/**
 * Author：zhoushuanglong
 * Time：2017/7/27
 * Description：root route
 */

import React from 'react'
import { Route } from 'react-router'

const rootRoutes = <div>
    <Route path='/order' getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../containers/Order').default)
        }, 'Order')
    }}/>
    <Route path='/detail' getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../containers/Detail').default)
        }, 'Detail')
    }}/>
    <Route path='/redeem' getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../containers/Redeem').default)
        }, 'RedeemIndex')
    }}/>
    <Route path='/(:path)' getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../containers/Index').default)
        }, 'Index')
    }}/>
    {/* <Route path='/login' getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../containers/Login').default)
        }, 'Login')
    }}/> */}
</div>

export default rootRoutes
