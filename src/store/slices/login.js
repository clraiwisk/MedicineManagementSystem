import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/api";
export const login = createAsyncThunk(
  'login/login',
  async (params) => await api.login.login(params)
)

//创建Redux切片
const slice = createSlice({
  name: 'login',
  initialState: {
    model: {
      name: '', password: '', vercode: ''
    }
  },
  reducers: {
    //根据传入的action.payload来更新对应的属性
    setName: (state, action) => { state.model = { ...state.model, name: action.payload } },
    setPassword: (state, action) => { state.model = { ...state.model, password: action.payload } },
    setVercode: (state, action) => { state.model = { ...state.model, vercode: action.payload } }
  },
  //处理其他异步操作,将登录成功后得到的action.payload存储在sessionStorage中，以便在浏览器会话期间保持用户登录状态
  extraReducers: bulider => {
    bulider
      .addCase(
        login.fulfilled,
        (state, action) => {
          sessionStorage.setItem('token', JSON.stringify(action.payload))
        }
      )
  }
})

export const { setName, setPassword, setVercode } = slice.actions
export default slice.reducer