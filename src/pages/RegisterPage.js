import React from 'react';
import {TextField,Typography,Button} from '@material-ui/core';
import {Done} from '@material-ui/icons';
import {register} from "../utils/AuthUtils";
import FormPage from './abstract/FormPage';
import {Link} from 'react-router-dom';
import SimpleSnackbar from '../components/SimpleSnackbar'
import appStrings from '../values/strings';
import LanguageContext from '../context/LanguageContext';
function RegisterPage(){

const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
const [confirmPassword, setConfirmPassword] = React.useState('');
const [isRegisteringUser,setIsRegisteringUser] = React.useState(false);
const [isDone,setIsDone] = React.useState(false);
const [errorMessage,setErrorMessage]=React.useState('');
const [isSuccessSnackbarOpen,setIsSuccessSnackbarOpen]= React.useState(false);

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
    await register(email, password);
    console.log("successfully sent account confirmation email!");
    setIsRegisteringUser(false);
    setIsSuccessSnackbarOpen(true);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
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
<LanguageContext.Consumer>
{langContext=>{
  const strings = appStrings[langContext.language]; 
  return (<FormPage
    formTitle={strings.register}
    submitButtonLabel={strings.register}
    submitButtonTip={strings.registerTooltip}
    isSubmitting={isRegisteringUser}
    onSubmit={registerUser}
    belowSubmitButton={
      <React.Fragment>
    <Typography variant="caption" display="block">
    {strings.alreadyAccount} 
    <Link to="/login">{strings.login}</Link>
  </Typography>
  <Typography variant="caption">
    {strings.confirmationEmailProblem} 
    <Link to="/resend-confirmation-email">{strings.clickHere}</Link>
  </Typography>
  </React.Fragment>
  }
    errorMessage={errorMessage}
    isDone={isDone}
    redirectWhenDone="/search"
>


 <TextField
id="email"
label={strings.email}
value={email}
onChange={handleEmailChange}
margin="normal"
variant="outlined"
/>

<TextField
id="password"
label={strings.password}
value={password}
onChange= {handlePasswordChange}
margin="normal"
variant="outlined"
type="password"
/>

<TextField
id="confirmPassword"
label={strings.confirmPassword}
value={confirmPassword}
onChange= {handleConfirmPasswordChange}
margin="normal"
variant="outlined"
type="password"
/>


<SimpleSnackbar
        open={isSuccessSnackbarOpen}
        onClose={() =>{}}
        action={          
          <Button
          key="done"
          aria-label="done"
          color="inherit"
          variant="outlined"
          onClick={()=>{setIsDone(true)}}
        >
          <Done />&nbsp;&nbsp;&nbsp;{strings.backToMainPage}
        </Button>}
        message={strings.confirmationEmailSentSuccess}
      />
</FormPage>)}}
</LanguageContext.Consumer>
);

}

export default RegisterPage;