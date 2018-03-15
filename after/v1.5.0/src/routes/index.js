/**
 * Author：zhoushuanglong
 * Time：2017/7/27
 * Description：root route
 */

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import {message} from 'antd'
const requireAuth = (nextState, replace) => {
    let role = $.cookie('role')
    if (parseInt(role) !== 1) {
        let NavDatas = $.cookie('shopNav').split(',')
        let thisPathName = nextState.location.pathname
        let pathKey = thisPathName.substring(1)
        if (pathKey === 'system') {
            message.warning('对不起，您没有此权限！')
            replace({ pathname: '/login' }) // 路由转发
        } else if (pathKey.indexOf('goods-edit') !== -1) {
            if (NavDatas.indexOf('goods-edit') === -1) {
                message.warning('对不起，您没有此权限！')
                replace({ pathname: '/login' }) // 路由转发
            }
        } else {
            if (NavDatas.indexOf(pathKey) === -1) {
                message.warning('对不起，您没有此权限！')
                replace({ pathname: '/login' }) // 路由转发
            }
        }
    }
}
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
        <Route path='/system' onEnter={requireAuth} getComponent={(nextState, callback) => {
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
        <Route onEnter={requireAuth} path='/goods-list' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/GoodsList').default)
            }, 'GoodsList')
        }}/>
        <Route onEnter={requireAuth} path='/goods-edit(/:type)' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/GoodsEdit').default)
            }, 'GoodsEdit')
        }}/>
        <Route path='/config-game' onEnter={requireAuth} getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/Config/game.config').default)
            }, 'GameConfig')
        }}/>
        <Route onEnter={requireAuth} path='/config-recommend' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/Config/recommend.config').default)
            }, 'RecommendConfig')
        }}/>
        <Route onEnter={requireAuth} path='/config-column' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/Config/column.config').default)
            }, 'ColumnConfig')
        }}/>
        <Route onEnter={requireAuth} path='/config-testUser' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/Config/test.user').default)
            }, 'TestUser')
        }}/>
        <Route onEnter={requireAuth} path='/order' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/OrderManage/order.index').default)
            }, 'OrderMange')
        }}/>
        <Route onEnter={requireAuth} path='/data' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/Data/data.index').default)
            }, 'Data')
        }}/>
        <Route onEnter={requireAuth} path='/redeem' getComponent={(nextState, callback) => {
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
