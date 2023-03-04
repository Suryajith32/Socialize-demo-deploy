import { Avatar, Box,  IconButton } from "@mui/material"
import { Stack } from "@mui/system"
import Typography from "@mui/material/Typography";
import CreatePostModal from '../CreatePostModal'
import { useDispatch, useSelector } from 'react-redux'
import { PostModalOpen } from '../../../../../services/Reducers/UserReducer'
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';

function CreatePost() {
    const ProfileImage = useSelector((state: any) => state.userData.value.profileImage)
    const dispatch = useDispatch()

    return (
        <div>
            <Box sx={{ bgcolor: 'rgba(225,225,225,0.10)', height: '20vh', borderRadius: '23px' }}>
                <Box display='flex' flexDirection='row' sx={{ pt: 2, ml: 3 }}>
                    <Box>
                        {ProfileImage ? <Avatar
                            alt="Remy Sharp"
                            src={`/images/${ProfileImage}`}
                            sx={{ width: 45, height: 45 }}
                        /> : <Avatar
                            alt="Remy Sharp"
                            src=''
                            sx={{ width: 45, height: 45 }}
                        />}
                    </Box>
                    <Box sx={{ mt: 0.5, ml: 3 }}>
                        <Box display='flex' alignItems='center' sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', width: '27em', maxHeight: '6vh', borderRadius: 2, }}>
                            <Box sx={{ mt: 1 }}>
                                <input className='nav-search' type='text' placeholder='Whats Happening...?' />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box display='flex' justifyContent='center' sx={{ mt: 1 }} >
                    <Stack display='flex' direction='row' spacing={2}>
                        <Box>
                            <IconButton onClick={() => dispatch(PostModalOpen(true))} color="primary" aria-label="upload picture" component="label">
                                <Box display='flex' alignItems='center' justifyContent='center' sx={{ width: '95px', height: '5vh', border: 1, borderColor: '#FFFFFF', borderRadius: 1, }}>
                                    <Stack display='flex' direction='row' spacing={1} alignItems='center'>
                                        <AddAPhotoOutlinedIcon sx={{ color: '#FFFFFF' }} fontSize='small' />
                                        <Typography sx={{ color: "#FFFFFF", pt: .5 }} fontSize={13} fontWeight={500} >Photo</Typography>
                                    </Stack>
                                </Box>
                            </IconButton>
                        </Box>
                        <Box>
                            <IconButton onClick={() => dispatch(PostModalOpen(true))} color="primary" aria-label="upload picture" component="label">
                                <Box display='flex' alignItems='center' justifyContent='center' sx={{ width: '95px', height: '5vh', border: 1, borderColor: '#FFFFFF', borderRadius: 1, }}>
                                    <Stack display='flex' direction='row' spacing={1} alignItems='center'>
                                        <EmojiEmotionsOutlinedIcon sx={{ color: '#FFFFFF' }} fontSize='small' />
                                        <Typography sx={{ color: "#FFFFFF", pt: .5 }} fontSize={13} fontWeight={500} >Feeling</Typography>
                                    </Stack>
                                </Box>
                            </IconButton>
                        </Box>
                        <Box>
                            <IconButton onClick={() => dispatch(PostModalOpen(true))} color="primary" aria-label="upload picture" component="label">
                                <Box display='flex' alignItems='center' justifyContent='center' sx={{ width: '95px', height: '5vh', border: 1, borderColor: '#FFFFFF', borderRadius: 1, }}>
                                    {/* <CameraAltIcon sx={{color:'#FFFFFF'}}/> */}
                                    <Typography sx={{ color: "#FFFFFF" }} fontSize={13} fontWeight={500} >Create Post</Typography>
                                </Box>
                            </IconButton>
                        </Box>
                    </Stack>
                </Box>
                <CreatePostModal />
            </Box>
        </div>
    )
}

export default CreatePost