import React from "react";
import TextField from "@material-ui/core/TextField";
import { emailPassClient } from "../stitch";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import FormPage from "./abstract/FormPage";
import SimpleSnackbar from "../components/SimpleSnackbar";
import { Button } from "@material-ui/core";
import {Done} from "@material-ui/icons"

function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [isDone, setIsDone] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isWorking, setIsWorking] = React.useState(false);
  const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = React.useState(
    false
  );

  let sendPasswordResetEmail = async () => {
    try {
      setIsWorking(true);
      console.log("attempting to send reset password email");
      await emailPassClient.sendResetPasswordEmail(email);
      console.log("successfully sent password reset email");
      setEmail('');
      setErrorMessage('');
      setIsWorking(false);
      setIsSuccessSnackbarOpen(true);
    } catch (error) {
      setIsWorking(false);
      setErrorMessage(error.message);
    }
  };

  let handleEmailChange = event => {
    setEmail(event.target.value);
  };

  return (
    <FormPage
      formTitle="Forgot Password"
      submitButtonLabel="Request New Password"
      submitButtonTip="Click here to request a new password"
      isSubmitting={isWorking}
      onSubmit={sendPasswordResetEmail}
      belowSubmitButton={
        <Typography variant="caption">
          Please <Link to="/feedback">Contact us</Link> if you are still having
          issues
        </Typography>
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
          <Done />&nbsp;&nbsp;&nbsp;Back to main page
        </Button>}
        message="Success! You should receive an email from 'no-reply+stitch@mongodb.com' soon. Follow the email to reset your password!"
      />
    </FormPage>
  );
}

export default ForgotPasswordPage;
