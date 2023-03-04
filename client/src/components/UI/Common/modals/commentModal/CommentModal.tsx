import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { CommentModalOpen, DeleteCommentModalOpen, ErrorModalOpen, NotifyUpdate, SnackBarOpen } from '../../../../../services/Reducers/UserReducer';
import { AspectRatio, Avatar, Box, Container, Stack } from '@mui/joy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { format, } from 'timeago.js';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { UserContext } from '../../../../../context/userContext';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import DeleteCommentModal from './DeleteCommentModal'
import { add_comments, get_comments } from '../../../../../services/Api/userPost/postsApi';
import { create_notification } from '../../../../../services/Api/user/userApi';
import { SnackBarMessage } from '../../../../../services/Reducers/UserDataReducer';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'black',
    border: '2px solid #000',
    boxShadow: 24,
};
const Item = styled(Paper)(({ theme }: any) => ({
    height: '68vh',
    background: 'rgba(225,225,225,0.10)',
}));
const Image = styled('img')({
    // width: '100%',
    // height:'50vh'
});


export default function KeepMountedModal({ singlePostData, userName, socketio }: any) {
    const ProfileImage = useSelector((state: any) => state.userData.value.profileImage)
    const notifyUpdate = useSelector((state: any) => state.user.value.isNotifyUpdate)
    const [change, setChange] = React.useState(false)
    const dispatch = useDispatch()
    const { user } = React.useContext(UserContext)
    const isCommentModalOpen = useSelector((state: any) => state.user.value.isCommentModalOpen);
    const [comment, setComment] = React.useState<any>()
    const [commentData, setCommentData] = React.useState<any>()
    const [Open, setOpen] = React.useState(false);
    const [currentCommentId, setCurrentCommentId] = React.useState<any>()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const space = /\s/
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseCommentOption = () => {
        setOpen(false)
        setAnchorEl(null);
    };

    const handleClose = () => {
        dispatch(CommentModalOpen(false))
    }

    const handleCommentChange = (e: any) => {
        const { name, value } = e.target
        setComment({
            ...comment,
            [name]: value
        })
    }

    // COMMENT FETCHING //

    const getAllComments = async () => {
        const data = await get_comments(singlePostData?._id)
        setCommentData(data)
    }
    React.useEffect(() => {
        getAllComments()
    }, [singlePostData, change])

    // POSTING COMMENT //

    const submitComment = async (event: any, postId: string, type: number) => {
        const userId = user.id
        const id = { userId, postId, comment }
        let details = {
            receiverId: singlePostData?.userId,
            userName: user?.name,
            type: "commented",
            userDp: ProfileImage,
            read: false
        }
        try {
            const addCommentResponse = await add_comments(id)
            if (addCommentResponse.msg === 'success') {
                setComment('')
                setChange(true)
                socketio?.emit("sendNotification", details)
                let commentDetails = {
                    receiverId: singlePostData?.userId,
                    senderId: userId,
                    postId: postId,
                    type: "commented",
                }

                // CREATING NOTIFICATION //

                try {
                    if (singlePostData?.userId !== userId) {
                        await create_notification(commentDetails)
                        dispatch(NotifyUpdate(!notifyUpdate))
                        dispatch(SnackBarMessage('comment added'))
                        dispatch(SnackBarOpen(true))
                    }
                } catch (error) {
                    console.log(error, 'notification api error')
                }
            }
        } catch (error) {
            dispatch(ErrorModalOpen(true))
        }
    }

    const handleDeleteModal = (commentId: string) => {
        const post_id = singlePostData?._id
        const id = { commentId, post_id }
        try {
            setCurrentCommentId(id)
            dispatch(DeleteCommentModalOpen(true))
            setOpen(true)
        } catch (error) {
            dispatch(ErrorModalOpen(true))

        }
    }

    return (
        <div>
            <Modal
                keepMounted
                open={isCommentModalOpen}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box >
                    <Container sx={style} maxWidth="md">
                        <Box sx={{ height: '70vh' }}>
                            <Box sx={{ width: '100%' }}>
                                <Grid container rowSpacing={1} spacing={1}>
                                    <Grid sx={{ display: { xs: 'none', md: 'block', lg: 'block' } }} item xs={6}>
                                        <Item>
                                            <div>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Box sx={{ margin: 1 }}>
                                                        <Avatar sx={{ bgcolor: 'grey', color: "#FFFFFF" }} />
                                                    </Box>
                                                    <Box sx={{ width: '100%' }}>
                                                        <Typography sx={{ color: '#FFFFFF' }}>{userName}</Typography>
                                                    </Box>
                                                </Box>
                                                <AspectRatio sx={{ width: '100%', }}>
                                                    <Image
                                                        src={`/images/${singlePostData?.Images}`}
                                                        alt=""
                                                    />
                                                </AspectRatio>
                                                <Box sx={{ display: 'flex', alignItems: 'center', ml: 5, mt: 2 }}>
                                                    <Box sx={{ width: '100%' }}>
                                                        <Typography sx={{ color: '#FFFFFF' }}>{singlePostData?.caption}</Typography>
                                                    </Box>
                                                </Box>
                                            </div>
                                        </Item>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Item>
                                            <Stack display='flex' direction='column' spacing={1} justifyContent='space-between'>
                                                <Box sx={{
                                                    overflow: "hidden",
                                                    overflowY: "scroll",
                                                    height: '45vh'
                                                }}>
                                                    {commentData && commentData?.map((item: any, index: number) => (
                                                        <Box key={index}>
                                                            <Box sx={{ ml: 2, mr: 2, pt: 2 }}>
                                                                <Stack display='flex' direction='row' justifyContent='space-between' alignItems='center' >
                                                                    <Box>
                                                                        <Box display='flex' alignItems='center'>
                                                                            <Avatar sx={{ bgcolor: 'grey', color: "#FFFFFF" }} />
                                                                            <Typography fontSize={13} sx={{ color: '#FFFFFF', ml: 2 }}>{item?.commentList?.username}</Typography>
                                                                        </Box>
                                                                    </Box>
                                                                    <Box>
                                                                        <Box><Typography fontSize={13} sx={{ color: '#FFFFFF', ml: 2 }}>{format(item?.comment?.time)}</Typography></Box>
                                                                    </Box>
                                                                </Stack>
                                                            </Box>
                                                            <Box sx={{ ml: 2, mr: 2 }}>
                                                                <Stack display='flex' direction='row' justifyContent='space-between'>
                                                                    <Box> <Typography fontSize={13} sx={{ color: '#FFFFFF', ml: 7 }}>{item?.comment?.comment}</Typography></Box>
                                                                    {item?.comment?.userId === user?.id ?
                                                                        <Box sx={{ color: '#FFFFFF' }}>

                                                                            <Button
                                                                                id="demo-positioned-button"
                                                                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                                                                aria-haspopup="true"
                                                                                aria-expanded={open ? 'true' : undefined}
                                                                                onClick={handleClick}
                                                                            >
                                                                                <MoreHorizIcon />
                                                                            </Button>
                                                                            <Menu
                                                                                id="demo-positioned-menu"
                                                                                aria-labelledby="demo-positioned-button"
                                                                                anchorEl={anchorEl}
                                                                                open={open}
                                                                                sx={{ bgcolor: '#FFFFFF' }}
                                                                            // onClose={handleCloseCommentOption}
                                                                            >
                                                                                <MenuItem onClick={() => handleDeleteModal(item?.comment?._id)}>Delete</MenuItem>
                                                                                {/* <MenuItem onClick={handleCloseCommentOption}>My account</MenuItem> */}
                                                                                <MenuItem onClick={handleCloseCommentOption}>Close</MenuItem>
                                                                            </Menu>
                                                                        </Box> : ''}
                                                                </Stack>
                                                            </Box>
                                                        </Box>
                                                    ))}
                                                </Box>
                                                <Box >
                                                    <FormControl sx={{ color: '#FFFFFF' }}>
                                                        {/* <FormLabel sx={{color:'#FFFFFF'}}>Your comment</FormLabel> */}
                                                        <Textarea
                                                            placeholder="Type something here…"
                                                            minRows={3}
                                                            name='comment'
                                                            onChange={handleCommentChange}
                                                            endDecorator={
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        gap: 'var(--Textarea-paddingBlock)',
                                                                        pt: 'var(--Textarea-paddingBlock)',
                                                                        borderTop: '1px solid',
                                                                        borderColor: 'divider',
                                                                        flex: 'auto',
                                                                    }}
                                                                >
                                                                    {!comment?.comment || space.test(comment?.comment) === true ? '' : <Button onClick={(e) => submitComment(e, singlePostData?._id, 2)} sx={{ ml: 'auto' }}>Send</Button>}
                                                                </Box>
                                                            }
                                                        />
                                                    </FormControl>
                                                </Box>
                                            </Stack>
                                        </Item>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                        <DeleteCommentModal currentCommentId={currentCommentId} />
                    </Container>
                </Box>
            </Modal>
        </div>
    );
}