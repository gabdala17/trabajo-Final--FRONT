import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItems from '../MainListItems/ListItems';
import Drawer from './Drawer';
import { SECTIONS } from '../subsection/constants';

export default function ProfileSideNav({navigateTo}) {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
       setOpen(!open);
     };



    return (
        <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          {/* <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton> */}
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItems navigateTo={navigateTo}/>
          

          <Divider sx={{ my: 1 }} />
          {/* {secondaryListItems} */}
        </List>
      </Drawer>
    )
}