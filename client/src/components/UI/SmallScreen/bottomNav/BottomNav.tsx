import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useState } from 'react';
import Paper from '@mui/material/Paper/Paper';
import Box from '@mui/material/Box/Box';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { NavLink, useNavigate } from 'react-router-dom';
import {useEffect} from 'react'

export default function LabelBottomNavigation() {
  const [value, setValue] = useState<any>();
  const [pathname, setPathName] = useState<any>()

  const navigate = useNavigate()

  useEffect(() => {
    setPathName(window.location.pathname)
  }, [window.location.pathname])
  

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(newValue,'newValue')
    if(newValue === 0){
      navigate('/')
    } else if(newValue === 1){

    }else if(newValue === 2){
      navigate('notification')
    }else if(newValue === 3){
      navigate('profile')
    }

  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0,zIndex:100 ,bgcolor:'black'}} >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => 
            handleChange(event, newValue)
          }
          sx={{bgcolor:'black',color:'blue'}}
        >
          <BottomNavigationAction sx={{color: '#009EFF'}} label="Home" icon={<HomeOutlinedIcon/>} />
          <BottomNavigationAction sx={{color: '#009EFF'}} label="create" icon={<AddBoxOutlinedIcon/>} />
          <BottomNavigationAction sx={{color: '#009EFF'}} label="notification" icon={<NotificationsNoneOutlinedIcon/>} />
          <BottomNavigationAction sx={{color: '#009EFF'}} label="profile" icon={<AccountBoxOutlinedIcon/>} />
        </BottomNavigation>
      </Paper>
  );
}