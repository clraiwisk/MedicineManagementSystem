import { useEffect } from 'react';
import style from './Recommend.module.css'
import { useSelector, useDispatch } from "react-redux";
import { recommendActions } from '@/store';
import { Card, Button, Select, message } from 'antd';

function Recommend() {
    const { Option } = Select

    // 从Redux的store中获取数据
    const search = useSelector(state => state.recommend.search)
    const productList = useSelector(state => state.recommend.productList)
    const carouselList = useSelector(state => state.recommend.carouselList)
    const categoryList = useSelector(state => state.recommend.categoryList)
    const recommendList = useSelector(state => state.recommend.recommendList)
    const dispatch = useDispatch()

    // 在组件加载时获取产品分类、轮播列表、推荐列表等数据
    useEffect(() => {
        dispatch(recommendActions.getCategory()) // 获取 recommend 切片中的 search 数据
        dispatch(recommendActions.getProduct(search)) //产品列表
        dispatch(recommendActions.getCarousel()) //首页轮播设置列表
        dispatch(recommendActions.getRecommend()) //首页推荐设置列表
    }, [])

    // 处理首页轮播设置中选择产品的操作
    // id 是所选产品的唯一标识，e 是事件对象
    const selectHandler = (id, e) => {
        // 用于表示当前操作的是首页轮播设置列表中的第几项
        const i = e.i
        // 这一行创建了一个新的轮播设置项model，包含了id、productId 和 productImage 三个属性。其中，id 是轮播设置项的唯一标识，productId是所选产品的唯一标识，productImage是所选产品的图片地址
        const model = { id: i + 1, productId: productList.find(item => item.id === id).id, productImage: productList.find(item => item.id === id).image }
        // 将carouselList数组复制到一个新的数组item中，这是为了避免直接修改原始数据
        const item = [...carouselList]
        // 新的轮播设置项model替换掉item数组中的第i项，从而实现更新操作
        item.splice(i, 1, model)
        // 更新首页轮播设置列表数据
        dispatch(recommendActions.setCarousel(item))
    }

    // 保存首页轮播设置
    const saveHandler = () => {
        // 保存首页轮播设置到服务器
        dispatch(recommendActions.updateCarousel(carouselList))
        message.success('操作成功！', 2)
    }

    // 保存首页推荐设置
    const saveHandler2 = () => {
        dispatch(recommendActions.updateRecommend(recommendList))
        message.success('操作成功！', 2)
        dispatch(recommendActions.getProduct(search))
    }

    // 处理首页推荐设置中选择产品分类的操作
    const recoHandler = (value, e) => {
        // 这个值是通过添加 data-i={i} 到Select组件中传递过来的
        const i = e.i
        const list = [...recommendList]
        const model = { id: i + 1, categoryName: categoryList.find(item => item.id === value).name, recommendInfos: recommendList[i].recommendInfos }
        // 将新的推荐设置项model替换掉list数组中的第i项，从而实现更新操作
        list.splice(i, 1, model)
        console.log(value, i, list, model)
        // 更新首页推荐设置列表数据
        dispatch(recommendActions.setRecommend(list))
    }

    // 处理首页推荐设置中选择推荐产品的操作
    const infoHandler = (value, e) => {
        // 获取参数e中的索引i，用于定位主要列表recommendList中的某一项
        const i = e.i
        // 获取参数e中的索引i2，用于定位推荐产品列表recommendInfos中的某一项
        const i2 = e.i2
        // 复制当前主要列表recommendList中指定项的推荐产品列表recommendInfos
        const childList = [...recommendList[i].recommendInfos]
        // 创建一个新的推荐产品项model，包含推荐产品的id和图片等信息
        const model = { 
            id: i2 + 1, // 为了避免id冲突，将id设置为i2+1
            productId: productList.find(item => item.id === value).id, // 根据选择的产品value，在产品列表中找到对应的id
            productImage: productList.find(item => item.id === value).image // 根据选择的产品value，在产品列表中找到对应的图片
        }

        // 将新的推荐产品项model替换掉推荐产品列表recommendInfos中的指定项
        childList.splice(i2, 1, model)

        // 复制当前主要列表recommendList，以便对其进行更新
        const list = [...recommendList]
        // 将更新后的推荐产品列表childList替换掉主要列表recommendList中的指定项的recommendInfos
        const item = { ...list[i], recommendInfos: childList }
        list.splice(i, 1, item)
        // 通过dispatch发送action，更新首页推荐设置列表数据
        dispatch(recommendActions.setRecommend(list))
        console.log(list, model, item)
    }
    return (
        <div className={style['box']}>
            <Card className={style['header']} title={(
                <div className={style['header-title']}>
                    <span>首页轮播设置</span>
                    <Button size='small' onClick={saveHandler}>保存</Button>
                </div>
            )}>
                {/* 遍历轮播设置列表 */}
                {carouselList.map((item, i) => (
                    <Card key={item.id} title={(
                        <div>
                            <Select style={{ width: '100%' }}
                                value={productList.find(item3 => item3.id === item.productId).name}
                                onChange={(value, e) => selectHandler(value, e)} data-i={i}>
                                {productList.map(item2 => (
                                    <Option key={item2.id} i={i} value={item2.id}>{item2.name}</Option>
                                ))}
                            </Select>
                        </div>
                    )}>
                        <div className={style['img-box']}>
                            <img src={`http://192.168.110.250:2709/medicine/${item.productImage}`}></img>
                        </div>
                    </Card>
                ))}
            </Card>
            <Card className={style['main']} title={(
                <div className={style['header-title']}>
                    <span>首页推荐设置</span>
                    <Button size='small' onClick={saveHandler2}>保存</Button>
                </div>
            )}>
                {/* 遍历推荐设置列表 */}
                {recommendList.map((item, i) => (
                    <div key={item.id}>
                        <Card style={{ margin: '10px' }} title={(
                            <Select value={item.categoryName}
                                onChange={(value, e) => recoHandler(value, e)}
                                style={{ width: ' 90%', margin: '5px' }}>
                                {categoryList.map(item2 => (
                                    <Option i={i} key={item2.id} value={item2.id}>{item2.name}</Option>
                                ))}
                            </Select>
                        )}>
                            {item.recommendInfos.map((item3, i2) => (
                                <Select
                                    onChange={(value, e) => infoHandler(value, e)}
                                    value={productList.find(item5 => item5.id === item3.productId).name} key={item3.id} style={{ width: ' 90%', margin: '5px' }}>
                                    {productList.map(item4 => (
                                        <Option i={i} i2={i2} key={item4.id} value={item4.id}>
                                            {item4.name}
                                        </Option>
                                    ))}
                                </Select>
                            ))}
                        </Card>
                    </div>
                ))}
            </Card>
        </div>
    )
}
export default Recommend;