import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ThumbUpOutlined,
  TextFormatOutlined,
  WarningRounded,
  DeleteOutlined
} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { likePost, unlikePost, deletePost } from "../utils/DBUtils";
import { getUserId, getUserEmail } from "../stitch";
import ProgressButton from "./ProgressButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";


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
  const [isLiked, setIsLiked] = React.useState(
    props.post.likes.includes(getUserId())
  );
  const [likeCount, setLikeCount] = React.useState(props.post.likes.length);
  const [isLiking, setIsLiking] = React.useState(false);
  const [isDeleteDialogShown, setIsDeleteDialogShown] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const classes = useStyles();

  const handleLikeButtonClick = async () => {
    setIsLiking(true);
    try {
      if (!isLiked) {
        const likeAdded = await likePost(props.post._id);
        if (likeAdded) {
          console.log('liked')
          setLikeCount(likeCount + 1);
          setIsLiked(true);
        }
      } else {
        const likeRemoved = await unlikePost(props.post._id);
        if (likeRemoved) {
          console.log('unliked')
          setLikeCount(likeCount - 1);
          setIsLiked(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
    finally{
      setIsLiking(false);
    }
  };

  const handleDeleteButtonClick = () => {
    setIsDeleteDialogShown(true);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogShown(false);
  };

  const handleDeleteConfirmed = async () => {
    setIsDeleting(true);
    try {
      const deleteResult = await deletePost(props.post._d)
      if(deleteResult){
        props.removeFromResults(props.post._id);
      }
    } catch (e) {
      console.log('dete failedd')
      console.log(e);
      setIsDeleting(false);
  }
  finally{
    handleDeleteDialogClose();
  }
}

  const likeButtonProps = {};
  if (isLiked) {
    likeButtonProps.color = "primary";
  }

  const isOwner = props.post.authorEmail===getUserEmail();
  
  return (
    <Box className={classes.controlsContainer} mb={1}>
      <Link to={`/posts/${props.post._id}/report`}>
        <Button
          color="secondary"
          className={classes.control}
          variant="outlined"
        >
          <WarningRounded />
        </Button>
      </Link>

      {isOwner && (
        <React.Fragment>
          <Link to={`/posts/${props.post._id}/edit`}>
            <Button className={classes.control} variant="outlined">
              <TextFormatOutlined />
            </Button>
          </Link>

          <ProgressButton
            className={classes.control}
            variant="outlined"
            label={<DeleteOutlined/>}
            isWorking={isDeleting}
            onClick={handleDeleteButtonClick}
          />
        </React.Fragment>
      )}

      {isDeleteDialogShown && (
        <Dialog
          open={isDeleteDialogShown}
          onClose={handleDeleteDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure about that? 🤔
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your post will be lost forever!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={handleDeleteDialogClose}
              color="primary"
            >
              No
            </Button>
            <Button color="primary" onClick={handleDeleteConfirmed}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <ProgressButton
        className={classes.control}
        {...likeButtonProps}
        variant="outlined"
        onClick={handleLikeButtonClick}
        label={
          <React.Fragment>
            <ThumbUpOutlined />
            &nbsp;{likeCount}
          </React.Fragment>
        }
        isWorking={isLiking}
      />
    </Box>
  );
}

export default PostControls;
