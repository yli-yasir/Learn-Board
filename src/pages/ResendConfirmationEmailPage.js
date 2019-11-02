import React from "react";
import TextField from "@material-ui/core/TextField";
import { resendAccountConfirmationEmail } from "../utils/AuthUtils";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import FormPage from "./abstract/FormPage";
import SimpleSnackbar from "../components/SimpleSnackbar";
import { Button } from "@material-ui/core";
import { Done } from "@material-ui/icons";
import appStrings from "../values/strings";
import LanguageContext from "../context/LanguageContext";

function ResendConfirmationEmailPage() {
  const [email, setEmail] = React.useState("");
  const [isDone, setIsDone] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isWorking, setIsWorking] = React.useState(false);
  const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = React.useState(
    false
  );

  let resendConfirmation = async () => {
    try {
      setIsWorking(true);
      console.log("attempting to resend confirmation email");
      await resendAccountConfirmationEmail(email);
      console.log("successfully sent confirmation email");
      setEmail("");
      setErrorMessage("");
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
    <LanguageContext.Consumer>
      {langContext => {
        const strings = appStrings[langContext.language];

        return (
          <FormPage
            formTitle={strings.resendConfirmationEmail}
            submitButtonLabel={strings.resend}
            submitButtonTip={strings.resendConfirmationEmailTooltip}
            isSubmitting={isWorking}
            onSubmit={resendConfirmation}
            belowSubmitButton={
              <Typography variant="caption">
                {strings.please}
                <Link to="/feedback">Contact us</Link>
                {" " + strings.ifStillIssues}
              </Typography>
            }
            errorMessage={errorMessage}
            isDone={isDone}
            redirectWhenDone="/search"
          >
            <TextField
              id='email'
              label={strings.email}
              value={email}
              onChange={handleEmailChange}
              variant="outlined"
              margin="normal"
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
              message={strings.resendConfirmationEmailSuccess}
            />
          </FormPage>
        );
      }}
    </LanguageContext.Consumer>
  );
}

export default ResendConfirmationEmailPage;
