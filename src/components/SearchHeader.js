import React from "react";
import { AppBar, Toolbar} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import SearchBar from './SearchBar';
import UserControlBar from './UserControlBar';
import SearchTabs from './SearchTabs';
import logo from '../assets/logo.svg';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles';

function SearchHeader() {

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); 
  let tabProps = isDesktop ? {centered:true} : {variant:'fullWidth'}

  return (
    <AppBar color="default">
      <Toolbar> 

        {/**The logo*/}
        {isDesktop && <Box flex={1}>
        <img height='40px' src={logo}></img>
        </Box>}
        

        {/*SEARCH CONTAINER */}
        <Box mx={1} display="flex" justifyContent="center" flex={2}>
        <SearchBar/>
        </Box>

        {isDesktop && 
        <UserControlBar flex={1} display="flex" flexDirection="row-reverse"/>}

      </Toolbar>
      <SearchTabs tabProps={tabProps}/>
    </AppBar>
  );
}

export default SearchHeader;