import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { user_reset_password } from '../../services/Api/user/userApi'
import { ErrorModalOpen } from '../../services/Reducers/UserReducer'

function ResetPassword() {

    const { register, formState: { errors }, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [incorrectOtp, setIncorrectOtp] = useState(false)
    const [otpCheck, setOtp] = useState({
        otp: '',
        password: ''
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setOtp({
            ...otpCheck,
            [name]: value
        })
    }

    const onSubmit = async () => {
        try {
            const resetPass = await user_reset_password(otpCheck)
            if (resetPass === 'incorrect otp') {
                setIncorrectOtp(true)
            }
            if (resetPass === 'otp verified') {
                navigate('/login')
            }
        } catch (error) {
            console.log(error, "otp error")
            dispatch(ErrorModalOpen(true))
        }
    }

    return (
        <div>
            <Box display='flex' justifyContent='center' alignItems='center' sx={{ width: '100%', height: '100vh' }}>
                <Box sx={{ bgcolor: '#FFFFFF', width: '32%', height: '46vh', borderRadius: 6, backgroundColor: "rgba(255, 255, 255, 0.10)" }}>
                    <Box >
                        <Box display='flex' justifyContent='center' >
                            <Typography sx={{ color: '#FFFFFF', mt: 5 }} fontWeight={530} variant='h5'>Reset Password</Typography>
                        </Box>
                        <Box sx={{ ml: 5, mr: 6, mt: 5 }}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input type="password" id="otp" {...register("otp", { required: 'Otp is required' })} onChange={handleChange} placeholder="Enter OTP" />
                                <Box sx={{ color: 'red' }}>
                                    {errors.email?.type === "required" && "Email is Required"}
                                </Box>
                                <Box>
                                    <Typography sx={{ color: '#FFFFFF' }}>Enter New Password</Typography>
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <input type="password" id="confirm-password" {...register("password", { minLength: 3, required: true })} onChange={handleChange} placeholder="••••••••" />
                                    <button onClick={onSubmit} className="btn btn-primary btn-block btn-large">Submit</button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default ResetPassword