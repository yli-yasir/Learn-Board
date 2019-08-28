import React from "react";
import { VpnKey, NoteAdd,Lock } from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import {client,isAnon as isAnonStitch} from "../stitch";
import Button from '@material-ui/core/Button';
import { AnonymousCredential } from "mongodb-stitch-core-sdk";

export default function UserBar(props) {

  const [isAnon,setIsAnon]= React.useState(true);

  React.useEffect(()=>{
    setIsAnon(isAnonStitch())
  }
    ,[])


  let logout = async () => {
    try{
    await client.auth.logout();
    await client.auth.loginWithCredential(new AnonymousCredential());
    setIsAnon(true);
    }
    catch(e){
      console.log(e)
    }
  }
  

const loginButton = (
  <Link to="/login">
    <Button>
      <VpnKey/>
    </Button>
  </Link> 
);

const logoutButton = (
<Button onClick={logout}>
<Lock/>
</Button>
);

  return (
    <Box {...props}>

        {isAnon? loginButton : logoutButton}

{!isAnon && (
        <Link to="/posts/new">
          <Button>
        <NoteAdd />
        </Button>
</Link>)}


    </Box>
  );
}
