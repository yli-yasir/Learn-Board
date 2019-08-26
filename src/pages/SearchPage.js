import React from "react";
import Header from "../components/SearchHeader";
import Box from "@material-ui/core/Box";
import ResultsGrid from "../components/SearchResultsGrid";
import CircularProgress from "@material-ui/core/CircularProgress";
import {getSearchParams} from "../utils";
import db from "../mongodb";
import { POST_TYPE } from "../values/SearchParams";

function SearchPage({ location }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [results, setResults] = React.useState([]);

  //Grab the query parameters in order to perform search according to them.
  let {q,postType} = getSearchParams(location.search);

  // //This effect will be triggered if the params change.
  // React.useEffect(() => {
  //   //set the state to loading.
  //   setIsLoading(true);

  //   async function fetchResults() {
  //     //Build a filter accordingly, and use it to execute the query.
  //     let filter = {};

  //     //If there is a specified query i.e. search term
  //     if (q) {
  //       filter.topic = q;
  //     }

  //     //If there is a postType,and that type isn't 'all' we consider it.
  //     //( no need to consider postType if we are looking for everything)
  //     if (postType && postType !== POST_TYPE.ALL) {
  //       filter.type = postType;
  //     }

  //     const queryResults = await db
  //       .collection("posts")
  //       .find(filter)
  //       .asArray();

  //     setResults(queryResults);

  //     setIsLoading(false);
  //   }

  //   fetchResults();
  // }, [q, postType]);

  //Either a loading bar, if we are loading, or a grid with the results.
  const content = isLoading ? (
    <CircularProgress size={50} color="primary" />
  ) : (
    <ResultsGrid dataset={results} />
  );

  return (
    <div>
      <Header/>
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

export default SearchPage;
