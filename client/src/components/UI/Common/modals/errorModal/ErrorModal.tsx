import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorModalOpen, ReportPostModalOpen } from '../../../../../services/Reducers/UserReducer';
import AspectRatio from '@mui/joy/AspectRatio';
import Error404 from '../../../../../assets/gif/Error404.gif'


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 403,
    bgcolor: 'rgb(225,225,225,)',
    border: '2px solid #000',
    boxShadow: 24,
};

export default function ErrorModal() {
    const isOpenErrorModal = useSelector((state: any) => state.user.value.isErrorModalOpen)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(ErrorModalOpen(false))
    };

    return (
        <>
            <Modal
                open={isOpenErrorModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ bgcolor: 'black', width: '100%', height: '60vh' }}>
                        <Box sx={{ bgcolor: 'rgba(225,225,225,0.10)', width: '100%', height: '60vh', }}>
                            <AspectRatio sx={{ width: 400 }}>
                                {/* <Typography level="h2" component="div">
                                    16/9
                                </Typography> */}
                                <img src={Error404}/>
                            </AspectRatio>
                            <Box display='flex' justifyContent='center' alignItems='center' sx={{height:'20vh'}}>
                            <Typography  sx={{ color: 'grey' }}> Something went wrong</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}