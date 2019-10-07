import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import icon from "../../assets/brand/icon.svg";
import { Typography, Paper, Box } from "@material-ui/core";
import ProgressButton from "../../components/ProgressButton";
import { Redirect } from "react-router";

const useStyles = makeStyles(theme => ({
  paper: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      width: "40%"
    }
  },
  submitButton: {
    marginTop: theme.spacing(1)
  },
  icon: {
    margin: "8px auto 16px",
    display: "block"
  },
  errorMessage: { overflowWrap: "break-word", textTransform: "capitalize" }
}));

function FormPage(props) {
  const classes = useStyles();

  if (props.isDone) {
    return <Redirect to={props.redirectWhenDone} />;
  }

  return (
    <Box pt={1} px={1}>
      <img src={icon} className={classes.icon} height="75px" />

      <Paper className={classes.paper}>
        <Typography align="center" className={classes.formTitle} variant="h4">
          {props.formTitle}
        </Typography>

        {props.children}

        {props.errorMessage && (
          <Typography
            className={classes.errorMessage}
            paragraph
            variant="caption"
            color="error"
          >
            {props.errorMessage}
          </Typography>
        )}

        <ProgressButton
          className={classes.submitButton}
          variant="contained"
          color="primary"
          tip={props.submitButtonTip}
          label={props.submitButtonLabel}
          isWorking={props.isSubmitting}
          onClick={props.onSubmit}
          progressColor="secondary"
        />

        <Typography variant="caption">{props.belowSubmitButton}</Typography>
      </Paper>
    </Box>
  );
}

export default FormPage;
