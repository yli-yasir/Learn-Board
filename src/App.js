import React from "react";
import LoadingPage from "./pages/LoadingPage";
import StartPage from "./pages/StartPage";
import SearchPage from "./pages/SearchPage";
import RegisterPage from "./pages/RegisterPage";
import ConfirmEmailPage from "./pages/ConfirmEmailPage";
import LoginPage from "./pages/LoginPage";
import NewPostPage from "./pages/NewPostPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import UserSettingsPage from "./pages/UserSettingsPage";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { login } from "./stitch";

function App() {
  const [isLoading, setIsloading] = React.useState(true);

  React.useEffect(() => {

    async function init() {
      try {
        await login();
        setIsloading(false);
      } catch (e) {
        console.log(e);
      }
    }
    init();
  }, []);

  if(isLoading){
    return <LoadingPage/>
  }
  
  return (
    <Router>
      <Switch>
      <Route path="/" exact component={StartPage} />
      <Route path="/search" exact component={SearchPage} />
      <Route path="/register" exact component={RegisterPage} />
      <Route path="/confirmEmail" exact component={ConfirmEmailPage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/posts/new" exact component={NewPostPage} />
      <Route path="/posts/:id" exact component={PostDetailsPage} />
      <Route path="/posts/:id/edit" exact component={NewPostPage} />
      <Route path="/user/settings" exact component={UserSettingsPage} />

      </Switch>
    </Router>
  );
}

export default App;
