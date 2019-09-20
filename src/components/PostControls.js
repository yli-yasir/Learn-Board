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
  const [isLiked, setIsLiked] = React.useState(false);

  const classes = useStyles();


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

      <Button
        className={classes.control}
        variant="outlined"
      >
        <ThumbUpOutlined />
        &nbsp;{props.likes}
      </Button>
    </Box>
  );
}

export default PostControls;
