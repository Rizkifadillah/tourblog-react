import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api"

export const create = createAsyncThunk("tour/createTour", 
    async({updateTourData, navigate, toast}, {rejectWithValue}) => {
    try {
        const response = await api.createTour(updateTourData)
        toast.success("Create Tour Successfully");
        navigate("/");
        return response.data
    } catch (error) {
        // console.log(error)
        // toast.error('Login Failed ' + error.message)
        return rejectWithValue(error.response.data)
    }
})
export const getTours = createAsyncThunk("tour/getTours", 
    async(_, {rejectWithValue}) => {
    try {
        const response = await api.getTours()
        return response.data
    } catch (error) {
        // console.log(error)
        // toast.error('Login Failed ' + error.message)
        return rejectWithValue(error.response.data)
    }
})

const tourSlice = createSlice({
    name: "tour",
    initialState: {
        tour: {},
        tours: [],
        userTours: [],
        error: "",
        loading: false
    },
    extraReducers:{
        [create.pending]: (state, action) => {
            state.loading = true
        },
        [create.fulfilled]: (state, action) => {
            state.loading = false;
            state.tours = [action.payload];
        },
        [create.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getTours.pending]: (state, action) => {
            state.loading = true
        },
        [getTours.fulfilled]: (state, action) => {
            state.loading = false;
            state.tours = action.payload;
        },
        [getTours.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
});

export default tourSlice.reducer;