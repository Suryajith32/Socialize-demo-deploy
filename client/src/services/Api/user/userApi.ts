import axiosInstance from "../../../config/axios/axiosInstance";

// SIGN-UP //

export const sign_up_user = (user: any) => {
    return axiosInstance.post("/signup", user).then((response) =>
        response.data.msg
    )
}

// OTP SIGN UP //

export const user_signup_otp = (user: any) => {
    return axiosInstance.post('/sentsignupotp', user).then((response) =>
        response.data.msg
    )
}

// VERIFY SIGN UP OTP // 

export const user_verify_signup_otp = (otp: object) => {
    return axiosInstance.post('/verifysignupotp', otp).then((response) =>
        response.data.msg
    )
}

// LOGIN //

export const login_user = (user: any) => {
    return axiosInstance.post('/login', user).then((response) =>
        response.data
    )
}

// AUTH //

export const auth_user = () => {
    return axiosInstance.get('/isUserauth', {
        headers: {
            "x-acces-token": localStorage.getItem("token"),
        }
    }).then((response) => response.data.auth)
}

// FORGOT PASSWORD //

export const user_forgot_password = (user: any) => {
    return axiosInstance.post('/forgotpassword', user).then((response) =>
        response.data.msg
    )
}

// RESET PASSWORD //

export const user_reset_password = (otp: object) => {
    return axiosInstance.post('/otp', otp).then((response) =>
        response.data.msg
    )
}

// VIEW USER PROFILE DETAILS //

export const user_profile_data = (id: any) => {
    return axiosInstance.get('/viewprofiledetails/' + id, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => response.data)
}

// EDIT USER PROFILE DETAILS //

export const edit_user_profile = (userId: any, userDetails: object) => {
    return axiosInstance.post("/editprofile/" + userId, userDetails, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => response.data)
}

// ADD USER PROFILE IMAGE //

export const add_profile_image = (Data: any) => {
    return axiosInstance.post("/addprofilepic", Data, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => response)
}

// VIEW ALL FOLLOWING //

export const view_all_following = (userId: any) => {
    return axiosInstance.get("/viewallfollowing/" + userId, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => response.data)
}

// FETCH FOLLOW COUNT //

export const get_follow_count = (currentUserId: any) => {
    return axiosInstance.get('/followingcount/' + currentUserId, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => response.data.count)
}

// FETCH FOLLOWERS LIST //

export const get_followers_list = (userId: any) => {
    return axiosInstance.get("/followerslist/" + userId, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => response.data)
}

// FETCH FOLLOWING LIST //

export const get_following_list = (userId: any) => {
    return axiosInstance.get("/followinglist/" + userId, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => response.data)
}

// SEARCH USER //

export const search_user = (userDetails: string) => {
    return axiosInstance.get("/searchuser/" + userDetails, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => response.data)
}

// FOLLOW STATUS CHECK //

export const follow_status_check = (userId: any, friendId: any) => {
    return axiosInstance.get("/statusfollow/" + userId + '/' + friendId, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => response.data.msg)
}

// FOLLOW A USER //

export const follow_user = (id: any) => {
    return axiosInstance.post("/follow", id, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => response.data.msg)
}

// START A CONVERSATION //

export const conversation_start = (id: any) => {
    return axiosInstance.post("/conversation", id, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => response.data)
}

// GET CONVERSATION //

export const get_conversation = (userId: any) => {
    return axiosInstance.get("/conversation/" + userId, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => response.data)
}

// GET CHAT USERS //

export const get_chat_users = (friendId: any) => {
    return axiosInstance.get("/chatusers/" + friendId, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => response.data)
}

// GET MESSAGES // 

export const get_messages = (_id: any) => {
    return axiosInstance.get("/message/" + _id, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => response.data)
}

// DO NOTIFICATION //

export const create_notification = (Data: any) => {
    return axiosInstance.post(`/addnotification`, Data)
        .then((response) => response.data)
}

// GET NOTIFICATION //

export const get_notification = () => {
    return axiosInstance.get('/getnotifications', {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        }
    })
        .then((response) => response.data)
}

// UPDATE NOTIFICATION READ STATE //

export const update_notification = (data: any) => {
    return axiosInstance.patch('/updatenotifications/' + data, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        }
    }).then((response) => response.data)
}

// FETCHING UNREAD NOTIFICATION COUNT //

export const get_notification_count = () => {
    return axiosInstance.get('/getnotificationscount', {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        }
    }).then((response) => response.data)
}
