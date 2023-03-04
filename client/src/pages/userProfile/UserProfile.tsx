import { Box,  } from "@mui/material"
import { Container } from "@mui/system"
import ProfilePosts from '../../components/UI/Common/posts/ProfilePosts'
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config/axios/axiosInstance";
import {  useEffect } from "react";
import UserInfo from "../../components/UI/Common/userInfo/UserInfo";
import { user_profile_data } from "../../services/Api/user/userApi";
import { CurrentUserId, FollowFollowerCount, ProfileInfo } from "../../services/Reducers/UserDataReducer";
import jwtDecode from "jwt-decode";


function UserProfile() {
  const dispatch = useDispatch()
  const currentUserId = useSelector((state: any) => state.userData.value.currentuserId)

  //FETCHING FOLLOWINGCOUNT//

  const { data: FollowCounts, isLoading, refetch } = useQuery(["followcount"], () => {
    return axiosInstance.get('/followingcount/' + currentUserId, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) =>
      response.data
    )
  })
  dispatch(FollowFollowerCount(FollowCounts))


  // FETCHING PROFILE DATA //

  const getProfileData = async (userId: any) => {
    const profileInfoData = await user_profile_data(userId)
    dispatch(ProfileInfo(profileInfoData[0]))
  
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token != null) {
      const tokenData: any = jwtDecode(token)
      dispatch(CurrentUserId(tokenData?.id))
      getProfileData(tokenData?.id)
    }

  }, [])


  return (
    <div>
      <Box sx={{ width: '100%', minHeight: '88vh', bgcolor: 'rgba(225,225,225,0.10)', borderRadius: '23px' }}>
        <Box sx={{ pt: 2 }}>
          <Container sx={{
            maxWidth: '100%', overflow: "hidden",
            overflowY: "scroll",
          }} >
            <UserInfo />
            <Box sx={{ pt: 2 }}>
              <ProfilePosts />
            </Box>
          </Container>
        </Box>
      </Box>
    </div>
  )
}

export default UserProfile

