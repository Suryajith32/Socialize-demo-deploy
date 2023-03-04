import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { admin_report_post, admin_unreport_post, admin_view_all_posts, admin_view_report_details } from '../../../services/Api/admin/adminApi';
import { Button } from '@mui/material';
import { AspectRatio } from '@mui/joy';
import { useDispatch } from 'react-redux';
import { ReportDetailsModalOpen } from '../../../services/Reducers/AdminReducer';
import ReportDetailsModal from '../../../components/UI/Admin/modal/reportDetailsModal/ReportDetailsModal'
import { ErrorModalOpen } from '../../../services/Reducers/UserReducer';


export default function Posts() {
    const [posts, setPosts] = useState<any>()
    const [reportData, setReportData] = useState<any>()
    const [reportStatus, setReportStatus] = useState<boolean>(false)
    const dispatch = useDispatch()

    useEffect(() => {
        GetAllPosts()
    }, [reportStatus])


    // FETCHING ALL POSTS BY USERS //

    const GetAllPosts = async () => {
        const getAllPostsResponse = await admin_view_all_posts()
        setPosts(getAllPostsResponse)
    }

    // HANDLING REPORT DETAILS //

    const handleReportDetails = async (item: any) => {
        try {
            const GetReportDetails = await admin_view_report_details(item?._id)
            setReportData(GetReportDetails)
            dispatch(ReportDetailsModalOpen(true))
        } catch (error) {
            dispatch(ErrorModalOpen(true))
        }
    }

    // BLOCK POST //

    const handleBlockPost = async (postId: any) => {
        try {
            await admin_report_post(postId)
            setReportStatus(!reportStatus)
        } catch (error) {
            dispatch(ErrorModalOpen(true))
        }
    }

    // UNBLOCK POST //

    const handleUnBlockPost = async (postId: any) => {
        try {
            await admin_unreport_post(postId)
            setReportStatus(!reportStatus)
        } catch (error) {
            dispatch(ErrorModalOpen(true))
        }
    }

    return (
        <>
            <Box sx={{ ml: 3, mr: 3, pt: 3 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Post</TableCell>
                                <TableCell align="center">user</TableCell>
                                <TableCell align="center">Report count</TableCell>
                                <TableCell align="center">Report Details</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {posts && posts?.map((row: any, index: number) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Box sx={{ width: 200, borderRadius: 'sm', p: 1 }}>
                                            <AspectRatio objectFit="contain">
                                                <img src={`/images/${row?.Images}`} />
                                            </AspectRatio>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">{row?.userId?.username}</TableCell>
                                    <TableCell align="center">{row?.reportCount}</TableCell>
                                    <TableCell align="center"><Button onClick={() => handleReportDetails(row)} variant='outlined'>View</Button></TableCell>
                                    <TableCell align="center">
                                        {row?.reportStatus ?
                                            <Button onClick={() => handleBlockPost(row?._id)} variant='outlined' color='error'>Block Post</Button> :
                                            <Button onClick={() => handleUnBlockPost(row?._id)} variant='outlined' color='error'>Unblock Post</Button>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <ReportDetailsModal reportData={reportData} />
        </>
    );
}