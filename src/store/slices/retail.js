import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "@/api";

export const getList = createAsyncThunk(
  'retail/getList',
  async (params) => await api.retail.getList(params)
)
export const getItem = createAsyncThunk(
  'retail/getItem',
  async (params) => await api.retail.getItem(params)
)
export const update = createAsyncThunk(
  'retail/update',
  async (params) => await api.retail.update(params)
)

// 创建Redux切片
const slice = createSlice({
  name: 'retail',
  initialState: {
    obj: {},
    search: { page: 1, pageSize: 4, name: '', code: 0, status: '' },
    item: []
  },
  reducers: {
    // 更新 search 对象中的 page 字段
    setPage: (state, action) => { state.search = { ...state.search, page: action.payload } },
    setPageSize: (state, action) => { state.search = { ...state.search, pageSize: action.payload } },
    setName: (state, action) => { state.search = { ...state.search, name: action.payload } },
    setStatus: (state, action) => { state.search = { ...state.search, status: action.payload } }
  },
  extraReducers: builder => {
    builder
    // 异步操作成功后，更新 obj，将获取的订单列表数据更新到obj中
      .addCase(
        getList.fulfilled,
        (state, action) => { state.obj = { ...action.payload } }
      )
      // 异步操作成功后，更新 item，将获取的特定订单的详细信息更新到item中
      .addCase(
        getItem.fulfilled,
        (state, action) => { state.item = action.payload }
      )
      // 异步操作成功后，执行一个简单的console.log
      .addCase(
        update.fulfilled,
        (action) => { console.log(action) }
      )
  }
})
export const { setPage, setPageSize, setName, setStatus } = slice.actions
export default slice.reducer