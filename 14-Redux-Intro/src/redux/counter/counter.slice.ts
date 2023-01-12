import {createSlice} from "@reduxjs/toolkit";

export const counterFeature = "counterFeature";

export interface InitialState {
    count: number;
}

const initialState: InitialState = {
    count: 0
}

export const counterSlice = createSlice({
    name: 'counterSlice',
    initialState: initialState,
    reducers: {
        increment: (state, action) => {
            state.count = state.count + 1
        },
        decrement: (state, action) => {
            state.count = state.count - 1
        },
        incrementBy: (state, action) => {
            const {value} = action.payload;
            state.count = state.count + value
        }
    }
});
export const {increment, decrement, incrementBy} = counterSlice.actions;

