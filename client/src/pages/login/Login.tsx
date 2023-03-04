import { Container } from '@mui/material'
import { useState,  } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import './login.css'
import { useNavigate } from 'react-router-dom'
import {  login_user } from '../../services/Api/user/userApi'
import { useDispatch } from 'react-redux'
import { ErrorModalOpen } from '../../services/Reducers/UserReducer'

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isUserExist, setIsUserExist] = useState(false)
    const [isBlockedUser, setIsBlockedUser] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    //HANDLE CHANGING CREDENTIALS//

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    // AUTH CHECK//

    // const authCheck = async () => {
    //     const auth: any = auth_user()
    //     if (auth) {
    //         navigate('/')
    //     } else if (!auth) {
    //         navigate('/login')
    //     }
    // }
    // useEffect(() => {
    //     authCheck()
    // }, [])

    //LOGIN SUBMIT//

    const submit = async () => {
        try {
            const login = await login_user(user)
            if (login.auth) {
                localStorage.setItem("token", login.token)
                navigate('/')
            } else {
                if (login.message === "Wrong username password") {
                    setIsUserExist(true)
                    setErrorMessage('Invalid Email or Password')
                }
                if (login.message === "The user is blocked") {
                    setIsBlockedUser(true)
                    setErrorMessage('This User is blocked')
                }
                if (login.message === "no user exists") {
                    setIsUserExist(true)
                    setErrorMessage('Invalid Email or Password')
                }
            }
        } catch (err) {
          dispatch(ErrorModalOpen(true))
        }
    }

    return (
        <div>
            <Box mt={5}>
                <Grid container >
                    <Grid sx={{ display: { xs: 'none', md: 'block', lg: 'block', sm: 'none' } }} item xs={6} md={6}>
                        <Box display='flex' flexDirection='column' justifyContent='center' alignContent='center' sx={{ mt: 8, height: '47vh', width: '100%' }}>
                            <Box sx={{ m: 'auto', }}>
                                <Typography fontWeight={600} variant='h1' sx={{ color: '#FFFFFF', fontStyle: 'italic' }}>Get </Typography>
                                <Typography fontWeight={600} variant='h1' sx={{ color: '#FFFFFF', fontStyle: 'italic' }}>Socialized</Typography>
                                <Typography variant='h5' sx={{ color: '#FFFFFF', fontStyle: 'italic' }}>Don't have an account?</Typography>
                                <Typography fontWeight={600} variant='h4' sx={{ color: '#FFFFFF', fontStyle: 'italic', }}>Get Started now</Typography>
                                <Link style={{ textDecoration: 'none', color: "black" }} to='/signup'><Box display='flex' justifyContent='center' sx={{
                                    bgcolor: "#FFFFFF", height: '5vh', width: '28%', borderRadius: 14, mt: 2, '&:hover': { backgroundColor: '#F73D93', opacity: [0.9, 0.8, 0.7], },
                                }}>
                                    <Typography sx={{ fontStyle: 'italic', }} fontWeight={600} variant='h6'>Sign up</Typography>
                                </Box></Link>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} >
                        {/* , backgroundImage: `url(${bgimage})` */}
                        <Box sx={{ position: 'relative', height: '90vh', width: '100%', objectFit: 'cover', backgroundRepeat: "no-repeat", backgroundSize: "contain" }}>
                            <Box sx={{ bgcolor: "transparent", }}>
                                <Container maxWidth="xs">
                                    <Box >
                                        <Box mt={20} sx={{ borderRadius: 6, backgroundColor: "rgba(255, 255, 255, 0.10)", height: '80vh' }} >
                                            <div className="login">
                                                <h1>Login</h1>
                                                {isUserExist || isBlockedUser ?
                                                    <Box sx={{ color: 'red', mb: 3 }}>{errorMessage}</Box> : ''
                                                }
                                                <input onChange={handleChange} name='email' type="text" placeholder="Email" />
                                                <input onChange={handleChange} name='password' type="password" placeholder="Password" />
                                                <button onClick={submit} type="submit" className="btn btn-primary btn-block btn-large">Login</button>
                                                {/* <Box mt={2}> {error && <Alert severity="error">{error}</Alert>}</Box> */}
                                                <Typography sx={{ mt: 6, ml: 2, color: '#FFFFFF', }}>New User ?  <Link style={{ textDecoration: 'none', color: "#FFFFFF" }} to='/signup'>Sign up Now</Link> </Typography>
                                                <Typography sx={{ mt: 1, ml: 2, color: '#FFFFFF', }}><Link style={{ textDecoration: 'none', color: "#FFFFFF" }} to='/forgot-password'>Forgot Password?</Link> </Typography>
                                            </div>
                                        </Box>
                                    </Box>
                                </Container>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default Login



