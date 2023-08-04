import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "@/api";


// 调用api
export const getList = createAsyncThunk(
  'category/getList',
  async (params) => await api.category.getList(params)
)
export const getItem = createAsyncThunk(
  'category/getItem',
  async (params) => await api.category.getItem(params)
)
export const add = createAsyncThunk(
  'category/add',
  async (params) => await api.category.add(params)
)
export const update = createAsyncThunk(
  'category/update',
  async (params) => await api.category.update(params)
)
export const remove = createAsyncThunk(
  'category/remove',
  async (params) => await api.category.remove(params)
)


const slice = createSlice({
  name: 'category',
  initialState: {
    list: [],
    isEdit: false,
    search: { page: 1, pageSize: 4, name: '' },
    model: { id: 0, name: '', slogan: 0, sort: 0 }
  },
  reducers: {
    //编辑状态
    setEdit: (state, action) => { state.isEdit = action.payload },
    // model数据
    setModel: (state, action) => { state.model = { ...action.payload, createTime: undefined, updateTime: undefined } },
    // 搜索结果当前页面
    setPage: (state, action) => { state.search = { ...state.search, page: action.payload } },
    // 每页显示数量
    setPageSize: (state, action) => { state.search = { ...state.search, pageSize: action.payload } },
    // 搜索名字关键字
    setName: (state, action) => { state.search = { ...state.search, name: action.payload } },
    //model名称
    setModelName: (state, action) => { state.model = { ...state.model, name: action.payload } },
    // 标语
    setSlogan: (state, action) => { state.model = { ...state.model, slogan: action.payload } },
    // 排序
    setSort: (state, action) => { state.model = { ...state.model, sort: action.payload } },
  },
  extraReducers: builder => {

    // 不同的Thunk处理逻辑
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
  }
})
export const { setEdit, setModel, setPage, setPageSize, setName, setModelName, setSlogan, setSort } = slice.actions

export default slice.reducer