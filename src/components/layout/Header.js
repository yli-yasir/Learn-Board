import React from "react";
import { AppBar, Toolbar, Typography, InputBase } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Box from '@material-ui/core/Box'
import SearchBar from '../SearchBar'
import UserBar from '../UserBar';
import CatergoryTabs from '../CategoryTabs'

export default function Header(props) {


  return (
    <AppBar color="default">
      <Toolbar>
        {/* <Typography variant="h6" noWrap>
          Learnboard
        </Typography> */}

        {/*SEARCH CONTAINER */}
        <SearchBar mx={'auto'}/>
        <UserBar/>
      </Toolbar>
      <CatergoryTabs/>
    </AppBar>
  );
}
