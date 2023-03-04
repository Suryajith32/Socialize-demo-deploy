import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { Stack } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import { BlockUserModalOpen } from '../../../../../services/Reducers/AdminReducer';
import Avatar from '@mui/material/Avatar';
import { admin_block_user, admin_unblock_user } from '../../../../../services/Api/admin/adminApi';


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

export default function DeleteUserModal({ singleUserData }: any) {
    const isBlockUserOpen = useSelector((state: any) => state.admin.value.isBlockUserOpen);
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(BlockUserModalOpen(false))
    };

    // BLOCKING USER //

    const handleBlockUser = async () => {
        try {
            await admin_block_user(singleUserData?._id)
            handleClose()
        } catch (error) {
            console.log(error, 'userDeleteError')
        }
    }

    // UNBLOCKING USER //

    const handleUnBlockUser = async () => {
        try {
            await admin_unblock_user(singleUserData?._id)
            handleClose()
        } catch (error) {

        }
    }

    return (
        <div>
            <Modal
                open={isBlockUserOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ bgcolor: 'black', width: '100%', height: '30vh' }}>
                        <Box sx={{ bgcolor: 'rgba(225,225,225,0.10)', width: '100%', height: '30vh', p: 4 }}>
                            {singleUserData?.userStatus ?
                                <Typography sx={{ color: '#FFFFFF' }} id="modal-modal-title" variant="h6" component="h2">
                                    Block this user
                                </Typography> :
                                <Typography sx={{ color: '#FFFFFF' }} id="modal-modal-title" variant="h6" component="h2">
                                    Unblock this user
                                </Typography>
                            }
                            <Box >
                                <Stack display='flex' direction='row' spacing={2}>
                                    <Box>
                                        {singleUserData?.Images ?
                                            <Avatar src={`/images/${singleUserData?.Images}`} /> :
                                            <Avatar src='' />
                                        }
                                    </Box>
                                    <Box display='flex' alignItems='center'>
                                        <Typography sx={{ color: '#FFFFFF' }}>{singleUserData?.username}</Typography>
                                    </Box>
                                </Stack>
                            </Box>
                            <Typography id="modal-modal-description" sx={{ mt: 2, color: '#FFFFFF' }}>
                                Are you sure
                            </Typography>
                            <Box sx={{ pt: 2 }}>
                                <Stack display='flex' direction='row' spacing={3}>
                                    <Box>
                                        <Button variant="outlined" onClick={() => dispatch(BlockUserModalOpen(false))} >
                                            Cancel
                                        </Button>
                                    </Box>
                                    <Box>
                                        {singleUserData?.userStatus ?
                                            <Button variant="outlined" color="error" onClick={handleBlockUser} startIcon={<DeleteIcon />}>
                                                Block
                                            </Button> :
                                            <Button variant="outlined" color="error" onClick={handleUnBlockUser} startIcon={<DeleteIcon />}>
                                                Unblock
                                            </Button>
                                        }
                                    </Box>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}