import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import {Stitch,UserPasswordAuthProviderClient} from "mongodb-stitch-browser-sdk";
import FormPage from './abstract/FormPage';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

function RegisterPage(){

const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
const [confirmPassword, setConfirmPassword] = React.useState('');


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

let handleConfirmPasswordChange = (event) => {
  setConfirmPassword(event.target.value)
}


return   (

<FormPage>


 <TextField
id="email"
label="Email"
value={email}
onChange={handleEmailChange}
margin="normal"
variant="outlined"
/>

<TextField
id="password"
label="Password"
value={password}
onChange= {handlePasswordChange}
margin="normal"
variant="outlined"
/>

<TextField
id="confirmPassword"
label="Confirm Password"
value={confirmPassword}
onChange= {handleConfirmPasswordChange}
margin="normal"
variant="outlined"
/>

<Box my={1} clone>
<Button variant="contained" color="primary" onClick={registerUser}>
    Register
</Button>
</Box>

<Typography variant="caption">
        Already have an account? <Link to="/login">Login here!</Link>
      </Typography>

</FormPage>
);

}

export default RegisterPage;