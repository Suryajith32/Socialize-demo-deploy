import { Avatar, Badge, Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Diversity2Icon from '@mui/icons-material/Diversity2';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import './navbar.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import PersonAdd from '@mui/icons-material/PersonAdd';
import { useEffect } from 'react'
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { UserContext } from '../../../../context/userContext';
import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';
import SearchBar from './searchBar/SearchBar';
import { get_notification_count } from '../../../../services/Api/user/userApi';

function Navbar() {
    const isProfileEditModal = useSelector((state: any) => state.user.value.isEditProfileModalOpen)
    const notifyUpdate = useSelector((state:any) => state.user.value.isNotifyUpdate)
    const ProfileImage = useSelector((state: any) => state.userData.value.profileImage)
    const [pathname, setPathName] = useState<any>()
    const [notificationCount, setNotificationCount] = useState<number>()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { user } = useContext(UserContext)
    const { setUser } = useContext(UserContext)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        navigate('profile')
    }
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    useEffect(() => {
        setPathName(window.location.pathname)
        const data = localStorage.getItem('token')
        if (data != null) {
            const userData = jwtDecode(data)
            setUser(userData)
        }
    }, [isProfileEditModal, window.location.pathname])

    useEffect(() => {
        GetNotificationCount()
    }, [notifyUpdate])


    // FETCHING NOTIFICATION COUNT //

    const GetNotificationCount = async () => {
        try {
            const countResponse = await get_notification_count()
            setNotificationCount(countResponse?.length)
        } catch (error) {

        }
    }

    return (
        <div>
            <Box >
                <Box>
                    <Stack display='flex' direction='row' justifyContent='space-between' alignItems='center'>
                        <Box display='flex' alignItems='center' sx={{ ml: 2, width: '100%', height: '10vh' }} >
                            <Stack display='flex' direction='row' alignItems='center' spacing={4} >
                                <Box sx={{ color: '#009EFF', ml: 1 }}>
                                    <Diversity2Icon fontSize='large' />
                                </Box>

                                {/* //SEARCH BAR// */}

                                <SearchBar />

                                <NavLink to='/'><Box sx={{ color: '#009EFF', display: { md: 'block', sm: 'block', xs: 'none' } }}>
                                    {pathname === '/' ? <HomeIcon sx={{ fontSize: "30px", }} /> : <HomeOutlinedIcon sx={{ fontSize: "30px", }} />}
                                </Box></NavLink>
                            </Stack>
                        </Box>
                        <Box sx={{ mr: 3, }}>
                            <Stack display='flex' direction='row' spacing={5} alignItems='center'>
                                <NavLink to='inbox'> <Box sx={{ color: '#009EFF', display: { md: 'block', sm: 'block', xs: 'block' } }}>
                                    {pathname === '/inbox' ? <QuestionAnswerIcon sx={{ fontSize: "30px" }} /> : <QuestionAnswerOutlinedIcon sx={{ fontSize: "30px" }} />}
                                </Box></NavLink>
                                <NavLink to='notification'><Box sx={{ color: '#009EFF', display: { md: 'block', sm: 'block', xs: 'none' } }}>
                                    {pathname === '/notification' ?
                                    <Badge badgeContent={notificationCount} color="error"><NotificationsIcon sx={{ fontSize: "30px" }} /> </Badge> :  <Badge badgeContent={notificationCount} color="error"> <NotificationsNoneOutlinedIcon sx={{ fontSize: "30px" }} /></Badge>}
                                </Box></NavLink>
                                <Box sx={{ display: { md: 'block', sm: 'block', xs: 'none' } }}>
                                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', }}>
                                        <Tooltip title="Account settings">
                                            <IconButton
                                                onClick={handleClick}
                                                size="small"
                                                sx={{ ml: 2 }}
                                                aria-controls={open ? 'account-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                            >
                                                {ProfileImage ? <Avatar sx={{ width: 45, height: 45 }} src={`/images/${ProfileImage}`} /> :
                                                    <Avatar sx={{ width: 45, height: 45 }} src='' />}
                                                <Typography fontWeight={550} sx={{ ml: 2, color: '#FFFFFF' }}>{user?.name}</Typography>
                                            </IconButton>
                                        </Tooltip>
                                        {/* </Box> */}
                                        <Menu
                                            anchorEl={anchorEl}
                                            id="account-menu"
                                            open={open}
                                            onClose={handleClose}
                                            onClick={handleClose}
                                            PaperProps={{
                                                elevation: 0,
                                                sx: {
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                    mt: 1.5,
                                                    bgcolor: 'rgba(167, 167, 167, 1)',
                                                    '& .MuiAvatar-root': {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                    },
                                                    '&:before': {
                                                        content: '""',
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: 'background.paper',
                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                        zIndex: 0,
                                                    },
                                                },
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <MenuItem onClick={handleProfile}>
                                                <Avatar /> Profile
                                            </MenuItem>
                                            <MenuItem>
                                                <Avatar /> My account
                                            </MenuItem>
                                            <Divider />
                                            <MenuItem>
                                                <ListItemIcon>
                                                    <PersonAdd fontSize="small" />
                                                </ListItemIcon>
                                                Add another account
                                            </MenuItem>
                                            <MenuItem>
                                                <ListItemIcon>
                                                    <Settings fontSize="small" />
                                                </ListItemIcon>
                                                Settings
                                            </MenuItem>
                                            <MenuItem onClick={handleLogout}>
                                                <ListItemIcon>
                                                    <Logout fontSize="small" />
                                                </ListItemIcon>
                                                Logout
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                </Box>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </Box >
        </div >
    )
}

export default Navbar