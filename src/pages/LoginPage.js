import React from "react";
import TextField from "@material-ui/core/TextField";
import { Stitch, UserPasswordCredential } from "mongodb-stitch-browser-sdk";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import FormPage from "./abstract/FormPage";
import appStrings from "../values/strings";
import LanguageContext from "../context/LanguageContext";

function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isDone, setIsDone] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isWorking, setIsWorking] = React.useState(false);

  let login = async () => {
    const app = Stitch.defaultAppClient;
    //create a new User Password credential with the provided email and password.
    const credential = new UserPasswordCredential(email, password);
    try {
      setIsWorking(true);
      console.log("attempting to login");
      await app.auth.loginWithCredential(credential);
      console.log("successfully logged in");
      setIsDone(true);
    } catch (error) {
      setIsWorking(false);
      setErrorMessage(error.message);
    }
  };

  let handleEmailChange = event => {
    setEmail(event.target.value);
  };

  let handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  return (
    <LanguageContext.Consumer>
      {langContext => {
        const strings = appStrings[langContext.language];
        return (<FormPage
          formTitle={strings.login}
          submitButtonLabel={strings.login}
          submitButtonTip={strings.loginTooltip}
          isSubmitting={isWorking}
          onSubmit={login}
          belowSubmitButton={
            <React.Fragment>
              <Typography variant="caption" display="block">
                {strings.forgotPassword}{" "}
                <Link to="/forgot-password">{strings.clickHere}</Link>
              </Typography>
              <Typography variant="caption" display="block">
                {strings.dontHaveAcccount}{" "}
                <Link to="/register">{strings.registerHere}</Link>
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
            variant="outlined"
            margin="normal"
          />

          <TextField
            id="password"
            label={strings.password}
            type="password"
            value={password}
            onChange={handlePasswordChange}
            variant="outlined"
            margin="normal"
          />
          <Typography variant="caption"></Typography>
        </FormPage>)
      }}
    </LanguageContext.Consumer>
  );
}

export default LoginPage;
