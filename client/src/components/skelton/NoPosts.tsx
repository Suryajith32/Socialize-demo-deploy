import { Box, Typography } from '@mui/material'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import React from 'react'

function NoPosts() {
    return (
        <div>
            <Box  display='flex' flexDirection='column' justifyContent='center' alignItems='center' sx={{ height: '20vh' }}>
                <Typography variant='h4' sx={{ color: 'grey' }}>No posts</Typography>
               <CameraAltOutlinedIcon sx={{color:'grey',fontSize:50}}/>
            </Box> 
            
        </div>
    )
}

export default NoPosts