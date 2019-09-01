import React from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Stitch, UserPasswordCredential } from "mongodb-stitch-browser-sdk";
import Typography from "@material-ui/core/Typography";
import {Redirect} from "react-router";
import { Link } from "react-router-dom";
import FormPage from "./abstract/FormPage";
import ProgressButton from "../components/ProgressButton";

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
      await app.auth.loginWithCredential(credential);
      setIsDone(true);
      //console.log(authedUser);
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

  if (isDone){
        return <Redirect to="/search" />
  }



  return (
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
        type="password"
        value={password}
        onChange={handlePasswordChange}
        variant="outlined"
        margin="normal"
      />

      {errorMessage ? <Typography variant="overline" color="error">{errorMessage}</Typography> : ''}

      <ProgressButton variant="contained" color="primary" label="Login" isWorking={isWorking} onClick={login}/>

      <Typography variant="caption">
        Don't have an account? <Link to="/register">Register here!</Link>
      </Typography>
    </FormPage>
  );
}

export default LoginPage;
