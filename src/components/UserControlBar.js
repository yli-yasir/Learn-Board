import React from "react";
import { VpnKey, NoteAdd, Lock, Person, TollTwoTone } from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { client, isAnon as isAnonStitch } from "../stitch";
import Button from "@material-ui/core/Button";
import { AnonymousCredential } from "mongodb-stitch-core-sdk";
import { Tooltip } from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
  button:{
    color:'rgba(0,0,0,0.54)'
  }
}))
export default function UserBar(props) {

  const [isAnon, setIsAnon] = React.useState(true);

  const classes = useStyles();

  React.useEffect(() => {
    setIsAnon(isAnonStitch());
  }, []);

  let logout = async () => {
    try {
      await client.auth.logout();
      await client.auth.loginWithCredential(new AnonymousCredential());
      setIsAnon(true);
    } catch (e) {
      console.log(e);
    }
  };

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
    <Box {...props}>
      {isAnon ? loginButton : logoutButton}

      {!isAnon && profileButton}

      {!isAnon && newPostButton}
    </Box>
  );
}
