import { Avatar, Box, Stack } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import useDebounce from '../../../../../hooks/useDebounce/useDebounce';
import { search_user } from '../../../../../services/Api/user/userApi';
import { useQuery } from '@tanstack/react-query';
import Typography from '@mui/material/Typography';
import Popper from '@mui/material/Popper';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UsersProfileData } from '../../../../../services/Reducers/UserDataReducer';


function SearchBar() {
    const [searchValues, setSearchValues] = useState('')
    const dispatch = useDispatch()
    const [open, setOpen] = useState<boolean>(false)
    const debouncedValue = useDebounce(searchValues, 500)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate()


    // FETCHING SEARCHED USER //

    const { data: searchResult } = useQuery(["searchUserValues", debouncedValue], () =>
        search_user(debouncedValue)
    )

    // HANDLING SEARCH //

    const handleSearchChange = async (e: any) => {
        if (e.target.value) {
            setAnchorEl(e.currentTarget);
            setOpen(true);
        } else {
            setOpen(false);
        }
        setSearchValues(e.target.value)
    }

      // HANDLING NAVIGATION TO USERS PROFILE //

      const handleClickUser = (item:any) => {
        dispatch(UsersProfileData(item))
        navigate('users-profile')
    }

    return (
        <>

            <Box>
                <Box display='flex' alignItems='center' sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', width: '13em', maxHeight: '6vh', borderRadius: 2, }}>
                    <Box display='flex' justifyContent='center' alignItems='center' sx={{ ml: 1, height: '4.4vh', width: '2.5em', bgcolor: '#009EFF', borderRadius: 20, }}>
                        <SearchIcon />
                    </Box>
                    <Box sx={{ mt: 1 }}>
                        <input onChange={handleSearchChange} 
                        className='nav-search' 
                        type="search" 
                        placeholder='Search' 
                        name='search' 
                        autoComplete="off" />
                    </Box>
                </Box>
                
                {/*  DISPLAYING SEARH RESULT  */}

                <Box display='flex' justifyContent='center'>
                    <Box>
                        {searchResult && 
                        <Popper open={open} anchorEl={anchorEl} >
                            <Box  sx={{ pl: 2, pr: 2, pb: 2, mt: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
                               {searchResult?.length !== 0 ? <Box sx={{pt:1}}>
                                    {searchResult && searchResult?.map((item: any, index: number) => (
                                        <Box onClick={()=>handleClickUser(item)} sx={{ mt: 2, }}>
                                            <Stack display='flex' direction='row' alignItems='center' spacing={2}>
                                                <Box>
                                                    {item?.Images ?
                                                        <Avatar src={`/images/${item?.Images}`} /> :
                                                        <Avatar src='' />
                                                    }
                                                </Box>
                                                <Box>
                                                    <Typography>{item?.username}</Typography>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    ))}
                                </Box>:
                                <Box sx={{mt:1}}>
                                    <Typography >no user found</Typography>
                                </Box>
                                }
                            </Box>
                        </Popper>}
                    </Box>
                </Box>
            </Box>          
        </>
    )
}

export default SearchBar