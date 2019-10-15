import React from "react";
import TextField from "@material-ui/core/TextField";
import { BSON } from "mongodb-stitch-browser-sdk";
import FormPage from "./abstract/FormPage";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import db, { getUserId } from "../stitch";
import LoadingPage from "./LoadingPage";
import ProgressButton from "../components/ProgressButton";
import appStrings from "../values/strings";
import LanguageContext from "../context/LanguageContext";
import {Link} from 'react-router-dom'; 

function ReportPostPage({ match }) {
  const [postTitle, setPostTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isPageLoading, setIsPageLoading] = React.useState(true);
  const [isDone,setIsDone] = React.useState(false);
  const [errorMessage,setErrorMessage]= React.useState('');
  const postId = match.params.id;
  React.useEffect(() => {

    async function fetchPostDetails() {
      setIsPageLoading(true);
      try {
        const postDoc = await db
          .collection("posts")
          .findOne({ _id: new BSON.ObjectID(postId) });
        setPostTitle(postDoc.topic);
      } catch (e) {
        console.log(e);
        setErrorMessage(e);
      } finally {
        setIsPageLoading(false);
      }
    }
    fetchPostDetails();
  }, [postId]);

  let submitReport = async () => {
    setIsSubmitting(true);
    try {
      await db.collection("reports").insertOne({
        postId,
        message,
        reporterStitchUserId: getUserId()
      });
      setIsDone(true);
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmitting(false);
      
    }
  };

  let handleMessageChange = event => {
    setMessage(event.target.value);
  };

  if (isPageLoading) {
    return <LoadingPage />;
  }

  return (
    <LanguageContext.Consumer>
      {langContext => {
        const strings = appStrings[langContext];
        return (
          <FormPage
          formTitle={strings.reportPost}
          submitButtonLabel={strings.report}
          submitButtonTip={strings.reportTooltip}
          isSubmitting={isSubmitting}
          onSubmit={submitReport}
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
              id="title"
              label={strings.post}
              value={postTitle}
              margin="normal"
              variant="outlined"
              disabled
            />

            <TextField
              id="message"
              label={strings.message}
              value={message}
              onChange={handleMessageChange}
              margin="normal"
              variant="outlined"
              multiline
            />

            <Box my={1} clone>
              <ProgressButton
                variant="contained"
                isWorking={isSubmitting}
                color="primary"
                label={strings.submitReport}
                onClick={submitReport}
              />
            </Box>

            <Typography variant="caption">
              {strings.weAreSorry} <span role="img">😔</span>
            </Typography>
          </FormPage>
        );
      }}
    </LanguageContext.Consumer>
  );
}

export default ReportPostPage;
