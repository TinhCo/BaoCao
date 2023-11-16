import { createSlice } from '@reduxjs/toolkit';
import { getNewProducts } from './aysncAction';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        newProducts: null,
        errorMessage: '',
        delDaily: null,
    },
    reducers: {
        getDealDaily: (state, action) => {
            state.delDaily = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getNewProducts.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getNewProducts.fulfilled, (state, action) => {

            state.isLoading = false;
            state.newProducts = action.payload;
        });
        builder.addCase(getNewProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
})

export const { getDealDaily } = productSlice.actions
export default productSlice.reducer