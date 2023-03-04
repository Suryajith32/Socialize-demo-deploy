import { Avatar, Box, IconButton, Stack } from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import  { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ProfileFormData } from '../../../../../../services/Reducers/UserDataReducer';

function AddProfilePic() {
    const currentProfilePic = useSelector((state: any) => state.userData.value.profileImage)
    const dispatch = useDispatch()
    const [image, setImage] = useState('')
    const [form, setform] = useState({
        Images: ''
    })
    

    // HANDLING IMAGE CHANGE //

    const fileUpload = (e: any) => {
        const image = e.target.files[0]
        setform({
            ...form,
            Images: image
        })
        setImage(URL.createObjectURL(e.target.files[0]))    
    }
     dispatch(ProfileFormData(form))
  

    return (
        <>
            <Box sx={{ mt: 2 }}>
                <Stack display='flex' direction='row' spacing={2}  >
                    <Box>
                        {image ?
                            <Avatar
                                sx={{ bgcolor: 'grey', color: "#FFFFFF", width: 60, height: 60 }}
                                src={image}
                            /> :
                            <Avatar
                                sx={{ bgcolor: 'grey', color: "#FFFFFF", width: 60, height: 60 }}
                                src={`/images/${currentProfilePic}`}
                            />}
                    </Box>
                    <Box sx={{ pt: 1 }} >
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <input onChange={fileUpload} hidden accept="image/*" id="fileUpload" name="Images" type="file" />
                            <PhotoCamera />
                        </IconButton>
                    </Box>
                </Stack>
            </Box>
        </>
    )
}

export default AddProfilePic