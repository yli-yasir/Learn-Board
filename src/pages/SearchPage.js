import React from "react";
import Header from "../components/SearchHeader";
import Box from "@material-ui/core/Box";
import ResultsGrid from "../components/SearchResultsGrid";
import { searchPosts } from "../utils/DBUtils";
import SimpleSnackbar from "../components/SimpleSnackbar";
import { getUserEmail } from "../stitch";
import { Waypoint } from "react-waypoint";

function SearchPage({ location }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [results, setResults] = React.useState([]);
  const [wlcSnackBarIsShown, SetWlcSnackbarIsShown] = React.useState(true);
  //set this to true when a fresh loading (a load via useEffect) is triggered,
  //this is to give the illusion that the old results have been discarded while
  // react is actually merging the new Queryresults with the old dataset
  //this will also push the loading indicator to the top 
  const [useBlankDataset,setUseBlankDataset]= React.useState(false);
  //if continueFetch couldn't find any more results
  const [noMoreResults, setNoMoreResults] =React.useState(false);

  React.useEffect(() => {
    setNoMoreResults(false);
    setUseBlankDataset(true);
    //set the state to loading.
    setIsLoading(true);

    async function fetchResults() {
      const queryResults = await searchPosts(location.search, null, {
        sort: { _id: -1 },
        limit:5
      });
      setResults(queryResults);
      setUseBlankDataset(false);
      setIsLoading(false);
    }
    fetchResults();
  }, [location.search]);

  const handleWlcSnackbarClose = () => {
    SetWlcSnackbarIsShown(false);
  };

  const continueResultsFetch= async ()=>{
    console.log('enter')
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

  const removeFromResults= (postId)=>{
    setResults(results.filter((post)=>post._id!==postId ));
    console.log('removed');
  }

  const dataset= useBlankDataset? []: results
  console.log(dataset)
  const content =(
    <React.Fragment>
    <ResultsGrid removeFromResults={removeFromResults} noMoreResults={noMoreResults} isLoading={isLoading} dataset={dataset} />
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
        message={`Welcome ${getUserEmail()}`}
      />
    </div>
  );
}

export default SearchPage;
