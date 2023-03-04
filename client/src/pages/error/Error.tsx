
import { Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Box, height, minHeight } from '@mui/system'
import blob2 from '../../assets/svg/blob2.svg'
import './error.css'


function Error() {
  return (
    <div>
      <Box sx={{ width: '100%', minHeight: "100vh", bgcolor: "black",}}>
      <Container maxWidth="lg">
        <Box display='flex' justifyContent='center' alignItems='center' sx={{ height: '99vh' }}>
          <Box> <img className='blob' src={blob2}/></Box>
         <Box sx={{position:"absolute"}}>
          <Typography fontSize={150} fontWeight={600} fontStyle='italic' sx={{color:'#FFFFFF'}}>404</Typography>
          <Typography variant='h4' fontWeight={600} fontStyle='italic' sx={{color:'#FFFFFF'}}>Page not found</Typography>
         </Box>
        </Box>

      </Container>
      </Box>
    </div>
  )
}

export default Error