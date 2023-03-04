import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { user_forgot_password } from '../../services/Api/user/userApi'
import { ErrorModalOpen } from '../../services/Reducers/UserReducer'

function ForgotPassword() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, formState: { errors }, handleSubmit } = useForm()
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const onSubmit = async () => {
        const { email } = user
        if (email) {
            try {
                const forgotPass = await user_forgot_password(user)
                     if (forgotPass === "ChangePassword") {
                    navigate('/reset-password')
                } else {
                    setError(true)
                    setErrorMessage("no user exists")
                }
            } catch (error) {
                navigate('error')
                dispatch(ErrorModalOpen(true))
            }                
        }
    }

    return (
        <div>
            <Box display='flex' justifyContent='center' alignItems='center' sx={{ width: '100%', height: '100vh' }}>
                <Box sx={{ bgcolor: '#FFFFFF', width: '32%', height: '44vh', borderRadius: 6, backgroundColor: "rgba(255, 255, 255, 0.10)" }}>
                    <Box >
                        <Box display='flex' justifyContent='center' >
                            <Typography sx={{ color: '#FFFFFF', mt: 5 }} fontWeight={530} variant='h5'>Forgot Password</Typography>
                        </Box>
                        <Box sx={{ ml: 5, mr: 6, mt: 5 }}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input type="text" placeholder="Email" {...register("email", { required: true })} onChange={handleChange} />
                                <Box sx={{ color: 'red' }}>
                                    {errors.email?.type === "required" && "Email is Required"}
                                </Box>
                                <button onClick={onSubmit} className="btn btn-primary btn-block btn-large">Submit</button>
                            </form>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default ForgotPassword