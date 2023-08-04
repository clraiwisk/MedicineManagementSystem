import { Button, Checkbox, Form, Input } from 'antd';
import style from './Login.module.css'
import { loginActions } from '@/store';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Login() {
    //从Redux存储状态中提取数据,用于选择并访问存储中特定的数据
    //从Redux存储的login状态片段中选择并提取model属性的值，并将其赋给变量model
    const model = useSelector(state => state.login.model)
    //用于向Redux store发送action，从而触发相应的状态更新
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //用来在React Redux中定义一个函数，该函数可以接收一个事件对象作为参数，并调用dispatch函数来触发一个action，
    //该action的类型是loginActions.setName，其payload是事件对象的target属性的value属性
    //用户输入或修改某个表单元素的值时，就可以调用这个函数来更新Redux store中的state
    const setName = (e) => {
        dispatch(loginActions.setName(e.target.value))
    }
    const setPassword = (e) => {
        dispatch(loginActions.setPassword(e.target.value))
    }
    const login = async () => {
        dispatch(loginActions.login(model))
        setTimeout(() => {
            if (sessionStorage.getItem('token')) {
                navigate('/home')
            }
        }, 500)
        sessionStorage.clear();
    }
    return (
        <div className={style['box']}>
            <div className={style['wrapper']}>
                <div className={style['left']}>
                    <img src='../../src/assets/login_bg.jpg' alt="" />
                </div>
                <div className={style['right']}>
                    <div className={style['right-wrapper']}>
                        <div className={style['right-header']}>
                            <img src="../../src/assets/logo.png" alt="" />
                            <span>医药分销平台</span>
                        </div>
                        <div>
                            <Form>
                                <Form.Item name="username"
                                    rules={[
                                        { required: true, message: '请输入用户名！', },
                                    ]}>
                                    <Input onChange={setName} value={model.name} prefix={<UserOutlined className="site-form-item-icon" />} />
                                </Form.Item>
                                <Form.Item name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入密码！',
                                        },
                                    ]}>
                                    <Input onChange={setPassword} value={model.password} prefix={<LockOutlined className="site-form-item-icon" />} type='password' />
                                </Form.Item>
                                <Form.Item name="remember" valuePropName="checked">
                                    <Checkbox>记住密码</Checkbox>
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={login} type='primary' htmlType='submit' className='login-form-button'>
                                        登录
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;