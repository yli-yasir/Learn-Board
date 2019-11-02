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
  FeedbackOutlined,
  CheckBoxOutlined,
  CheckBoxOutlineBlankOutlined
} from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { client, isAnon as isAnonStitch } from "../../stitch";
import { AnonymousCredential } from "mongodb-stitch-core-sdk";
import { Tooltip, ListSubheader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withRouter } from "react-router-dom";
import { toggleMyPostsOnly, isMyPostsOnly as initIsMyPostsOnly } from "../../utils/URLUtils";
import LanguageContext from '../../context/LanguageContext';
import appStrings from '../../values/strings';

import AppControlsLarge from './AppControlsLarge';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: "inherit"
  }
}));

function AppControls(props) {
  //user options menu anchor - null when its hidden
  const [userOptionsAnchorEl, setUserOptionsAnchorEl] = React.useState(null);

  const [languageMenuAnchorEl, setLanguageMenuAnchorEl] = React.useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const [isAnon, setIsAnon] = React.useState(isAnonStitch());

  const [isMyPostsOnly,setIsMyPostsOnly] = React.useState(initIsMyPostsOnly(props.location.search));

  const classes = useStyles();

  const logout = async () => {
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
   return <AppControlsLarge/>
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

                  <Link key="myPosts" className={classes.link} to={toggleMyPostsOnly(props.location.search)}>
                  <ListItem >
                    <CollectionsBookmarkOutlined />
                    &nbsp;&nbsp;&nbsp;
                    <ListItemText primary="My Posts" />
                  </ListItem>
                  </Link>

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

export default withRouter(AppControls);
