import React from "react";
import {
  VpnKeyOutlined,
  NoteAddOutlined,
  LockOutlined,
  PersonOutlined,
  ContactPhoneOutlined,
  CollectionsBookmarkOutlined,
  InfoOutlined,
  HowToRegOutlined,
  TranslateOutlined,
  FeedbackOutlined
} from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { client, isAnon as isAnonStitch } from "../stitch";
import { AnonymousCredential } from "mongodb-stitch-core-sdk";
import { Tooltip, ListSubheader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: "inherit"
  }
}));

export default function UserBar(props) {
  //user options menu anchor - null when its hidden
  const [userOptionsAnchorEl, setUserOptionsAnchorEl] = React.useState(null);

  const [languageMenuAnchorEl, setLanguageMenuAnchorEl] = React.useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const [isAnon, setIsAnon] = React.useState(isAnonStitch());

  const classes = useStyles();

  let logout = async () => {
    try {
      await client.auth.logout();
      await client.auth.loginWithCredential(new AnonymousCredential());
      setIsAnon(true);
    } catch (e) {
      console.log(e);
    }
  };

  //On large display sizes
  if (props.desktop) {
    const openUserOptionsMenu = event => {
      setUserOptionsAnchorEl(event.currentTarget);
    };

    const closeUserOptionsMenu = event => {
      setUserOptionsAnchorEl(null);
    };

    const openLanguagesMenu = event => {
      setLanguageMenuAnchorEl(event.currentTarget);
    };

    const closeLanguagesMenu = event => {
      setLanguageMenuAnchorEl(null);
    };

    return (
      <Box {...props.desktopContainerProps}>
        <Link to="/feedback">
          <Tooltip title="Give Feedback">
            <IconButton>
              <FeedbackOutlined />
            </IconButton>
          </Tooltip>
        </Link>

        <Link to="/about">
          <Tooltip title="About">
            <IconButton className={classes.button}>
              <InfoOutlined />
            </IconButton>
          </Tooltip>
        </Link>

        <Tooltip title="User Options">
          <IconButton
            aria-controls="options-menu"
            aria-haspopup="true"
            onClick={openUserOptionsMenu}
            className={classes.button}
          >
            <PersonOutlined />
          </IconButton>
        </Tooltip>

        <Menu
          id="options-menu"
          anchorEl={userOptionsAnchorEl}
          keepMounted
          open={Boolean(userOptionsAnchorEl)}
          onClose={closeUserOptionsMenu}
        >
          {isAnon ? ([
              <Link key="register"className={classes.link} to="/register">
                <MenuItem>
                  <HowToRegOutlined />
                  &nbsp;Register
                </MenuItem>
              </Link>,
              <Link key="login" className={classes.link} to="/login">
                <MenuItem>
                  <VpnKeyOutlined />
                  &nbsp;Login
                </MenuItem>
              </Link>]
          ) : (
            [
              <Link key="selfContact" className={classes.link} to="/self/contact">
                <MenuItem>
                  <ContactPhoneOutlined />
                  &nbsp;My Contact Info
                </MenuItem>
              </Link>,
  
              <MenuItem key="myPosts">
                <CollectionsBookmarkOutlined />
                &nbsp;My Posts
              </MenuItem>,
              <MenuItem key="logOut" button onClick={logout}>
                <LockOutlined />
                &nbsp;Logout
              </MenuItem>
            ]
          )}
        </Menu>

        {!isAnon && (
          <Link to="/posts/new">
            <Tooltip title="New Post">
              <IconButton>
                <NoteAddOutlined />
              </IconButton>
            </Tooltip>
          </Link>
        )}

        <Tooltip title="Website Language">
          <IconButton
            aria-controls="languages-menu"
            aria-haspopup="true"
            onClick={openLanguagesMenu}
            className={classes.button}
          >
            <TranslateOutlined />
          </IconButton>
        </Tooltip>

        <Menu
          id="languges-menu"
          anchorEl={languageMenuAnchorEl}
          keepMounted
          open={Boolean(languageMenuAnchorEl)}
          onClose={closeLanguagesMenu}
        >
          <MenuItem>
            <TranslateOutlined />
            &nbsp;English
          </MenuItem>
          <MenuItem>
            <TranslateOutlined />
            &nbsp;Türkçe
          </MenuItem>
          <MenuItem>
            <TranslateOutlined />
            &nbsp;العربية
          </MenuItem>
        </Menu>
      </Box>
    );
  }

  //Small display sizes...
  else {
    const openDrawer = () => {
      setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
      setIsDrawerOpen(false);
    };

    return (
      <React.Fragment>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={openDrawer}
        >
          <MenuIcon />
        </IconButton>

        <Drawer anchor="top" open={isDrawerOpen} onClose={closeDrawer}>
          <div role="presentation" onClick={closeDrawer}>
            <List>

              {!isAnon && (
                <Link className={classes.link} to="/posts/new">
                  <ListItem button key="newPost">
                    <NoteAddOutlined />
                    &nbsp;&nbsp;&nbsp;
                    <ListItemText primary="New Post" />
                  </ListItem>
                </Link>
              )}

              <ListSubheader>User Options</ListSubheader>

              {/*If user is anon then show register + login button else logout */}
              {isAnon ? (
                <React.Fragment>
                  <Link className={classes.link} to="/register">
                    <ListItem button key="register">
                      <HowToRegOutlined />
                      &nbsp;&nbsp;&nbsp;
                      <ListItemText primary="Register" />
                    </ListItem>
                  </Link>

                  <Link className={classes.link} to="/login">
                    <ListItem button key="login">
                      <VpnKeyOutlined />
                      &nbsp;&nbsp;&nbsp;
                      <ListItemText primary="Login" />
                    </ListItem>
                  </Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link className={classes.link} to="/self/contact">
                    <ListItem button key="myContactInfo">
                      <ContactPhoneOutlined />
                      &nbsp;&nbsp;&nbsp;
                      <ListItemText primary="My Contact Info" />
                    </ListItem>
                  </Link>

                  <ListItem button key="myPosts">
                    <CollectionsBookmarkOutlined />
                    &nbsp;&nbsp;&nbsp;
                    <ListItemText primary="My Posts" />
                  </ListItem>

                  <ListItem button onClick={logout} key="logout">
                    <LockOutlined />
                    &nbsp;&nbsp;&nbsp;
                    <ListItemText primary="Log Out" />
                  </ListItem>
                </React.Fragment>
              )}

        <ListSubheader>App Language</ListSubheader>

        <ListItem button key="englishLanguage">
                    <TranslateOutlined />
                    &nbsp;&nbsp;&nbsp;
                    <ListItemText primary="English" />
                  </ListItem>

                  <ListItem button key="turkishLanguage">
                    <TranslateOutlined />
                    &nbsp;&nbsp;&nbsp;
                    <ListItemText primary="Türkçe" />
                  </ListItem>

                  <ListItem button key="arabicLanguage">
                    <TranslateOutlined />
                    &nbsp;&nbsp;&nbsp;
                    <ListItemText primary="العربية" />
                  </ListItem>
            </List>
          </div>
        </Drawer>
      </React.Fragment>
    );
  }
}
