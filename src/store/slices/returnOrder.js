import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "@/api";

// 创建异步Thunk action，用于获取列表数据
export const getList = createAsyncThunk(
  'returns/getList',
  async (params) => await api.returnOrder.getList(params)
)

//获取详情数据
export const getItem = createAsyncThunk(
  'returns/getItem',
  async (params) => await api.returnOrder.getItem(params)
)

//更新数据
export const update = createAsyncThunk(
  'returns/update',
  async (params) => await api.returnOrder.update(params)
)

// 创建slice
const slice = createSlice({
  name: 'returns',
  initialState: {
    obj: {}, // 用于存储列表数据
    search: { page: 1, pageSize: 4, name: '', code: 1, status: '' },
    item: []
  },
  reducers: {
    // 设置当前页码
    setPage: (state, action) => { state.search = { ...state.search, page: action.payload } },
    // 设置每页显示的数量
    setPageSize: (state, action) => { state.search = { ...state.search, pageSize: action.payload } },
    // 设置搜索的收货人姓名
    setName: (state, action) => { state.search = { ...state.search, name: action.payload } },
    // 设置搜索的状态
    setStatus: (state, action) => { state.search = { ...state.search, status: action.payload } }
  },
  extraReducers: builder => {
    builder
      // 处理获取列表数据成功的情况
      .addCase(
        getList.fulfilled,
        (state, action) => { state.obj = { ...action.payload } }
      )
      // 处理获取详情数据成功的情况
      .addCase(
        getItem.fulfilled,
        (state, action) => { state.item = action.payload }
      )
      // 处理更新数据成功的情况
      .addCase(
        update.fulfilled,
        (action) => { console.log(action) }
      )
  }
})
export const { setPage, setPageSize, setName, setStatus } = slice.actions
export default slice.reducer