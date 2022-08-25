import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface IUser {
	user_id?: string;
	company_id?: string;
}

interface AuthState {
	token: string;
	user: Partial<IUser>;
	loginError?: string;
}

const initialState: AuthState = {
	token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjEzNDUwNDUsIm5iZiI6MTY2MTM0NTA0NSwianRpIjoiNWY0MTUzNGEtYTM4My00ZTEyLThjM2QtNDc2OWRmODE3OTQ0IiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1bmRhciBQaWNoYWkiLCJlbWFpbCI6InNtaXRod2lsbHMxOTg5QGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzRlZTRjZjY3YWQ0NzRhMjc5ODhiYzBhZmI4NGNmNDcyIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jZjk0Yjc0YmQ0MWI0NjZiYjE4NWJkNGQ2NzRmMDMyYj9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.A9S0GRYZjd0mANrjUBOPgS6fDZeiZthsGcdzOPa8IDs",
	user: {
		user_id: 'user_4ee4cf67ad474a27988bc0afb84cf472',
		company_id: 'company_413ef22b6237417fb1fba7917f0f69e7'
	},
};

export const login = 
	createAsyncThunk('auth/login',
	async(user: {email: string, password: string}, ThunkAPI) => {
		try {
			const body = JSON.stringify(user);
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};
			var formData = new FormData()
			formData.append('email',user.email);
			formData.append('password',user.password)
			// const res = await axios.post('/sign-in',formData,config);
			// return res
		} catch (error: any) {
			return ThunkAPI.rejectWithValue(error)
		}
	}
)

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {

	},
});

export default authSlice.reducer;
