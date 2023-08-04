import style from './Retail.module.css'
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Input, Pagination, Table, Tag, Select, Drawer, Card } from "antd"
import { useEffect, useState } from 'react';
import { retailActions } from '@/store';

function Retail() {
  // 使用useState钩子来管理是否显示订单详情抽屉
  const [isEdit, setEdit] = useState(false)
  // 创建Select组件的Option
  const { Option } = Select
  // 使用useSelector钩子从Redux中获取数据
  const itemList = useSelector(state => state.retail.item)
  const search = useSelector(state => state.retail.search)
  const obj = useSelector(state => state.retail.obj)

  // 使用useDispatch钩子来派发action
  const dispatch = useDispatch()
  // 设置搜索条件的姓名
  const setSearchName = (e) => {
    dispatch(retailActions.setName(e.target.value))
  }
  // 组件加载后获取订单列表
  useEffect(() => {
    dispatch(retailActions.getList(search))
  }, [search])
  // 点击搜索按钮时执行的操作
  const searchHandler = () => {
    dispatch(retailActions.getList(search))
    console.log(123)
  }
  // 分页器的change事件处理函数
  const changeHandler = (page, pageSize) => {
    dispatch(retailActions.setPage(page))
    dispatch(retailActions.setPageSize(pageSize))
  }
  console.log(search)
  // 下拉选择框的change事件处理函数
  const searchSelectHandler = (e) => {
    dispatch(retailActions.setStatus(e))
  }

  // 点击"详情"按钮时执行的操作，显示订单详情抽屉
  const xqHandler = (item) => {
    dispatch(retailActions.getItem(item.id))
    setEdit(true)
    console.log(itemList)
  }
  // 点击"发货"按钮时执行的操作
  const fhHandler = (item) => {
    dispatch(retailActions.update({ id: item.id, status: 1 }))
    setTimeout(() => dispatch(retailActions.getList(search)), 500)
  }
  // 表格的列定义
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
          {status === -1 && <Tag color='blue'>未付款</Tag>}
          {status === 0 && <Tag color='red'>待发货</Tag>}
          {status === 1 && <Tag color='green'>待收货</Tag>}
          {status === 2 && <Tag color='green'>已收货</Tag>}
        </div>
      )
    },
    { title: '下单时间', align: 'center', key: 'createTime', colSpan: 1, dataIndex: 'createTime' },
    {
      title: '操作', align: 'center', key: 'caozuo', colSpan: 1, render: (item) => (
        <div>
          <Button type="link" onClick={() => xqHandler(item)}>详情</Button>
          {item.status === 0 && <Button size='small' onClick={() => fhHandler(item)}>发货</Button>}
        </div>
      )
    },
  ]
  // 组件加载后获取订单列表和某个订单详情
  useEffect(() => {
    dispatch(retailActions.getList(search))
    dispatch(retailActions.getItem(199))
  }, [])
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
              <Option value={-1}>待付款</Option>
              <Option value={0}>待发货</Option>
              <Option value={1}>待收货</Option>
              <Option value={2}>已收货</Option>
            </Select>
            <Button style={{ marginLeft: '10px' }} type="primary" onClick={searchHandler}>查询</Button>
          </div>
        </Form.Item>
        <Form.Item className={style['btn']}>
          <Button type="primary">导出订单</Button>
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

export default Retail