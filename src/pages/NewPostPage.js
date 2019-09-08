import React from "react";
import TextField from "@material-ui/core/TextField";
import ProgressButton from "../components/ProgressButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import { Chat } from "@material-ui/icons";
import {
  languages as languagesList,
  cities as citiesList
} from "../values/strings/global";
import FormPage from "../pages/abstract/FormPage";
import { Redirect } from "react-router-dom";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import db from "../stitch";
import { getEmail } from "../stitch";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  langaugeChip: {
    margin: theme.spacing(1)
  },
  link: {
    textDecoration: "none"
  }
}));

function NewPostPage() {
  //if the page is working on inserting your data to the db
  const [isWorking, setIsWorking] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);
  const [postType, setPostType] = React.useState("offer");
  const [topic, setTopic] = React.useState("");
  const [selectedLanguage, setSelectedLanguage] = React.useState("English");
  const [addedLanguages, setAddedLanguages] = React.useState(["English"]);
  const [shortDescription, setShortDescription] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [city, setCity] = React.useState("Lefkoşa");
  const [
    missingUserInfoDialogIsOpen,
    setMissingUserInfoDialogIsOpen
  ] = React.useState(false);
  const topicError = topic.length > 60;
  const shortDescriptionError = shortDescription.length > 150;
  const addedLanguagesError = addedLanguages.length === 0;

  const hasError = topicError || shortDescriptionError || addedLanguagesError;

  const post = async () => {
    //check if there is any error
    if (hasError) {
      //handle front end error here
      console.log("front end form error");
      return;
    }
    try {
      setIsWorking(true);
      //check if the user has a document in the users collection
      const userDoc = await db.collection("users").findOne({ _id: getEmail() });
      //If the user doc is null
      if (!userDoc) {
        console.log("no user doc found");
        openMissingUserInfoDialog();
      } else {
        const document = {
          postType,
          topic,
          languages: addedLanguages,
          shortDescription,
          description,
          city,
          by: getEmail()
        };
        //if so then continue to insert
        await db.collection("posts").insertOne(document);
        setIsDone(true);
      }

      setIsWorking(false);
    } catch (error) {
      console.log(error);
      setIsWorking(false);
    }
  };

  const handlePostTypeChange = event => {
    setPostType(event.target.value);
  };
  const handleTopicChange = event => {
    setTopic(event.target.value);
  };

  const handleShortDescriptionChange = event => {
    setShortDescription(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleCityChange = event => {
    setCity(event.target.value);
  };

  const handleSelectedLanguageChange = event => {
    const targetLanguage = event.target.value;
    if (!addedLanguages.includes(targetLanguage)) {
      setAddedLanguages([...addedLanguages, targetLanguage]);
    }
    setSelectedLanguage(event.target.value);
  };

  const handleDeleteAddedLanguage = targetLanguage => {
    setAddedLanguages(
      addedLanguages.filter(language => language !== targetLanguage)
    );
  };

  const openMissingUserInfoDialog = () => {
    setMissingUserInfoDialogIsOpen(true);
  };

  const handleMissingUserInfoDialogClose = () => {
    setMissingUserInfoDialogIsOpen(false);
  };

  const classes = useStyles();

  if (isDone) {
    return <Redirect to="/search" />;
  }

  return (
    <FormPage>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Type:</FormLabel>
        <RadioGroup
          aria-label="type"
          name="type"
          value={postType}
          onChange={handlePostTypeChange}
          row={true}
        >
          <FormControlLabel value="offer" control={<Radio />} label="Offer" />
          <FormControlLabel
            value="request"
            control={<Radio />}
            label="Request"
          />
        </RadioGroup>
      </FormControl>

      <TextField
        id="topic"
        label="Topic"
        variant="outlined"
        value={topic}
        onChange={handleTopicChange}
        margin="normal"
        helperText="A title for your post. (Max 60 characters)"
        error={topicError}
      />

      <TextField
        id="shortDescription"
        label="Short Description"
        variant="outlined"
        value={shortDescription}
        onChange={handleShortDescriptionChange}
        margin="normal"
        multiline
        helperText="A brief description. (Max 150 characters)"
        error={shortDescriptionError}
      />

      <TextField
        id="description"
        label="Description"
        variant="outlined"
        value={description}
        onChange={handleDescriptionChange}
        margin="normal"
        multiline={true}
        helperText="Write as much as you want."
      />

      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="cities">City</InputLabel>
        <Select
          value={city}
          onChange={handleCityChange}
          inputProps={{
            id: "cities"
          }}
        >
          {citiesList.map(city => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Where will the learning happen?</FormHelperText>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="languages">Add Language</InputLabel>
        <Select
          value={selectedLanguage}
          onChange={handleSelectedLanguageChange}
          inputProps={{
            id: "languages"
          }}
          error={addedLanguagesError}
        >
          {languagesList.map(language => (
            <MenuItem key={language} value={language}>
              {language}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Which languages can be used?</FormHelperText>
      </FormControl>

      <Box mb={1} border={1} borderRadius={16} minHeight={100} padding={1}>
        {addedLanguages.map(language => (
          <Chip
            key={language}
            className={classes.langaugeChip}
            icon={<Chat />}
            label={language}
            onDelete={e => handleDeleteAddedLanguage(language, e)}
          />
        ))}
      </Box>

      <ProgressButton
        variant="contained"
        color="primary"
        label="Submit"
        isWorking={isWorking}
        onClick={post}
      />

      {/* this dialog is shown if the user hasn't filled his contact info */}
      <Dialog
        open={missingUserInfoDialogIsOpen}
        onClose={handleMissingUserInfoDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          People can't contact you!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please provide your contact information in User Settings
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMissingUserInfoDialogClose} color="primary">
            OK
          </Button>
          <Link className={classes.link} target="_blank" to="/user/settings">
            <Button color="primary" autoFocus>
              Go to User Settings (opens in new tab)
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </FormPage>
  );
}

export default NewPostPage;
