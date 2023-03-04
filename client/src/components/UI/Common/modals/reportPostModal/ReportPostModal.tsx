import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ErrorModalOpen, ReportPostModalOpen } from '../../../../../services/Reducers/UserReducer';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { report_post } from '../../../../../services/Api/userPost/postsApi';
import { UserContext } from '../../../../../context/userContext';

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

export default function BasicModal(singlePostData: any) {
    const isPostReportModal = useSelector((state: any) => state.user.value.isReportPostModal)
    const dispatch = useDispatch()
    const { user } = useContext(UserContext)
    const [text, setText] = React.useState<string>('')

    const handleClose = () => {
        dispatch(ReportPostModalOpen(false))
    };

    // HANDLING RADIO VALUES //

    const handleChange = (e: any) => {
        const values = e.target.value
        setText(values)
    }

    // SUBMITING REPORT //

    const SubmitReport = async () => {
        const userId = user?.id
        const reportPostId = singlePostData?.singlePostData?._id
        const details = { reportPostId, userId }
        try {
            const reportResponse = await report_post(text, details)
            if(reportResponse?.msg === 'reported'){
                dispatch(ReportPostModalOpen(false))
            }
        } catch (error) {
            dispatch(ErrorModalOpen(true))
        }
    }

    return (
        <>
            <Modal
                open={isPostReportModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ bgcolor: 'black', width: '100%', height: '60vh' }}>
                        <Box sx={{ bgcolor: 'rgba(225,225,225,0.10)', width: '100%', height: '60vh', }}>
                            <Box display='flex' justifyContent='center' sx={{ pt: 2 }}>
                                <Typography sx={{ color: '#FFFFFF' }}>Why are you reporting this post ?</Typography>
                            </Box>
                            <Box >
                                <Box sx={{ color: '#FFFFFF', pt: 3, ml: 4 }}>
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            onChange={handleChange}
                                            defaultValue="It's a scam"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel value="It's a scam" control={<Radio />} label="It's a scam" />
                                            <FormControlLabel value="Violance or dangerous" control={<Radio />} label="Violance or dangerous" />
                                            <FormControlLabel value="Bullyng or harrasment" control={<Radio />} label="Bullyng or harrasment" />
                                            <FormControlLabel value="False information" control={<Radio />} label="False information" />
                                            <FormControlLabel value="Fraud Content" control={<Radio />} label="Fraud Content" />
                                            <FormControlLabel value="other" control={<Radio />} label="other" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                                <Box display='flex' justifyContent='end' sx={{ mr: 3 }}>
                                    <Button onClick={() => SubmitReport()} sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                                        Report
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}