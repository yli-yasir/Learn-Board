import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/logo.svg";
import { Typography, Divider, Paper, Box } from "@material-ui/core";
import ProgressButton from "../../components/ProgressButton";
import { borderRadius } from "@material-ui/system";

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
    marginBottom: theme.spacing(0.5)
  },
  icon: {
    margin: "8px auto 16px",
    display: "block"
  }
}));

function FormPage(props) {
  const classes = useStyles();

  return (
    <Box pt={1}>
      <img src={logo} className={classes.icon} height="75px" />

      <Paper className={classes.paper}>
        <Typography align="center" className={classes.formTitle} variant="h2">
          {props.formTitle}
        </Typography>

        {props.children}

        {props.errorMessage ? (
          <Typography variant="overline" color="error">
            {props.errorMessage}
          </Typography>
        ) : (
          ""
        )}

        <ProgressButton
          className={classes.submitButton}
          variant="contained"
          color="primary"
          tip={props.submitButtonTip}
          label={props.submitButtonLabel}
          isWorking={props.isSubmitting}
          onClick={props.onSubmit}
        />

        <Typography variant="caption">{props.belowSubmitButton}</Typography>
      </Paper>
    </Box>
  );
}

export default FormPage;
