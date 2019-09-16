import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {withRouter} from 'react-router';
import { Link } from "react-router-dom";
import {getSearchParams,buildQueryString,params as appParams} from '../utils/URLUtils';
import {School,Create,Language} from '@material-ui/icons';


function SearchTabs(props) {

  let queryString = props.location.search;
  let {postType} = getSearchParams(queryString,appParams.postType.PARAM_NAME);

  //simple dictionary to map the post types to an index of its tab.
  const learnTypeIndex = { all: 0, offer: 1 , request: 2};
  
  //get the index of the learn type if it's available then use it, if not default to 0 
  const chosenTabIndex = learnTypeIndex[postType] ? learnTypeIndex[postType] : 0;

  const {tabProps} = props

  const getTabQueryString= (value)=>{
    return buildQueryString(queryString,{[appParams.postType.PARAM_NAME]:value})
  }

  return (
      <Tabs
        value={chosenTabIndex}
        indicatorColor="primary"
        textColor="primary"
        {...tabProps}
      >
        {/* must correspond to the tabsIndex variable above*/ }
        <Tab label="All" icon={<Language/>} component={Link} to={{pathname:"/search",search:getTabQueryString(appParams.postType.ALL)}} />
        <Tab label="Offers" icon={<School/>} component={Link} to={{pathname:"/search",search:getTabQueryString(appParams.postType.OFFER)}} />
        <Tab label="Requests" icon={<Create/>} component={Link} to={{pathname:"/search",search:getTabQueryString(appParams.postType.REQUEST)}}/>
      </Tabs>
  );
}

export default withRouter(SearchTabs);


