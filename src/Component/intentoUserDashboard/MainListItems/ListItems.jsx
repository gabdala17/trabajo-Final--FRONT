import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';

import { SECTIONS, SECTIONS_TITLE } from '../subsection/constants';
import SideNavLink from './SideNavLink';
// import Link from '@material-ui/core/Link'
 const ListItems = ({navigateTo})=>{
  console.log('SECTIONS',SECTIONS)
  console.log('SECTIONS_TITLE',SECTIONS_TITLE)
   return (
    <>
    {
      Object.values(SECTIONS).map(section=> <SideNavLink navigateTo={navigateTo} value={section} title={SECTIONS_TITLE[`${section}_TITLE`]}/>)
    }
  </>
   

   )


}
export default ListItems;


// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Reporte de consumos
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Este mes" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Ultimo Trimestre" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Ultimo Año" />
//     </ListItemButton>
//   </React.Fragment>
// );