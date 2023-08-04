//在前端路由和菜单生成时使用，用于管理页面的跳转和导航
export const routes = [
    {path: '/category', moduleName: 'Category'},
    {path: '/product', moduleName: 'Product'},
    {path: '/retail', moduleName: 'Retail'},
    {path: '/return', moduleName: 'Return'},
    {path: '/adminList', moduleName: 'AdminList'},
    {path: '/recommend', moduleName: 'Recommend'},
    {path: '/index', moduleName: 'Index'},
    {path: '/updatepwd', moduleName: 'UpdatePwd'},
];

//构建导航菜单
export const menu = [
    {id:12,name:'首页',fid:0, path:'/index'},
    {id: 1, name: '商品管理', fid: 0, path: '', children: [
        {id: 2, name: '商品分类', fid: 1, path: '/category'},
        {id: 3, name: '商品信息', fid: 1, path: '/product'}
    ]},
    {id: 4, name: '销售管理', fid: 0, path: '', children: [
        {id: 5, name: '零售清单', fid: 4, path: '/retail'},
        {id: 13, name: '退货清单', fid: 4, path: '/return'}
    ]},
    {id: 6, name: '系统管理', fid: 0, path: '', children: [
        {id:7,name:'管理员列表',fid:6,path:'/adminList'},
        {id: 11, name: '广告位管理', fid: 6, path: '/recommend'},
        // {id: 9, name: '小程序端页面管理', fid: 6, path: '', children: [
        //     // {id: 10, name: 'banner管理', fid: 9, path: '/banner'},
        // ]}
    ]},
    {id:20,name:'修改密码',fid:0, path:'/updatepwd'},
];