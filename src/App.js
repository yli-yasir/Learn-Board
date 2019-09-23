import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { login } from "./stitch";
//pages
import LoadingPage from "./pages/LoadingPage";
import StartPage from "./pages/StartPage";
import SearchPage from "./pages/SearchPage";
import RegisterPage from "./pages/RegisterPage";
import ConfirmEmailPage from "./pages/ConfirmEmailPage";
import LoginPage from "./pages/LoginPage";
import NewPostPage from "./pages/NewPostPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import ReportPostPage from './pages/ReportPostPage';


function App() {
  const [isLoading, setIsloading] = React.useState(true);

  React.useEffect(() => {
    async function init() {
      try {
        await login();
      } catch (e) {
        console.log(e);
      }
      finally{
        setIsloading(false);
      }
    }
    init();
  }, []);

  if(isLoading){
    return <LoadingPage/>
  }
  
  return (
    <React.Fragment>
    <CssBaseline />
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
      <Route path="/posts/:id/report" exact component={ReportPostPage} />
      <Route path="/account/settings" exact component={AccountSettingsPage} />
      </Switch>
    </Router>
    </React.Fragment>
  );
}

export default App;
