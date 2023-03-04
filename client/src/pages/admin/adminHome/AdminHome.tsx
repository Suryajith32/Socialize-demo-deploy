import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../../components/UI/Admin/drawer/Sidebar'
import AdminNavbar from '../../../components/UI/Admin/navbar/AdminNavbar'
import Users from '../users/Users'

function AdminHome() {

  return (
    <div>
      <AdminNavbar />
      <Sidebar />
      <Box>
             <Box sx={{bgcolor:'rgba(225,225,225,0.10)' ,width:'100%',height:'88vh',borderRadius:'23px'}}>
              {window.location.pathname === '/admin/usermanagemen'?<Users/>:<Outlet/>}
             </Box>
      </Box>
    </div>
  )
}

export default AdminHome