import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from "@/api";

export const getDynamicRoutes = createAsyncThunk(
    'dashboard/getDynamicRoutes',
    async () => await api.user.getDynamicRoutes()
)

export const getMenu = createAsyncThunk(
    'dashboard/getMenu',
    async () => await api.user.getMenu()
)

const slice = createSlice({
    name: 'dashboard',
    initialState: { menu: [], dynamicRoutes: [] },
    extraReducers: builder => {
        builder
            .addCase(
                getDynamicRoutes.fulfilled,
                (state, { payload }) => { state.dynamicRoutes = payload }
            )
            .addCase(
                getMenu.fulfilled,
                (state, { payload }) => { state.menu = payload }
            )
    }
})

export default slice.reducer;