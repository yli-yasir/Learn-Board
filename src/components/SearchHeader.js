import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import SearchBar from "./AutoSearchBar";
import UserControlsView from "./UserControlsView";
import SearchTabs from "./SearchTabs";
import logo from "../assets/logo.svg";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withRouter } from "react-router";
import { useTheme } from "@material-ui/core/styles";
import {makeStyles} from '@material-ui/core/styles';
import {getSearchParams,params as appParams} from '../utils/URLUtils'

const useStyles=makeStyles(theme=>({
toolbar:{
  flexDirection:'row-reverse',
  [theme.breakpoints.up("md")]:{
    flexDirection:'row'
  }
}
}))
function SearchHeader(props) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  let tabProps = isDesktop ? { centered: true } : { variant: "fullWidth" };

  const queryString = props.location.search;
  const { q } = getSearchParams(queryString, appParams.q.PARAM_NAME);
  const [searchBarText,setSearchBarText]= React.useState(q ? q : "")

  //this will be passed down to the searchbar
  const handleSearchBarTextChange = (event, { newValue }) => {
    //do not use event.target.value, it will not contain the value
    //when the input changes via another method than typing (e.g. suggestion click)
    setSearchBarText(newValue);
  };

  const classes= useStyles();
  return (
    <AppBar color="default">
      <Toolbar className={classes.toolbar}>
        {/**Show the logo if we are on desktop*/}
        {isDesktop && (
          <Box flex={1}>
            <img height="50px" src={logo}></img>
          </Box>
        )}

        {/*always show SEARCH CONTAINER */}
        <Box mx={1} display="flex" justifyContent="center" flex={2}>
          <SearchBar text={searchBarText} onTextChange={handleSearchBarTextChange} />
        </Box>

        {/*Show the user control bar if we are on desktop */}
        <UserControlsView desktop={isDesktop} 
        desktopContainerProps={{flex:1,display:'flex',flexDirection:'row-reverse'}} />
      
      </Toolbar>
      <SearchTabs searchBarText={searchBarText} tabProps={tabProps} />
    </AppBar>
  );
}

export default withRouter(SearchHeader);
