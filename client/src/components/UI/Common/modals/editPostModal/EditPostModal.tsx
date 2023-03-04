import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { EditPostModalOpen, ErrorModalOpen } from '../../../../../services/Reducers/UserReducer';
import { useSelector, useDispatch } from 'react-redux';
import { Button, FormControl, Textarea } from '@mui/joy';
import { edit_post } from '../../../../../services/Api/userPost/postsApi';

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

export default function BasicModal(selectedPostData: any) {
    const [caption, setCaption] = React.useState<any>()
    const isPostEditModal = useSelector((state: any) => state.user.value.isEditPostModalOpen)
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(EditPostModalOpen(false))
    };


    // HANDLING VALUES //

    const handleCaption = (e: any) => {
        const { name, value } = e.target
        setCaption({
            ...caption,
            [name]: value
        })
    }

    // SAVE EDIT CHANGES //

    const handleSaveChanges = async () => {
        try {
            const postId = selectedPostData?.singlePostData?._id
            const editResponse = await edit_post(postId, caption)
            dispatch(EditPostModalOpen(false))
        } catch (error) {
            dispatch(ErrorModalOpen(true))
        }
    }

    return (
        <div>
            <Modal
                open={isPostEditModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ bgcolor: 'black', width: '100%', height: '30vh' }}>
                        <Box sx={{ bgcolor: 'rgba(225,225,225,0.10)', width: '100%', height: '30vh', p: 4 }}>
                            <Box >
                                <FormControl sx={{ color: '#FFFFFF' }}>
                                    {/* <FormLabel sx={{color:'#FFFFFF'}}>Your comment</FormLabel> */}
                                    <Textarea
                                        placeholder=''
                                        minRows={3}
                                        name='comment'
                                        defaultValue={selectedPostData?.singlePostData?.caption}
                                        onChange={handleCaption}
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
                                                <Button onClick={() => handleSaveChanges()} >Make Changes</Button>
                                            </Box>
                                        }
                                    />
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}