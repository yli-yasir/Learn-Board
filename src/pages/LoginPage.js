import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Stitch,UserPasswordCredential} from "mongodb-stitch-browser-sdk";
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import FormPage from './abstract/FormPage'




function LoginPage(){

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

<FormPage>


 <TextField
id="email"
label="Email"
value={email}
onChange={handleEmailChange}
variant="outlined"
margin="normal"
/>


<TextField
id="password"
label="Password"
value={password}
onChange= {handlePasswordChange}
variant="outlined"
margin="normal"
/>

<Box my={1} clone>
<Button variant="contained" color="primary" onClick={doLogin}>
    Login
</Button>
</Box>

<Typography variant="caption">
        Don't have an account? <Link to="/register">Register here!</Link>
      </Typography>
</FormPage>
);

}

export default LoginPage;