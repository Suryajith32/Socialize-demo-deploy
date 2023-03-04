import { Container } from '@mui/material'
import { useState,  } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import './adminlogin.css'
import { useNavigate } from 'react-router-dom'
import { admin_login } from '../../../services/Api/admin/adminApi'


function AdminLogin() {

    const [admin, setAdmin] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate()
    const [loginErr, setLoginErr] = useState(false)

    // HANDLING CREDENTIAL INPUTS //
    const handleChange = (e: any) => {
        const { name, value } = e.target
        setAdmin({
            ...admin,
            [name]: value

        })
    }

    //ADMIN LOGIN SUBMIT//

    const submit = async(e:any) => {
        const { username, password } = admin
        // if(username && password){
        console.log('inside if');
        const adminloginResponse = await admin_login(admin)
            console.log('inside axios');
            console.log(adminloginResponse);
            if (adminloginResponse == "login") {
                console.log('in login if');
                navigate('/admin')
            } else {
                console.log('nologin');
                setLoginErr(true)
                e.preventDefault()
            }
        
        // }

    }

    return (
        <div>
            <Box display='flex' justifyContent='center' mt={5}>
                <Box>
                    <Grid container >
                        <Grid item xs={12} md={6} >
                            {/* , backgroundImage: `url(${bgimage})` */}
                            <Box sx={{ position: 'relative', height: '90vh', width: '100%', objectFit: 'cover', backgroundRepeat: "no-repeat", backgroundSize: "contain" }}>
                                <Box sx={{ bgcolor: "transparent", }}>
                                    <Container maxWidth="xs">
                                        <Box >
                                            <Box mt={20} sx={{ borderRadius: 6, height: '80vh' }} >
                                                <div className="login">
                                                    <h1>AdminLogin</h1>
                                                    {loginErr ?
                                                        <Box sx={{ color: 'red', mb: 3 }}>Invalid username / password</Box> : ''
                                                    }
                                                    <input onChange={handleChange} name='email' type="text" placeholder="Email" />
                                                    <input onChange={handleChange} name='password' type="password" placeholder="Password" />
                                                    <button onClick={submit} type="submit" className="btn btn-primary btn-block btn-large">Login</button>
                                                    {/* <Box mt={2}> {error && <Alert severity="error">{error}</Alert>}</Box> */}
                                                    {/* <Typography sx={{ mt: 6, ml: 2, color: '#FFFFFF', }}>New User ?  <Link style={{ textDecoration: 'none', color: "#FFFFFF" }} to='/signup'>Sign up Now</Link> </Typography>
                                                <Typography sx={{ mt: 1, ml: 2, color: '#FFFFFF', }}><Link style={{ textDecoration: 'none', color: "#FFFFFF" }} to='/forgot-password'>Forgot Password?</Link> </Typography> */}
                                                </div>
                                            </Box>
                                        </Box>
                                    </Container>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    )
}

export default AdminLogin



