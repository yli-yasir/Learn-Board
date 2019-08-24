import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {withRouter} from 'react-router';
import { Link } from "react-router-dom";
import {LEARN_TYPE} from '../values/SearchParams';


function CategoryTabs(props) {


  const learnTypeIndex = { all: 0, offer: 1 , request: 2};
  
  //get the index of the learn type if it's available then use it, if not default to 0 
  const chosenTabIndex = learnTypeIndex[props.learnType] ? learnTypeIndex[props.learnType] : 0;


  //build the new query in the url 
  let query = (learnType)=>{
    //get the old params
    const params = new URLSearchParams(props.location.search);
    //update the learntype param with the category
    params.set(LEARN_TYPE.PARAM_NAME,learnType);
    return '?' + params.toString();
  }


  return (
      <Tabs
        value={chosenTabIndex}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {/* must correspond to the tabsIndex variable above*/ }
        <Tab label="All" component={Link} to={{pathname:"/search",search: query(LEARN_TYPE.ALL)}} />
        <Tab label="Offers" component={Link} to={{pathname:"/search",search: query(LEARN_TYPE.OFFER)}} />
        <Tab label="Requests" component={Link} to={{pathname:"/search",search: query(LEARN_TYPE.REQUEST)}}/>
      </Tabs>
  );
}

export default withRouter(CategoryTabs);


