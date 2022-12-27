import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {tPosition} from "../types/types";
import positionsApi from "../api/positionsApi";

type initialStateType = {
    positions: Array<tPosition>
}

export const fetchPositionsThunk = createAsyncThunk(
    'positions/fetchPositionsThunk',
    async function (_, {rejectWithValue, dispatch}) {
        positionsApi.fetchPositions()
            .then(data => dispatch(setPositions(data)))
            .catch(error => rejectWithValue(error.message))
    }
)
export const positionsSlice = createSlice({
    name: 'positions',
    initialState: {
        positions: [],
    } as initialStateType,
    reducers: {
        setPositions: (state, action) => {
            state.positions = action.payload.positions;
        }
    }
})

export const {setPositions} = positionsSlice.actions;
export default positionsSlice.reducer
