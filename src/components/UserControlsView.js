import React from "react";
import { VpnKey, NoteAdd, Lock, Person} from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { client, isAnon as isAnonStitch } from "../stitch";
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
  },
  link:{
    color: theme.palette.grey[800],
    textDecoration:"none"
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
      <IconButton className={classes.button}>
        <VpnKey />
      </IconButton>
      </Tooltip>
    </Link>
  );

  
  const logoutButton = (
    <Tooltip title="Log Out">
      <IconButton className={classes.button} onClick={logout}>
        <Lock />
      </IconButton>
    </Tooltip>
  );

  const profileButton = (
    <Link to="/user/settings">
      <Tooltip title="Settings">
        <IconButton className={classes.button}>
          <Person />
        </IconButton>
      </Tooltip>
    </Link>
  );

  const newPostButton = (
    <Link to="/posts/new">
      <Tooltip title="New Post">
      <IconButton className={classes.button}>
        <NoteAdd />
      </IconButton>
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

    const loginButton = (
      <Link className={classes.link} to="/login">
      <ListItem button key="login">
      <ListItemIcon>
        <VpnKey />
      </ListItemIcon>
      <ListItemText primary="Login" />
    </ListItem>
    </Link>
    );
  
    
    const logoutButton = (
      <ListItem  button onClick={logout} key="logout">
      <ListItemIcon>
        <Lock />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItem>
    );
  
    const profileButton = (
      <Link className={classes.link} to="/user/settings">
      <ListItem button key="accountSettings">
      <ListItemIcon>
        <Person />
      </ListItemIcon>
      <ListItemText primary="Account Settings" />
    </ListItem>
    </Link>
    );
  
    const newPostButton = (
      <Link  className={classes.link} to="/posts/new">
      <ListItem button key="newPost">
      <ListItemIcon>
        <NoteAdd />
      </ListItemIcon>
      <ListItemText primary="New Post" />
    </ListItem>
    </Link>
    )
    ;

    const drawerContent = (
      <div role="presentation"
      onClick={closeDrawer}>
        <List>
      {isAnon ? loginButton : logoutButton}

      {!isAnon && profileButton}

      {!isAnon && newPostButton}

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
