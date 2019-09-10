import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {withRouter} from 'react-router';
import { Link } from "react-router-dom";
import {POST_TYPE} from '../values/SearchParams';
import {getSearchParams} from '../utils';
import {School,Create,Language} from '@material-ui/icons';


function SearchTabs(props) {

  let {postType} = getSearchParams(props.location.search);

  
  //simple dictionary to map the post types to an index of its tab.
  const learnTypeIndex = { all: 0, offer: 1 , request: 2};
  
  //get the index of the learn type if it's available then use it, if not default to 0 
  const chosenTabIndex = learnTypeIndex[postType] ? learnTypeIndex[postType] : 0;

  //build the new query in the url 
  let buildQueryString = (postType) => {
    //get the old params
    const params = new URLSearchParams(props.location.search);
    //update the post type param with the category
    params.set(POST_TYPE.PARAM_NAME,postType);
    return '?' + params.toString();
  }

  const {tabProps} = props
  return (
      <Tabs
        value={chosenTabIndex}
        indicatorColor="primary"
        textColor="primary"
        {...tabProps}
      >
        {/* must correspond to the tabsIndex variable above*/ }
        <Tab label="All" icon={<Language/>} component={Link} to={{pathname:"/search",search: buildQueryString(POST_TYPE.ALL)}} />
        <Tab label="Offers" icon={<School/>} component={Link} to={{pathname:"/search",search: buildQueryString(POST_TYPE.OFFER)}} />
        <Tab label="Requests" icon={<Create/>} component={Link} to={{pathname:"/search",search: buildQueryString(POST_TYPE.REQUEST)}}/>
      </Tabs>
  );
}

export default withRouter(SearchTabs);


