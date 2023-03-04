import Box from '@mui/material/Box'
import React from 'react'
import InBox from '../../components/UI/Common/inBox/InBox'

function Messages({socketio}:any) {
  return (
    <div>
        <Box sx={{ width: '100%', minHeight: '88vh', bgcolor: 'rgba(225,225,225,0.10)', borderRadius: '23px' }}>
          <Box>
            <InBox socket={socketio}/>
          </Box>
        </Box>
    </div>
  )
}

export default Messages