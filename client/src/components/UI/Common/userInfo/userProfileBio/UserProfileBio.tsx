import { Box,  Typography } from '@mui/material'
import React, { useEffect,useContext } from 'react'
import Grid from '@mui/material/Grid'
import UserFollowingInfo from './userFollowingInfo/UserFollowingInfo'
import EditProfile from './editProfile/EditProfile'
import { useSelector } from 'react-redux'
import { UserContext } from '../../../../../context/userContext'

function UserProfileBio() {
     const {user} = useContext(UserContext)
    const isProfileEditModal = useSelector((state: any) => state.user.value.isEditProfileModalOpen)
    const currentUserProfileBio = useSelector((state:any) => state.userData.value.profileInformation)
   
    useEffect(() => {       
   }, [isProfileEditModal])
   
  
    return (
   <>
   <Box sx={{ top: -70, position: 'relative' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                        <Grid sx={{ display: { xs: 'none', md: 'block' } }} item xs="auto">
                            <Box sx={{ color: 'transparent' }}>variable width conten</Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box display='flex' justifyContent='center' sx={{ width: '100%', height: '18vh', }}>
                                <Box>
                                    <Box>
                                        <Typography fontWeight={600} variant="h5" sx={{ color: "#FFFFFF" }}>{currentUserProfileBio?.username}</Typography>
                                        <Typography sx={{ color: '#FFFFFF', opacity: .5 }}>{currentUserProfileBio?.email}</Typography>
                                    </Box>
                                    <UserFollowingInfo user ={user?.id}/>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs>
                           <EditProfile/>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
   </>
  )
}

export default UserProfileBio