import React from 'react';
import {Waypoint} from 'react-waypoint'

function StartPage() {

  const handleScroll = (e)=>{
    console.log('scrolling')
  }
    return (
    <div onScroll={handleScroll}>
      {new Array(35).fill('').map((e,index)=><div key={index}>{index}</div>)}
      <Waypoint
      onEnter={()=>{console.log('entering way point')}}
      onLeave={()=>{console.log('leaving way point')}}
      />
      {new Array(35).fill('').map((e,index)=><div key={index}>{index}</div>)}
      </div>
    );
    
  }

export default StartPage;