import { Menu } from 'antd'
import { FolderOutlined, AppstoreOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'

function SysMenu() {
    // 获取 React Router 中的导航函数，用于处理菜单项的点击跳转
    const navigate = useNavigate()
    // 从 Redux store 中获取菜单数据
    const menu = useSelector(state => state.dashboard.menu)
    // 使用 useMemo 钩子函数对菜单数据进行转换和优化，确保只在菜单数据变化时重新计算
    const menuItems = useMemo(() => {
        // 定义内部函数 _transformMenu，用于将菜单数据转换为适合Menu组件的格式
        function _transformMenu(arr) {
            let result = [];
            // 定义一个 menuItem 对象，包含 label（菜单项名称）、key（菜单项的 key 值）、icon（菜单项的图标）
                // 图标根据菜单项是否有 path 属性来动态设置，path 存在时使用 AppstoreOutlined，否则使用 FolderOutlined
            arr.forEach(item => {
                let menuItem = { label: item.name, key: item.path || item.id, icon: item.path ? <AppstoreOutlined /> : <FolderOutlined /> }
                // 如果菜单项有子菜单，递归调用 _transformMenu 函数处理子菜单
                if (item.children) menuItem.children = _transformMenu(item.children)
                result.push(menuItem)
            })
            return result;
        }
        // 返回处理后的菜单项数据
        return _transformMenu(menu);
    }, [menu])

    return (
        <Menu
            theme="dark"
            mode="inline"
            items={menuItems}
            onSelect={({ key }) => navigate(`/home${key}`, { replace: true })}
        />
    )
}
export default SysMenu;