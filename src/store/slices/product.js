import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "@/api";

//获取产品列表
export const getList = createAsyncThunk(
  'product/getList',
  async (params) => await api.product.getList(params)
)

// 获取单个产品
export const getItem = createAsyncThunk(
  'product/getItem',
  async (params) => await api.product.getItem(params)
)

// 添加产品
export const add = createAsyncThunk(
  'product/add',
  async (params) => await api.product.add(params)
)

// 更新产品
export const update = createAsyncThunk(
  'product/update',
  async (params) => await api.product.update(params)
)

// 删除产品
export const remove = createAsyncThunk(
  'product/remove',
  async (params) => await api.product.remove(params)
)

// 获取产品分类列表
export const getCategory = createAsyncThunk(
  'product/getCategory',
  async () => await api.product.getCategory()
)

// 创建一个Redux slice
const slice = createSlice({
  name: 'product',
  initialState: {
    list: [],
    categoryList: [],
    isEdit: false,
    search: { page: 1, pageSize: 4, name: '', production: '' },
    model: { id: 0, dscp: '', image: '', name: '', price: 0, production: '', status: 0, categories: [] }
  },
  reducers: {

    // 创建一些普通的同步action，用于更新state中的数据
    setEdit: (state, action) => { state.isEdit = action.payload },
    setModel: (state, action) => { state.model = { ...action.payload, createTime: undefined, updateTime: undefined } },
    setPage: (state, action) => { state.search = { ...state.search, page: action.payload } },
    setPageSize: (state, action) => { state.search = { ...state.search, pageSize: action.payload } },
    setName: (state, action) => { state.search = { ...state.search, name: action.payload } },
    setProduction: (state, action) => { state.search = { ...state.search, production: action.payload } },
    setModelName: (state, action) => { state.model = { ...state.model, name: action.payload } },
    setImage: (state, action) => { state.model = { ...state.model, image: action.payload } },
    setDscp: (state, action) => { state.model = { ...state.model, dscp: action.payload } },
    setPrice: (state, action) => { state.model = { ...state.model, price: action.payload } },
    setModelProduction: (state, action) => { state.model = { ...state.model, production: action.payload } },
    setModelCategories: (state, action) => { state.model.categories = action.payload }
  },
  extraReducers: builder => {

    // 处理异步action的回调函数
    builder
      .addCase(
        getList.fulfilled,
        (state, action) => { state.list = action.payload }
      )
      .addCase(
        getItem.fulfilled,
        (state, action) => { state.model = { ...action.payload, createTime: undefined, updateTime: undefined } }
      )
      .addCase(
        add.fulfilled,
        (state, action) => { console.log(state, action) }
      )
      .addCase(
        update.fulfilled,
        (state, action) => { console.log(state, action) }
      )
      .addCase(
        remove.fulfilled,
        (state, action) => { console.log(state, action) }
      )
      .addCase(
        getCategory.fulfilled,
        (state, action) => { state.categoryList = action.payload }
      )
  }
})
export const { setModelCategories, setEdit, setModel, setPage, setPageSize, setName, setProduction, setModelName, setImage, setDscp, setPrice, setModelProduction } = slice.actions
export default slice.reducer