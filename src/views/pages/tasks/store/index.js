// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import urlConfig, { dashboard } from '@configs/urlConfig'

// ** Axios Imports
import axios from 'axios'

axios.defaults.baseURL = urlConfig.apiUrl 

export const getTasks = createAsyncThunk('taskList/getTasks', async (body) => {
    const response = await axios.post(dashboard.getAllTasks, body)
    return response.data
})

export const getTaskStats = createAsyncThunk('taskList/getTaskStats', async (body) => {
    const response = await axios.post(dashboard.getTaskStats, body)
    return response.data
})

export const createTask = createAsyncThunk('taskList/createTask', async (body) => {
    const response = await axios.post(dashboard.createTask, body)
    return response.data
})


export const updateTask = createAsyncThunk('taskList/updateTask', async (body) => {
    const response = await axios.post(dashboard.updateTask, body)
    return response.data
})

export const deleteTask = createAsyncThunk('taskList/deleteTask', async (body) => {
    const response = await axios.post(dashboard.deleteTask, body)
    return response.data
})

export const updateTaskPriority = createAsyncThunk('taskList/updateTaskPriority', async (body) => {
    const response = await axios.post(dashboard.changePriority, body)
    return response.data
})

export const getTask = createAsyncThunk('taskList/getTaskInfo', async (body) => {
    const response = await axios.post(dashboard.getTask, body)
    return response.data
})


export const appDashboardSlice = createSlice({
    name: 'taskList',
    initialState: {
        taskList: { data: [], total: 0 },
        taskStats: {  },
        selectedTask: null,
    },
    extraReducers: builder => {
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.taskList = action.payload.data
        })
        builder.addCase(getTasks.rejected, (state, action) => {
            state.taskList = []
        })
        builder.addCase(getTaskStats.fulfilled, (state, action) => {
            state.taskStats = action.payload.data
        })
        builder.addCase(getTaskStats.rejected, (state, action) => {
            state.taskStats = {}
        })
    }
})

export default appDashboardSlice.reducer
