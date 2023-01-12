import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserService} from "../../services/UserService";
import {IUser} from "../../models/IUser";

export const getAllUsersAction: any = createAsyncThunk("users/getAllUsersAction",
    async (payload: {}, {rejectWithValue}): Promise<IUser[] | any> => {
        try {
            const response = await UserService.getAllUsers();
            return response.data;
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });