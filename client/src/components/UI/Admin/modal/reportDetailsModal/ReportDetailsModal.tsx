import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { ReportDetailsModalOpen } from '../../../../../services/Reducers/AdminReducer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'rgb(225,225,225,)',
    border: '2px solid #000',
    boxShadow: 24,
};

export default function DeleteUserModal({ reportData }: any) {
    const isReportDetailOpen = useSelector((state: any) => state.admin.value.isReportDetailsOpen);
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(ReportDetailsModalOpen(false))
    };


    return (
        <div>
            <Modal
                open={isReportDetailOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ bgcolor: 'black', width: '100%', height: '30vh' }}>
                        <Box sx={{ bgcolor: 'rgba(225,225,225,0.10)', width: '100%', height: '30vh', p: 4 }}>
                            <Box>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell  align="left">SI no</TableCell>
                                                <TableCell align="left">user</TableCell>
                                                <TableCell  align="left">content</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {reportData&&reportData?.map((row:any,index:number) => (
                                                <TableRow
                                                    key={index}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="left" component="th" scope="row">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell align="left">{row?.reportDetails?.username}</TableCell>
                                                    <TableCell align="left">{row?.report?.condition}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>


                            </Box>


                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}