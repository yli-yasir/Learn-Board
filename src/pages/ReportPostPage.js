import React from "react";
import TextField from "@material-ui/core/TextField";
import {
  BSON
} from "mongodb-stitch-browser-sdk";
import FormPage from "./abstract/FormPage";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import db, { getUserId } from "../stitch";
import LoadingPage from "./LoadingPage";
import ProgressButton from "../components/ProgressButton";

function ReportPostPage({ match }) {
  const [postTitle, setPostTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isPageLoading, setIsPageLoading] = React.useState(true);
  

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
      } finally {
        setIsPageLoading(false);
      }
    }
    fetchPostDetails();
  }, [postId]);

  let submitReport = async () => {
    setIsSubmitting(true);
    try {
      await db
        .collection("reports")
        .insertOne({
          postId,
          message,
          reporterStitchUserId: getUserId()
        });
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
    <FormPage>
      <TextField
        id="title"
        label="Post:"
        value={postTitle}
        margin="normal"
        variant="outlined"
        disabled
      />

      <TextField
        id="message"
        label="Message"
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
          label="Submit Report"
          onClick={submitReport}
        />
      </Box>

      <Typography variant="caption">
        We are sorry for your experience 😔
      </Typography>
    </FormPage>
  );
}

export default ReportPostPage;
