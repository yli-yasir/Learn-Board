import React from "react";
import { AppBar, Toolbar, Drawer } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import SearchBar from "./SearchBar";
import UserControlBar from "./UserControlBar";
import SearchTabs from "./SearchTabs";
import logo from "../assets/logo.svg";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

function SearchHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  let tabProps = isDesktop ? { centered: true } : { variant: "fullWidth" };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const drawerContent = (
    <div role="presentation"
    onClick={closeDrawer}>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <AppBar color="default">
      <Toolbar>
        {/**Show the logo if we are on desktop*/}
        {isDesktop && (
          <Box flex={1}>
            <img height="40px" src={logo}></img>
          </Box>
        )}


        {/*Show the menu button if we are on mobile*/}
        {!isDesktop && (
          <React.Fragment>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={openDrawer}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="top" open={isDrawerOpen} onClose={closeDrawer}>
            {drawerContent}
          </Drawer>
        </React.Fragment>)}

        {/*always show SEARCH CONTAINER */}
        <Box mx={1} display="flex" justifyContent="center" flex={2}>
          <SearchBar />
        </Box>

        {/*Show the user control bar if we are on desktop */}
        {isDesktop && (
          <UserControlBar flex={1} display="flex" flexDirection="row-reverse" />
        )}
      </Toolbar>
      <SearchTabs tabProps={tabProps} />
    </AppBar>
  );
}

export default SearchHeader;
