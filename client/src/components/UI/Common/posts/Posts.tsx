import { Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import AspectRatio from '@mui/joy/AspectRatio';
import { Stack } from '@mui/system'
import { useQuery } from '@tanstack/react-query';
import { format, } from 'timeago.js';
import PostSkelton from '../../../skelton/PostSkelton'
import './posts.css'
import axiosInstance from '../../../../config/axios/axiosInstance';
import { useContext } from 'react';
import { UserContext } from '../../../../context/userContext';
import { useNavigate } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CommentModal from '../modals/commentModal/CommentModal'
import PostDeleteModal from '../modals/postDeleteModal/PostDeleteModal'
import EditPostModal from '../modals/editPostModal/EditPostModal'
import ReportPostmodal from '../modals/reportPostModal/ReportPostModal'
import { useDispatch, useSelector } from 'react-redux';
import { CommentModalOpen, EditPostModalOpen, ErrorModalOpen, NotifyUpdate, ReportPostModalOpen, SnackBarOpen } from '../../../../services/Reducers/UserReducer'
import { PostDeleteModalOpen } from '../../../../services/Reducers/UserReducer'
import { like_user_post, user_post_details, get_all_posts } from '../../../../services/Api/userPost/postsApi';
import NoPosts from '../../../skelton/NoPosts';
import { create_notification } from '../../../../services/Api/user/userApi';
import { SnackBarMessage } from '../../../../services/Reducers/UserDataReducer';

function Posts({ socketio }: any) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [posts, setPosts] = useState<any[]>([])
    const open = Boolean(anchorEl);
    const notifyUpdate = useSelector((state: any) => state.user.value.isNotifyUpdate)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [singlePostData, setSinglePostData] = useState()
    const [userName, setUserName] = useState<any>()
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    if (user) {
        var userId = user.id
    }

    // FETCHING ALL POSTS //

    const { data: PostData, isLoading, refetch } = useQuery(["posts"], () => {
        return axiosInstance.get('/viewpost', {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        }).then((response) =>
            response.data
        )
    })

    const GetAllPost = async () => {
        const fetchPostResponse = await get_all_posts()
        console.log(fetchPostResponse, 'fetchPostResponse')
        setPosts(fetchPostResponse)
    }

    useEffect(() => {
        GetAllPost()
    }, [])




    console.log(PostData, 'PostDataall')

    // LIKE POST // // UNLIKE POST //

    const LikePost = async (postId: string, username: string, type: number, Images: any, postOwnerId: any, DP: any) => {
        const userId = user.id
        const id = { postId, userId }
        let details = {
            receiverId: postOwnerId,
            userName: username,
            type: "liked",
            userDp: DP,
            read: false
        }
        try {
            const likeResponse = await like_user_post(id)
            if (likeResponse === 'like') {
                socketio?.emit("sendNotification", details)
                let notifyDetails = {
                    receiverId: postOwnerId,
                    senderId: userId,
                    postId: postId,
                    type: "liked",
                }

                // CREATING NOTIFICATION //

                try {
                    if (postOwnerId !== userId) {
                        await create_notification(notifyDetails)
                        dispatch(SnackBarMessage('like added'))
                        dispatch(NotifyUpdate(!notifyUpdate))
                        dispatch(SnackBarOpen(true))
                    }
                } catch (error) {
                    console.log(error, 'notification api error')
                }
            } else {
                dispatch(SnackBarMessage('like removed'))
                dispatch(SnackBarOpen(true))
            }
            refetch()
        } catch (error) {
            dispatch(ErrorModalOpen(true))
        }
    }

    // COMMENT MODAL OPEN //

    const handleCommentModal = async (postId: string, username: string) => {
        try {
            const postData = await user_post_details(postId)
            if (postData) {
                setSinglePostData(postData)
                setUserName(username)
                dispatch(CommentModalOpen(true))
            }
        } catch (error) {
            dispatch(ErrorModalOpen(true))
        }
    }

    // HANDLE POST DELETE MODAL //

    const OpendeletePostModal = (postId: any) => {
        setSinglePostData(postId)
        dispatch(PostDeleteModalOpen(true))
    }

    // HANDLE POST EDIT MODAL //

    const OpenEditPostModaal = (item: any) => {
        setSinglePostData(item)
        dispatch(EditPostModalOpen(true))
    }

    // HANDLE POST REPORT MODAL //

    const OpenReportPostModal = (item: any) => {
        // setSinglePostData(item)
        // dispatch(ReportPostModalOpen(true))
        console.log(item, 'report item')
        console.log(user?.name, 'user id fromm context')
    }

    // HANDLING NAVIGATION TO USERS PROFILE //

    const handleClickUser = () => {
        navigate('users-profile')
    }

    return (
        <>
            {isLoading ?
                <div>
                    <PostSkelton />
                </div> :
                <div>

                    {posts?.length === 0 ?
                        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' sx={{ height: '50vh' }}>
                            <NoPosts />
                        </Box> :
                        <>
                            {PostData?.map((item: any, index: number) => (
                                <Box key={index - 1} sx={{ bgcolor: 'rgba(225,225,225,0.10)', height: '73vh', borderRadius: '23px', mt: 2 }}>
                                    <Box sx={{ ml: 2, mr: 2 }}>
                                        <Box sx={{ pt: 1, ml: 2 }}>
                                            <Stack display='flex' direction='row' spacing={2}>
                                                <Box onClick={() => handleClickUser()} sx={{ pt: 1 }}>
                                                    {item.userId.Images ?
                                                        <Avatar
                                                            alt="Remy Sharp"
                                                            src={`/images/${item?.userId?.Images}`}
                                                            sx={{ width: 55, height: 55 }}
                                                        /> :
                                                        <Avatar
                                                            alt="Remy Sharp"
                                                            src=''
                                                            sx={{ width: 55, height: 55 }}
                                                        />}
                                                </Box>
                                                <Box sx={{ pt: 2, width: '100%' }}>
                                                    <Stack>
                                                        <Box onClick={() => handleClickUser()} sx={{ color: '#FFFFFF' }}>
                                                            <Typography fontWeight='bold'>{item?.userId?.username}</Typography>
                                                        </Box>
                                                        <Box sx={{ color: '#FFFFFF', opacity: 0.5, width: '100px' }}>
                                                            <Stack display='flex' direction='row' spacing={10}>
                                                                {/* <Typography fontSize={13}>@lapulga</Typography> */}
                                                                <Typography sx={{ width: '100px' }} fontSize={13}>{format(item?.createdAt)}</Typography>

                                                            </Stack>
                                                        </Box>
                                                    </Stack>
                                                </Box>
                                                <Box display='flex' justifyContent='flex-end' sx={{ width: '100%', }}>
                                                    <Box sx={{ color: '#FFFFFF' }}>
                                                        <Button
                                                            sx={{ color: '#FFFFFF' }}
                                                            id="basic-button"
                                                            aria-controls={open ? 'basic-menu' : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={open ? 'true' : undefined}
                                                            onClick={handleClick}
                                                        >
                                                            <MoreHorizIcon />
                                                        </Button>
                                                        <Menu
                                                            id="basic-menu"
                                                            anchorEl={anchorEl}
                                                            open={open}
                                                            onClose={handleClose}
                                                            MenuListProps={{
                                                                'aria-labelledby': 'basic-button',
                                                            }}
                                                        >
                                                            <MenuItem onClick={() => OpenReportPostModal(item)}>{item?.userId?.username}</MenuItem>
                                                            {item?.userId?._id === user?.id ? <MenuItem onClick={() => OpendeletePostModal(item)}>Delete</MenuItem> : ''}
                                                            {item?.userId?._id === user?.id ? <MenuItem onClick={() => OpenEditPostModaal(item)}>Edit</MenuItem> : ''}
                                                        </Menu>
                                                    </Box>
                                                </Box>
                                            </Stack>

                                        </Box>
                                        <Container maxWidth="sm">
                                            <Box display='flex' alignItems='center' sx={{ width: '100%', height: '8vh', mt: 1, color: '#FFFFFF', ml: 1, mr: 2 }}>
                                                <Typography>
                                                    {item?.caption}
                                                </Typography>
                                            </Box>
                                        </Container>
                                        <Box sx={{ minWidth: '100%', maxWidth: '100%', height: '40vh', bgcolor: '#FFFFFF', mt: 1, borderRadius: '14px', }}>
                                            <AspectRatio minHeight='40vh' maxHeight='40vh' >
                                                <img className='post-image' src={`/images/${item.Images}`} />
                                            </AspectRatio>
                                        </Box>
                                        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' sx={{ width: '88%', height: '9.2vh', mt: 1, color: '#FFFFFF', ml: 4, mr: 6, }}>
                                            {/* <Box sx={{ color: '#FFFFFF', ml: 4, mr: 4, }}> */}
                                            <Box >
                                                {item.likes.includes(userId) ?
                                                    <IconButton onClick={() => LikePost(item?._id, item?.userId.username, 1, item?.Images, item?.userId?._id, item?.userId?.Images)} sx={{ color: '#FFFFFF' }}>
                                                        <ThumbUpAltIcon />
                                                        <Box sx={{ pl: 2, display: { md: 'block', lg: 'block', sm: 'block', xs: 'none' } }}><Typography fontSize={13}>{item?.likesCount ? item?.likesCount + 'likes' : 'Likes'}</Typography></Box>
                                                    </IconButton> :
                                                    <IconButton onClick={() => LikePost(item?._id, item?.userId.username, 1, item?.Images, item?.userId?._id, item?.userId?.Images)} sx={{ color: '#FFFFFF' }}>
                                                        <ThumbUpOffAltIcon />
                                                        <Box sx={{ pl: 2, display: { md: 'block', lg: 'block', sm: 'block', xs: 'none' } }}><Typography fontSize={13}>{item?.likesCount === 0 ? 'likes' : item?.likesCount + 'likes'} </Typography></Box>
                                                    </IconButton>}
                                                <Box sx={{ display: { md: 'none', lg: 'none', sm: 'none', xs: 'block' } }}><Typography fontSize={13}>{item?.likesCount === 0 ? 'likes' : item?.likesCount + 'likes'}</Typography></Box>
                                            </Box>
                                            <Box>
                                                <IconButton onClick={() => handleCommentModal(item?._id, item?.userId.username)} sx={{ color: '#FFFFFF' }}>
                                                    <InsertCommentOutlinedIcon />
                                                    <Box sx={{ pl: 2, display: { md: 'block', lg: 'block', sm: 'block', xs: 'none' } }}><Typography fontSize={13}> {!item?.comment[0]?.comment ? 'comments' : item?.comment[0]?.comment?.length + 'comment'}</Typography></Box>
                                                </IconButton>
                                                <Box sx={{ display: { md: 'none', lg: 'none', sm: 'none', xs: 'block' } }}><Typography fontSize={13}>{!item?.comment[0]?.comment ? 'comments' : item?.comment[0]?.comment?.length + 'comment'}</Typography></Box>
                                            </Box>
                                            <Box>
                                                {/* <IconButton sx={{ color: '#FFFFFF' }}>
                                                    <SendSharpIcon />
                                                </IconButton> */}
                                            </Box>
                                            {/* </Box> */}
                                        </Box>
                                    </Box>
                                </Box>
                            ))}

                        </>}

                </div>
            }
            <CommentModal singlePostData={singlePostData} userName={userName} socketio={socketio} />
            <PostDeleteModal singlePostData={singlePostData} />
            <EditPostModal singlePostData={singlePostData} />
            <ReportPostmodal singlePostData={singlePostData} />
        </>
    )
}


export default Posts