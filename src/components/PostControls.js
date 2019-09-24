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
    overflow: "auto"
  },
  control: {
    margin: theme.spacing(0, 0.5, 0, 0.5),
    float: "right"
  }
}));

function PostControls(props) {

  //state because we are going to alter it
  const [isLiked, setIsLiked] = React.useState(
    props.post.likes.includes(getUserId())
  );

  const [likeCount, setLikeCount] = React.useState(props.post.likes.length);

  const [isLiking, setIsLiking] = React.useState(false);

  const [isDeleteDialogShown, setIsDeleteDialogShown] = React.useState(false);

  const [isDeleting, setIsDeleting] = React.useState(false);

  const classes = useStyles();

  const handleLikeButtonClick = async () => {
    console.log('like button clicked')
    setIsLiking(true);
    try {
      if (!isLiked) {
        console.log('attempting to add a like')
        const likeAdded = await likePost(props.post._id);
        if (likeAdded) {
          setLikeCount(likeCount + 1);
          setIsLiked(true);
          console.log('like added successfully')
        }
      } else {
        console.log('attemping to remove a like')
        const likeRemoved = await unlikePost(props.post._id);
        if (likeRemoved) {
          setLikeCount(likeCount - 1);
          setIsLiked(false);
          console.log('like removed successfully')
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
    console.log('delete confirm button clicked')
    setIsDeleting(true);
    try {
      console.log('attempting to delete')
      const deleteResult = await deletePost(props.post._id)
      console.log('delete result: ' + deleteResult)
      if(deleteResult){
        handleDeleteDialogClose();
        setIsDeleting(false);
        console.log('deleted successfully,now executing afterDelete()');
        props.afterDelete(props.post._id);
      }
    } catch (e) {
            //do not put these in finally clause, it always executes, and in case of 
      //a successfully deletion you will be performing and updated on a delete component
      handleDeleteDialogClose();
      setIsDeleting(false);
      console.log(e);

  }

}

  const likeButtonProps = {};
  if (isLiked) {
    likeButtonProps.color = "primary";
  }

  const isOwner = props.post.authorEmail===getUserEmail();

  const isAnon = getUserEmail()==='guest'
  
  return (
    <Box className={classes.controlsContainer} mb={1}>

      {/*always show the report button*/}
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

      <ProgressButton
            className={classes.control}
            variant="outlined"
            label={<DeleteOutlined/>}
            isWorking={isDeleting}
            onClick={handleDeleteButtonClick}
          />

          <Link to={`/posts/${props.post._id}/edit`}>
            <Button className={classes.control} variant="outlined">
              <TextFormatOutlined />
            </Button>
          </Link>


        </React.Fragment>
      )}

    {!isAnon && <ProgressButton
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
      />}



      {isDeleteDialogShown && (
        <Dialog
          open={isDeleteDialogShown}
          onClose={handleDeleteDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure about that?
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


    </Box>
  );
}

export default PostControls;
