import { Stack } from '@mui/joy'
import { Button, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../context/userContext'
import { get_notification, update_notification } from '../../services/Api/user/userApi'
import { format } from 'timeago.js'
import { useDispatch, useSelector } from 'react-redux'
import { ErrorModalOpen, NotifyUpdate } from '../../services/Reducers/UserReducer'
import TagFacesTwoToneIcon from '@mui/icons-material/TagFacesTwoTone';

function Notification() {
    const notifyUpdate = useSelector((state: any) => state.user.value.isNotifyUpdate)
    const { user } = useContext(UserContext)
    const dispatch = useDispatch()
    const [notifications, setNotifications] = useState<any>('')

    useEffect(() => {
        GetNotification()
    }, [notifyUpdate])


    // FETCHING NOTIFICATION //

    const GetNotification = async () => {
        try {
            const getnotificationResponse = await get_notification()
            // const numDescending = [...getnotificationResponse].sort((a, b) => b.updatedAt - a.updatedAt);
            // console.log(numDescending,'numDescending');
            setNotifications(getnotificationResponse)
        } catch (error) {
            console.log(error, 'error from notification fetch api')
        }
    }

    // UPDATING NOTIFICATION READ STATE //

    const UpdateNotification = async (data: any) => {
        try {
            await update_notification(data?._id)
            dispatch(NotifyUpdate(!notifyUpdate))
        } catch (error) {
            console.log(error, 'error foromupdate')
            dispatch(ErrorModalOpen(true))
        }
    }

    return (
        <>
            <Box sx={{ width: '100%', minHeight: '88vh', bgcolor: 'rgba(225,225,225,0.10)', borderRadius: '23px' }}>
                {notifications.length !== 0 ? <Box>
                    {notifications && notifications?.map((item: any, index: number) => (
                        <Box key={index} sx={{ ml: 5, pt: 4 }} >
                            <Stack display='flex' direction='row' alignItems='center' justifyContent='space-between' >
                                <Box>
                                    <Stack display='flex' direction='row' alignItems='center' spacing={3}>
                                        <Box>
                                            {item?.triggeredUser?.Images ?
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={`/images/${item?.triggeredUser?.Images}`}
                                                    sx={{ width: 56, height: 56 }}
                                                /> :
                                                <Avatar
                                                    src=''
                                                    sx={{ width: 56, height: 56 }}
                                                />
                                            }
                                        </Box>
                                        <Box>
                                            <Stack display='flex' direction='row' spacing={1}>
                                                <Typography sx={{ color: '#FFFFFF' }}>{item?.triggeredUser?.username}</Typography>
                                                <Typography sx={{ color: '#FFFFFF' }}>{item?.notification} on Your Photo</Typography>
                                            </Stack>
                                            <Typography sx={{ color: 'grey' }}>{format(item?.createdAt)}</Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                                <Box display='flex' alignItems='center' sx={{ mr: 3 }}>
                                    {!item?.read ? <Button onClick={() => UpdateNotification(item)}>Mark as Read</Button> : ""}
                                </Box>
                            </Stack>
                        </Box>
                    ))}
                </Box> :
                    <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' sx={{ height: '50vh' }}>
                        <Typography sx={{ color: 'grey' }} variant='h4'>no notifications</Typography>
                        <Typography sx={{ color: 'grey' }} variant='h4'><TagFacesTwoToneIcon sx={{ fontSize: '50px' }} /></Typography>
                    </Box>
                }
            </Box>
        </>
    )
}

export default Notification
