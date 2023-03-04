import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useDispatch, useSelector } from 'react-redux';
import { ChatBoxOpen, ErrorModalOpen } from '../../../../../services/Reducers/UserReducer';
import { Textarea } from '@mui/joy';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { useEffect, useContext, useState,useRef } from 'react'
import { get_chat_users, get_messages } from '../../../../../services/Api/user/userApi';
import { UserContext } from '../../../../../context/userContext';
import axiosInstance from '../../../../../config/axios/axiosInstance';
import { format } from 'timeago.js'

function ChatField({ socket }: any) {
    const currentDataChat = useSelector((state: any) => state.userData.value.currentChatData)
    const ownProfilePic = useSelector((state: any) => state.userData.value.profileImage)
    const dispatch = useDispatch()
    const { user } = useContext(UserContext)
    const [users, setUser] = useState<any>(null)
    const [newMessage, setNewMessage] = useState<any>('')
    const [messages, setMessages] = useState<any>()
    console.log(currentDataChat, 'currentDataChat')
    const [arrivalMessage, setArrivalMessage] = useState<any>(null)
    const scrollRef = useRef<null | HTMLDivElement>(null)


    // USE EFFECT FOR SOCKET IO //

    useEffect(() => {
        socket?.on("getMessage", (data: any) => {
            setArrivalMessage({
                senderId: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })

    }, [])

    useEffect(() => {
        arrivalMessage && currentDataChat?.members.includes(arrivalMessage.senderId) &&
            setMessages((prev: any) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentDataChat])

    useEffect(() => {
        socket?.on("getUsers", (users: any) => {
        })
    }, [user])

    // USE EFFECT FOR SOCKET IO //


    useEffect(() => {
        GetChatUsers()
        GetMessages()
    }, [])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages,newMessage])

    // FETCHING MESSAGES //

    const GetMessages = async () => {
        const getMessageResponse = await get_messages(currentDataChat?._id)
        setMessages(getMessageResponse)
    }

    // GET CURRENT  CHAT USERS //

    const GetChatUsers = async () => {
        const friendId = currentDataChat?.members?.find((m: any) => m !== user?.id)
        try {
            const getChatUserResponse = await get_chat_users(friendId)
            setUser(getChatUserResponse)
        } catch (error) {
     
        }
    }

    const handleCloseChat = () => {
        dispatch(ChatBoxOpen(false))
    }

    // SENDING MESSAGES  AND SUBMIT // 

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const message = {
            senderId: user.id,
            text: newMessage,
            conversationId: currentDataChat?._id
        }
        const receiverId = currentDataChat?.members?.find((member: any) => member !== user.id)

        socket?.emit("sendMessage", {
            senderId: user?.id,
            receiverId,
            text: newMessage
        })
        try {
            if (newMessage) {
                axiosInstance.post("http://localhost:4000/message", message, {
                    headers: {
                        "x-access-token": localStorage.getItem("token"),
                    },
                }).then((response) => {
                    setMessages([...messages, response.data])
                    setNewMessage('')
                })

            }
        } catch (err) {
            console.log(err);
            dispatch(ErrorModalOpen(true))
        }
    }


    return (
        <div>
            <Box sx={{ width: '100%', height: '75vh' }}>
                <Box display='flex' alignItems='center' sx={{ height: '12vh', width: '100%', position: 'sticky' }}>
                    <Box sx={{ ml: 5, mr: 5 }}>
                        <Stack display='flex' direction='row' alignItems='center' spacing={4}>
                            <Box onClick={() => handleCloseChat()}>
                                <ChevronLeftIcon sx={{ color: "#FFFFFF", fontSize: 30 }} />
                            </Box>
                            <Box>
                                {users && users.Images ?
                                    <Avatar sx={{ width: 56, height: 56 }} src={`/images/${users.Images}`} />
                                    : <Avatar sx={{ width: 56, height: 56 }} src='' />
                                }
                            </Box>
                            <Box>
                                <Typography sx={{ color: '#FFFFFF' }}>{users && users.username}  </Typography>
                                <Typography sx={{ color: '#FFFFFF', opacity: .3 }}>Active now </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Box>

                <Box    sx={{ width: '100%', height: "62.5vh", overflow: "hidden", overflowY: "scroll", }}>

                    {/* // MESSAGE // */}
                    {messages && messages?.map((m: any) => (
                        <Box ref={scrollRef}>
                            {m?.senderId === user?.id ? <Box display='flex' justifyContent='flex-END' sx={{ mr: 2, pt: 2 }} >
                                <Stack display='flex' direction='row' spacing={2} >
                                    <Box>
                                        <Stack display='flex' direction='column' spacing={1}>
                                            <Box sx={{ background: 'linear-gradient(to right, #0052d4, #4364f7, #6fb1fc)', width: 'max-content', height: 'max-content', borderRadius: 20, p: 1.1, }}>
                                                <Typography sx={{ color: '#FFFFFF' }}>{m?.text}</Typography>
                                            </Box>
                                            <Box display='flex' justifyContent='center'>
                                                <Typography sx={{ color: 'grey' }}>{format(m?.createdAt)}</Typography>
                                            </Box>
                                        </Stack>
                                    </Box>
                                    <Box>
                                        {ownProfilePic ?
                                            <Avatar src={`/images/${ownProfilePic}`} /> :
                                            <Avatar src='' />}
                                    </Box>
                                </Stack>
                            </Box> :
                                <Box display='flex' justifyContent='flex-start' sx={{ ml: 2, pt: 2 }} >
                                    <Stack display='flex' direction='row' spacing={2} alignItems='center'>
                                        <Box>
                                            {users && users.Images ?
                                                <Avatar src={`/images/${users.Images}`} /> :
                                                <Avatar src='' />}
                                        </Box>
                                        <Box>
                                            <Stack display='flex' direction='column' spacing={1}>
                                                <Box sx={{ background: 'linear-gradient(to right, #0052d4, #4364f7, #6fb1fc)', width: 'max-content', height: 'max-content', borderRadius: 20, p: 1.1, }}>
                                                    <Typography sx={{ color: '#FFFFFF' }}>{m?.text}</Typography>
                                                </Box>
                                                <Box display='flex' justifyContent='center'>
                                                    <Typography sx={{ color: 'grey' }}>{format(m?.createdAt)}</Typography>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </Box>}

                            {/* // USER MESSAGE // */}



                        </Box>))}





                </Box>

            </Box>
            <Box sx={{ width: '100%', height: '13vh' }}>
                <Box sx={{ mt: 2 }}>
                    <Stack display='flex' direction='row' justifyContent='center' alignItems='center' spacing={2}>
                        <Box sx={{ width: '50%' }}>
                            <Textarea onChange={(e) => setNewMessage(e.target.value)}
                                value={newMessage} placeholder="Type in here…" variant="soft" sx={{ bgcolor: 'grey' }} />
                        </Box>
                        <Box sx={{ color: 'blue' }}>
                            <TagFacesIcon />
                        </Box>
                        <Box >
                            <Button variant='outlined' onClick={handleSubmit}>send</Button>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </div>
    )
}

export default ChatField