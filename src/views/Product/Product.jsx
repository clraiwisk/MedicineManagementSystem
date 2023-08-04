import { productActions } from "@/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import style from './Product.module.css';
import { useSelector } from "react-redux";
import { Button, Form, Input, Modal, Pagination, Table, Tag, Upload, Select, Image } from "antd"
import { useForm } from "antd/es/form/Form";

function Product() {
    const [form] = useForm()
    const { confirm } = Modal
    const { Option } = Select
    const search = useSelector(state => state.product.search)
    const list = useSelector(state => state.product.list)
    const dispatch = useDispatch()
    const [editedProductAvatar, setEditedProductAvatar] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    // 在组件加载时获取产品列表和分类列表
    useEffect(() => {
        dispatch(productActions.setPage(1))
        dispatch(productActions.getList())
        dispatch(productActions.getCategory())
    }, [])

    // 监听搜索参数变化，重新获取产品列表
    useEffect(() => {
        dispatch(productActions.getList(search))
    }, [search])

    // 从Redux的store中获取产品分类列表、编辑状态、当前编辑的产品信息
    const categoryList = useSelector(state => state.product.categoryList)
    const isEdit = useSelector(state => state.product.isEdit)
    const model = useSelector(state => state.product.model)

    // 定义处理用户输入查找名字的函数
    const setSearchName = (e) => {
        dispatch(productActions.setName(e.target.value))
    }
    const searchHandler = () => {
        dispatch(productActions.getList(search))
    }
    const beginAdd = () => {
        // 初始化一个空的产品对象并设置编辑状态为true，用于新增产品
        dispatch(productActions.setModel({ id: 0, dscp: '', image: '', name: '', categories: [], price: 0, production: '', status: 0 }))
        dispatch(productActions.setEdit(true))
        setEditedProductAvatar();
    }
    const setProduction = (e) => {
        dispatch(productActions.setProduction(e.target.value))
    }
    const setUsername = (e) => {
        dispatch(productActions.setModelName(e.target.value))
    }
    const setDscp = (e) => {
        dispatch(productActions.setDscp(e.target.value))
    }
    const setPrice = (e) => {
        dispatch(productActions.setPrice(e.target.value))
    }
    const setModelProduction = (e) => {
        dispatch(productActions.setModelProduction(e.target.value))
    }
    const uploadHandler = ({ file }) => {
        if (file.status === 'done') {
            // 当上传成功后，设置产品图片的URL，并重新获取产品列表
            dispatch(productActions.setImage(file.response.data))
            dispatch(productActions.getList(search))
        }
    }
    const selectHandler = e => {
        dispatch(productActions.setModelCategories(e))
    }
    const saveHandler = async () => {
        // 表单校验
        const errors = {};
        await form.validateFields()
        if (!model.name.trim()) {
            errors.name = '*产品名称不能为空';
        }

        if (!model.dscp.trim()) {
            errors.dscp = '*产品描述不能为空';
        }

        if (!model.price) {
            errors.price = '*产品价格不能为空';
        }

        if (!model.production.trim()) {
            errors.production = '*生产厂家不能为空';
        }

        if (Object.keys(errors).length > 0) {
            // 如果存在错误，更新表单校验结果并返回，不进行保存操作
            setFormErrors(errors);
            return;
        }

        // 如果产品id为0，表示是新增产品，调用add方法，否则调用update方法
        if (model.id === 0) {
            dispatch(productActions.add(model))
        } else {
            dispatch(productActions.update(model))
        }

        //延迟一段时间后重新获取产品列表，确保保存操作已经完成
        setTimeout(() => {
            dispatch(productActions.getList(search))
        }, 500);

        // 设置编辑状态为false，退出编辑模式
        dispatch(productActions.setEdit(false))
        // 清空表单校验结果
        setFormErrors({});
    }

    const cancelHandler = () => {
        // 设置编辑状态为false，退出编辑模式
        dispatch(productActions.setEdit(false))
        // 清空表单校验结果
        setFormErrors({});
    }
    const beginUpdate = (item) => {

        //编辑指定的产品，设置编辑状态为true，并将产品信息存储在modal中
        console.log(item)
        const newItem = item.categories.reduce((pre, cur) => pre.concat(cur.id), [])
        console.log(newItem)
        dispatch(productActions.setModel(item))
        dispatch(productActions.setModelCategories(newItem))
        dispatch(productActions.setEdit(true))
        // 使用当前正在编辑的产品的头像URL更新 editedProductAvatar
        setEditedProductAvatar(item.image);
    }
    const remove = (item) => {

        //弹出确认框，用户确认后删除指定产品
        console.log(item)
        confirm({
            content: '确定删除？',
            onOk() {
                dispatch(productActions.remove(item.id))
                //延迟一段事件后获取产品列表，确保删除操作已经完成
                setTimeout(() => {
                    dispatch(productActions.getList(search))
                }, 500);
            },
            onCancel() {

            }
        })
    }

    //表格列
    const columns = [
        { title: '序号', align: 'center', key: 'index', dataIndex: 'index', colSpan: 1, render: (text, record, index) => index + 1, },
        { title: '产品名称', align: 'center', key: 'name', dataIndex: 'name', colSpan: 1 },
        {
            title: '产品图片', align: 'center', key: 'image', dataIndex: 'image', colSpan: 1, render: (image) => (
                <div className={style['imgBox']}>
                    <Image width={60} height={60} src={`http://192.168.110.250:2709/medicine/${image}`} alt="" />
                </div>
            )
        },
        {
            title: '产品分类', align: 'center', key: 'categories', colSpan: 1, dataIndex: 'categories', render: (categories) => (
                <div>
                    {categories.map(item => (
                        <Tag color="blue" key={item.id}>{item.name}</Tag>
                    ))}
                </div>
            )
        },
        { title: '产品描述', align: 'center', key: 'dscp', colSpan: 1, dataIndex: 'dscp', width: 300 },
        { title: '产品价格', align: 'center', key: 'price', colSpan: 1, dataIndex: 'price' },
        { title: '生产厂家', align: 'center', key: 'production', colSpan: 1, dataIndex: 'production' },
        {
            title: '操作', align: 'center', key: 'caozuo', colSpan: 1, render: (item) => (
                <div>
                    <Button type="link" onClick={() => beginUpdate(item)}>编辑</Button>
                    <Button type="link" danger onClick={() => remove(item)}>删除</Button>
                </div>
            )
        },
    ]

    // 分页器的change事件处理函数
    const changeHandler = (page, pageSize) => {
        dispatch(productActions.setPage(page))
        dispatch(productActions.setPageSize(pageSize))
    }
    return (
        <div className={style['box']}>
            <Form className={style['wrapper']}>
                <Form.Item className={style['inputBox']} >
                    <Input placeholder='请输入产品名称' value={search.name} onChange={setSearchName} />
                    <Input placeholder='请输入产品厂家' value={search.production} onChange={setProduction} />
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
                <Form form={form}>
                    <Form.Item className={style['title']}>
                        <h1>产品编辑：</h1>
                    </Form.Item>
                    <Form.Item>
                        <label>产品名称：</label>
                        <Input value={model.name} onChange={setUsername}></Input>
                        {formErrors.name && <div className={style['error']}>{formErrors.name}</div>}
                    </Form.Item>
                    <Form.Item 
                        // name="categories"
                        // rules={[{ required: true, message: '*请选择产品分类' }]}
                    >
                        <label>产品分类：</label>
                        <Select mode="multiple" style={{ width: '200px' }} placeholder='请选择分类'
                            optionLabelProp="label"
                            value={model.categories}
                            onChange={selectHandler}>
                            {categoryList.map(item => (
                                <Option key={item.id} label={item.name} value={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <label>产品描述：</label>
                        <Input value={model.dscp} onChange={setDscp}></Input>
                        {formErrors.dscp && <div className={style['error']}>{formErrors.dscp}</div>}
                    </Form.Item>
                    <Form.Item>
                        <label>产品价格：</label>
                        <Input value={model.price} onChange={setPrice}></Input>
                        {formErrors.price && <div className={style['error']}>{formErrors.price}</div>}
                    </Form.Item>
                    <Form.Item>
                        <label>生产厂家：</label>
                        <Input value={model.production} onChange={setModelProduction}></Input>
                        {formErrors.production && <div className={style['error']}>{formErrors.production}</div>}
                    </Form.Item>
                    <Form.Item>
                        <label>头像：</label>
                        <div className={style['file-box']}>
                            <Upload onChange={uploadHandler} action='http://192.168.110.250:4002/medicine/api/file/upload'>
                                {editedProductAvatar ? (
                                    <Image preview={false} width={60} height={60} src={`http://192.168.110.250:2709/medicine/${editedProductAvatar}`} alt="" />
                                ) : (

                                    <div className={style['upload-box']}>
                                        <div style={{ marginTop: 8 }}>上传图片</div>
                                    </div>
                                )}
                            </Upload>
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={saveHandler}>保存</Button>
                        <Button onClick={cancelHandler}>取消</Button>
                    </Form.Item>
                </Form>
            </div>) : (<div></div>)}
        </div>
    )
}
export default Product;