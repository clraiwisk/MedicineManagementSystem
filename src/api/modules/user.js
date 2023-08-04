import {menu, routes} from '@/mock'

export const getMenu = async () => {
    console.log('获取用户菜单中..');
    await new Promise(resolve => setTimeout(() => resolve(), 1000));
    console.log('获取用户菜单结束..')
    return menu;
} 

export const getDynamicRoutes = async () => {
    console.log('获取用户动态路由中..');
    await new Promise(resolve => setTimeout(() => resolve(), 1000));
    console.log('获取用户动态路由结束..')
    return routes;
}