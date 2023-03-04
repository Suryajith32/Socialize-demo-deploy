import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';


export default function SkeletonChildrenDemo() {


    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ margin: 1 }}>
                    <Skeleton sx={{ bgcolor: 'grey.900' }} variant="circular">
                        <Avatar  />
                    </Skeleton>
                </Box>
                <Box sx={{ width: '20%' }}>
                    <Skeleton sx={{ bgcolor: 'grey.900' }} width="100%">
                        <Typography>.</Typography>
                    </Skeleton>
                    <Skeleton sx={{ bgcolor: 'grey.900' }} width="100%">
                        <Typography>.</Typography>
                    </Skeleton>
                </Box>              
            </Box>
            <Box sx={{ width: '80%',ml:5,mr:5 ,mt:2}}>
                    <Skeleton sx={{ bgcolor: 'grey.900' }} width="100%">
                        <Typography>.</Typography>
                    </Skeleton>
                </Box>
            <Skeleton sx={{ bgcolor: 'grey.900',borderRadius:'23px',mt:2 }} variant="rectangular" width="100%">
                <div style={{ paddingTop: '57%' }} />
            </Skeleton>
        </div>
    );
}