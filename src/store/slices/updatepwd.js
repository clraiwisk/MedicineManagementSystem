import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { message } from "antd"
import { api } from "@/api"
export const getUser = createAsyncThunk(
  'updatepwd/getUser',
  async (params) => await api.updatePwd.getUser(params)
)
export const update = createAsyncThunk(
  'updatepwd/update',
  async (params) => await api.updatePwd.update(params)
)
const slice = createSlice({
  name:'updatepwd',
  initialState:{
    obj:{},
    model: {id:0,newPwd: '', oldPwd: '',newPwdAgin:''},
    yz: false
  },
  reducers:{
    setNewPwd:(state,action) => {state.model = {...state.model, newPwd: action.payload}},
    setOldPwd:(state,action) => {state.model = {...state.model, oldPwd: action.payload}},
    setNewPwdAgin:(state,action) => {state.model = {...state.model, newPwdAgin: action.payload}},
    setModelId:(state,action) => {state.model = {...state.model,id:action.payload}},
    setyz:(state,action) => {state.yz = action.payload}
  },
  extraReducers: builder => {
    builder
      .addCase(
        getUser.fulfilled,
        (state,action) => {state.obj = {...action.payload}}
      )
      .addCase(
        update.fulfilled,
        (state,action) => {
          message.success('修改成功！')
          state.yz = action.payload
          sessionStorage.removeItem('token')
        }
      )
  }
})

export const {setyz, setNewPwd, setOldPwd, setNewPwdAgin, setModelId} = slice.actions

export default slice.reducer