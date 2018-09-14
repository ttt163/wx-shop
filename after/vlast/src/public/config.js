/**
 * Author：tantingting
 * Time：2018/2/28
 * Description：Description
 */
// 导航key值
export const NavKey = {
    'goods': '商品管理',
    'goods-list': '商品列表',
    'goods-edit': '新增商品',
    'goods-edit/edit': '编辑商品',
    'config': '商品首页配置',
    'config-game': '游戏配置',
    'config-recommend': '推荐位配置',
    'config-column': '专栏配置',
    'config-testUser': '测试用户配置',
    'order': '订单管理',
    'data': '数据概览',
    'redeem': '兑换码查询'
}
// 导航对应id，与后台一致
// export const NavIdConfig = {
//     'goods-list': '2',
//     'goods-edit': '3',
//     'config-game': '4',
//     'config-recommend': '5',
//     'config-column': '6',
//     'config-testUser': '7',
//     'order': '8',
//     'data': '9',
//     'redeem': '10'
// }
export const NavIdConfig = {
    '2': 'goods-list', // 商品列表 2
    '3': 'goods-edit', // 新增商品 3
    '4': 'config-game', // 游戏配置 4
    '5': 'config-recommend', // 推荐位配置 5
    '6': 'config-column', // 专栏配置 6
    '7': 'config-testUser', // 测试用户配置 7
    '8': 'order', // 订单管理 8
    '9': 'data', // 数据概览 9
    '10': 'redeem' // 兑换码查询 10
}

// 0普通用户，1管理员
export const userRole = {
    '0': '用户',
    '1': '管理员'
}

// 限购平台
export const goodsPlatform = {
    'iOS': 'iOS',
    'Android': '安卓'
}
