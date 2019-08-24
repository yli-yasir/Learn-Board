import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import {Stitch,UserPasswordCredential} from "mongodb-stitch-browser-sdk";

function Login(){

const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');

let doLogin = () => {
    console.log('initing user login')
    const app = Stitch.defaultAppClient
    const credential = new UserPasswordCredential(email, password)
    app.auth.loginWithCredential(credential)
      // Returns a promise that resolves to the authenticated user
      .then(authedUser => console.log(`successfully logged in with id: ${authedUser.id}`))
      .catch(err => console.error(`login failed with error: ${err}`))
}

let handleEmailChange= (event)=> {
    setEmail(event.target.value)
}

let handlePasswordChange = (event) => {
    setPassword(event.target.value)
}

return   (
<div>
 <TextField
id="email"
label="Email"
value={email}
onChange={handleEmailChange}
margin="normal"
/>

<TextField
id="password"
label="password"
value={password}
onChange= {handlePasswordChange}
margin="normal"
/>

<Button onClick={doLogin}>
    L
</Button>

</div>
);

}

export default Login;