import React from 'react';
import {withRouter} from 'react-router';
import {Stitch,UserPasswordAuthProviderClient} from "mongodb-stitch-browser-sdk";


function ConfirmEmailPage({location}){

    const [isSuccessful,setIsSuccessful]= React.useState(''
    )
    React.useEffect(()=>{

        async function doConfirmation(){
            const params = new URLSearchParams(location.search);
            const token = params.get('token');
            const tokenId = params.get('tokenId');
            
            // Confirm the user's email/password account
            const emailPassClient = Stitch.defaultAppClient.auth
              .getProviderClient(UserPasswordAuthProviderClient.factory);
            
              try{
            await emailPassClient.confirmUser(token, tokenId);
            setIsSuccessful(true);
              }
              catch(e){
                setIsSuccessful(false);
              }
        }
        doConfirmation();
    })

    if (isSuccessful===''){
        return <div>please wait</div>
    }
    else if (isSuccessful===true){
        return <div>email confirmed</div>
    }
    else {
        return <div>something went wrong </div>
    }
    
}

export default withRouter(ConfirmEmailPage);