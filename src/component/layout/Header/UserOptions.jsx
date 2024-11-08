

import  { Fragment, useState } from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate} from "react-router-dom";
import { logout } from '../../../actions/userAction';
import { useDispatch,useSelector } from 'react-redux';
import './Header.css';
import { useAlert } from 'react-alert';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const UserOptions = ({user}) => {
  const { cartItems } = useSelector((state) => state.cart);
    const navigate =useNavigate();
    const [open, setOpen] = useState(false);
    const alert=useAlert();
    const dispatch=useDispatch();
    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
          icon: (
            <ShoppingCartIcon
              style={{ color: cartItems.length > 0 ? "goldenrod" : "unset" }}
            />
          ),
          name: `Cart(${cartItems.length})`,
          func: cart,
        },

        {icon: <ExitToAppIcon/>,name:"Logout", func: logoutUser},
    
    ];
    if (user.role === "admin") {
        options.unshift({
          icon: <DashboardIcon />,
          name: "Dashboard",
          func: dashboard,
        });
      }
      function dashboard() {
        navigate("/admin/dashboard");
      }
      function orders() {
        navigate("/orders");
      }

      function account() {
        navigate("/account");
      }

      function cart() {
        navigate("/cart");
      }
      function logoutUser() {
       dispatch(logout());
        alert.success("Logout Successfully");
        window.location.href="/login";
      }

    
    

    return (
        <Fragment>
          <Backdrop open={open} style={{zIndex:"10"}}/>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{ zIndex: "11" }}
                open={open}
                direction='down'
                className='speedDial'
                icon={
                  
                 <img
                  className='speedDialIcon'
                  src={"https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"}
                  alt="Profile"
               />  
               
              
                }
            >
            {options.map((item)=>(
                <SpeedDialAction key={item.name} icon={item.icon } tooltipTitle={item.name} onClick={item.func}
                tooltipOpen={window.innerWidth<=600 ? true:false} />
            ))}
                
                
            </SpeedDial>
        </Fragment>
    );
};

export default UserOptions;
