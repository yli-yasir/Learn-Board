import React from "react";
import { VpnKey, NoteAdd, Lock, Person} from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { client, isAnon as isAnonStitch } from "../stitch";
import Button from "@material-ui/core/Button";
import { AnonymousCredential } from "mongodb-stitch-core-sdk";
import { Tooltip } from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer"

const useStyles = makeStyles(theme=>({
  button:{
    color:'rgba(0,0,0,0.54)'
  }
}))

export default function UserBar(props) {
  
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isAnon, setIsAnon] = React.useState(true);
  const classes = useStyles();

  React.useEffect(() => {
    setIsAnon(isAnonStitch());
  }, []);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  let logout = async () => {
    try {
      await client.auth.logout();
      await client.auth.loginWithCredential(new AnonymousCredential());
      setIsAnon(true);
    } catch (e) {
      console.log(e);
    }
  };


  if(props.desktop){

  const loginButton = (
    <Link to="/login">
      <Tooltip title="Login">
      <Button className={classes.button}>
        <VpnKey />
      </Button>
      </Tooltip>
    </Link>
  );

  
  const logoutButton = (
    <Tooltip title="Log Out">
      <Button className={classes.button} onClick={logout}>
        <Lock />
      </Button>
    </Tooltip>
  );

  const profileButton = (
    <Link to="/user/settings">
      <Tooltip title="Settings">
        <Button className={classes.button}>
          <Person />
        </Button>
      </Tooltip>
    </Link>
  );

  const newPostButton = (
    <Link to="/posts/new">
      <Tooltip title="New Post">
      <Button className={classes.button}>
        <NoteAdd />
      </Button>
      </Tooltip>
    </Link>
  );
  return (
    <Box {...props.desktopContainerProps}>
      {isAnon ? loginButton : logoutButton}

      {!isAnon && profileButton}

      {!isAnon && newPostButton}
    </Box>
  );
  }

  else{
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
    return  (
      <React.Fragment>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={openDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="top" open={isDrawerOpen} onClose={closeDrawer}>
        {drawerContent}
      </Drawer>
    </React.Fragment>);
  }
}
