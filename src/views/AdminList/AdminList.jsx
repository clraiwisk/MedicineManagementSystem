import { Button, Form, Image, Input, Modal, Pagination, Table, Tag, Upload } from "antd"
import style from './AdminList.module.css'
import { adminActions } from "@/store"
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { PlusOutlined } from "@ant-design/icons"

//定义 AdminList 组件
function AdminList() {
  // 从 Redux 存储中获取管理员搜索条件
  const search = useSelector(state => state.admin.search)
  // 从Ant Design的Modal组件中获取confirm对象
  const { confirm } = Modal
  // 从 Redux 存储中获取管理员列表数据
  const list = useSelector(state => state.admin.list)
  // 获取 Redux 中的 dispatch 函数，用于派发 actions
  const dispatch = useDispatch()
  // 从 Redux 存储中获取编辑状态 isEdit
  const isEdit = useSelector(state => state.admin.isEdit)
  // 从 Redux 存储中获取正在编辑的管理员信息 model
  const model = useSelector(state => state.admin.model)
  // 定义用于显示图片预览的 imageUrl 变量
  const [imageUrl, setImageUrl] = useState(null);


  // 当搜索条件发生变化时，使用useEffect执行异步操作，获取管理员列表数据
  useEffect(() => {
    dispatch(adminActions.getList(search))
  }, [search])

  // 删除管理员的函数
  const remove = (item) => {
    console.log(item)
    // 使用Ant Design的Modal组件显示确认对话框
    confirm({
      content: '确定删除该管理员吗？',
      // 点击确认按钮的回调函数
      onOk() {
        // 调用 Redux 的 remove action 进行删除操作
        dispatch(adminActions.remove(item.id))
        // 延时后重新获取管理员列表数据
        setTimeout(() => {
          dispatch(adminActions.getList(search))
        }, 500);
      },
      onCancel() {
        // 点击取消按钮的回调函数，不执行任何操作
      }
    })
  }

  //定义表格的列的配置对象数组
  const columns = [
    { title: '账号', align: 'center', key: 'username', dataIndex: 'username' },
    { title: '昵称', align: 'center', key: 'nickname', dataIndex: 'nickname' },
    {
      //render函数获取当前记录的avatar值
      title: '头像', align: 'center', key: 'avatar', dataIndex: 'avatar', render: (avatar) => (
        <div className={style['imgBox']}>
          {/* 头像的值被附加到图像URL */}
          <Image width={60} height={60} src={`http://192.168.110.250:2709/medicine/${avatar}`} alt="" />
        </div>
      )
    },
    {
      title: '状态', align: 'center', key: 'status', dataIndex: 'status', render: (status) => (
        <div>
          {status === 0 ? <Tag color="blue">正常</Tag> : <Tag color="red">禁用</Tag>}
        </div>
      )
    },
    { title: '创建时间', align: 'center', key: 'createTime', dataIndex: 'createTime' },
    { title: '更新时间', align: 'center', key: 'updateTime', dataIndex: 'updateTime' },
    {
      title: '操作', align: 'center', key: 'caozuo', render: (item) => (
        <div>
          <Button type="link" onClick={() => beginUpdate(item)}>编辑</Button>
          <Button type="link" danger onClick={() => remove(item)}>删除</Button>
        </div>
      )
    },
  ]


  // 设置搜索条件中的名称字段值
  const setSearchName = (e) => {
    dispatch(adminActions.setName(e.target.value))
  }
  // 执行搜索操作的函数
  const searchHandler = () => {
    dispatch(adminActions.getList(search))
  }

  // 开始新增管理员的函数
  const beginAdd = () => {
    setImageUrl(null);
    dispatch(adminActions.setModel({ avatar: '', id: 0, nickname: '', password: '', status: 0, username: '' }))
    dispatch(adminActions.setEdit(true))
  }

  // 开始编辑管理员的函数
  const beginUpdate = (item) => {
    console.log(item)
    if (item.avatar) {
      setImageUrl(`http://192.168.110.250:2709/medicine/${item.avatar}`);
    } else {
      setImageUrl(null); // 如果头像不存在，将imageUrl设置为""
    }
    // 调用 Redux 的 setModel 和 setEdit actions，设置正在编辑的管理员数据和编辑状态
    dispatch(adminActions.setModel(item))
    dispatch(adminActions.setEdit(true))
  }

  // 设置管理员账号的函数
  const setUsername = e => {
    dispatch(adminActions.setUsername(e.target.value))
  }

  // 设置管理员昵称的函数
  const setNickname = (e) => {
    dispatch(adminActions.setNickname(e.target.value))
  }

  // 处理上传头像的函数
  const uploadHandler = ({ file }) => {
    // 判断文件上传状态为完成时
    if (file.status === 'done') {
      setImageUrl(file.response.data);
      dispatch(adminActions.setAvatar(file.response.data))
      // 重新获取管理员列表数据
      dispatch(adminActions.getList(search))
    }
  }

  // 保存管理员数据的函数
  const saveHandler = () => {
    // 判断管理员的id字段，为0表示新增操作
    if (model.id === 0) {
      dispatch(adminActions.add(model))
    } else {  // 否则为更新操作，调用Redux的 update action 进行更新操作
      dispatch(adminActions.update(model))
    }
    setTimeout(() => {
      dispatch(adminActions.getList(search))
    }, 500);
    // 设置编辑状态为false，退出编辑模式
    dispatch(adminActions.setEdit(false))
  }

  // 处理分页功能的函数
  const changeHandler = (page, pageSize) => {
    console.log(page, pageSize)
    //更新 Redux store 中的搜索条件中的当前页码
    dispatch(adminActions.setPage(page))
    //更新 Redux store 中的搜索条件中的每页数据量
    dispatch(adminActions.setPageSize(pageSize))
  }
  return (
    <div className={style['box']}>
      <Form className={style['wrapper']}>
        <Form.Item className={style['inputBox']} >
          <Input value={search.name} onChange={setSearchName} />
          <Button type="primary" onClick={searchHandler}>查询</Button>
        </Form.Item>
        <Form.Item className={style['btn']}>
          <Button type="primary" onClick={beginAdd}>+新增管理员</Button>
        </Form.Item>
      </Form>
      <Table pagination={false} columns={columns} dataSource={list.records} rowKey='id' />
      <Pagination showSizeChanger pageSizeOptions={[4, 7, 9, 10]}
        className={style['righeUl']}
        defaultCurrent={1}
        defaultPageSize={4}
        onChange={changeHandler} total={list.total} />
      {isEdit ? (<div className={style['editBox']}>
        <Form>
          <Form.Item className={style['title']}>
            <h1>用户编辑:</h1>
          </Form.Item>
          <Form.Item>
            <label>账号：</label>
            <Input value={model.username} onChange={setUsername} disabled={model.id !== 0}></Input>
          </Form.Item>
          <Form.Item>
            <label>昵称：</label>
            <Input value={model.nickname} onChange={setNickname}></Input>
          </Form.Item>

          <Form.Item>
            <label>头像：</label>
            <Upload onChange={uploadHandler}
              action='http://192.168.110.250:4002/medicine/api/file/upload'>
              <div className={style['upload-box']}>
                {imageUrl ?
                  (<img src={imageUrl} alt="用户头像" />) : (<div><PlusOutlined />上传图片</div>)
                }
              </div>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={saveHandler}>保存</Button>
            <Button onClick={() => dispatch(adminActions.setEdit(false))}>取消</Button>
          </Form.Item>
        </Form>
      </div>) : (<div></div>)
      }
    </div >
  )
}
export default AdminList