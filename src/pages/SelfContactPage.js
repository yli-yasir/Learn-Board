import React from "react";
import TextField from "@material-ui/core/TextField";
import FormPage from "./abstract/FormPage";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { getLoggedInUserEmail, getLoggedInUserId } from "../utils/AuthUtils";
import { findUser, updateUser } from "../utils/DBUtils";
import LoadingPage from "./LoadingPage";
import LanguageContext from "../context/LanguageContext";
import appStrings from "../values/strings";

function SelfContactPage() {
  const [name, setName] = React.useState("");
  const [contactInfo, setContactInfo] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);

  //attempt to pre-populate with user info
  React.useEffect(() => {
    async function load() {
      try {
        const user = findUser({ email: getLoggedInUserEmail() });
        if (user) {
          setName(user.name);
          setContactInfo(user.contact);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    }

    load();
  }, []);

  let handleNameChange = event => {
    setName(event.target.value);
  };

  let handleContactInfoChange = event => {
    setContactInfo(event.target.value);
  };

  const submit = async () => {
    setIsSubmitting(true);
    try {
      await updateUser(
        { email: getLoggedInUserEmail() },
        {
          stitchUserId: getLoggedInUserId(),
          name: name,
          contact: contactInfo,
          bio: ""
        }
      );
      {
      }
      console.log("submitted");
      setIsDone(true);
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <LanguageContext.Consumer>
      {langContext => {
        const strings = appStrings[langContext.language];
        return (
          <FormPage
            formTitle={strings.myContactInfo}
            submitButtonLabel={strings.save}
            submitButtonTip={strings.saveButtonTooltip}
            isSubmitting={isSubmitting}
            onSubmit={submit}
            isDone={isDone}
            redirectWhenDone="/search"
          >
            <TextField
              id="name"
              label={strings.name}
              value={name}
              onChange={handleNameChange}
              variant="outlined"
              margin="normal"
            />

            <TextField
              id="contactInfo"
              label={strings.contactInfo}
              multiline
              value={contactInfo}
              onChange={handleContactInfoChange}
              variant="outlined"
              margin="normal"
            />

            <FormControlLabel
              control={<Checkbox checked={true} />}
              label={strings.iAgreeToShareMyInfo}
            />
          </FormPage>
        );
      }}
    </LanguageContext.Consumer>
  );
}

export default SelfContactPage;
