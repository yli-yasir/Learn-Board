import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ProgressButton from "../components/ProgressButton";
import FormPage from "./abstract/FormPage";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import db, { getUserEmail, getUserId } from "../stitch";
import LoadingPage from "./LoadingPage";
import SimpleSnackbar from "../components/SimpleSnackbar";
import { BSON } from "mongodb-stitch-core-sdk";

const useStyles = makeStyles(theme => ({}));

function UserSettingsPage(props) {
  const classes = useStyles();

  const [name, setName] = React.useState("");
  const [contactInfo, setContactInfo] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);

  React.useEffect(() => {
    async function load() {
      try {
        let currentDoc = await db
          .collection("users")
          .findOne({ email: getUserEmail() });
        if (currentDoc) {
          setName(currentDoc.name);
          setContactInfo(currentDoc.contact);
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
      await db.collection("users").updateOne(
        { email: getUserEmail() },
        {
          $set: {
            stitchUserId: getUserId(),
            name: name,
            contact: contactInfo,
            bio: "",
          }
        },
        { upsert: true }
      );
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
    <FormPage
    formTitle="My Contact Info"
    submitButtonLabel="Save"
    submitButtonTip="Click here to save your contact info"
    isSubmitting={isSubmitting}
    onSubmit={submit}
    isDone={isDone}
    redirectWhenDone="/search">
      <TextField
        id="name"
        label="Name"
        value={name}
        onChange={handleNameChange}
        variant="outlined"
        margin="normal"
      />

      <TextField
        id="contactInfo"
        label="Contact Information"
        multiline
        value={contactInfo}
        onChange={handleContactInfoChange}
        variant="outlined"
        margin="normal"
      />

      <FormControlLabel
        control={<Checkbox checked={true} />}
        label="I agree to have above information shared publicly in my posts."
      />

    </FormPage>
  );
}

export default UserSettingsPage;
