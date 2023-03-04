import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux'
import { ChatBoxOpen, ErrorModalOpen } from '../../../../services/Reducers/UserReducer'
import ChatField from './chatField/ChatField'
import ChatList from './chatList/ChatList'
import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../../../context/userContext'
import { get_conversation } from '../../../../services/Api/user/userApi'
import { CurrentChatData } from '../../../../services/Reducers/UserDataReducer'
import { Stack, Typography } from '@mui/material'
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';


function InBox({ socket }: any) {
  const chatOpen = useSelector((state: any) => state.user.value.isChatOpen)
  const dispatch = useDispatch()
  const { user } = useContext(UserContext)
  const [conversation, setConversation] = useState<any>()
  console.log(socket, 'socket io from Inbox')


  // HANDLING CHAT OPEN //


  const handleOpenDownChat = (userlist: any) => {
    dispatch(CurrentChatData(userlist))
    dispatch(ChatBoxOpen(true))
  }

  useEffect(() => {
    GetAllConversation(user?.id)
  }, [user])

  // FETCHING CONVERSATION //

  const GetAllConversation = async (userId: any) => {
    try {
      const getConversationResponse = await get_conversation(userId)
      setConversation(getConversationResponse)
      console.log(getConversationResponse,'from checkuser controler')
    } catch (error) {
     
    }
  }


  return (
    <>
      {conversation?.length === 0 ?
        <Box display='flex'  justifyContent='center' sx={{width:'100%' , height:'40vh'}}>
          <Stack display='flex' direction='column' justifyContent='center' >
            <Box>
              <Typography variant='h4' sx={{ color: 'grey' }}>no conversation's yet</Typography>
            </Box>
            <Box display='flex'  alignItems='center' justifyContent='center'>
              <CommentsDisabledIcon sx={{ color: 'grey' }} />
            </Box>
          </Stack>

        </Box> :
        <Box sx={{ width: '100%', height: '88vh' }} >
          {!chatOpen ?
            <Box>
              {conversation && conversation?.map((userlist: any) => (
                <Box onClick={() => handleOpenDownChat(userlist)}>
                  <ChatList socket={socket} conversation={userlist} user={user} />
                </Box>
              ))}
            </Box>
            : <ChatField socket={socket} />}
        </Box>}
    </>
  )
}

export default InBox