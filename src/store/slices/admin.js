import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/api";

// 使用 createAsyncThunk 创建异步 Thunk action，用于获取管理员列表数据
export const getList = createAsyncThunk(
  'admin/getList',
  // 异步操作，调用 api.admin.getList 函数获取管理员列表数据
  async (params) => await api.admin.getList(params)
)

//获取单个管理员的详细信息
export const getItem = createAsyncThunk(
  'admin/getItem',
  async (params) => await api.admin.getItem(params)
)

//新增管理员数据
export const add = createAsyncThunk(
  'admin/add',
  async (params) => await api.admin.add(params)
)

//更新管理员数据
export const update = createAsyncThunk(
  'admin/update',
  async (params) => await api.admin.update(params)
)

//更新管理员密码
export const updatePwd = createAsyncThunk(
  'admin/updatePwd',
  async (params) => await api.admin.updatePwd(params)
)

//删除管理员数据
export const remove = createAsyncThunk(
  'admin/remove',
  async (params) => await api.admin.remove(params)
)

//上传图片
export const uploadImg = createAsyncThunk(
  'admin/uploadImg',
  async (params) => await api.admin.uploadImg(params)
)


const slice = createSlice({
  name: 'admin',
  // 定义管理员管理页面的初始状态
  initialState: {
    list: [],
    isEdit: false,
    search: { page: 1, pageSize: 4, name: '', production: '' },
    // 正在编辑的管理员信息
    model: { avatar: '', id: 0, nickname: '', password: '', status: 0, username: '' },
    pwdModel: { id: 0, newPwd: '', oldPwd: '' }
  },
  reducers: {
    setModel: (state, action) => { state.model = { ...action.payload } },
    setPage: (state, action) => { state.search = { ...state.search, page: action.payload } },
    // 设置搜索条件中的每页数据量
    setPageSize: (state, action) => { state.search = { ...state.search, pageSize: action.payload } },
    setName: (state, action) => { state.search = { ...state.search, name: action.payload } },
    setNickname: (state, action) => { state.model = { ...state.model, nickname: action.payload } },
    setPassword: (state, action) => { state.model = { ...state.model, password: action.payload } },
    setUsername: (state, action) => { state.model = { ...state.model, username: action.payload } },
    setAvatar: (state, action) => { state.model = { ...state.model, avatar: action.payload } },
    setNewPwd: (state, action) => { state.pwdModel = { ...state.pwdModel, newPwd: action.payload } },
    setOldPwd: (state, action) => { state.pwdModel = { ...state.pwdModel, oldPwd: action.payload } },
    // 设置是否处于编辑模式的标志
    setEdit: (state, action) => { state.isEdit = action.payload },
  },
  // 定义在异步请求成功时，更新管理员管理页面状态的处理函数
  extraReducers: builder => {
    builder
      .addCase(
        // 当 getList 异步请求成功时
        getList.fulfilled,
        // 更新管理员列表数据
        (state, action) => { state.list = action.payload }
      )
      .addCase(
        getItem.fulfilled,
        (state, action) => { state.model = action.payload }
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
        updatePwd.fulfilled,
        (state, action) => { console.log(state, action) }
      )
      .addCase(
        uploadImg.fulfilled,
        (state, action) => { console.log(state, action) }
      )
  }
})
export const { setModel, setAvatar, setPage, setPageSize, setName, setNickname, setPassword, setUsername, setNewPwd, setOldPwd, setEdit } = slice.actions
export default slice.reducer