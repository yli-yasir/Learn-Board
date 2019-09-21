import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ThumbUpOutlined,
  TextFormatOutlined,
  WarningRounded
} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import {likePost,unlikePost} from "../utils/DBUtils"
import { getUserId } from "../stitch";
import ProgressButton from './ProgressButton'

const useStyles = makeStyles(theme => ({
  controlsContainer: {
    overflow: "hidden"
  },
  control: {
    margin: theme.spacing(0, 0.5, 0, 0.5),
    float: "right"
  }
}));

function PostControls(props) {
  const [isLiked, setIsLiked] = React.useState(props.likes.includes(getUserId()));
  const [likeCount,setLikeCount]= React.useState(props.likes.length);
  const [isLiking,setIsLiking] = React.useState(false);
  const classes = useStyles();

  const handleLikeButtonClick = async ()=>{
    try{
    if (!isLiked){
    setIsLiking(true);
    const likeAdded = await likePost(props.postId);
    setIsLiking(false);
    if (likeAdded){
      setLikeCount(likeCount+1);
      setIsLiked(true);
    }
  }
    else{
      setIsLiking(true);
      const likeRemoved = await unlikePost(props.postId);
      setIsLiking(false);
      if (likeRemoved){
        setLikeCount(likeCount-1);
        setIsLiked(false);
      }
    }
  }
  catch(e){
    console.log(e)
  }
}

  const likeButtonProps = {}
  console.log(isLiked)
  if (isLiked){
    likeButtonProps.color="primary"
  }
  return (
    <Box className={classes.controlsContainer} mb={1}>
      <Button color="secondary" className={classes.control} variant="outlined">
        <WarningRounded />
      </Button>
      {props.isOwner && (
        <Link to={`/posts/${props.postId}/edit`}>
          <Button className={classes.control} variant="outlined">
            <TextFormatOutlined />
          </Button>
        </Link>
      )}

      <ProgressButton
        className={classes.control}
        {...likeButtonProps}
        variant="outlined"
        onClick={handleLikeButtonClick}
        label={
          <React.Fragment>
        <ThumbUpOutlined />&nbsp;{likeCount}
        </React.Fragment>
      }
      isWorking={isLiking}
      />
        
        
    </Box>
  );
}

export default PostControls;
