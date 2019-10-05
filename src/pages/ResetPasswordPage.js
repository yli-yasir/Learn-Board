import React from "react";
import TextField from "@material-ui/core/TextField";
import { emailPassClient } from "../stitch";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import FormPage from "./abstract/FormPage";
import SimpleSnackbar from "../components/SimpleSnackbar";
import { Button } from "@material-ui/core";
import { Done } from "@material-ui/icons";

function ResetPasswordPage({ location }) {
  const [newPassword, setNewPassword] = React.useState("");
  const [isDone, setIsDone] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isWorking, setIsWorking] = React.useState(false);
  const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = React.useState(
    false
  );

  let resetPassword = async () => {
    try {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      const tokenId = params.get("tokenId");
      setIsWorking(true);
      console.log("attempting to reset password");
      await emailPassClient.resetPassword(token,tokenId,newPassword);
      console.log("successfully reset password");
      setNewPassword("");
      setErrorMessage("");
      setIsWorking(false);
      setIsSuccessSnackbarOpen(true);
    } catch (error) {
      setIsWorking(false);
      setErrorMessage(error.message);
    }
  };

  let handleNewPasswordChange = event => {
    setNewPassword(event.target.value);
  };

  return (
    <FormPage
      formTitle="Reset Password"
      submitButtonLabel="Reset Password"
      submitButtonTip="Click here to reset your password"
      isSubmitting={isWorking}
      onSubmit={resetPassword}
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
        id="newPassowrd"
        label="New Password"
        value={newPassword}
        onChange={handleNewPasswordChange}
        variant="outlined"
        margin="normal"
        type="password"
      />

      <SimpleSnackbar
        open={isSuccessSnackbarOpen}
        onClose={() => {}}
        action={
          <Button
            key="done"
            aria-label="done"
            color="inherit"
            variant="outlined"
            onClick={() => {
              setIsDone(true);
            }}
          >
            <Done />
            &nbsp;&nbsp;&nbsp;Back to main page
          </Button>
        }
        message="Success! Your password has been reset!"
      />
    </FormPage>
  );
}

export default ResetPasswordPage;
