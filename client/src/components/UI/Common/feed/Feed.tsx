import { Box } from "@mui/system"
import CreatePost from "../createPostModal/createPost/CreatePost"
import Posts from "../posts/Posts"


function Feed({socketio}:any) {
  return (
    <div>
      <Box>
        <Box sx={{ display: { md: 'block', lg: 'block', sm: 'none', xs: 'none' } }}>
          <CreatePost />
        </Box>
        <Box sx={{ mt: 2}}>
          <Posts socketio={socketio}/>
        </Box>
      </Box>
    </div>
  )
}

export default Feed