import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {withRouter} from 'react-router';
import { Link } from "react-router-dom";
import {getSearchParams,buildQueryString,params as appParams} from '../utils/URLUtils';
import {School,Create,Language} from '@material-ui/icons';
import appStrings from '../values/strings';
import LanguageContext from '../context/LanguageContext';

function SearchTabs(props) {

  let queryString = props.location.search;
  const {postType}= getSearchParams(queryString,appParams.postType.PARAM_NAME);

  //simple dictionary to map the post types to an index of its tab.
  const learnTypeIndex = { all: 0, offer: 1 , request: 2};
  
  //get the index of the learn type if it's available then use it, if not default to 0 
  const chosenTabIndex = learnTypeIndex[postType] ? learnTypeIndex[postType] : 0;

  const {tabProps} = props

  const getTabQueryString= (value)=>{
    return buildQueryString(queryString,{[appParams.postType.PARAM_NAME]:value,[appParams.q.PARAM_NAME]:props.searchBarText})
  }

  return (
    <LanguageContext.Consumer>
      {languageContext=>(<Tabs
        value={chosenTabIndex}
        indicatorColor="primary"
        textColor="primary"
        {...tabProps}
      >
        {/* must correspond to the tabsIndex variable above*/ }
        <Tab label={appStrings[languageContext.language].all} icon={<Language/>} component={Link} to={getTabQueryString(appParams.postType.ALL)} />
        <Tab label={appStrings[languageContext.language].offers} icon={<School/>} component={Link} to={getTabQueryString(appParams.postType.OFFER)} />
        <Tab label={appStrings[languageContext.language].requests} icon={<Create/>} component={Link} to={getTabQueryString(appParams.postType.REQUEST)}/>
      </Tabs>)
    }      
</LanguageContext.Consumer>
      
      
  );
}

export default withRouter(SearchTabs);


