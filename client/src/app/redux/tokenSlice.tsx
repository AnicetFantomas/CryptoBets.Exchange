import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    data: [],
    error: null
}

const baseUrl = 'https://api.gmx.io/tokens'

export const getMarkets:any = createAsyncThunk('markets/getMarkets', async () => {
    const res = await fetch(baseUrl)
    const data = await res.json()


    // const marketsArr : string[] = Object.keys(data.markets)
    const newData = Object.entries(data.markets)
    
    return newData
})


const marketSlice = createSlice(
    {
        name: 'markets',
        initialState,
        reducers:{},
        extraReducers: builder => {
            builder.addCase(getMarkets.pending, state => {
                state.loading = true
            })

            builder.addCase(getMarkets.fulfilled, (state:any, action)=> {
                state.loading = false
                state.data = action.payload
                state.error = null
            })

            builder.addCase(getMarkets.rejected, (state:any, action) => {
                state.loading = false
                state.error = action.error
                throw new Error(action.error.message)
            })
        }
    }
)

export default marketSlice.reducer