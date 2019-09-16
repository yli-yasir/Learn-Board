import React, { useState } from "react";
import { InputBase } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { getSearchParams } from "../utils";
import { Q } from "../values/searchParams";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Autosuggest from "react-autosuggest";
import { flexbox } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
  autoSuggestRoot: {
    width: "100%",
    display: flexbox,
    position:"relative"
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  searchInputContainer: {
    display: "flex",
    borderRadius: theme.spacing(2),
    width: "100%",
    backgroundColor: theme.palette.grey[300],
    "&:hover": {
      backgroundColor: fade(theme.palette.grey[300], 0.6)
    }
  },
  inputRoot: {
    width: "100%",
    paddingLeft: theme.spacing(2)
  },
  searchButton: {
    borderRadius: theme.spacing(2),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.light, 0.5)
    }
  }
}));

//Render the input component contained in the autosuggest root
function renderInputComponent(props) {
  const { classes, ...other } = props;
  return (
    <Box className={classes.searchInputContainer}>
      <InputBase
        placeholder="What are you teaching or learning?"
        classes={{
          root: classes.inputRoot,
          input: classes.input
        }}
        inputProps={{ "aria-label": "search" }}
        {...other}
      />
      <Link to={{ pathname: "/search", search: 'props.queryString' }}>
        <Button className={classes.searchButton}>
          <SearchIcon color="primary" />
        </Button>
      </Link>
    </Box>
  );
}

function renderSuggestionsContainer(options) {
  return (
    <Paper {...options.containerProps} square>
      {options.children}
    </Paper>
  );
  }
//Render a suggestion item
function renderSuggestion(suggestion) {
  return (
    <MenuItem component="div">
       <SearchIcon color="primary" />&nbsp;&nbsp;&nbsp;{suggestion}
    </MenuItem>
  );
}

function getSuggestions(term) {
  return ["1", "2", "3", "4"];
}

function getSuggestionValue(suggestion) {
  return suggestion;
}


function SearchBar(props) {
  const { q } = getSearchParams(props.location.search);

  const [text, setText] = useState(q ? q : "");
  const [suggestions, setSuggestions] = useState([]);

  const classes = useStyles();

  const buildQueryString = () => {
    let params = new URLSearchParams(props.location.search);
    //If there is text in the search bar, return the query string updated with
    //after update the q param with the text.
    if (props.value) {
      params.set(Q.PARAM_NAME, props.value);
      return "?" + params.toString();
    }
    //If there is no text, then just return the current params
    else {
      return "?" + params.toString();
    }
  };

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = (event,{newValue}) => {
    //do not use event.target.value, it will not contain the value
        //when the input changes via another method than typing (e.g. suggestion click)
    setText(newValue);
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      getSuggestionValue={getSuggestionValue}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      inputProps={{
        classes,
        value: text,
        onChange: handleChange
      }}
      theme={{
        container: classes.autoSuggestRoot,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion
      }}
      renderSuggestionsContainer={renderSuggestionsContainer}
      renderInputComponent={renderInputComponent}
      renderSuggestion={renderSuggestion}
    />
  );

  // return (
  //   // <Box className={classes.searchContainer}>

  //   //   <Link to={{pathname: '/search',search: buildQueryString() }}>
  //   //     <Button className={classes.searchButton}>
  //   //       <SearchIcon color="primary" />
  //   //     </Button>
  //   //   </Link>

  //     {/* <InputBase
  //       placeholder="What do you wanna learn?"
  //       classes={{
  //         root: classes.inputRoot,
  //         input: classes.input
  //       }}
  //       inputProps={{ "aria-label": "search" }}
  //       onChange={event => {
  //         setText(event.target.value);
  //       }}
  //       value={text}
  //     /> */}
  //   </Box>
  // );
}

export default withRouter(SearchBar);
