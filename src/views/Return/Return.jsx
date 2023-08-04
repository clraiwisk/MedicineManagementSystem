import style from './Return.module.css'
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Input, Pagination, Table, Tag, Select, Drawer, Card } from "antd"
import { useEffect, useState } from 'react';
import { returnActions } from '@/store';

function Return() {
  // 状态
  const [isEdit, setEdit] = useState(false)
  const { Option } = Select
  // 选择 Redux store 中的数据
  const itemList = useSelector(state => state.returns.item)
  const search = useSelector(state => state.returns.search)
  const obj = useSelector(state => state.returns.obj)
  const dispatch = useDispatch()

  // 设置搜索的收货人姓名
  const setSearchName = (e) => {
    dispatch(returnActions.setName(e.target.value))
  }

  // 在组件加载时和搜索条件变化时，获取列表数据
  useEffect(() => {
    dispatch(returnActions.getList(search))
    dispatch(returnActions.getItem(199))
  }, [search])

  // 处理搜索按钮点击事件
  const searchHandler = () => {
    dispatch(returnActions.getList(search))
  }

  // 处理分页改变事件
  const changeHandler = (page, pageSize) => {
    dispatch(returnActions.setPage(page))
    dispatch(returnActions.setPageSize(pageSize))
  }

  // 处理搜索下拉框选择事件
  const searchSelectHandler = (e) => {
    dispatch(returnActions.setStatus(e))
  }
  console.log("search:", search);
  // 处理详情按钮点击事件
  const xqHandler = (item) => {
    dispatch(returnActions.getItem(item.id))
    setEdit(true)
    console.log(itemList)
  }

  // 处理拒绝按钮点击事件
  const jjHandler = (item) => {
    dispatch(returnActions.update({ id: item.id, status: 5 }))
    setTimeout(() => dispatch(returnActions.getList(search)), 500)
  }
  const columns = [
    { title: '序号', align: 'center', key: 'index', dataIndex: 'index', colSpan: 1, render: (text, record, index) => index + 1, },
    { title: '订单号', align: 'center', key: 'number', dataIndex: 'number', colSpan: 1 },
    {
      title: '收货人', align: 'center', key: 'user', dataIndex: 'user', colSpan: 1, render: (text, record) => (
        <span>{record.user === null ? '' : record.user.nickname}</span>
      )
    },
    { title: '金额', align: 'center', key: 'amount', colSpan: 1, dataIndex: 'amount' },
    {
      title: '状态', align: 'center', key: 'status', colSpan: 1, dataIndex: 'status', render: (status) => (
        <div>
          {status === 3 && <Tag color='red'>退货中</Tag>}
          {status === 4 && <Tag color='green'>已退货</Tag>}
          {status === 5 && <Tag color='red'>已拒绝</Tag>}
        </div>
      )
    },
    { title: '下单时间', align: 'center', key: 'createTime', colSpan: 1, dataIndex: 'createTime' },
    {
      title: '操作', align: 'center', key: 'caozuo', colSpan: 1, render: (item) => (
        <div>
          <Button type="link" onClick={() => xqHandler(item)}>详情</Button>
          {item.status === 3 && <Button size='small' onClick={() => jjHandler(item)} color='red'>拒绝</Button>}
        </div>
      )
    },
  ]

  return (
    <div className={style['box']}>
      <Form className={style['wrapper']}>
        <Form.Item>
          <div className={style['inputBox']} >
            <Input placeholder='请输入收货人姓名' value={search.name} onChange={setSearchName} />
            <Select onChange={searchSelectHandler}
              placeholder='请选择分类'
              className={style['header-select']}>
              <Option value={''}>全部</Option>
              <Option value={3}>退货中</Option>
              <Option value={4}>已退货</Option>
              <Option value={5}>已拒绝</Option>
            </Select>
            <Button style={{ marginLeft: '10px' }} type="primary" onClick={searchHandler}>查询</Button>
          </div>
        </Form.Item>
      </Form>
      <Table pagination={false} columns={columns} dataSource={obj.records} rowKey='id' />
      <Pagination showSizeChanger pageSizeOptions={[4, 8, 12, 20]}
        className={style['righeUl']}
        defaultCurrent={1}
        defaultPageSize={4}
        onChange={changeHandler} total={obj.total} />
      <Drawer title='订单详情' placement='right' size='large' width='550px' open={isEdit} onClose={() => setEdit(false)}>
        {itemList.map(item => (
          <div key={item.id} className={style['card-box']}>
            <Card title={item.productName} className={style['card-item']}>
              <p>产品数量：<span>{item.productCount}</span></p>
              <p>产品描述：<span>{item.productDesc}</span></p>
              <p>生产场地：<span>{item.productProduction}</span></p>
              <img src={`http://192.168.110.250:2709/medicine/${item.productImage}`} alt="" />
            </Card>
          </div>
        ))}
      </Drawer>
    </div>
  )
}

export default Return