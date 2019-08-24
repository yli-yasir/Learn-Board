import React, { useState, useEffect } from "react";
import { Header } from "./layout";
import Box from "@material-ui/core/Box";
import { BrowserRouter as Router, Route} from "react-router-dom";
import ResultsGrid from "./ResultsGrid";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Q,LEARN_TYPE} from "../values/SearchParams";
import db from '../mongodb';
import Register from './Register';
import ConfirmEmail from './ConfirmEmail';
import Login from './Login';
import NewLearn from './NewLearn';

function App() {
  return (
    <Router>
      <Route path="/" exact component={InitialScreen} />
      <Route
        path="/search"
        exact
        component={SearchScreen}
      />
      <Route path="/register" exact component={Register}/>
      <Route path="/confirmEmail" exact component={ConfirmEmail}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/newLearn" exact component={NewLearn}/>
    </Router>
  );
}

function InitialScreen() {
  return <div>welcome</div>;
}

function SearchScreen({ location }) {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);

  let params = new URLSearchParams(location.search);
  let q = params.get(Q.PARAM_NAME);
  let learnType = params.get(LEARN_TYPE.PARAM_NAME);

  useEffect(() => {
    setIsLoading(true);

    async function fetchResults(){

      //This will be built and then used to execute the mongo query
      let filter = {};

      //If there is a specified query i.e. search term
      if (q){
        filter.courseName = q
      }
  
      if (learnType && learnType !== 'all' ){
        filter.type = learnType
      }
      
      const queryResults = await db.collection('learns').find(filter).asArray(); 

      setResults(queryResults);
 
      setIsLoading(false);

    }
    
    fetchResults();

  }, [q, learnType]);

  const content = isLoading ? (
    <CircularProgress size={50} color="primary" />
  ) : (
    <ResultsGrid dataset={results} />
  );

  
 

  return (
    <div>
      <Header q={q} learnType={learnType} />
      <Box
        display="flex"
        justifyContent="center"
        minHeight={200}
        alignItems="center"
        pt={15}
        mx={4}
      >
        {/*this is either the loading spinner, or the results grid */}
        {content}
      </Box>
    </div>
  );
}

export default App;
