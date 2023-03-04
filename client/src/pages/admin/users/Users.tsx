import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import { admin_get_all_users } from '../../../services/Api/admin/adminApi';
import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import DeleteUserModal from '../../../components/UI/Admin/modal/blockUserModal/BlockUserModal';
import { useDispatch, useSelector } from 'react-redux';
import { BlockUserModalOpen } from '../../../services/Reducers/AdminReducer';


export default function Users() {
    const isBlockUserOpen = useSelector((state: any) => state.admin.value.isBlockUserOpen);
    const [users, setUsers] = useState<any>()
    const [singleUserData,setSingleUserData] = useState<any>()
    const dispatch = useDispatch()

    useEffect(() => {
        FetchUsers()
    }, [isBlockUserOpen])


    // FETCHING ALL USERS //

    const FetchUsers = async () => {
        const FetchUsersResponse = await admin_get_all_users()
        setUsers(FetchUsersResponse)
    }

    // HANDLING BLOCK USER MODAL //

    const handleBlockUser = (selectedUser: any) => {
        setSingleUserData(selectedUser)
        dispatch(BlockUserModalOpen(true))
    }


    return (
        <>
            <Box sx={{ ml: 3, mr: 3 ,pt:3}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell >image</TableCell>
                                <TableCell align="center">name</TableCell>
                                <TableCell align="right">block/unblock</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users && users?.map((row: any, index: number) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row?.email}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row?.Images ?
                                            <Avatar src={`/images/${row?.Images}`} /> :
                                            <Avatar src='' />
                                        }
                                    </TableCell>
                                    <TableCell align="center">{row?.username}</TableCell>
                                    <TableCell align="right">
                                       {row?.userStatus?
                                        <Button onClick={() => handleBlockUser(row)} variant="contained" color="success">
                                            Block
                                        </Button>:
                                         <Button onClick={() => handleBlockUser(row)} variant="contained" color="error">
                                         unblock
                                     </Button>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <DeleteUserModal singleUserData={singleUserData}/>
        </>
    );
}