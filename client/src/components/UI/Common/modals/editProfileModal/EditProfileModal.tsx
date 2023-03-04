import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { EditProfileModalOpen } from '../../../../../services/Reducers/UserReducer';
import { Stack } from '@mui/joy';
import Textarea from '@mui/joy/Textarea';
import AddProfilePic from './addProfilePic/AddProfilePic';
import { useState, useContext } from 'react';
import { add_profile_image, edit_user_profile } from '../../../../../services/Api/user/userApi';
import { UserContext } from '../../../../../context/userContext';
// @ts-ignore


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgb(225,225,225,)',
    border: '2px solid #000',
    boxShadow: 24,
};

function EditProfileModal(currentInfo: any) {
    const dispatch = useDispatch()
    const { user } = useContext(UserContext)
    const isProfileEditModal = useSelector((state: any) => state.user.value.isEditProfileModalOpen)
    const form = useSelector((state: any) => state.userData.value.profileFormdata)
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        phone: '',
        career: '',
        bio: ''
    })



    const handleClose = () => {
        dispatch(EditProfileModalOpen(false))
    }

    // HANDLING CHANGING VALUES //

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }

    // HANDLING SAVE CHANGES //

    const handleSubmit = async (e: any) => {
        try {
            const Data = new FormData();
            for (let key in form) {
                Data.append(key, form[key])
            }
            Data.append('user', user?.id)
            const { Images } = form
            if (Images) {
                await add_profile_image(Data)
            }
        } catch (error) {
            console.log(error, 'error fromupload')
        }
        const userId = currentInfo?.currentInfo?._id
        await edit_user_profile(userId, userDetails)
        dispatch(EditProfileModalOpen(false))
        e.preveventDefault()
    }

    return (
        <div>
            <Modal
                open={isProfileEditModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ bgcolor: 'black', width: '100%', height: '70vh' }}>
                        <Box sx={{ bgcolor: 'rgba(225,225,225,0.10)', width: '100%', height: '70vh', p: 4 }}>
                            <Box sx={{ color: '#FFFFFF' }} >
                                EditProfile
                            </Box>
                            <AddProfilePic />
                            <Stack sx={{ mt: 2 }} display='flex' direction='column' spacing={3}>
                                <Box>
                                    <Textarea
                                        placeholder="username"
                                        name='username'
                                        onChange={handleChange}
                                        defaultValue={currentInfo ? currentInfo?.currentInfo?.username : ''}
                                        variant="outlined"
                                        sx={{ color: "#FFFFFF" }}
                                    />
                                </Box>
                                <Box>
                                    <Textarea
                                        placeholder="email"
                                        name='email'
                                        onChange={handleChange}
                                        defaultValue={currentInfo ? currentInfo?.currentInfo?.email : ''}
                                        variant="outlined"
                                        sx={{ color: "#FFFFFF" }}
                                    />
                                </Box>
                                <Box>
                                    <Textarea
                                        placeholder="phone"
                                        name='phone'
                                        onChange={handleChange}

                                        defaultValue={currentInfo ? currentInfo?.currentInfo?.phone : ''}
                                        variant="outlined"
                                        sx={{ color: "#FFFFFF" }}
                                    />
                                </Box>
                                <Box>
                                    <Textarea
                                        placeholder="bio"
                                        name='bio'
                                        onChange={handleChange}

                                        defaultValue={currentInfo ? currentInfo?.currentInfo?.bio : ''}
                                        variant="outlined"
                                        sx={{ color: "#FFFFFF" }}
                                    />
                                </Box>
                                <Box >
                                    <Button onClick={(e) => handleSubmit(e)} variant="contained" component="label">
                                        Save changes
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div >
    )
}

export default EditProfileModal