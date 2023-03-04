import { Avatar, Box, IconButton, Typography, } from '@mui/material'
import { Stack } from '@mui/system'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import axiosInstance from '../../../../config/axios/axiosInstance'
import { UserContext } from '../../../../context/userContext'
import { useState, useEffect } from 'react'
import { view_all_following } from '../../../../services/Api/user/userApi'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {UsersProfileData} from '../../../../services/Reducers/UserDataReducer'
import { ErrorModalOpen, ProfileCardUpdate } from '../../../../services/Reducers/UserReducer'

function SuggestionCard() {
    const { user } = useContext(UserContext)
    const isProfileCardUpdate = useSelector((state:any) => state.user.value.profileCardUpdate)
    const dispatch = useDispatch()
    const [following, setFollowing] = useState<any>()
    const [viewFollowing,setViewFollowing] = useState<any>()
    const navigate = useNavigate()

    useEffect(() => {
        const data = localStorage.getItem('token')
        if (data != null) {
            const userData:any = jwtDecode(data)
            const userId = userData?.id
            ViewAllFollowing(userId)        
        }
      
    }, [user,following])
     

    // FETCHING SUGGESTED USER //

    const { data: SuggestedProfiles, refetch } = useQuery(["suggestedprofiles"], () => {
        return axiosInstance.get('/users', {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        }).then((response) =>
            response.data
        )
    })
    console.log(SuggestedProfiles, 'suggestedusers')

    // FOLLOWING A USER //

    const Follow = async (friendId: any) => {
        const userId = user?.id
        const id = { userId, friendId }
        await axiosInstance.post("http://localhost:4000/follow", id, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        }).then((response) => {
            setFollowing(response?.data?.msg)
            dispatch(ProfileCardUpdate(true))
        }).catch((err) => {
            console.log(err, 'from Follow')
            dispatch(ErrorModalOpen(true))
        })  
    }

    // VIEW ALL FOLLOWING //

    const ViewAllFollowing = async (userId:any) =>{
    const  viewAllFollowingRespone = await view_all_following(userId)
    setViewFollowing(viewAllFollowingRespone?.following)
    refetch()
    }

     // HANDLING NAVIGATION TO USERS PROFILE //

     const handleClickUser = (item:any) => {
        dispatch(UsersProfileData(item))
        navigate('users-profile')
    } 


    return (
        <div>
            <Box sx={{
                bgcolor: 'rgba(225,225,225,0.10)', height: '43vh', borderRadius: '23px', overflow: "hidden",
                overflowY: "scroll",
            }}>
                <Box sx={{ color: '#FFFFFF', ml: 4, pt: 3 }}>
                    <Typography fontWeight={480} sx={{ opacity: 0.5 }}>People you might know</Typography>
                </Box>
                {SuggestedProfiles && SuggestedProfiles?.map((item: any, index: number) => (
                    <Box key={index} sx={{ mr: 3, ml: 3, mt: 3 }} >
                        {item?._id === user?.id || viewFollowing?.includes(item?._id)? '' : <Stack display='flex' direction='row' justifyContent='space-between'>
                            <Box onClick={()=>handleClickUser(item)} >
                                {item?.Images ? <Avatar src={`/images/${item?.Images}`} /> : <Avatar src='' />}
                            </Box>
                            <Box onClick={()=>handleClickUser(item)} sx={{ color: '#FFFFFF', mt: 1.2 }}>
                                <Typography fontWeight={480} sx={{ fontVariant: 'h8' }}>{item?.username}</Typography>
                            </Box>
                            <Box sx={{ mt: .1 }}>
                            
                                 <IconButton onClick={() => Follow(item?._id)} color="primary" aria-label="upload picture" component="label">
                                 <Box display='flex' alignItems='center' justifyContent='center' sx={{ width: '70px', height: '4vh', bgcolor: '#FFFFFF', borderRadius: 1 }}>
                                    <Typography sx={{ color: 'black' }} fontSize={14} fontWeight={600} >Follow</Typography>
                                 </Box>
                             </IconButton>
                            </Box>
                        </Stack>}
                    </Box>
                ))}
            </Box>
        </div>
    )
}

export default SuggestionCard