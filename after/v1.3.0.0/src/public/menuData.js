/**
 * Author：zhoushuanglong
 * Time：2017/7/27
 * Description：menu data
 */

/* const menuData = [
    {
        key: 'enter',
        icon: 'home',
        link: '/',
        text: '进入'
    }, {
        key: 'production',
        icon: 'home',
        link: '',
        text: '商品管理',
        children: [
            {
                key: 'goodsList',
                icon: 'home',
                link: '/goods-list',
                text: '商品列表'
            }, {
                key: 'goodsEdit',
                icon: 'home',
                link: '/goods-edit/edit',
                text: '商品管理'
            }
        ]
    }, {
        key: 'productionIndex',
        icon: 'home',
        link: '',
        text: '商品首页配置',
        children: [
            {
                key: 'gameConfig',
                icon: 'home',
                link: '/gameConfig',
                text: '游戏配置'
            }, {
                key: 'recommendConfig',
                icon: 'home',
                link: '/recommendConfig',
                text: '推荐位配置'
            }, {
                key: 'specialConfig',
                icon: 'home',
                link: '/columnConfig',
                text: '专栏配置'
            }
        ]
    }, {
        key: 'order',
        icon: 'home',
        link: '/order',
        text: '订单管理'
    }, {
        key: 'jurisdiction',
        icon: 'home',
        link: '/system',
        text: '系统权限'
    }
] */
const menuData = [
    {
        key: 'production',
        icon: 'home',
        link: '',
        text: '商品管理',
        children: [
            {
                key: 'goods-list',
                icon: 'home',
                link: '/goods-list',
                text: '商品列表'
            }, {
                key: 'goods-edit',
                icon: 'home',
                link: '/goods-edit/edit',
                text: '新增商品'
            }
        ]
    }, {
        key: 'config',
        icon: 'home',
        link: '',
        text: '商品首页配置',
        children: [
            {
                key: 'gameConfig',
                icon: 'home',
                link: '/gameConfig',
                text: '游戏配置'
            }, {
                key: 'recommendConfig',
                icon: 'home',
                link: '/recommendConfig',
                text: '推荐位配置'
            }, {
                key: 'specialConfig',
                icon: 'home',
                link: '/columnConfig',
                text: '专栏配置'
            }
        ]
    }, {
        key: 'order',
        icon: 'home',
        link: '/order',
        text: '订单管理'
    }, {
        key: 'data',
        icon: 'home',
        link: '/data',
        text: '数据概览'
    }, {
        key: 'redeem',
        icon: 'home',
        link: '/redeem',
        text: '兑换码查询'
    }
]
export default menuData
