import { createSlice } from '@reduxjs/toolkit'

const initialValue = {
    profileImage:'',
    currentuserData:{},
    currentuserId:'',
    followFollowerCount:{},
    profileInformation:{},
    profileFormdata:{},
    usersProfileData:{},
    currentChatData:{},
    snackBarMessage:'heyyy'
}

const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
        value: initialValue
    },
    reducers: {
        ProfileImage: (state, action) => {
            state.value.profileImage = action.payload
        },  
        CurrentUser: (state,action)=>{
            state.value.currentuserData = action.payload
        },
        CurrentUserId: (state, action) => {
            state.value.currentuserId = action.payload
        },
        FollowFollowerCount: (state, action) => {
            state.value.followFollowerCount = action.payload
        },
        ProfileInfo: (state, action) => {
            state.value.profileInformation = action.payload
        },
        ProfileFormData: (state, action) => {
            state.value.profileFormdata = action.payload
        },
        UsersProfileData: (state, action) => {
            state.value.usersProfileData = action.payload
        },
        CurrentChatData: (state, action) => {
            state.value.currentChatData = action.payload
        },
        SnackBarMessage: (state, action) => {
            state.value.snackBarMessage = action.payload
        }
    }
})

export const {
    ProfileImage,
    CurrentUser,
    CurrentUserId,
    FollowFollowerCount,
    ProfileInfo,
    ProfileFormData,
    UsersProfileData,
    CurrentChatData,
    SnackBarMessage
} = userDataSlice.actions;
export default userDataSlice.reducer;