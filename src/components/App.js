import React, { useState, useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { Header, Footer } from "./layout";
import ResultCard from "./ResultCard";
import Box from "@material-ui/core/Box";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ResultsGrid from './ResultsGrid';

function App() {
  return (
    <Router>
      <Route path="/" exact component={InitialScreen} />
      <Route path="/search" exact component={MainScreen}/>
    </Router>
  );
}

function InitialScreen() {
  return <div>welcome</div>;
}

function MainScreen({location}) {

  //QUERY PARAMS
  // q : the search query 
  // cat: the category that is selected, valid values : all | offers | requests
  let params = new URLSearchParams(location.search);
  

  let q = params.get('q');
  let cat = params.get('cat');

  console.log(params.toString())
  return (
    <div>
      <Header q={q} cat={cat} />
      <Box pt={15} mx={8}>
      <ResultsGrid></ResultsGrid>
      </Box>
    </div>
  );
}

export default App;
