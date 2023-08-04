import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "@/api";


// 获取产品分类列表
export const getCategory = createAsyncThunk(
  'recommend/getCategory',
  async () => await api.recommend.getCategory()
)

// 获取产品列表
export const getProduct = createAsyncThunk(
  'recommend/getProduct',
  async (params) => await api.recommend.getList(params)
)

// 获取首页轮播图列表
export const getCarousel = createAsyncThunk(
  'recommend/getCarousel',
  async () => await api.recommend.getCarousel()
)

// 获取首页推荐列表
export const getRecommend = createAsyncThunk(
  'recommend/getRecommend',
  async () => await api.recommend.getRecommend()
)

// 更新首页轮播图列表
export const updateCarousel = createAsyncThunk(
  'recommend/updateCarousel',
  async (params) => await api.recommend.updateCarousel(params)
)

// 更新首页推荐列表
export const updateRecommend = createAsyncThunk(
  'recommend/updateRecommend',
  async (params) => await api.recommend.updateRecommend(params)
)
const slice = createSlice({
  name: 'recommend',
  initialState: {
    productList: [],  // 产品列表
    carouselList: [], // 首页轮播图列表
    categoryList: [], // 产品分类列表
    recommendList: [], // 首页推荐列表
    // 用于搜索产品的字段
    search: { name: '', dscp: '' }
  },
  reducers: {
    // 设置首页轮播图列表
    setCarousel: (state, action) => { state.carouselList = action.payload },
    // 设置搜索条件中的产品名称
    setName: (state, action) => { state.search = { ...state.search, name: action.payload } },
    // 设置搜索条件中的产品描述
    setDscp: (state, action) => { state.search = { ...state.search, dscp: action.payload } },
    // 设置首页推荐列表
    setRecommend: (state, action) => { state.recommendList = action.payload }
  },
  extraReducers: builder => {
    builder
    //指定相应的处理函数
      .addCase(
        getCategory.fulfilled,
        (state, action) => { state.categoryList = action.payload }
      )
      .addCase(
        getProduct.fulfilled,
        (state, action) => { state.productList = action.payload }
      )
      .addCase(
        getCarousel.fulfilled,
        (state, action) => { state.carouselList = action.payload }
      )
      .addCase(
        getRecommend.fulfilled,
        (state, action) => { state.recommendList = action.payload }
      )
      .addCase(
        updateCarousel.fulfilled,
        (state, action) => { console.log(state, action) }
      )
      .addCase(
        updateRecommend.fulfilled,
        (state, action) => { console.log(state, action) }
      )
  }
})

export const { setCarousel, setRecommend } = slice.actions
export default slice.reducer