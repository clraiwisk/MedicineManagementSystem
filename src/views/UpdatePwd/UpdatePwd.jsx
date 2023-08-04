import { updateActions } from "@/store"
import { Button, Card, Form, Input, message } from "antd"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import style from './UpdatePwd.module.css'
import { useNavigate } from "react-router-dom"

function UpdatePwd() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = JSON.parse(sessionStorage.getItem('token'))
  const obj = useSelector(state => state.updatepwd.obj)
  const model = useSelector(state => state.updatepwd.model)
  const yz = useSelector(state => state.updatepwd.yz)
  useEffect(() => {
    dispatch(updateActions.getUser(token.id))
    console.log(obj)
    const item = JSON.parse(sessionStorage.getItem('token'))
    dispatch(updateActions.setModelId(item.id))
    dispatch(updateActions.setyz(false))
  }, [])
  const setOldPwd = (e) => {
    dispatch(updateActions.setOldPwd(e.target.value))
  }
  const setNewPwd = (e) => {
    dispatch(updateActions.setNewPwd(e.target.value))
  }
  const setNewPwdAgin = (e) => {
    dispatch(updateActions.setNewPwdAgin(e.target.value))
  }
  const updateHandler = () => {
    dispatch(updateActions.update(model))
    setTimeout(() => {
      if (sessionStorage.getItem('token')) return
      navigate('/login')
    }, 500)
  }
  const validatePsw = ({ getFieldValue }) => {
    return {
      validator: (_, value) => {
        if (!value || getFieldValue("newPwd") === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("两次输入密码不一致，请重新输入！"));
      },
    }
  }
  const [form] = Form.useForm()
  return (
    <div className={style['box']}>
      <Card title='修改密码' className={style['card-box']} hoverable>
        <Form className={style['form-box']} form={form} validateTrigger='onBlur'>
          <Form.Item label='账号：'>
            <Input value={obj.username} disabled></Input>
          </Form.Item>
          <Form.Item
            label='旧密码：' name={'oldPwd'} rules={[
              { required: true, message: '请输入旧密码~~' },
              { min: 5, message: '旧密码长度在5-20' },
              { max: 20, message: '旧密码长度在5-20' },
            ]}>
            <Input value={model.oldPwd} onChange={setOldPwd} type="password" ></Input>
          </Form.Item>
          <Form.Item label='新密码：' name={'newPwd'}
            rules={[
              { required: true, message: '请输入新密码~~' },
              { min: 5, message: '新密码长度在5-20' },
              { max: 20, message: '新密码长度在5-20' },
            ]}>
            <Input value={model.newPwd} onChange={setNewPwd} type="password" ></Input>
          </Form.Item>
          <Form.Item label='再次输入：' name={'aglin'}
            rules={[validatePsw]}>
            <Input value={model.newPwdAgin} onChange={setNewPwdAgin} type="password" ></Input>
          </Form.Item>
          <Form.Item name={'update'}>
            <Button style={{ marginLeft: '90px' }} onClick={updateHandler}>修改</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default UpdatePwd