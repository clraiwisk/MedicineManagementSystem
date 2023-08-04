import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/api";

// 创建异步action，用于从服务器获取列表数据
export const getList = createAsyncThunk(
  'indexPage/getList',
  async () => await api.indexPage.getList(0)
)

// 创建异步action，用于从服务器获取分类列表数据
export const getCateList = createAsyncThunk(
  'indexPage/getCateList',
  async () => await api.indexPage.getCateList()
)

// 创建slice，包含reducer和action
const slice = createSlice({
  name: 'indexPage',
  initialState: {
    list: {}, // 初始状态中的列表数据
    categoryList: [] // 初始状态中的分类列表数据
  },
  extraReducers: builder => {
    builder
    // 当getList异步action的fulfilled阶段被触发时，更新state中的list数据
      .addCase(
        //getList.fulfilled就是指getList这个异步action成功完成时对应的action类型。
        //当异步操作成功，服务器返回数据时，Redux会自动分发一个类型为'indexPage/getList/fulfilled'的action，并将从服务器获取的数据作为payload传递给reducer函数。
        //在extraReducers字段中，我们使用.addCase()方法来处理这个fulfilled的action，即在异步操作成功后，更新Redux store中的list数据。
        getList.fulfilled,
        (state, action) => { state.list = action.payload }
      )
      // 当getCateList异步action的fulfilled阶段被触发时，更新state中的categoryList数据
      .addCase(
        getCateList.fulfilled,
        (state, action) => { state.categoryList = action.payload }
      )
  }
})

export default slice.reducer