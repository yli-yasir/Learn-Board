import React from "react";
import { AppBar, Toolbar} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import SearchBar from './SearchBar';
import UserControlBar from './UserControlBar';
import Tabs from './SearchTabs';
import logo from '../assets/logo.svg';


function SearchHeader() {


  return (
    <AppBar color="default">
      <Toolbar> 

        {/**The logo*/}
        <Box flex={1}>
        <img height='40px' src={logo}></img>
        </Box>

        {/*SEARCH CONTAINER */}
        <Box mx={1} display="flex" justifyContent="center" flex={2}>
        <SearchBar/>
        </Box>

        <UserControlBar flex={1} display="flex" flexDirection="row-reverse"/>

      </Toolbar>
      <Tabs/>
    </AppBar>
  );
}

export default SearchHeader;