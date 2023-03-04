import { useEffect, useState } from 'react'
import Navbar from '../../components/UI/Common/navbar/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { Box, Container } from '@mui/system'
import { Grid, } from '@mui/material'
import ProfileCard from '../../components/UI/LargeScreen/profileCard/ProfileCard'
import SuggestionCard from '../../components/UI/LargeScreen/suggestionCard/SuggestionCard'
import FriendListCard from '../../components/UI/LargeScreen/friendListCard/FriendListCard'
import BottomNav from '../../components/UI/SmallScreen/bottomNav/BottomNav'
import { auth_user } from '../../services/Api/user/userApi'
import ErrorModal from '../../components/UI/Common/modals/errorModal/ErrorModal'
import Success from '../../components/UI/Common/snackBars/Success'

function Home() {
  const navigate = useNavigate()

  //AUTH CHECK//

  const authCheck = () => {
    const auth: any = auth_user()
    if (auth) {
      navigate('/')
    } else if (!auth) {
      navigate('/login')
    }
  }
  useEffect(() => {
    authCheck()
  }, [])


  return (
    <div>
      <Navbar />
      <Box sx={{ mt: 1, height: '50vh', width: '100%' }}>
        <Grid container >
          <Grid item xs sx={{ display: { xs: 'none', md: 'none', lg: 'block', sm: 'none' } }}>
            <Container maxWidth="md">
              <Box sx={{ height: '85.5vh' }} >
                <Box>
                  <ProfileCard />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <SuggestionCard />
                </Box>
              </Box>
            </Container>
          </Grid>
          <Grid item xs={12} md={6}>
            <Container maxWidth="md">
              <Box sx={{
                overflow: "hidden",
                overflowY: "scroll", height: '88vh',
              }} >
                {/* <Feed /> */}
                <Outlet />
                <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none', lg: 'none' } }}><BottomNav /></Box>

              </Box>
            </Container>
          </Grid>
          <Grid item xs sx={{ display: { xs: 'none', md: 'none', lg: 'block', sm: 'none' } }}>
            <Container maxWidth="md">
              <Box sx={{ height: '85.5vh', }} >
                <Box>
                  <FriendListCard />
                </Box>
              </Box>
            </Container>
          </Grid>
          <Box>
          </Box>
        </Grid>
      </Box>
      <Success/>
      <ErrorModal/>
    </div>
  )
}

export default Home