import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {Header,Footer} from './layout';
import ResultCard from './ResultCard';
import Box from "@material-ui/core/Box";

function App() {


  return (
    <div className="App">
      <Header></Header>
      <Box pt={8}>
        <ResultCard></ResultCard>
      </Box>
      <Footer></Footer>
    </div>
  );
}

export default App;
