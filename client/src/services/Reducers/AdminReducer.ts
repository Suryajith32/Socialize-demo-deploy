import { createSlice } from '@reduxjs/toolkit'
import { stat } from 'fs';

const initialValue = {
    isDrawerOpen: false,
    isBlockUserOpen:false,
    isReportDetailsOpen:false,
}

const userSlice = createSlice({
    name: 'admin',
    initialState: {
        value: initialValue
    },
    reducers: {

        DrawerOpen: (state, action) => {
            state.value.isDrawerOpen = action.payload;
        },
        BlockUserModalOpen: (state, action) => {
            state.value.isBlockUserOpen = action.payload;
        },
        ReportDetailsModalOpen: (state, action) => {
            state.value.isReportDetailsOpen = action.payload;
        }
      
    }
})

export const {
    DrawerOpen,
    BlockUserModalOpen,
    ReportDetailsModalOpen
   
} = userSlice.actions;
export default userSlice.reducer;