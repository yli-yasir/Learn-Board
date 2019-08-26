import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import {Stitch,UserPasswordAuthProviderClient} from "mongodb-stitch-browser-sdk";

function RegisterPage(){

const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');

let registerUser = () => {
    console.log('initing user registeation')
    const emailPassClient = Stitch.defaultAppClient.auth
  .getProviderClient(UserPasswordAuthProviderClient.factory);

emailPassClient.registerWithEmail(email, password)
  .then(() => {
     console.log("Successfully sent account confirmation email!");
  })
  .catch(err => {
     console.log("Error registering new user:", err);
  });
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

<Button onClick={registerUser}>
    R
</Button>

</div>
);

}

export default RegisterPage;