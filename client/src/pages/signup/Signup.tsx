import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import './signup.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {  user_signup_otp } from '../../services/Api/user/userApi'
import OtpModal from '../../components/UI/Common/modals/otpModal/OtpModal'
import { ErrorModalOpen, OtpModalOpen } from '../../services/Reducers/UserReducer'
import { useDispatch } from 'react-redux'


function Signup() {

    const { register, formState: { errors }, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const [userExist, setUserExist] = useState<boolean>(false)
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: '',
        email: '',
        phone: '',
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

    //SIGNUP SUBMIT

    const onSubmit = async (e:any) => {
       
        try {
            const { username, email, phone, password } = user
            const newUser = {email}
            const otpSignup = await  user_signup_otp(newUser)
            if(otpSignup === 'otp has been sent'){
                dispatch(OtpModalOpen(true))
            }else if(otpSignup === 'user already exist'){
                setUserExist(!userExist)
                navigate('/signup')
            }
        } catch (error) {
            console.log(error)
           dispatch(ErrorModalOpen(true))
        }
    }

    return (
        <div>
            <Box mt={5}>
                <Grid container >
                    <Grid item xs={12} md={6} >
                        {/* , backgroundImage: `url(${bgimage})` */}
                        <Box sx={{ position: 'relative', height: '90vh', width: '100%', objectFit: 'cover', backgroundRepeat: "no-repeat", backgroundSize: "contain" }}>
                            <Box sx={{ bgcolor: "transparent", }}>
                                <Container maxWidth="xs">
                                    <Box >
                                        <Box mt={20} sx={{ borderRadius: 6, backgroundColor: "rgba(255, 255, 255, 0.10)", height: '80vh' }} >
                                            <div className="login">
                                                <h1>Sign up</h1>
                                                {userExist ? <Box sx={{ color: 'red', width: '100%', mb: 3 }}>
                                                    User Already Exist
                                                </Box> : ''}
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <input type="text" placeholder="Username" {...register("username", { required: true })} onChange={handleChange} />
                                                    <Box sx={{ color: 'red' }}>
                                                        {errors.username?.type === "required" && "username is Required"}
                                                    </Box>
                                                    <input type="text" placeholder="Email" {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })} onChange={handleChange} />
                                                    <Box sx={{ color: 'red' }}>
                                                        {errors.email?.type === "pattern" && "Entered email is wrong format"}
                                                        {errors.email?.type === "required" && "Email is Required"}
                                                    </Box>
                                                    <input type="number" placeholder="phone" {...register("phone", { minLength: 10, maxLength: 10, required: 'Phone No: must be 10 digit' })} onChange={handleChange} />
                                                    <Box sx={{ color: 'red' }}>
                                                        {errors.phone?.type === "minLength" && "Phone No: must be 10 digit"}
                                                        {errors.phone?.type === "maxLength" && "Phone No: must be 10 digit"}
                                                        {errors.phone?.type === "required" && "Phone No: is required"}
                                                    </Box>
                                                    <input type="password" placeholder="Password" {...register("password", { required: true, minLength: 6, maxLength: 12 })} onChange={handleChange} />
                                                    <Box sx={{ color: 'red' }}>
                                                        {errors.password?.type === "minLength" && "password is too short"}
                                                        {errors.password?.type === "maxLength" && "password is too long"}
                                                        {errors.password?.type === "required" && "password is Required"}
                                                    </Box>
                                                    <button onClick={onSubmit} type="submit" className="btn btn-primary btn-block btn-large">Signup</button>
                                                </form>
                                                {/* <Box mt={2}> {error && <Alert severity="error">{error}</Alert>}</Box> */}
                                                <Typography sx={{ mt: 6, ml: 2, color: '#FFFFFF', }}>Already a user ?  <Link style={{ textDecoration: 'none', color: "#FFFFFF" }} to='/login'>Login Now</Link> </Typography>
                                            </div>
                                        </Box>
                                    </Box>
                                </Container>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid sx={{ display: { xs: 'none', md: 'block', lg: 'block', sm: 'none' } }} item xs={6} md={6}>
                        <Box display='flex' flexDirection='column' justifyContent='center' alignContent='center' sx={{ mt: 8, height: '47vh', width: '100%' }}>
                            <Box sx={{ m: 'auto', }}>
                                <Typography fontWeight={600} variant='h1' sx={{ color: '#FFFFFF', fontStyle: 'italic', caretColor: 'transparent' }}>Get </Typography>
                                <Typography fontWeight={600} variant='h1' sx={{ color: '#FFFFFF', fontStyle: 'italic', }} >Socialized</Typography>
                                <Typography variant='h5' sx={{ color: '#FFFFFF', fontStyle: 'italic' }}>Already have an account?</Typography>
                                <Typography fontWeight={600} variant='h4' sx={{ color: '#FFFFFF', fontStyle: 'italic', }}>Login now</Typography>
                                <Link style={{ textDecoration: 'none', color: "black" }} to='/login'><Box display='flex' justifyContent='center' sx={{
                                    bgcolor: "#FFFFFF", height: '5vh', width: '28%', borderRadius: 14, mt: 2, '&:hover': { backgroundColor: '#F73D93', opacity: [0.9, 0.8, 0.7], },
                                }}>
                                    <Typography sx={{ fontStyle: 'italic', }} fontWeight={600} variant='h6'>Login</Typography>
                                </Box></Link>
                            </Box>
                        </Box>
                    </Grid>

                </Grid>
            </Box>
            <OtpModal user={user}/>
        </div>
    )
}

export default Signup



