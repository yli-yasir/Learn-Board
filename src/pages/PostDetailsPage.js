import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import db, { getUserId } from "../stitch";
import { BSON } from "mongodb-stitch-browser-sdk";
import LoadingPage from "./LoadingPage";
import { Typography, Divider } from "@material-ui/core";
import { Person, Chat } from "@material-ui/icons";
import Chip from "@material-ui/core/Chip";
import PostControls from "../components/PostControls";
import appStrings from "../values/strings";
import LanguageContext from "../context/LanguageContext";

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(3,1,1,1),
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      width: "60%"
    }
  },
  chip:{
    margin: theme.spacing(1)
  },
  description:{
    whiteSpace:'pre-line'
  },
  contact:{
    whiteSpace:'pre-line',
    fontStyle:'italic',
    color:theme.palette.primary.dark
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
        const mAuthorDoc = await db.collection("users").findOne({stitchUserId: mPostDoc.authorStitchUserId});
        setAuthorDoc(mAuthorDoc);
        setPostDoc(mPostDoc);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [match.params.id]);


  if (isLoading) {
    return <LoadingPage />;

  } else {
    return (
      <LanguageContext.Consumer>
      {langContext=>{
        const strings = appStrings[langContext.language]
        return (<Box component={Paper} className={classes.paper} mx="auto">
        <Typography gutterBottom={true} align="center" variant="h6">
          {postDoc.topic}
        </Typography>

        <Box>
         <Chip className={classes.chip} label={authorDoc.name} icon={<Person/>}></Chip> 
            {postDoc.languages.map(language=><Chip className={classes.chip} key={language} label={language} icon={<Chat/>}></Chip>)}
        </Box>

        <Typography variant="body1" className={classes.description} paragraph>{postDoc.description}</Typography>

        <Typography className={classes.contact} variant="subtitle2">Contact:</Typography>
        <Typography paragraph className={classes.contact}  variant="caption">
          {strings.contact}
          "{authorDoc.contact}"
        </Typography>

        <PostControls postId={postDoc._id} isOwner={postDoc.authorStitchUserId===getUserId()}
        likes={postDoc.likes}/>
      </Box>)}}
      </LanguageContext.Consumer>
    );
  }
}

export default PostDetailsPage;
