import React from "react";
import {InputBase } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
    searchContainer: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[300],
      "&:hover": {
        backgroundColor: fade(theme.palette.grey[300], 0.7)
      },
      // marginLeft: theme.spacing(2)
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
    input: { padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: 300,
        '&:focus': {
          width: 350,
        }
     }
    }
  
  }));


export default function SearchBar(props){

    const classes = useStyles();


    return (
    <Box {...props} className={classes.searchContainer}>
    <div className={classes.searchIconContainer}>
      <SearchIcon />
    </div>
    <InputBase
      placeholder="What do you wanna learn?"
      classes={{
        root: classes.inputRoot,
        input: classes.input
      }}
      inputProps={{ "aria-label": "search" }}
    />
  </Box>
    );
}