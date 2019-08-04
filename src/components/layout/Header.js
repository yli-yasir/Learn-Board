import React from "react";
import { AppBar, Toolbar, Typography, InputBase } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  searchContainer: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[300],
    "&:hover": {
      backgroundColor: fade(theme.palette.grey[300], 0.7)
    },
    marginLeft: theme.spacing(2),
  },
  searchIconContainer: {
    position: "absolute",
    width: theme.spacing(7),
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  inputRoot: {},
  input: { padding: theme.spacing(1, 1, 1, 7)},

}))

export default function Header(props) {
  const classes = useStyles();
  return (
    <AppBar  color="default">
      <Toolbar>
        <Typography variant="h6" noWrap>
          Learnboard
        </Typography>
        <div className={classes.searchContainer}>
          <div className={classes.searchIconContainer}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.input
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}
