import { Avatar, Box, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useContext, useState } from 'react'
import { ChatBoxOpen, ErrorModalOpen } from '../../../../../services/Reducers/UserReducer'
import { UserContext } from '../../../../../context/userContext'
import { get_chat_users, get_messages } from '../../../../../services/Api/user/userApi'

function ChatList({ socket, conversation }: any) {
    const chatOpen = useSelector((state: any) => state.user.value.isChatOpen)
    const dispatch = useDispatch()
    const [setUser] = useState<any>(null)
    const { user } = useContext(UserContext)

    useEffect(() => {
        GetChatUsers()
        GetMessages()
    }, [user])


    // GET CHAT USERS //

    const GetChatUsers = async () => {
        try {
            const friendId = conversation?.members?.find((m: any) => m !== user?.id)
            const getChatUserResponse = await get_chat_users(friendId)
            setUser(getChatUserResponse)
        } catch (error) {
           
        }
    }

    // FETCHING RECENT MESSAGE //

    const GetMessages = async () => {
        try {
            await get_messages(conversation?._id)
        } catch (error) {
           
        }
    }



    return (
        <div>
            {/* <Box sx={{ width: '100%', height: '67vh' }} > */}

            <Box >
                <Box display='flex' alignItems='center' sx={{ width: '100%', height: '13vh', boxShadow: 3 }}>
                    <Box sx={{ ml: 5, mr: 5 }}>
                        <Stack display='flex' direction='row' alignItems='center' spacing={3} >
                            <Box>
                                {conversation?.Images ?
                                    <Avatar sx={{ width: 56, height: 56 }} src={`/images/${conversation?.Images}`} />
                                    : <Avatar sx={{ width: 56, height: 56 }} src='' />
                                }
                            </Box>
                            <Box>
                                <Typography sx={{ color: '#FFFFFF' }}>{conversation?.username} </Typography>
                                <Typography sx={{ color: '#FFFFFF', opacity: .3 }}>{conversation?.latestMessage
                                }  </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Box>
            {/* </Box> */}
        </div>
    )
}

export default ChatList