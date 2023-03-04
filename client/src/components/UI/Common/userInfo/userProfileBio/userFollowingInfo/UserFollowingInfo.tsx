import { Box, Stack, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton/IconButton'
import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_followers_list, get_following_list, view_all_following } from '../../../../../../services/Api/user/userApi'
import { FollowFollowingModalOpen } from '../../../../../../services/Reducers/UserReducer'
import List from './followingAndFollowersModal/List'

function UserFollowingInfo({ user }: any) {
    const Count = useSelector((state: any) => state.userData.value.followFollowerCount)
    const [title, setTitle] = useState<string>('')
    const [followersList, setFollowersList] = useState<any>()
    const [viewFollowing,setViewFollowing] = useState<any>()
    const [followingList, setFollowingList] = useState<any>()
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(user, 'user props')
        GetAllFollowers(user)
        GetAllFollowings(user)
        ViewAllFollowing(user)
    }, [Count])

    // HANDLING FOLLOWERS AND FOLLOWING LIST MODAL //

    const handleOpenList = (item: string) => {
        setTitle(item)
        dispatch(FollowFollowingModalOpen(true))
    }

    // FETCHING FOLLOWERS LIST //

    const GetAllFollowers = async (userId: any) => {
        const GetAllFollowingRespone = await get_followers_list(userId)
        setFollowersList(GetAllFollowingRespone)
    }

    // FETCHING FOLLOWING LIST //

    const GetAllFollowings = async (userId: any) => {
        const GetAllFollowingResponse = await get_following_list(userId)
        setFollowingList(GetAllFollowingResponse)
    }
    
    // VIEW ALL FOLLOWING //

    const ViewAllFollowing = async (userId:any) =>{
        const  viewAllFollowingRespone = await view_all_following(userId)
        setViewFollowing(viewAllFollowingRespone?.following)
        }



    return (
        <>
            <Box sx={{ mt: 1 }}>
                <Stack display='flex' direction='row' spacing={2} >
                    <IconButton onClick={() => handleOpenList('Followers')}>
                        <Box>

                            <Box display='flex' justifyContent='center' alignItems='center' sx={{ bgcolor: 'rgba(225,225,225,0.15)', width: '100px', height: '6vh', color: '#FFFFFF' }}>
                                <Typography fontWeight={600}>{Count ? Count?.count?.followers : '0'}</Typography>
                            </Box>
                            <Box display='flex' justifyContent='center' alignItems='center' sx={{ width: '100px', height: '6vh', color: '#FFFFFF' }}>
                                <Typography fontWeight={600}> Followers</Typography>
                            </Box>

                        </Box>
                    </IconButton>
                    <IconButton onClick={() => handleOpenList('Following')}>
                        <Box>

                            <Box display='flex' justifyContent='center' alignItems='center' sx={{ bgcolor: 'rgba(225,225,225,0.15)', width: '100px', height: '6vh', color: '#FFFFFF' }}>
                                <Typography sx={{ color: '#FFFFFF' }} fontWeight={600}>{Count ? Count?.count?.following : '0'}</Typography>
                            </Box>
                            <Box display='flex' justifyContent='center' alignItems='center' sx={{ width: '100px', height: '6vh', color: '#FFFFFF' }}>
                                <Typography fontWeight={600}>Following</Typography>
                            </Box>

                        </Box>
                    </IconButton>
                </Stack>
            </Box>
            <List 
            title={title} 
            followersList={followersList} 
            followingList={followingList} 
            viewFollowing={viewFollowing}
            user={user}
            />
        </>
    )
}

export default UserFollowingInfo