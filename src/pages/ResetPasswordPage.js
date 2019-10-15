import React from "react";
import TextField from "@material-ui/core/TextField";
import { emailPassClient } from "../stitch";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import FormPage from "./abstract/FormPage";
import SimpleSnackbar from "../components/SimpleSnackbar";
import { Button } from "@material-ui/core";
import { Done } from "@material-ui/icons";
import LanguageContext from "../context/LanguageContext";
import appStrings from "../values/strings";

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
      await emailPassClient.resetPassword(token, tokenId, newPassword);
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
    <LanguageContext.Consumer>
      {langContext => {
        const strings = appStrings[langContext.language];
        return (
          <FormPage
            formTitle={strings.resetPassword}
            submitButtonLabel={strings.resetPassword}
            submitButtonTip={strings.resetPasswordTooltip}
            isSubmitting={isWorking}
            onSubmit={resetPassword}
            belowSubmitButton={
              <Typography variant="caption">
                {strings.please}
                <Link to="/feedback">{strings.contactUs}</Link>
                {" " + strings.ifStillIssues}
              </Typography>
            }
            errorMessage={errorMessage}
            isDone={isDone}
            redirectWhenDone="/search"
          >
            <TextField
              id="newPassword"
              label={strings.newPassword}
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
                  &nbsp;&nbsp;&nbsp;{strings.backToMainPage}
                </Button>
              }
              message={strings.passwordResetSuccess}
            />
          </FormPage>
        );
      }}
    </LanguageContext.Consumer>
  );
}

export default ResetPasswordPage;
