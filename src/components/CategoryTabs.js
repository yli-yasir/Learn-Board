import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {withRouter} from 'react-router';
import { Link } from "react-router-dom";



function CategoryTabs(props) {

  const catIndex = { all: 0, offers: 1 , requests: 2}
  //If one has already been chosen
  const chosenTabIndex = catIndex[props.cat] ? catIndex[props.cat] : 0

  let query = (category)=>{
    //get the old params
    const params = new URLSearchParams(props.location.search);
    //update the cat param with the category
    params.set('cat',category);
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
        <Tab label="All" component={Link} to={{pathname:"/search",search: query('all')}} />
        <Tab label="Offers" component={Link} to={{pathname:"/search",search: query('offers')}} />
        <Tab label="Requests" component={Link} to={{pathname:"/search",search: query('requests')}}/>
      </Tabs>
      
  );
}

export default withRouter(CategoryTabs);


