/**
 * Author：zhoushuanglong
 * Time：2017/7/27
 * Description：root route
 */

import React from 'react'
import { Route, IndexRoute } from 'react-router'

const rootRoutes = <div>
    <Route path="/" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../containers/Main/hasHeader').default)
        }, 'HasHeader')
    }}>
        <IndexRoute getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/Enter').default)
            }, 'Enter')
        }}/>
        <Route path='/enter' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/Enter').default)
            }, 'Enter')
        }}/>
        <Route path='/system' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/System/user.permission').default)
            }, 'UserPermission')
        }}/>
    </Route>
    <Route path="/" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../containers/Main').default)
        }, 'Main')
    }}>
        <IndexRoute getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/GoodsList').default)
            }, 'GoodsList')
        }}/>
        <Route path='/goods-list' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/GoodsList').default)
            }, 'GoodsList')
        }}/>
        <Route path='/goods-edit/:type' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/GoodsEdit').default)
            }, 'GoodsEdit')
        }}/>
        <Route path='/gameConfig' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/Config/game.config').default)
            }, 'GameConfig')
        }}/>
        <Route path='/recommendConfig' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/Config/recommend.config').default)
            }, 'RecommendConfig')
        }}/>
        <Route path='/columnConfig' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/Config/column.config').default)
            }, 'ColumnConfig')
        }}/>
        <Route path='/testUserConfig' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/Config/test.user').default)
            }, 'TestUser')
        }}/>
        <Route path='/order' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/OrderManage/order.index').default)
            }, 'OrderMange')
        }}/>
        <Route path='/data' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/Data/data.index').default)
            }, 'Data')
        }}/>
        <Route path='/redeem' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/redeem/redeem.index').default)
            }, 'RedeemData')
        }}/>
    </Route>
    <Route path='/login' getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../containers/Login').default)
        }, 'Login')
    }}/>
</div>

export default rootRoutes
