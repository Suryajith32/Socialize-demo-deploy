import { Avatar, Box, Button, IconButton, } from '@mui/material'
import React, { useEffect,  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PostModalOpen } from '../../../../services/Reducers/UserReducer'
import CreatePostModal from '../createPostModal/CreatePostModal'
import UserProfileBio from './userProfileBio/UserProfileBio'

function UserInfo() {
     const isProfileEditModal = useSelector((state: any) => state.user.value.isEditProfileModalOpen)
    const currentUserProfileBio = useSelector((state: any) => state.userData.value.profileInformation)
    const dispatch = useDispatch()

    useEffect(() => {
    }, [isProfileEditModal])
    

    const UploadPost = () => {
        dispatch(PostModalOpen(true))
    }

    return (
        <>
            <Box sx={{ bgcolor: '#cfe8fc', height: '21vh', borderRadius: '23px', position: 'relative', objectFit: 'cover' }} >
                <img className="profile-cover-image" src="" />
            </Box>
            <Box sx={{ position: 'relative', top: -70, ml: 2 }} >

                {currentUserProfileBio?.Images ?
                    <Avatar
                        alt="Remy Sharp"
                        src={`/images/${currentUserProfileBio?.Images}`}
                        sx={{ width: 130, height: 130 }}
                    /> : <Avatar
                        alt="Remy Sharp"
                        src=""
                        sx={{ width: 130, height: 130 }}
                    />}
            </Box>
            <UserProfileBio />
            <Box>
                <Box display='flex' justifyContent='center'>
                    <Box>
                        <Button onClick={UploadPost} variant="contained" component="label">
                            Upload
                        </Button>
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" />
                            {/* <PhotoCamera /> */}
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <CreatePostModal />          
        </>
    )
}

export default UserInfo