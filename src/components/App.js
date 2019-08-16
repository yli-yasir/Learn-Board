import React, { useState, useEffect } from "react";
import { Header } from "./layout";
import Box from "@material-ui/core/Box";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ResultsGrid from "./ResultsGrid";
import db from "../firestore";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  return (
    <Router>
      <Route path="/" exact component={InitialScreen} />
      <Route
        path="/search"
        exact
        component={SearchScreen}
      />
    </Router>
  );
}

function InitialScreen() {
  return <div>welcome</div>;
}

function SearchScreen({ location }) {
  const [isLoading, setIsLoading] = useState(false);

  let params = new URLSearchParams(location.search);
  let q = params.get("q");
  let cat = params.get("cat");

  useEffect(() => {
    setIsLoading(true);
    console.log("loading");
    db.collection("learns")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(`${doc.id} => ${doc.data()}`);
        });
        setIsLoading(false);
      });
  }, [q, cat]);

  const content = isLoading ? (
    <CircularProgress size={50} color="primary" />
  ) : (
    <ResultsGrid />
  );

  //QUERY PARAMS
  // q : the search query
  // cat: the category that is selected, valid values : all | offers | requests
  // let params = new URLSearchParams(location.search);
  // let q = params.get("q");
  // let cat = params.get("cat");

  return (
    <div>
      <Header q={q} cat={cat} />
      <Box
        display="flex"
        justifyContent="center"
        minHeight={200}
        alignItems="center"
        pt={15}
        mx={4}
      >
        {content}
      </Box>
    </div>
  );
}

export default App;
