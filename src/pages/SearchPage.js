import React from "react";
import Header from "../components/SearchHeader";
import Box from "@material-ui/core/Box";
import ResultsGrid from "../components/SearchResultsGrid";
import { searchPosts } from "../utils/DBUtils";
import SimpleSnackbar from "../components/SimpleSnackbar";
import { getEmail } from "../stitch";
import { Waypoint } from "react-waypoint";

function SearchPage({ location }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [results, setResults] = React.useState([]);
  const [wlcSnackBarIsShown, SetWlcSnackbarIsShown] = React.useState(true);
  //if continueFetch couldn't find any more results
  const [noMoreResults, setNoMoreResults] =React.useState(false);

  React.useEffect(() => {
    setNoMoreResults(false);
    //set the state to loading.
    setIsLoading(true);

    async function fetchResults() {
      const queryResults = await searchPosts(location.search, null, {
        sort: { _id: -1 },
        limit:5
      });
      setResults(queryResults);
      setIsLoading(false);
    }
    fetchResults();
  }, [location.search]);

  const handleWlcSnackbarClose = () => {
    SetWlcSnackbarIsShown(false);
  };

  const continueResultsFetch= async ()=>{
    if (results && !isLoading){
    setIsLoading(true);
    let continueFrom = results[results.length-1]._id
    const queryResults = await searchPosts(location.search, null, {
      sort: { _id: -1 },
      limit:5
    },continueFrom);
    if  (queryResults.length!==0){
    setResults([...results,...queryResults]);
    setNoMoreResults(false);
    }
    else{
      setNoMoreResults(true);
    }
    setIsLoading(false)
    }
  }

  const content =(
    <React.Fragment>
    <ResultsGrid noMoreResults={noMoreResults} isLoading={isLoading} dataset={results} />
    <Waypoint onEnter={continueResultsFetch} />
    </React.Fragment>
  );

  return (
    <div>
      <Header />
      <Box pt={20}>
        {/*this is either the loading spinner, or the results grid */}
        {content}
      </Box>
      <SimpleSnackbar
        open={wlcSnackBarIsShown}
        onClose={handleWlcSnackbarClose}
        message={`Welcome ${getEmail()}`}
      />
    </div>
  );
}

export default SearchPage;
