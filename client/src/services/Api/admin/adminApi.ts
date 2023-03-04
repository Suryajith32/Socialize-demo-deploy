import adminAxios from "../../../config/axios/adminAxios";


// ADMIN LOGIN //

export const admin_login = (admin:any) => {
    return adminAxios.post("/login", admin)
    .then((response) => response.data.msg)
}

// GET ALL USER DETAILS //

export const admin_get_all_users = () => {
    return adminAxios.get("/users")
        .then((response) => response.data)
}

// VIEW ALL POSTS BY USERS //

export const admin_view_all_posts = () => {
    return adminAxios.get("/viewposts")
        .then((response) => response.data)
}

// BLOCK USER //

export const admin_block_user = (id:any) => {
    return adminAxios.post("/block/"+id)
    .then((response) => response.data)
}

// UNBLOCK USER //

export const admin_unblock_user = (id:any) => {
    return adminAxios.post("/unblock/"+id)
    .then((response) => response.data)
}

// FETCH REPORT DETAILS //

export const admin_view_report_details = (postId:any) => {
    return adminAxios.get("/reportdetails/"+postId)
    .then((response) => response.data)
}

// REPORT USERS POST //

export const admin_report_post = (postId:any) => {
    return adminAxios.post("/reportpost/"+postId)
    .then((response) => response.data)
}

// UNREPORT USERS POST //

export const admin_unreport_post = (postId:any) => {
    return adminAxios.post("/unreportpost/"+postId)
    .then((response) => response.data)
}

