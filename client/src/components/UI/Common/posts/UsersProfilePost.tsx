import { AspectRatio, Box, Grid, } from '@mui/joy';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserContext } from '../../../../context/userContext';
import {  get_profile_posts } from '../../../../services/Api/userPost/postsApi';
import NoPosts from '../../../skelton/NoPosts';

export default function UsersProfilePost() {
  const usersData = useSelector((state: any) => state.userData.value.usersProfileData)
  const {user} = useContext(UserContext)
  const [posts, setPosts] = useState<any>()
  useEffect(() => {
    const id = user?.id
    getAllProfilePost()
  }, [])

  const getAllProfilePost = async () => {
    const fetchPostResponse = await get_profile_posts(usersData?._id)
    setPosts(fetchPostResponse)
  }

  return (
    <>
      {posts?.length === 0 ?
     <Box>
      <NoPosts/>
     </Box>:
     <Box >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ flexGrow: 1 }}
        >
          {posts && posts?.map((item: any, index: number) => (
            <Grid xs={2} sm={4} md={4} key={index}>
              <AspectRatio
                objectFit="cover"
                variant="outlined"
                ratio="4/3"
                sx={{
                  width: 180,
                  bgcolor: 'background.level2',
                  borderRadius: 'md',
                }}
              >
                <img src={`/images/${item?.Images}`} />
              </AspectRatio>
            </Grid>
          ))}
        </Grid>
      </Box>}
    </>
  );
}
