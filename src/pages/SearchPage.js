import React from "react";
import Header from "../components/SearchHeader";
import Box from "@material-ui/core/Box";
import ResultsGrid from "../components/SearchResultsGrid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getSearchParams } from "../utils/URLUtils";
import { params as appParams } from "../utils/URLUtils";
import { searchPosts } from "../utils/DBUtils";
import SimpleSnackbar from "../components/SimpleSnackbar";
import { getEmail } from "../stitch";
import { Waypoint } from "react-waypoint";

function SearchPage({ location }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [results, setResults] = React.useState([]);
  const [wlcSnackBarIsShown, SetWlcSnackbarIsShown] = React.useState(true);
  const [continueFetchFrom,setContinueFetchFrom] = React.useState('');

  //Grab the query parameters in order to perform search according to them.
  let { q, postType } = getSearchParams(
    location.search,
    appParams.q.PARAM_NAME,
    appParams.postType.PARAM_NAME
  );

  //This effect will be triggered if the params change.
  React.useEffect(() => {
    //set the state to loading.
    setIsLoading(true);

    async function fetchResults() {
      const queryResults = await searchPosts(location.search, null, {
        sort: { _id: -1 },
        limit:5
      },continueFetchFrom);
      console.log(queryResults)
      setResults([...results,...queryResults]);
      setIsLoading(false);
    }

    fetchResults();
  }, [location.search,continueFetchFrom]);

  const handleWlcSnackbarClose = () => {
    SetWlcSnackbarIsShown(false);
  };

  //Either a loading bar, if we are loading, or a grid with the results.
  //waypoint will change the contiueFetchFrom state variable which will trigger
  // a data fetch
  const content = isLoading ? (
    <CircularProgress size={50} color="primary" />
  ) : (
    <React.Fragment>
    <ResultsGrid dataset={results} />
    <Waypoint onEnter={() => {
      let lastIndex = results[results.length-1]._id
      console.log('setting to ' + lastIndex)
      setContinueFetchFrom(lastIndex)}} />
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
