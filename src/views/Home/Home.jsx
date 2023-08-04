import { Layout, Button, Popover, Modal } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import style from './Home.module.css'
import SysMenu from './SysMenu'
import { useNavigate, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { dashboardActions } from '@/store'

function Home() {

    // 使用useState来管理Sider的展开和收起状态
    const [collapsed, setCollapsed] = useState(false)

    // 使用useDispatch获取Redux中的dispatch函数，用于触发actions
    const dispatch = useDispatch()

    // 从sessionStorage中获取token信息
    const token = JSON.parse(sessionStorage.getItem('token'))
    const navigate = useNavigate() // 用于导航

    // 使用useEffect在组件挂载时触发actions，用于获取菜单和动态路由数据
    useEffect(() => {
        dispatch(dashboardActions.getMenu())
        dispatch(dashboardActions.getDynamicRoutes())
    }, [])

    //退出登录
    const handleLogout = () => {
        Modal.confirm({
            title: '确定退出登录吗?',
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {
                // 清除用户登录信息等
                sessionStorage.removeItem('token');
                // 重定向到登录页面
                navigate('/login')
            },
            onCancel() {
                console.log('Cancel');
            },
        });

    };

    //修改密码
    const changePassword = () => {
        navigate('/home/updatepwd')
    };

    const content = (
        <div>
            <Button onClick={changePassword}>修改密码</Button>
            <br />
            <Button onClick={handleLogout}>退出登录</Button>
        </div>
    )

    // 使用useState来管理Popover的打开和关闭状态
    const [open, setOpen] = useState(false)
    // 处理Popover的打开和关闭状态
    const openHandler = () => setOpen(!open)

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout.Sider width={300} collapsed={collapsed}>
                <Button type="primary" onClick={() => setCollapsed(!collapsed)} style={{ margin: '16px' }}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <SysMenu />
            </Layout.Sider>
            <Layout>
                <Layout.Header>
                    <div className={style['header-box']}>
                        <h1 className={style["title"]}>药品管理</h1>
                        <div className={style['right-box']}>
                            <Popover content={content} trigger={'click'} className={style['right-box']}
                                open={open} onOpenChange={openHandler}>
                                <span>{token.username}</span>
                                <span>{token.nickname}</span>
                                <img src={`http://192.168.110.250:2709/medicine/${token.avatar}`} alt="" />
                            </Popover>
                        </div>
                    </div>
                </Layout.Header>
                <Layout.Content className={style['main-box']}>
                    <Outlet />
                </Layout.Content>
                <Layout.Footer></Layout.Footer>
            </Layout>
        </Layout>
    )
}
export default Home;