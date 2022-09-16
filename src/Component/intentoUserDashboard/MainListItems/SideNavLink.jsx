import React from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const SideNavLink=({navigateTo, value, title})=>{
  console.log('value',value)
  return (
    <>
    <ListItemButton>
      <ListItemIcon>
        
      </ListItemIcon>
      <ListItemText onClick={navigateTo} value={value} primary={title}/>
    </ListItemButton>
    </>
  )
}
export default SideNavLink;