import React from "react";
import { AppBar, Toolbar} from "@material-ui/core";
import Box from '@material-ui/core/Box'
import SearchBar from '../SearchBar'
import UserBar from '../UserBar';
import CatergoryTabs from '../LearnTypeTabs'
import logo from '../../logo.svg'


export default function Header(props) {


  return (
    <AppBar color="default">
      <Toolbar> 

        {/**The logo*/}
        <Box flex={1}>
        <img height='40px' src={logo}></img>
        </Box>

        {/*SEARCH CONTAINER */}
        <Box mx={1} display="flex" justifyContent="center" flex={2}>
        <SearchBar width="500x" q={props.q}/>
        </Box>

        <UserBar flex={1} display="flex" flexDirection="row-reverse"/>

      </Toolbar>
      <CatergoryTabs learnType={props.learnType}/>
    </AppBar>
  );
}
