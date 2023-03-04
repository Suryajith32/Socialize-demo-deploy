import { Box, IconButton, Typography } from '@mui/joy'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {EditProfileModalOpen } from '../../../../../../services/Reducers/UserReducer'
import EditProfileModal from '../../../modals/editProfileModal/EditProfileModal'

function EditProfile() {
    const currentUserProfileBio = useSelector((state: any) => state.userData.value.profileInformation)
    const [currentInfo,setCurrentInfo] = useState()
    const dispatch = useDispatch()
    const handleEditProfileModal = () => {
        setCurrentInfo(currentUserProfileBio)
            dispatch(EditProfileModalOpen(true))
    }
    return (
        <>
            <Box display='flex' justifyContent='center' sx={{ width: '100%' }}>
                <IconButton onClick={()=>handleEditProfileModal()}>
                    <Box display='flex' justifyContent='center' alignItems='center' sx={{ bgcolor: '#FFFFFF', width: '90px', height: '4vh', borderRadius: 15 }}>
                        <Typography sx={{ color: 'black' }} fontSize={14} fontWeight={600}>Edit profile</Typography>
                    </Box>
                </IconButton>
            </Box>
            <EditProfileModal currentInfo={currentInfo} />
        </>
    )
}

export default EditProfile