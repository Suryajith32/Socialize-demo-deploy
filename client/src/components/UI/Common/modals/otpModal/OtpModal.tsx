import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../../../../../context/userContext';
import { useForm } from 'react-hook-form';
import { sign_up_user, user_verify_signup_otp } from '../../../../../services/Api/user/userApi';
import { useNavigate } from 'react-router-dom';
import { ErrorModalOpen } from '../../../../../services/Reducers/UserReducer';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgb(225,225,225,)',
    border: '2px solid #000',
    boxShadow: 24,
};

export default function OtpModal(userDetails: any) {
    const isOtpVerifyModalOpen = useSelector((state: any) => state.user.value.isOtpModalOpen)
    const { register, formState: { errors }, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [incorrectOtp, setIncorrectOtp] = React.useState<boolean>(false)
    const [otpCheck, setOtp] = React.useState<any>({
        otp: '',
    })

    // HANDLING OTP VALUES //

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setOtp({
            ...otpCheck,
            [name]: value
        })
    }

    const onSubmit = async () => {
        const { username, email, phone, password } = userDetails?.user
        try {
            const verifySignUp = await user_verify_signup_otp(otpCheck)
            if (verifySignUp === 'incorrect otp') {
                setIncorrectOtp(true)
            }
            if (verifySignUp === 'otp verified') {
                if (username && email && phone && password) {
                    let signup = await sign_up_user(userDetails?.user)
                    if (signup === "User exist") {
                        navigate('/signup')
                    }else if (signup === "No user exist") {
                        navigate('/login')
                    }
                }
            }
        } catch (error) {
            dispatch(ErrorModalOpen(true))
        }
    }

    return (
        <>
            <Modal
                open={isOtpVerifyModalOpen}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ bgcolor: 'black', width: '100%', height: '30vh' }}>
                        <Box sx={{ bgcolor: 'rgba(225,225,225,0.10)', width: '100%', height: '30vh', }}>
                            <Box display='flex' justifyContent='center' sx={{ pt: 2 }}>
                                <Typography sx={{ color: '#FFFFFF' }}>An otp has been sent to your email</Typography>
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
                                        <button onClick={onSubmit} className="btn btn-primary btn-block btn-large">Submit</button>
                                    </Box>
                                </form>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}