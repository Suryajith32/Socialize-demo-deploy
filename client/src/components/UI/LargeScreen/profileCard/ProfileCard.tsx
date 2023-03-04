import { Box, Typography, Stack, IconButton } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../../../../config/axios/axiosInstance';
import { UserContext } from '../../../../context/userContext';
import { useContext, useEffect, useState } from 'react'
import ProfileCardSkelton from '../../../skelton/ProfileCardSkelton';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentUserId, ProfileImage } from '../../../../services/Reducers/UserDataReducer';
import jwtDecode from 'jwt-decode';


function ProfileCard() {
  const isProfileCardUpdate = useSelector((state:any) => state.user.value.profileCardUpdate)
  const isProfileEditModal = useSelector((state: any) => state.user.value.isEditProfileModalOpen)
  const { user } = useContext(UserContext)
  const [currentUserId, setCurrentUserId] = useState<any>()
  const [currentUserData, setCurrentUserData] = useState<any[]>([])
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [count, setCount] = useState<any>()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(isProfileCardUpdate,'isProfileCardUpdate')
    try {
      const token = localStorage.getItem('token')
    if (token != null) {
      const tokenData: any = jwtDecode(token)
      setCurrentUserId(tokenData?.id)
      dispatch(CurrentUserId(tokenData?.id))
    }
    profileData()
    } catch (error) {
      console.log(error)
    }  
  }, [isProfileCardUpdate,user, isProfileEditModal])

  // FETCHING CURRENT USER DATA //

  const profileData = async () => {
    await axiosInstance.get('/viewprofiledetails/' + user?.id, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      setIsLoaded(true)
      console.log(response.data,'currentuserData profile card')
      setCurrentUserData(response?.data)
      dispatch(ProfileImage(response?.data[0]?.Images))
    }).catch((err) => {
      console.log(err, 'error from userProfileData')
    })
  }

  // FETCHING FOLLOWERS AND FOLLOWING COUNT //

  useEffect(() => {
    axiosInstance.get('/followingcount/' + currentUserId, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      setCount(response?.data?.count)
    })
  }, [user,])


  return (
    <div>
      {!isLoaded ?
        <Box>
          <ProfileCardSkelton />
        </Box>
        :
        <Box sx={{ bgcolor: 'rgba(225,225,225,0.10)', height: '42vh', borderRadius: '23px', }}>
          {currentUserData && currentUserData?.map((item: any, index: number) => (
            <Box key={index}>
             <Box display='flex' justifyContent='center' sx={{ maxWidth: '100%', pt: 2 }}>
                {item.Images ? <Avatar sx={{ width: 75, height: 75 }} src={`/images/${item?.Images}`} /> :
                  <Avatar sx={{ width: 75, height: 75 }} src='' />}
              </Box>
              <Box display='flex' justifyContent='center' sx={{ color: '#FFFFFF', maxWidth: '100%' }}>
                <Box pt={1}>
                  <Typography sx={{ fontSize: 18 }} fontWeight={570}>{item?.username}</Typography>
                </Box>
              </Box>
              <Box display='flex' justifyContent='center' sx={{ color: 'grey', maxWidth: '100%' }}>
                <Box pt={.5}>
                  <Typography sx={{ fontSize: 15 }} fontWeight={340}>{item?.bio}</Typography>
                </Box>
              </Box>
            </Box>
          ))}

          <Box sx={{ ml: 5, mr: 5, mt: 2 }}>
            <Stack display='flex' direction='row' spacing={2} justifyContent='space-between' >
              <Box sx={{ color: '#FFFFFF' }}>
                <Typography sx={{ fontSize: 18 }}>Followers</Typography>
                <Box display='flex' justifyContent='center' sx={{ color: '#FFFFFF', maxWidth: '100%' }}>
                  {count ? <Typography sx={{ fontSize: 18 }} fontWeight={570}>{count?.followers}</Typography> :
                    <Typography sx={{ fontSize: 18 }} fontWeight={570}>0</Typography>}
                </Box>
              </Box>
              <Box sx={{ color: '#FFFFFF' }}>
                <Typography sx={{ fontSize: 18 }}>Following</Typography>
                <Box display='flex' justifyContent='center' sx={{ color: '#FFFFFF', maxWidth: '100%' }}>
                  {count ? <Typography sx={{ fontSize: 18 }} fontWeight={570}>{count?.following}</Typography> :
                    <Typography sx={{ fontSize: 18 }} fontWeight={570}>0</Typography>}
                </Box>
              </Box>
            </Stack>
            <NavLink to='profile' style={{ textDecoration: 'none' }}><Box display='flex' justifyContent='center' sx={{ color: '#009EFF', maxWidth: '100%', pt: 2 }}>
              <Typography fontWeight={570} >My Profile</Typography>
            </Box></NavLink>
          </Box>
        </Box>}
    </div>
  )
}

export default ProfileCard