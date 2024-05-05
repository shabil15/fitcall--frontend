
import { createTheme, styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useMemo,useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import {  Brightness4, Brightness7, Home ,ExitToApp} from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import SideBar from '../../components/common/Sidebar';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../slices/authSlice';
import { useLogoutAdminMutation } from '../../slices/adminApiSlices';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import {toast} from 'react-toastify';




const drawerWidth = 240;



interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    backgroundColor: '#3BE48B',
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



export default function Navbar() {
//   const theme = useTheme();
  const dispatch = useDispatch();
  const [logoutAdmin] = useLogoutAdminMutation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true)

  const darkTheam = useMemo(()=>createTheme({
    palette:{
        mode : dark ? 'dark' : 'light',
    },
    typography: {
      fontFamily: 'Mulish, sans-serif', 
  },
  }),[dark])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleAdminLogout = async () => {
    // Display a confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3BE48B',
      cancelButtonColor: '#3d3636',
      confirmButtonText: 'Yes, log me out!',
      customClass: {
        popup: 'swal-custom-background',
        title:'swal2-title',
        content:'swal2-content',
        confirmButton:'swal2-confirm'
         // Apply the custom CSS class
      }
    });

    // If user confirms, proceed with logout
    if (result.isConfirmed) {
      try {
        // Navigate to home page
        navigate('/admin/login');
        // Dispatch the logout action
        dispatch(adminLogout());
        // Call the logout mutation
      const res= await logoutAdmin('').unwrap();
      toast.success(res.message);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <ThemeProvider theme={darkTheam}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}  sx={{
              
              backgroundColor: '#3BE48B', 
            }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
            <Tooltip title='Go back to home page'>
                <IconButton sx={{m:1}}>
                <Home/>
                </IconButton>
            </Tooltip>
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{flexGrow:1,  }}>
            FitCall
          </Typography>
          <Tooltip title="Change Theme">
          <IconButton onClick={()=>setDark(!dark)}>
            {dark ? <Brightness7/> : <Brightness4/>}
          </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
          <IconButton onClick={handleAdminLogout}  color="inherit">
              <ExitToApp />
            </IconButton>
            </Tooltip> 
        </Toolbar>
      </AppBar>
      <SideBar {...{open, setOpen}}/>
    </Box>
    </ThemeProvider>
  );
}
