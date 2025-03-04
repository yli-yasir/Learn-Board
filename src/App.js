import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import LanguageContext from './context/LanguageContext';
import { init as initApp } from './utils/AppUtils';

//pages
import LoadingPage from "./pages/LoadingPage";
import StartPage from "./pages/StartPage";
import SearchPage from "./pages/SearchPage";
import RegisterPage from "./pages/RegisterPage";
import ConfirmEmailPage from "./pages/ConfirmEmailPage";
import LoginPage from "./pages/LoginPage";
import NewPostPage from "./pages/NewPostPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import SelfContactPage from "./pages/SelfContactPage";
import ReportPostPage from './pages/ReportPostPage';
import ResendConfirmationEmailPage from './pages/ResendConfirmationEmailPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import resetPasswordPage from './pages/ResetPasswordPage';

function App() {

  const [isLoading, setIsloading] = React.useState(true);

  const [languageContext,setLanguageContext] = React.useState({
    language:'en',
    setLanguage: (lang)=> {
      setLanguageContext({...languageContext,language:lang})
      }
  });

  React.useEffect(() => {
    async function init() {
      try {
        await initApp();
      } catch (e) {
        console.log(e);
      }
      //todo
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
    <LanguageContext.Provider value={languageContext}>
    <Router>
      <Switch>
      <Route path="/search" exact component={SearchPage} />
      <Route path="/register" exact component={RegisterPage} />
      <Route path="/confirm-email" exact component={ConfirmEmailPage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/posts/new" exact component={NewPostPage} />
      <Route path="/posts/:id" exact component={PostDetailsPage} />
      <Route path="/posts/:id/edit" exact component={NewPostPage} />
      <Route path="/posts/:id/report" exact component={ReportPostPage} />
      <Route path="/self/contact" exact component={SelfContactPage} />
      <Route path="/resend-confirmation-email" exact component={ResendConfirmationEmailPage}/>
      <Route path="/forgot-password" exact component={ForgotPasswordPage}/>
      <Route path="/reset-password" exact component={resetPasswordPage}/>
      </Switch>
    </Router>
    </LanguageContext.Provider>
    </React.Fragment>
  );
}

export default App;
