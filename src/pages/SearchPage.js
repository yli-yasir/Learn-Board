import React from "react";
import Header from "../components/SearchHeader";
import Box from "@material-ui/core/Box";
import ResultsGrid from "../components/SearchResultsGrid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getSearchParams } from "../utils/URLUtils";
import { params as appParams } from "../utils/URLUtils";
import {searchPosts} from "../utils/DBUtils"
import SimpleSnackbar from "../components/SimpleSnackbar";
import { getEmail } from "../stitch";

function SearchPage({ location }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [results, setResults] = React.useState([]);
  const [wlcSnackBarIsShown, SetWlcSnackbarIsShown] = React.useState(true);

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
      const queryResults = await searchPosts(location.search);

      setResults(queryResults);

      setIsLoading(false);
    }

    fetchResults();
  }, [q, postType]);

  const handleWlcSnackbarClose = () => {
    SetWlcSnackbarIsShown(false);
  };

  //Either a loading bar, if we are loading, or a grid with the results.
  const content = isLoading ? (
    <CircularProgress size={50} color="primary" />
  ) : (
    <ResultsGrid dataset={results} />
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
