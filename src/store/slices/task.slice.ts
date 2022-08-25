import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import React, { ReactHTMLElement } from "react";
import store, { RootState } from "..";
import { formatTime, getTimeZone, HMStoInteger } from "../../utils/helperFunctions";
import { useAppSelector } from "../hooks";
import { IUser } from "./auth.slice";

export interface IState {
	task:ITask;
    tasks:Array<ITask>;
    assigned_users:Array<IAssignedUser>;
	show_task_form:boolean;
	editing:boolean;
}

export interface IAssignedUser {
	id:string;
	name:string;
    icon:string;
}

export interface ITask {
	id:string;
	task_msg:string;
    task_time:Date;
	task_date:Date;
	assigned_user:string;
	time_zone:number;
	is_completed:number;
	icon:string;
}

const initialState: IState = {
	task: <ITask>{
		id:'',
		task_msg:'',
		task_time:new Date(),
		task_date:new Date(),
		assigned_user:'',
		time_zone:0,
		is_completed:0,
		icon:'',
	},
	tasks: [],
	assigned_users: [],
	show_task_form: false,
	editing:false
}

const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		showTaskForm: (state: IState, val: any) => {
			// val: boolean
			if (!val.payload) {
				state.task = initialState.task
				state.editing = false
			}
			state.show_task_form = val.payload
		},
		setTask: (state: IState, task: any) => {
			state.task = task.payload
		},
		setEditing: (state: IState, val: any) => {
			// val: boolean
			state.editing = val.payload
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getAssignedUsers.fulfilled, (state, action: any) => {
			state.assigned_users = action.payload.data.results.data;
		})

		builder.addCase(addTask.fulfilled, (state, action: any) => {
			alert(action.payload.data.message)
		})

		builder.addCase(updateTask.fulfilled, (state, action: any) => {
			alert(action.payload.data.message)
		})

		builder.addCase(getTasks.fulfilled, (state, action: any) => {
			state.tasks = action.payload.data.results;
		})
	}
});

export const addTask = 
	createAsyncThunk('task/add',
	async(params: {
		token:string, 
		user:Partial<IUser>, 
		body:{task_msg: string, task_date: string, task_time: number, assigned_user: string, is_completed:number, time_zone:number}
	}, ThunkAPI) => {
		try {
			const BASE_URL = process.env.REACT_APP_BASEURL
			const body = JSON.stringify(params.body);
			const config = {
				headers: {
					"Content-type": "application/json",
					"Authorization": "Bearer "+params.token
				},
			};
			const res = await axios.post(BASE_URL+'/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=company_413ef22b6237417fb1fba7917f0f69e7',body,config);
			return res
		} catch (error: any) {
			return ThunkAPI.rejectWithValue(error)
		}
	}
)

export const getTasks = 
	createAsyncThunk('task/tasks',
	async(params: {token:string,user:Partial<IUser>}, ThunkAPI) => {
		try {
			const BASE_URL = process.env.REACT_APP_BASEURL
			const config = {
				headers: {
					"Content-type": "application/json",
					"Authorization": "Bearer "+params.token
				},
			};
			const res = await axios.get(BASE_URL+'/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id='+params.user.company_id,config);
			return res
		} catch (error: any) {
			return ThunkAPI.rejectWithValue(error)
		}
	}
)

export const getAssignedUsers = 
	createAsyncThunk('task/assignedUsers',
	async(params: {token:string,user:Partial<IUser>}, ThunkAPI) => {
		try {
			const BASE_URL = process.env.REACT_APP_BASEURL
			const config = {
				headers: {
					"Content-type": "application/json",
					"Authorization": "Bearer "+params.token
				},
			};
			const res = await axios.get(BASE_URL+'/team?product=outreach&company_id='+params.user.company_id,config);
			return res
		} catch (error: any) {
			return ThunkAPI.rejectWithValue(error)
		}
	}
)

export const getSingleTask = 
	createAsyncThunk('task/singleTask',
	async(params: {token:string,user:Partial<IUser>}, ThunkAPI) => {
		try {
			const BASE_URL = process.env.REACT_APP_BASEURL
			const config = {
				headers: {
					"Content-type": "application/json",
					"Authorization": "Bearer "+params.token
				},
			};
			const res = await axios.get(BASE_URL+'/task/lead_465c14d0e99e4972b6b21ffecf3dd691/task_cf7f488fcae042c9a83ed63538f45952?company_id='+params.user.company_id,config);
			return res
		} catch (error: any) {
			return ThunkAPI.rejectWithValue(error)
		}
	}
)

export const updateTask = 
	createAsyncThunk('task/updateTask',
	async(params: {
		token:string, 
		user:Partial<IUser>, 
		task_id:string,
		body:{task_msg: string, task_date: string, task_time: number, assigned_user: string, is_completed:number, time_zone:number}
	}, ThunkAPI) => {
		try {
			const BASE_URL = process.env.REACT_APP_BASEURL
			const body = JSON.stringify(params.body);
			const config = {
				headers: {
					"Content-type": "application/json",
					"Authorization": "Bearer "+params.token
				},
			};
			const res = await axios.put(BASE_URL+'/task/lead_465c14d0e99e4972b6b21ffecf3dd691/'+params.task_id+'?company_id='+params.user.company_id,body,config);
			return res
		} catch (error: any) {
			return ThunkAPI.rejectWithValue(error)
		}
	}
)

export const {showTaskForm,setTask,setEditing} = taskSlice.actions;
export const selectCartState = (state: RootState) => state.task;
export default taskSlice.reducer;
