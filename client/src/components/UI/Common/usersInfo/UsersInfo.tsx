
import { Avatar, Box, Button, Grid, IconButton, Stack, Typography, } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../../context/userContext'
import { conversation_start, follow_status_check, follow_user, get_follow_count, view_all_following } from '../../../../services/Api/user/userApi'
import { ErrorModalOpen } from '../../../../services/Reducers/UserReducer'
function UsersInfo() {
  const usersData = useSelector((state: any) => state.userData.value.usersProfileData)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [count, setCount] = useState<any>()
  const [viewFollowing, setViewFollowing] = useState<any>()
  const [status, setStatus] = useState<any>()
  const { user } = useContext(UserContext)

  useEffect(() => {
    console.log(usersData, 'usersData')
    getAllCount(usersData?._id)
    ViewAllFollowing(usersData?._id)
    StatusCheck(usersData?._id)
  }, [usersData])

  //FOLLOWING A USER //

  const Follow = async () => {
    const userId = user?.id
    const friendId = usersData?._id
    const id = { userId, friendId }
    const followResponse = await follow_user(id)
  }

  // FETCHING FOLLOWING COUNT //

  const getAllCount = async (CurrentUserId: any) => {
    const countResponse = await get_follow_count(CurrentUserId)
    setCount(countResponse)
  }

  // VIEW ALL FOLLOWING //

  const ViewAllFollowing = async (userId: any) => {
    const viewAllFollowingRespone = await view_all_following(userId)
    setViewFollowing(viewAllFollowingRespone?.following)
  }

  // STATUS CHECK FOLLOW // 

  const StatusCheck = async (friendId: any) => {
    const statusCheckResponse = await follow_status_check(user?.id, friendId)
    setStatus(statusCheckResponse)
  }


  // HANDLING FOLLOWERS AND FOLLOWING LIST MODAL //

  const handleOpenList = (item: string) => {

  }

  // MESSAGING THIS USER //

  const handleMessageThisUser = async () => {
    const userId = user?.id
    const friendId = usersData?._id
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
    <>
      <Box sx={{ bgcolor: '#cfe8fc', height: '21vh', borderRadius: '23px', position: 'relative', objectFit: 'cover' }} >
        <img className="profile-cover-image" src="" />
      </Box>
      <Box sx={{ position: 'relative', top: -70, ml: 2 }} >
        {usersData?.Images ?
          <Avatar
            alt="Remy Sharp"
            src={`/images/${usersData?.Images}`}
            sx={{ width: 130, height: 130 }}
          /> : <Avatar
            alt="Remy Sharp"
            src=""
            sx={{ width: 130, height: 130 }}
          />}
      </Box>
      {/* <UserProfileBio /> */}

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
                    <Typography fontWeight={600} variant="h5" sx={{ color: "#FFFFFF" }}>{usersData?.username}</Typography>
                    <Typography sx={{ color: '#FFFFFF', opacity: .5 }}>{usersData?.bio ? usersData?.bio : usersData?.email}</Typography>
                  </Box>
                  {/* <UserFollowingInfo user ={user?.id}/> */}

                  <Box sx={{ mt: 1 }}>
                    <Stack display='flex' direction='row' spacing={2} >
                      <IconButton onClick={() => handleOpenList('Followers')}>
                        <Box>

                          <Box display='flex' justifyContent='center' alignItems='center' sx={{ bgcolor: 'rgba(225,225,225,0.15)', width: '100px', height: '6vh', color: '#FFFFFF' }}>
                            <Typography fontWeight={600}>{count?.followers}</Typography>
                          </Box>
                          <Box display='flex' justifyContent='center' alignItems='center' sx={{ width: '100px', height: '6vh', color: '#FFFFFF' }}>
                            <Typography fontWeight={600}> Followers</Typography>
                          </Box>

                        </Box>
                      </IconButton>
                      <IconButton onClick={() => handleOpenList('Following')}>
                        <Box>

                          <Box display='flex' justifyContent='center' alignItems='center' sx={{ bgcolor: 'rgba(225,225,225,0.15)', width: '100px', height: '6vh', color: '#FFFFFF' }}>
                            <Typography sx={{ color: '#FFFFFF' }} fontWeight={600}>{count?.following}</Typography>
                          </Box>
                          <Box display='flex' justifyContent='center' alignItems='center' sx={{ width: '100px', height: '6vh', color: '#FFFFFF' }}>
                            <Typography fontWeight={600}>Following</Typography>
                          </Box>

                        </Box>
                      </IconButton>
                    </Stack>
                  </Box>

                  {/* MESSAGE CLICK  */}


                  <Box display='flex' justifyContent='center' sx={{ width: '100%' }}>
                    <IconButton onClick={() => Follow()} >
                      <Box display='flex' justifyContent='center' alignItems='center' sx={{ bgcolor: '#FFFFFF', width: '90px', height: '4vh', borderRadius: 15 }}>
                        <Typography sx={{ color: 'black' }} fontSize={14} fontWeight={600}>{status}</Typography>
                      </Box>
                    </IconButton>
                    <IconButton onClick={() => handleMessageThisUser()} >
                      <Box display='flex' justifyContent='center' alignItems='center' sx={{ bgcolor: '#FFFFFF', width: '90px', height: '4vh', borderRadius: 15 }}>
                        <Typography sx={{ color: 'black' }} fontSize={14} fontWeight={600}>message</Typography>
                      </Box>
                    </IconButton>
                  </Box>

                </Box>
              </Box>
            </Grid>
            <Grid item xs>
              {/* <EditProfile/> */}

              {/* <Box display='flex' justifyContent='center' sx={{ width: '100%' }}>
                <IconButton onClick={() => Follow()} >
                  <Box display='flex' justifyContent='center' alignItems='center' sx={{ bgcolor: '#FFFFFF', width: '90px', height: '4vh', borderRadius: 15 }}>
                    <Typography sx={{ color: 'black' }} fontSize={14} fontWeight={600}>{status}</Typography>
                  </Box>
                </IconButton>
              </Box> */}


            </Grid>
          </Grid>
        </Box>
      </Box>


      {/* <CreatePostModal />           */}
    </>
  )
}

export default UsersInfo