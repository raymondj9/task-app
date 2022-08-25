import {
	configureStore,
	combineReducers,
	getDefaultMiddleware,
	ThunkAction,
	Action,
} from "@reduxjs/toolkit";
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import autoMergeLevel1 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1";
import taskSlice from "./slices/task.slice";
import authSlice from "./slices/auth.slice";

const persistConfig = {
	key: "task-project",
	storage,
	stateReconciler: autoMergeLevel1,
};

const reducers = combineReducers({
	task: taskSlice,
	auth: authSlice
});

const _persistedReducer = persistReducer(persistConfig, reducers as any);

const store = configureStore({
	reducer: _persistedReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: false
	}),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch
export default store;
