import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import db from "../stitch";
import { BSON } from "mongodb-stitch-browser-sdk";
import LoadingPage from "./LoadingPage";
import { Typography, Divider } from "@material-ui/core";
import { Person, Chat } from "@material-ui/icons";
import Chip from "@material-ui/core/Chip"

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      width: "60%"
    }
  },
  chip:{
    margin: theme.spacing(1)
  }
}));

function PostDetailsPage({ match }) {
  const [postDoc, setPostDoc] = React.useState({});
  const [authorDoc, setAuthorDoc] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const classes = useStyles();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const postId = new BSON.ObjectID(match.params.id);
        const mPostDoc = await db.collection("posts").findOne({ _id:postId });
        const mAuthorDoc = await db.collection("users").findOne({_id: mPostDoc.by});
        setAuthorDoc(mAuthorDoc);
        setPostDoc(mPostDoc);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingPage />;

  } else {
    return (
      <Box component={Paper} className={classes.paper} mx="auto">
        <Typography gutterBottom={true} align="center" variant="h6">
          {postDoc.topic}
        </Typography>
        <Box>

         <Chip className={classes.chip} label={authorDoc.displayName} icon={<Person/>}></Chip> 
            {postDoc.languages.map(language=><Chip className={classes.chip} key={language} label={language} icon={<Chat/>}></Chip>)}
        </Box>
        <Typography variant="body1">{postDoc.description}</Typography>
      </Box>
    );
  }
}

export default PostDetailsPage;
