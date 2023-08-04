import { categoryActions } from "@/store";
import { useEffect } from "react";
import style from './Category.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Input, Modal, Pagination, Table } from "antd"

function Category() {
    // 解构赋值 Modal 中的 confirm 方法
    const { confirm } = Modal
    // 从Redux store中获取分类相关的状态和方法
    const search = useSelector(state => state.category.search)
    const list = useSelector(state => state.category.list)
    const dispatch = useDispatch()
    const isEdit = useSelector(state => state.category.isEdit)
    const model = useSelector(state => state.category.model)
    // 查询按钮点击事件处理函数
    const searchHandler = () => {
        dispatch(categoryActions.getList(search))
    }
    // 设置搜索名称的处理函数
    const setSearchName = (e) => {
        dispatch(categoryActions.setName(e.target.value))
    }
    // 设置分类名称的处理函数
    const setName = (e) => {
        dispatch(categoryActions.setModelName(e.target.value))
    }
    // 设置分类描述的处理函数
    const setSlogan = (e) => {
        dispatch(categoryActions.setSlogan(e.target.value))
    }
    // 设置分类排序值的处理函数
    const setSort = (e) => {
        dispatch(categoryActions.setSort(e.target.value))
    }
    // 开始添加新分类的处理函数
    const beginAdd = () => {
        dispatch(categoryActions.setModel({ id: 0, name: '', slogan: "", sort: 0 }))
        dispatch(categoryActions.setEdit(true))
    }
    // 开始编辑分类的处理函数
    const beginUpdate = (item) => {
        console.log(item)
        dispatch(categoryActions.setModel(item))
        dispatch(categoryActions.setEdit(true))
    }
    // 分页改变事件处理函数
    const changeHandler = (page, pageSize) => {
        console.log(page)
        dispatch(categoryActions.setPage(page))
        dispatch(categoryActions.setPageSize(pageSize))
    }
    // 删除分类的处理函数
    const remove = (item) => {
        console.log(item)
        confirm({
            content: '确定删除吗？',
            onOk() {
                dispatch(categoryActions.remove(item.id))
                //确保在Redux store中的分类数据已经更新后再次获取最新的分类列表数据
                setTimeout(() => {
                    dispatch(categoryActions.getList(search))
                }, 500);
            },
            onCancel() {

            }
        })
    }
    // 表格列的定义
    const columns = [
        { title: '序号', align: 'center', key: 'index', dataIndex: 'index', colSpan: 1, render: (text, record, index) => index + 1, },
        { title: '分类名称', align: 'center', key: 'name', dataIndex: 'name', colSpan: 1 },
        { title: '分类描述', align: 'center', key: 'slogan', colSpan: 1, dataIndex: 'slogan' },
        { title: '排序', align: 'center', key: 'sort', colSpan: 1, dataIndex: 'sort' },
        { title: '创建时间', align: 'center', key: 'createTime', colSpan: 1, dataIndex: 'createTime' },
        { title: '更新时间', align: 'center', key: 'updateTime', colSpan: 1, dataIndex: 'updateTime' },
        {
            title: '操作', align: 'center', key: 'caozuo', colSpan: 1, render: (item) => (
                <div>
                    <Button type="link" onClick={() => beginUpdate(item)}>编辑</Button>
                    <Button type="link" danger onClick={() => remove(item)}>删除</Button>
                </div>
            )
        },
    ]

    // 保存分类的处理函数
    const saveHandler = () => {
        // 根据model的id判断是新增还是修改
        if (model.id === 0) {
            dispatch(categoryActions.add(model))
        } else {
            dispatch(categoryActions.update(model))
        }
        setTimeout(() => {
            dispatch(categoryActions.getList(search))
        }, 500);
        dispatch(categoryActions.setEdit(false))
    }
    // 组件挂载时获取分类列表数据
    useEffect(() => {
        dispatch(categoryActions.getList(search))
    }, [])
    // 搜索条件变化时重新获取分类列表数据
    useEffect(() => {
        dispatch(categoryActions.getList(search))
    }, [search])// 不太懂这个dispatch
    
    return (
        <div className={style['box']}>
            <Form className={style['wrapper']}>
                <Form.Item className={style['inputBox']} >
                    <Input placeholder='请输入分类名称' value={search.name} onChange={setSearchName} />
                    <Button type="primary" onClick={searchHandler}>查询</Button>
                </Form.Item>
                <Form.Item className={style['btn']}>
                    <Button type="primary" onClick={beginAdd}>+新增产品</Button>
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
                        <h1>产品编辑：</h1>
                    </Form.Item>
                    <Form.Item>
                        <label>分类名称：</label>
                        <Input value={model.name} onChange={setName}></Input>
                    </Form.Item>
                    <Form.Item>
                        <label>分类描述：</label>
                        <Input value={model.slogan} onChange={setSlogan}></Input>
                    </Form.Item>
                    <Form.Item>
                        <label>分类排序：</label>
                        <Input value={model.sort} onChange={setSort}></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={saveHandler}>保存</Button>
                        <Button onClick={() => dispatch(categoryActions.setEdit(false))}>取消</Button>
                    </Form.Item>
                </Form>
            </div>) : (<div></div>)}
        </div>
    )
}
export default Category;