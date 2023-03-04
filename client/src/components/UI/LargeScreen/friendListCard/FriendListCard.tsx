import { Box } from "@mui/material"
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton/IconButton";
import SendSharpIcon from '@mui/icons-material/SendSharp';
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../config/axios/axiosInstance";
import { conversation_start, view_all_following } from "../../../../services/Api/user/userApi";
import {  useState, useEffect } from 'react'
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UsersProfileData } from "../../../../services/Reducers/UserDataReducer";
import { ErrorModalOpen } from "../../../../services/Reducers/UserReducer";



function FriendListCard() {
    const [user,setuser]  = useState<any>()
    const [viewFollowing, setViewFollowing] = useState<any>()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // FETCHING FRIEND USERs //

    const { data: FriendsProfiles, refetch } = useQuery(["friendsprofile"], () => {
        return axiosInstance.get('/users', {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        }).then((response) =>
            response.data
        )
    })

    useEffect(() => {
        const data = localStorage.getItem('token')
        if (data != null) {
            const userData: any = jwtDecode(data)
            const userId = userData?.id
            ViewAllFollowing(userId)
        }
    }, [user])


    // VIEW ALL FOLLOWING //

    const ViewAllFollowing = async (userId: any) => {
        setuser(userId)
        const viewAllFollowingRespone = await view_all_following(userId)
        setViewFollowing(viewAllFollowingRespone)
        refetch()
    }

    // HANDLING NAVIGATION TO USERS PROFILE //

    const handleClickUser = (item:any) => {
        dispatch(UsersProfileData(item))
        navigate('users-profile')
    }

      // MESSAGING THIS USER //

  const handleMessageThisUser = async (item:any) => {
    const userId = user
    const friendId = item?._id
    const id = { userId, friendId }
    try {
      const messageUserResponse = await conversation_start(id)
      if (messageUserResponse) {
        navigate('/inbox')
      }
    } catch (error) {
      console.log(error)
      dispatch(ErrorModalOpen(true))
    }

  }

    return (
        <div>
            <Box sx={{ bgcolor: 'rgba(225,225,225,0.10)', height: '70vh', borderRadius: '23px' }}>
                {/* <Box display='flex' justifyContent='center' sx={{ width: '100%', pt: 2 }}>
                    <Box display='flex' alignItems='center' sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', width: '14em', maxHeight: '6vh', borderRadius: 2, }}>
                        <Box display='flex' justifyContent='center' alignItems='center' sx={{ ml: 1, height: '4.4vh', width: '2.5em', bgcolor: '#009EFF', borderRadius: 20, }}>
                            <SearchIcon />
                        </Box>
                        <Box sx={{ mt: 1, }}>
                            <input className='nav-search' type='text' placeholder='Search' />
                        </Box>
                    </Box>
                </Box> */}
                <Box sx={{ ml: 5, pt: 3 }}>
                    <Typography fontWeight={480} sx={{ opacity: 0.5, color: '#FFFFFF' }}>Friends</Typography>
                </Box>
                <Box>

                    <Box sx={{ mr: 2, ml: 5, mt: 3 }} >
                        {FriendsProfiles && FriendsProfiles?.map((item: any, index: number) => (
                            <Box>
                                {viewFollowing?.following?.includes(item?._id) && viewFollowing?.followers?.includes(item?._id) ?
                                    <Box>
                                        <Stack display='flex' direction='row' justifyContent='space-between'>
                                            <Box onClick={() => handleClickUser(item)}>
                                                {item?.Images ? <Avatar src={`/images/${item?.Images}`} /> : <Avatar src='' />}
                                            </Box>
                                            <Box onClick={() => handleClickUser(item)} sx={{ color: '#FFFFFF', mt: 1.2 }}>
                                                <Typography fontWeight={480} sx={{ fontVariant: 'h8' }}>{item?.username}</Typography>
                                            </Box>
                                            <Box sx={{}}>
                                                <IconButton color="primary" aria-label="upload picture" component="label">
                                                    <Box display='flex' alignItems='center' justifyContent='center' sx={{ width: '70px', height: '4vh', }}>
                                                        <Box>
                                                            <IconButton onClick={()=>handleMessageThisUser(item)} sx={{ color: '#FFFFFF' }}>
                                                                <SendSharpIcon />
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                </IconButton>
                                            </Box>
                                        </Stack>
                                    </Box> : ''}
                            </Box>
                        ))}
                    </Box>

                </Box>
            </Box>
        </div>
    )
}

export default FriendListCard