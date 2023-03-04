import axiosInstance from "../../../config/axios/axiosInstance";

// ADD POST //

export const add_post = (Data: any) => {
    return axiosInstance.post("/addpost", Data, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => response)
}

// FETCH POSTS //

export const get_all_posts = () => {
    return axiosInstance.get('/viewpost', {
        headers: {
            "x-access-token": localStorage.getItem('token'),
        }
    }).then((response) => response.data)
}

// FETCH PROFILE POSTS //

export const get_profile_posts = (id: any) => {
    return axiosInstance.get("/viewprofilepost/" + id, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => response.data)
}

// LIKE POST // // UNLIKE POST //

export const like_user_post = (id: object) => {
    return axiosInstance.post('/likepost', id, {
        headers: {
            "x-access-token": localStorage.getItem('token'),
        }
    }).then((response) => response.data.msg)
}

// POST DETAILS //

export const user_post_details = (postId: string) => {
    return axiosInstance.get("/postdetails/" + postId, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => response.data)
}

// DELETE POST //

export const delete_post = (postId: any) => {
    return axiosInstance.delete('/deletepost/' + postId, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => response.data.msg)
}

// ADD COMMENT //

export const add_comments = (id: object) => {
    return axiosInstance.post('/comment', id, {
        headers: {
            "x-access-token": localStorage.getItem('token')
        }
    }).then((response) => response.data)
}

// FETCH COMMENTS //

export const get_comments = (postId: any) => {
    return axiosInstance.get('/getcomment/' + postId, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        }

    }).then((response) => response.data)
}

// DELETE COMMENT //

export const delete_comment = (id: any) => {
    return axiosInstance.post("/deletecomment", id, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => response.data)
}

// EDIT POST //

export const edit_post = (postId: any, caption: any) => {
    return axiosInstance.post("/editcaption/" + postId, caption, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => response.data)
}

// REPORT POST //

export const report_post = (text: string, details: object) => {
    return axiosInstance.post("/report/" + text, details, {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    }).then((response) => response.data)
}