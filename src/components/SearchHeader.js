import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import SearchBar from "./SearchBar";
import UserControlsView from "./UserControlsView";
import SearchTabs from "./SearchTabs";
import logo from "../assets/logo.svg";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import {makeStyles} from '@material-ui/core/styles';

const useStyles=makeStyles(theme=>({
toolbar:{
  flexDirection:'row-reverse',
  [theme.breakpoints.up("md")]:{
    flexDirection:'row'
  }
}
}))
function SearchHeader() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  let tabProps = isDesktop ? { centered: true } : { variant: "fullWidth" };
  const classes= useStyles();
  return (
    <AppBar color="default">
      <Toolbar className={classes.toolbar}>
        {/**Show the logo if we are on desktop*/}
        {isDesktop && (
          <Box flex={1}>
            <img height="40px" src={logo}></img>
          </Box>
        )}

        {/*always show SEARCH CONTAINER */}
        <Box mx={1} display="flex" justifyContent="center" flex={2}>
          <SearchBar />
        </Box>

        {/*Show the user control bar if we are on desktop */}
        <UserControlsView desktop={isDesktop} 
        desktopContainerProps={{flex:1,display:'flex',flexDirection:'row-reverse'}} />
      
      </Toolbar>
      <SearchTabs tabProps={tabProps} />
    </AppBar>
  );
}

export default SearchHeader;
