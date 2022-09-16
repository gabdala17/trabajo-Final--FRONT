import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ProfileSideNav from './sideNav/ProfileSideNav';
import Subsection from './subsection/Subsection';
import SubsectionContainer from './subsection/SubsectionContainer';
import { SECTIONS } from './subsection/constants';
import { Box } from '@mui/material';

function DashboardContent({user}) {

        
        const User = useSelector((state) => state.userAppointments);

        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect( () => {
            // dispatch(getUsersByAdminById(name));
        }, [dispatch]);

       const [selectedSection, setSelectedSection] = useState('MI PERFIL') 

       const onNavigate = (e) => {
        console.log('EVENTO=>',e.target.textContent) 
        return(
          setSelectedSection(e.target.textContent)

        )
       }

const mdTheme = createTheme();
  return (
   <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: 'flex' }}>
      <ProfileSideNav navigateTo={onNavigate} />
      <SubsectionContainer>
        <Subsection selectedSection={selectedSection} />
      </SubsectionContainer>
    </Box>
      {/* <Footer/> */}
    </ThemeProvider>
    
  );
}

export default function DashboardUser({user}) {
  return <DashboardContent user={user}/>;
}