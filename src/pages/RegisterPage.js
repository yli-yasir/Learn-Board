import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import {emailPassClient} from "../stitch";
import FormPage from './abstract/FormPage';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

function RegisterPage(){

const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
const [confirmPassword, setConfirmPassword] = React.useState('');
const [isRegisteringUser,setIsRegisteringUser] = React.useState(false);
const [isDone,setIsDone] = React.useState(false);
const [errorMessage,setErrorMessage]=React.useState('');

let registerUser = async () => {

    //front side validation

    if (!email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
      setErrorMessage("INVALID EMAIL")
      return;
    }
    if (password !== confirmPassword){
      setErrorMessage("PASSWORDS DON'T MATCH")
      return;
    }


  try{
    console.log('attempting to register user');
    setIsRegisteringUser(true);
    await emailPassClient.registerWithEmail(email, password);
    console.log("successfully sent account confirmation email!");
    setIsRegisteringUser(false);
    setIsDone(true);
  }
  catch(e){
    console.log(e);
    setIsRegisteringUser(false);
    setErrorMessage(e.message);
  }

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

<FormPage
    formTitle="Register"
    submitButtonLabel="Register"
    submitButtonTip="Click here to register"
    isSubmitting={isRegisteringUser}
    onSubmit={registerUser}
    belowSubmitButton={
      <React.Fragment>
    <Typography variant="caption" display="block">
    Already have an account? <Link to="/login">Login here!</Link>
  </Typography>
  <Typography variant="caption">
    Problems with confirmation email? <Link to="/resend-confirmation-email">Click here!</Link>
  </Typography>
  </React.Fragment>
  }
    errorMessage={errorMessage}
    isDone={isDone}
    redirectWhenDone="/search"
>


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
type="password"
/>

<TextField
id="confirmPassword"
label="Confirm Password"
value={confirmPassword}
onChange= {handleConfirmPasswordChange}
margin="normal"
variant="outlined"
type="password"
/>

</FormPage>
);

}

export default RegisterPage;