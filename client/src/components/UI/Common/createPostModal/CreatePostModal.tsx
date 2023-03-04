import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { ErrorModalOpen, PostModalOpen } from '../../../../services/Reducers/UserReducer'
import { SnackBarOpen } from '../../../../services/Reducers/UserReducer';
import { useContext, useState } from 'react';
import { IconButton } from '@mui/joy';
import Textarea from '@mui/joy/Textarea';
import Card from '@mui/joy/Card';
import AspectRatio from '@mui/joy/AspectRatio';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { UserContext } from '../../../../context/userContext';
import { add_post } from '../../../../services/Api/userPost/postsApi';
import { SnackBarMessage } from '../../../../services/Reducers/UserDataReducer';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    height: '70vh',
    bgcolor: 'rgba(2, 2, 2, 1)',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '23px',

};

export default function BasicModal() {
    const [text, setText] = useState('');
    const addEmoji = (emoji: any) => () => setText(`${text}${emoji}`);
    const handleClose = () => dispatch(PostModalOpen(false));
    const dispatch = useDispatch()
    const isMoadalOpen = useSelector((state: any) => state.user.value.isPostModalOpen);
    const { user } = useContext(UserContext)
    const [image, setImage] = useState('')
    const [form, setform] = useState<any>({
        caption: '',
        Images: ''
    })

    // HANDLING IMAGE UPLOAD //

    const fileUpload = (e: any) => {
        const image = e.target.files[0]
        setform({
            ...form,
            Images: image
        })
        setImage(URL.createObjectURL(e.target.files[0]))
    }

    // HANDLING CAPTION TEXT //

    const handleChange = (e: any) => {
        setText(e.target.value)
        const { name, value } = e.target
        setform({
            ...form,
            [name]: value
        })
    }

    // HANDLING POST SUBMIT //

    const addPost = async () => {
        const Data = new FormData();
        for (let key in form) {
            Data.append(key, form[key])
        }
        Data.append('user', user.id)
        const { caption, Images } = form
        if (caption && Images) {
            try {
                const addPostResponse = await add_post(Data)
                dispatch(SnackBarMessage('post added'))
                if (addPostResponse) {
                    dispatch(SnackBarOpen(true))
                    dispatch(PostModalOpen(false))
                }
            } catch (error) {
                dispatch(ErrorModalOpen(true))
            }
        }
    }

    return (
        <div>
            <Modal
                sx={{ backdropFilter: "blur(2px)" }}
                open={isMoadalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box display='flex' flexDirection='column' sx={{ bgcolor: 'rgba(225,225,225,0.10)', width: '100%', height: '100%', borderRadius: '23px' }}>
                        <Box sx={{ ml: 2, mr: 2, mt: 4, width: '92%', height: '30vh' }} >
                            <Card variant="outlined" sx={{ width: 300, bgcolor: 'rgba(225,225,225,.90)' }}>
                                <AspectRatio>
                                    <div>
                                        <IconButton color="primary" aria-label="upload picture" component="label">
                                            <input hidden accept="image/png, image/jpeg" type="file" onChange={fileUpload} />
                                            <PhotoCamera />
                                        </IconButton>
                                        {image ?
                                            <img src={image} /> : ''
                                        }

                                    </div>
                                </AspectRatio>
                            </Card>
                        </Box>
                        <Box sx={{ ml: 2, mr: 2, mt: 4, bgcolor: 'rgba(225,225,225,.90)', borderRadius: 2 }}>
                            <Textarea
                                id="caption-address"
                                name="caption"
                                placeholder="Type in here…"
                                value={text}
                                onChange={handleChange}
                                minRows={2}
                                maxRows={4}
                                startDecorator={
                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                        <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>
                                            👍
                                        </IconButton>
                                        <IconButton variant="outlined" color="neutral" onClick={addEmoji('🏖')}>
                                            🏖
                                        </IconButton>
                                        <IconButton variant="outlined" color="neutral" onClick={addEmoji('😍')}>
                                            😍
                                        </IconButton>
                                    </Box>
                                }
                                endDecorator={
                                    <Button onClick={addPost} sx={{ ml: 'auto' }}>Post</Button>
                                }
                                sx={{ minWidth: 300 }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}