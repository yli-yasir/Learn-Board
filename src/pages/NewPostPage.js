import React from "react";
import { Link } from "react-router-dom";

import db, { getUserEmail } from "../stitch";
import { BSON } from "mongodb-stitch-core-sdk";

import FormPage from "../pages/abstract/FormPage";
import LoadingPage from "./LoadingPage";

import { makeStyles } from "@material-ui/core/styles";

import {
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Select,
  InputLabel,
  MenuItem,
  Box,
  Chip,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Tooltip,
  Typography
} from "@material-ui/core";

import { Chat } from "@material-ui/icons";
import postIcons from "../values/PostIcons";
import {
  languages as languagesList,
  cities as citiesList
} from "../values/strings/global";

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
  },
  selectionContainer: {
    marginBottom: theme.spacing(1),
    borderStyle: "solid",
    borderColor: theme.palette.grey[500],
    borderRadius: theme.spacing(1),
    borderWidth: "1px",
    minHeight: "100px",
    padding: theme.spacing(1)
  },
  postIconContainer: {
    margin: theme.spacing(0.5)
  },
  selectedIcon: {
    borderColor: theme.palette.primary.light
  }
}));

function NewPostPage({ match }) {
  //if fetching data (in case of edit)
  const [isLoading, setIsLoading] = React.useState(true);

  //if the page is working on inserting your data to the db
  const [isWorking, setIsWorking] = React.useState(false);

  //If it's done submitting
  const [isDone, setIsDone] = React.useState(false);

  const [postType, setPostType] = React.useState("offer");
  const [topic, setTopic] = React.useState("");

  const [selectedLanguage, setSelectedLanguage] = React.useState("English");
  const [addedLanguages, setAddedLanguages] = React.useState(["English"]);

  const [shortDescription, setShortDescription] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [city, setCity] = React.useState("Lefkoşa");

  const [selectedIconName, setSelectedIconName] = React.useState("ydu");

  const [
    missingUserInfoDialogIsOpen,
    setMissingUserInfoDialogIsOpen
  ] = React.useState(false);

  const [errors, setErrors] = React.useState([]);

  const hasError = errors.length > 0;

  const pageId = match.params.id;

  React.useEffect(() => {
    //if there is an id (it means its post is being edited) fetch the post data
    if (pageId) {
      async function fetchData() {
        try {
          //try to find the post doc
          console.log("attempting post document fetch");
          const doc = await db
            .collection("posts")
            .findOne({ _id: new BSON.ObjectID(pageId) });
          //if a doc for the post was found,populate the form with its info

          if (doc) {
            console.log("document found!");
            setPostType(doc.postType);
            setTopic(doc.topic);
            setShortDescription(doc.shortDescription);
            setDescription(doc.description);
            setAddedLanguages(doc.languages);
          }
        } catch (e) {
          console.log(e);
          console.log("something went wrong while fetching post data");
        } finally {
          setIsLoading(false);
        }
      }
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [pageId]);

  const post = async () => {
    //todo
    //check if there is any front end error
    if (hasError) {
      //handle front end error here
      console.log(errors);
      console.log("front end form error, look above");
      return;
    }
    try {
      setIsWorking(true);
      //check if the user has a document in the users collection
      const userDoc = await db
        .collection("users")
        .findOne({ email: getUserEmail() });
      //If the user doc is null
      if (!userDoc) {
        console.log("no user document found");
        openMissingUserInfoDialog();
      } else {
        const document = {
          postType,
          topic,
          languages: addedLanguages,
          shortDescription,
          description,
          city,
          authorStitchUserId: userDoc.stitchUserId,
          authorName: userDoc.name,
          authorEmail: userDoc.email,
          icon: selectedIconName
        };

        //this is the filter which will be used for inserting
        const query = { _id: new BSON.ObjectID(match.params.id) };

        //If this is a new document
        if (!pageId) {
          document.likes = [];
        }

        //inser the document
        await db
          .collection("posts")
          .updateOne(query, { $set: document }, { upsert: true });

        setIsWorking(false);
        setIsDone(true);
      }
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
  console.log(classes);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <FormPage
      formTitle="New Post"
      submitButtonLabel="Post"
      submitButtonTip="Click here to submit your post"
      isSubmitting={isWorking}
      onSubmit={post}
      isDone={isDone}
      redirectWhenDone="/search"
    >
      {/*post type */}
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
      {/*end of post type*/}

      {/*topic */}
      <TextField
        id="topic"
        label="Topic"
        variant="outlined"
        value={topic}
        onChange={handleTopicChange}
        margin="normal"
        helperText="A title for your post."
      />
      {/*end of topic */}

      {/*short description */}
      <TextField
        id="shortDescription"
        label="Short Description"
        variant="outlined"
        value={shortDescription}
        onChange={handleShortDescriptionChange}
        margin="normal"
        multiline
        helperText="A brief description."
      />
      {/*end of short description*/}

      {/*description */}
      <TextField
        id="description"
        label="Description"
        variant="outlined"
        value={description}
        onChange={handleDescriptionChange}
        margin="normal"
        multiline={true}
        helperText="A more indepth description."
      />
      {/*end of description */}

      {/*city */}
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
      {/*end of city */}

      {/*languages*/}
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="languages">Add Language</InputLabel>
        <Select
          value={selectedLanguage}
          onChange={handleSelectedLanguageChange}
          inputProps={{
            id: "languages"
          }}
        >
          {languagesList.map(language => (
            <MenuItem key={language} value={language}>
              {language}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Which languages can be used?</FormHelperText>
      </FormControl>

      <Box className={classes.selectionContainer}>
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
      {/*end of languages */}

      {/*select an icon for the post */}
      <Typography variant="caption" color="textSecondary" >Select icon</Typography>
      <Box className={classes.selectionContainer}>
        {Object.keys(postIcons).map(key => {
          const iconDoc= postIcons[key];
          const selectedIconClass = iconDoc.name=== selectedIconName? classes.selectedIcon : ''
          return (
            <Tooltip title={iconDoc.alt}>
            <Button
              variant="outlined"
              key={iconDoc.name}
              className={classes.postIconContainer + ' ' + selectedIconClass}
              onClick={() => {
                setSelectedIconName(iconDoc.name)
              }}
            >
              <img
                className={classes.postIcon}
                alt={iconDoc.name}
                src={iconDoc.icon}
                height="50px"
                width="50px"
              />
            </Button>
            </Tooltip>
          );
        })}
      </Box>
      {/*end of post icon */}

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
      {/*end of missing user info dialog */}
    </FormPage>
  );
}

export default NewPostPage;
