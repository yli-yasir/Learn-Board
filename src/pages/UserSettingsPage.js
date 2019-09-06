import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ProgressButton from "../components/ProgressButton";
import FormPage from "./abstract/FormPage";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import db, { getEmail } from "../stitch";
import LoadingPage from './LoadingPage';
import SimpleSnackbar from '../components/SimpleSnackbar';

const useStyles = makeStyles(theme => ({}));

function UserSettingsPage(props) {
  const classes = useStyles();

  const [name, setName] = React.useState("");
  const [contactInfo, setContactInfo] = React.useState("");
  const [isLoading,setIsLoading]= React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSnackbarOpen,setIsSnackbarOpen]= React.useState(false);
  const [feedbackMessage,setFeedbackMessage]= React.useState('');

  React.useEffect(()=>{

   async function load(){
     console.log('loading')
     try{
     let currentDoc = await db.collection('users').findOne({_id:getEmail()});
     if(currentDoc){
     setName(currentDoc.displayName);
     setContactInfo(currentDoc.contact);
     }
     }
     catch(e){
       console.log(e)
     }
     finally{
       setIsLoading(false);
     }
   }

   load();
  },[])

  let handleNameChange = event => {
    setName(event.target.value);
  };

  let handleContactInfoChange = event => {
    setContactInfo(event.target.value);
  };

  const handleSnackbarClose= ()=>{
    setIsSnackbarOpen(false);
  }

  const submit = async () => {
    setIsSubmitting(true);
    console.log(getEmail());
    try {
      await db
        .collection("users")
        .updateOne(
          { _id: getEmail() },
          { $set: { displayName: name, contact: contactInfo } },
          { upsert: true }
        );
      console.log("submitted");
      setFeedbackMessage('Settings updated!')
      setIsSnackbarOpen(true);
    } catch (error) {
      setFeedbackMessage('Something went wrong!')
      setIsSnackbarOpen(true);
      console.log(error);
    }
    setIsSubmitting(false);
  };

  console.log(isLoading);
  if (isLoading){
    return <LoadingPage/>
  }
  return (
    <FormPage>
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

      <ProgressButton
        variant="contained"
        color="primary"
        label="save"
        isWorking={isSubmitting}
        onClick={submit}
      />
      <SimpleSnackbar open={isSnackbarOpen} onClose={handleSnackbarClose} message={feedbackMessage}/>
    </FormPage>
  );
}

export default UserSettingsPage;
