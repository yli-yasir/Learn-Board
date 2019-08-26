import React from "react";
import StartPage from './pages/StartPage';
import SearchPage from './pages/SearchPage';
import RegisterPage from './pages/RegisterPage';
import ConfirmEmailPage from './pages/ConfirmEmailPage';
import LoginPage from './pages/LoginPage';
import NewPostPage from './pages/NewPostPage';

import { BrowserRouter as Router, Route} from "react-router-dom";



function App() {
  return (
    <Router>
      <Route path="/" exact component={StartPage} />
      <Route path="/search" exact component={SearchPage}/>
      <Route path="/register" exact component={RegisterPage}/>
      <Route path="/confirmEmail" exact component={ConfirmEmailPage}/>
      <Route path="/login" exact component={LoginPage}/>
      <Route path="/posts/new" exact component={NewPostPage}/>
    </Router>
  );
}


export default App;
