import React from "react";
import Header from "../components/SearchHeader";
import ResultsGrid from "../components/SearchResultsGrid";
import Box from "@material-ui/core/Box";
import { searchPosts } from "../utils/DBUtils";
import { Waypoint } from "react-waypoint";
import { Typography } from "@material-ui/core";
import LanguageContext from "../context/LanguageContext";
import appStrings from '../values/strings';

function SearchPage({ location }) {
  //location.search is the query string.

  //Two types of searches:

  //fresh-search: A new search. typically old results should be discarded, but
  //react probably merges the new results with the old results under the hood
  //and keeps relevant ones. Triggered whenever location.search changes.

  //continue-search: triggered whenever page is scrolled to bottom to  fetch
  //more results according to the same query string params, the new results
  //are appended to the results already in state.
  //(no change in location.search in a Continue search)

  //Indicates if any kind of search is being performed.
  const [isSearching, setIsSearching] = React.useState(false);

  //The results of searching.
  const [results, setResults] = React.useState([]);

  //Use blank results temporarily
  //This gives the illusion that old results have been discarded and indicates
  //a fresh search to the user. Effectively also pushing the loading indicator
  //to the top again.
  const [useBlankResults, setUseBlankResults] = React.useState(false);

  //if there are still more results in the database that correspond to
  //the current search params that can be fetched.
  const [canContinueSearch, setCanContinueSearch] = React.useState(true);

  //Used to indicate if anything has gone wrong.
  const [hasError, setHasError] = React.useState(false);

  //The number of results to fetch per search.
  const nResultsPerSearch = 15;

  //Fresh search (non-continue-search) is performed each time location.search
  //(query string) changes.
  React.useEffect(() => {
    //in case this has been set to false due to all results being exhausted from
    //a previous search
    setCanContinueSearch(true);

    //refer to the comments above for this.
    setUseBlankResults(true);

    //set the state to loading.
    setIsSearching(true);

    async function fetchResults() {
      try {
        console.log('executing fresh-search through SearchPage.js useEffect hook.')
        //execute the query
        const queryResults = await searchPosts(location.search, null, {
          sort: { _id: -1 },
          limit: nResultsPerSearch
        });
        //update the state results with the new results.
        setResults(queryResults);

        //blank results shouldn't be used anymore as we have appropriate results
        //to show the user now.
        setUseBlankResults(false);
      } catch (e) {
        console.log(e);
        setHasError(true);
      } finally {
        //In either way, we indicate that we are not loading anymore.
        setIsSearching(false);
      }
    }
    fetchResults();
  }, [location.search]);

  const continueSearch = async () => {

    //A continue search should only be executed when we already have some results,
    //and we want to fetch more, furthermore , another search must not already 
    //be in progress.

    if (results && !isSearching) {
      //indicate that we are searching
      setIsSearching(true);

      //We get the last _id in our results state variable, that where we should
      //continue from.
      let continueFromId = results[results.length - 1]._id;

      try {

      console.log("executing a continue-search through searchPage.js continueSearch()");
      //execute the search query
      const queryResults = await searchPosts(
        location.search,
        null,
        {
          sort: { _id: -1 },
          limit: nResultsPerSearch
        },
        continueFromId
      );

      //If our continue-search has yielded results...
      if (queryResults.length !== 0) {
       //Then we append them to the results we already have in our state variable.
        setResults([...results, ...queryResults]);
        //furthermore, we assume that we can continue-searching
        setCanContinueSearch(true)
      } 
      //else if our continue-search yielded no more results then it means
      //that we have reached the end of results and we can't search anymore.
      else {
        setCanContinueSearch(false);
      }
    }
    //if anything goes wrong while doing the continue-search
    catch(e){
      console.log(e)
      //indicate that we have an error
      setHasError(true);
    }
    finally{
      //at the end we indicate that there is no search in progress anymore.
      setIsSearching(false);
    }

    }
  };

  //In case a user deletes a post we also remove it from our results,
  //to indicate that it's been removed to the user.
  const removeFromResults = postId => {
    //fiter out the post that 
    setResults(results.filter(post => post._id !== postId));
    console.log(`Post with ${postId} has been removed from results.`);
  };

  //The dataset that we will use for our results grid, is either a blank one
  //or the one in our results state variable
  //refer to useBlankResults state variable above for more.
  const dataset = useBlankResults ? [] : results;

  return (
    <LanguageContext.Consumer>
      { langContext=>(<div>
      <Header />
      {/*Add some padding top so the contents can be pushed below the the header */}
      <Box pt={19} pb={2}>
      
      {/*If there is no error then the following is shown */}
      {!hasError &&
      <React.Fragment>
      <ResultsGrid
        removeFromResults={removeFromResults}
        noMoreResults={!canContinueSearch}
        isLoading={isSearching}
        dataset={dataset}
      />
      <Waypoint onEnter={continueSearch} />
      </React.Fragment>
      }


      {/*If there was an error then we indicate that to the user */}
      {hasError &&
        (<Typography align="center">
        <i>
          { appStrings[langContext.language].somethingWentWrong}
          <br/>
          {' ' +  appStrings[langContext.language].ifTheErrorPersists}
        </i>
      </Typography>)
    }
      </Box>


    </div>)
      }
    </LanguageContext.Consumer>
  );
}

export default SearchPage;
