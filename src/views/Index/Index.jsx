import { indexPageActions } from "@/store"
import { useEffect, useRef } from "react"
import * as echarts from 'echarts';
import { useDispatch, useSelector } from "react-redux"
import { Card, Col, Row } from "antd"
import style from './Index.module.css'

function Index() {
  const dispatch = useDispatch()
  // 从 Redux store 中获取状态数据
  const list = useSelector(state => state.indexPage.list)
  const categoryList = useSelector(state => state.indexPage.categoryList)

  // 创建一个ref对象用于保存图表的DOM元素
  const chartRef = useRef(null);

  useEffect(() => {
    //在组件挂载后调用，获取分类列表和订单列表数据
    // 调用 Redux action 获取订单列表数据
    dispatch(indexPageActions.getList())
    // 调用 Redux action 获取分类列表数据
    dispatch(indexPageActions.getCateList())

    // 将categoryList数据转换为饼图需要的数据格式
    const data = categoryList.map((item) => {
      return {
        // 设置 value 为分类项的 sort 属性值，sort表示分类的排序值
        value: item['sort'],
        // 设置 name 为分类项的 name 属性值，表示分类的名称
        name: item['name'],
      }
    })

    // 初始化echarts实例，并设置图表的配置项
    let chartInstance = echarts.init(chartRef.current);
    const option = {
      title: {
        text: '各分类商品数量',
        left: 'center',
        top: 10
      },
      tooltip: {
        trigger: 'item'// 设置鼠标悬浮在图表上时显示的提示类型为 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        y: 'center',
        itemWidth: 20,
        itemHeight: 20,
        borderRadius: 16,
      },
      series: [
        {
          name: '数量',
          type: 'pie',
          center: ['45%', '50%'],
          radius: '80%',
          data: [...data].sort(function (a, b) { return a.value - b.value; }),
          label: {
            color: '#000',
            itemWidth: 25,
            itemHeight: 25
          },
        }
      ]
    };
    chartInstance.setOption(option);  //设置图表的配置项
  }, [])

  return (
    <div className={style['box']}>
      <Row>
        <Col className={style['col-box']}>
          <Card title="各状态订单情况" hoverable={true} className={style['card-box']}>
            <div className={style['flex-box']}>
              <div className={style['card-child']}>
                <span>{list.minusOneCount}</span>
                <span style={{ fontWeight: "normal" }}>待付款</span>
              </div>
              <div className={style['card-child']}>
                <span>{list.zeroCount}</span>
                <span style={{ fontWeight: "normal" }}>待发货</span>
              </div>
              <div className={style['card-child']}>
                <span>{list.oneCount}</span>
                <span style={{ fontWeight: "normal" }}>待收货</span>
              </div>
              <div className={style['card-child']}>
                <span>{list.threeCount}</span>
                <span style={{ fontWeight: "normal" }}>退货/退款</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <div className={style['charts']}>
        <div ref={chartRef} style={{ height: "700px", overflow: 'hidden' }}></div>
      </div>
    </div>
  )
}

export default Index