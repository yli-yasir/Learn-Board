import React from "react";
import TextField from "@material-ui/core/TextField";
import { Stitch, UserPasswordCredential } from "mongodb-stitch-browser-sdk";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import FormPage from "./abstract/FormPage";

function LoginPage() {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isDone,setIsDone]= React.useState(false);
  const [errorMessage,setErrorMessage]= React.useState('');
  const [isWorking,setIsWorking]=React.useState(false);

  let login = async () => {
    const app = Stitch.defaultAppClient;
    //create a new User Password credential with the provided email and password.
    const credential = new UserPasswordCredential(email, password);
    try {
      setIsWorking(true);
      console.log('attempting to login')
      await app.auth.loginWithCredential(credential);
      console.log('successfully logged in')
      setIsDone(true);
    } catch (error) {
      setIsWorking(false);
      setErrorMessage(error.message)
    }
  };

  let handleEmailChange = event => {
    setEmail(event.target.value);
  };

  let handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  return (
    <FormPage
    formTitle="Login"
    submitButtonLabel="Login"
    submitButtonTip="Click here to Login"
    isSubmitting={isWorking}
    onSubmit={login}
    belowSubmitButton={
      <React.Fragment>
          <Typography variant="caption" display="block">
    Forgot your password? <Link to="/forgot-password">Click here!</Link> 
  </Typography>
    <Typography variant="caption" display="block">
    Don't have an account? <Link to="/register">Register here!</Link>
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
        variant="outlined"
        margin="normal"
      />

      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        variant="outlined"
        margin="normal"
      />
      <Typography variant="caption"></Typography>



    </FormPage>
  );
}

export default LoginPage;
