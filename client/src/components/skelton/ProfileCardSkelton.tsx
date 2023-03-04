import { Avatar, Box, Stack, Typography } from '@mui/joy'
import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import { NavLink } from 'react-router-dom'

function ProfileCardSkelton() {
    return (
        <div>
            <Box sx={{ height: '42vh', borderRadius: '23px', }}>

                <Box>
                    <Box display='flex' justifyContent='center' sx={{ maxWidth: '100%', pt: 2 }}>
                        <Skeleton sx={{ bgcolor: 'grey.900' }} variant="circular">
                            <Avatar sx={{ width: 75, height: 75 }} />
                        </Skeleton>
                    </Box>
                    <Box display='flex' justifyContent='center' sx={{ color: '#FFFFFF', maxWidth: '100%' }}>
                        <Box sx={{ width: '40%' }} pt={1}>
                            <Skeleton sx={{ bgcolor: 'grey.900' }} width="100%">
                                <Typography>.</Typography>
                            </Skeleton>
                            <Box display='flex' justifyContent='center' sx={{ color: '#FFFFFF', maxWidth: '100%' }}>
                                <Box sx={{ width: '35%' }}>
                                    <Skeleton sx={{ bgcolor: 'grey.900' }} width="100%">
                                        <Typography>.</Typography>
                                    </Skeleton>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>


                <Box sx={{ ml: 5, mr: 5, mt: 2 }}>
                    <Stack display='flex' direction='row' spacing={2} justifyContent='space-between' >
                        <Box sx={{ color: '#FFFFFF', width: '40%' }}>
                            <Skeleton sx={{ bgcolor: 'grey.900' }} width="100%">
                                <Typography>.</Typography>
                            </Skeleton>
                            <Box display='flex' justifyContent='center' sx={{ color: '#FFFFFF', maxWidth: '100%' }}>
                                <Skeleton sx={{ bgcolor: 'grey.900' }} width="100%">
                                    <Typography>.</Typography>
                                </Skeleton>
                            </Box>
                        </Box>
                        <Box sx={{ color: '#FFFFFF', width: '40%' }}>
                            <Skeleton sx={{ bgcolor: 'grey.900' }} width="100%">
                                <Typography>.</Typography>
                            </Skeleton>
                            <Box display='flex' justifyContent='center' sx={{ color: '#FFFFFF', maxWidth: '100%' }}>
                                <Skeleton sx={{ bgcolor: 'grey.900' }} width="100%">
                                    <Typography>.</Typography>
                                </Skeleton>
                            </Box>
                        </Box>
                    </Stack>
                    <NavLink to='profile' style={{ textDecoration: 'none' }}><Box display='flex' justifyContent='center' sx={{ color: '#009EFF', maxWidth: '100%', pt: 2 }}>
                        <Typography fontWeight={570} >My Profile</Typography>
                    </Box></NavLink>
                </Box>

            </Box>
        </div>
    )
}

export default ProfileCardSkelton