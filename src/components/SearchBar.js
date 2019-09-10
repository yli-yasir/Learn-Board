import React, { useState } from "react";
import { InputBase } from "@material-ui/core";
import {fade,makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {withRouter} from 'react-router';
import {getSearchParams} from '../utils';
import {Q} from '../values/SearchParams';

const useStyles = makeStyles(theme => ({
  searchContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row-reverse",
    borderRadius: theme.spacing(2),
    width:'100%',
    backgroundColor: theme.palette.grey[300],
    "&:hover": {
      backgroundColor: fade(theme.palette.grey[300],0.6)
    }
  },
  inputRoot: {
    width:'100%',
    paddingLeft: theme.spacing(2)
  },
  searchButton:{

    borderRadius: theme.spacing(2),
    '&:hover':{
      backgroundColor: fade(theme.palette.primary.light,0.5)
    }
  }
}));

function SearchBar(props) {

  let {q} = getSearchParams(props.location.search);

  const classes = useStyles();

  const [text, setText] = useState(q ? q : "");

  let buildQueryString = () => {
    let params = new URLSearchParams(props.location.search);
    //If there is text in the search bar, return the query string updated with
    //after update the q param with the text.
    if (text){
    params.set(Q.PARAM_NAME,text)
    return '?' + params.toString();
    }
    //If there is no text, then just return the current params
    else{
      return '?' + params.toString();
    }
  };

  return (
    <Box className={classes.searchContainer}>

      <Link to={{pathname: '/search',search: buildQueryString() }}>
        <Button className={classes.searchButton}>
          <SearchIcon color="primary" />
        </Button>
      </Link>

      <InputBase
        placeholder="What do you wanna learn?"
        classes={{
          root: classes.inputRoot,
          input: classes.input
        }}
        inputProps={{ "aria-label": "search" }}
        onChange={event => {
          setText(event.target.value);
        }}
        value={text}
      />
    </Box>
  );
}

export default withRouter(SearchBar);