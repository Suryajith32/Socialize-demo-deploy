import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Feed from '../components/UI/Common/feed/Feed'
import { User, UserContext } from '../context/userContext'
import AdminLogin from '../pages/admin/adminLogin/AdminLogin'
import Error from '../pages/error/Error'
import InternalServerError from '../pages/error/InternalServerError'
import ForgotPassword from '../pages/forgotPassword/ForgotPassword'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Messages from '../pages/messages/Messages'
import Notification from '../pages/notification/Notification'
import ResetPassword from '../pages/resetPassword/ResetPassword'
import Signup from '../pages/signup/Signup'
import UserProfile from '../pages/userProfile/UserProfile'
import UsersProfile from '../pages/usersProfile/UsersProfile'
import AdminHome from '../pages/admin/adminHome/AdminHome'
import jwtDecode from 'jwt-decode'
import { useEffect,useContext } from 'react'
import Users from '../pages/admin/users/Users'
import Posts from '../pages/admin/posts/Posts'

const socketio = require('socket.io-client')("ws://localhost:8000")


function Routings() {
 const data:any = localStorage.getItem('token')
  useEffect(() => {
    if (data != null) {
        const user:any = jwtDecode(data)
      console.log(user,'user from routings')
    
    socketio?.emit("addUser", user?.id,user?.name)
    }

}, [])
  return (
    <div>
      <Router>
      <User>
          <Routes>
            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='reset-password' element={<ResetPassword />} />
            <Route path='error' element={<InternalServerError />} />
            <Route path='*' element={<Error />} />

            <Route path='/' element={<Home />} >
              <Route path='/' element={<Feed socketio={socketio}/>} />
              <Route path='profile' element={<UserProfile />} />
              <Route path='users-profile' element={<UsersProfile />} />
              <Route path='notification' element={<Notification />} />
              <Route path='inbox' element={<Messages socketio={socketio}/>} />
            </Route>

            <Route path='admin-login'  element={<AdminLogin/>}/>
            <Route path='admin' element ={<AdminHome/>}>
            <Route path='usermanagement'  element={<Users/>}/>
            <Route path='postmanagement' element={<Posts/>}/>

            </Route>
          </Routes>
          </User>
      </Router>
    </div>
  )
}

export default Routings