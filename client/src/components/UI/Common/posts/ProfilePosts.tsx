import { AspectRatio, Box, Grid, } from '@mui/joy';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../context/userContext';
import {  get_profile_posts, user_post_details } from '../../../../services/Api/userPost/postsApi';
import { CommentModalOpen } from '../../../../services/Reducers/UserReducer';
import NoPosts from '../../../skelton/NoPosts';
import CommentModal from '../modals/commentModal/CommentModal'

export default function StandardImageList() {
  const {user} = useContext(UserContext)
  const navigate = useNavigate()
  const [posts, setPosts] = useState<any>()
  const [singlePostData, setSinglePostData] = useState<any>()
  const [userName, setUserName] = useState<any>()
  const dispatch = useDispatch()
  useEffect(() => {
    const id = user?.id
    getAllProfilePost(id)
  }, [])

  const getAllProfilePost = async (id:any) => {
    const fetchPostResponse = await get_profile_posts(id)
    setPosts(fetchPostResponse)
  }

  // HANDLING POST CLICK //

   const handleOpenPostClick = async (postId: string, username: string) => {
    try {
      const postData = await user_post_details(postId)
      if (postData) {
          setSinglePostData(postData)
          setUserName(username)
          dispatch(CommentModalOpen(true))
      }
  } catch (error) {
      navigate('error')
  }
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
            <Grid onClick={()=>handleOpenPostClick(item?._id, item?.userId.username)} xs={2} sm={4} md={4} key={index}>
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
      <CommentModal singlePostData={singlePostData} userName={userName} />
    </>
  );
}
