import React from "react";

import {
  VpnKeyOutlined,
  NoteAddOutlined,
  LockOutlined,
  PersonOutlined,
  ContactPhoneOutlined,
  InfoOutlined,
  HowToRegOutlined,
  TranslateOutlined,
  FeedbackOutlined,
  CheckBoxOutlined,
  CheckBoxOutlineBlankOutlined
} from "@material-ui/icons";

import { Link } from "react-router-dom";

import { client, isAnon as isAnonStitch } from "../../stitch";

import { AnonymousCredential } from "mongodb-stitch-core-sdk";

import { Tooltip,Box,IconButton,Menu,MenuItem } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { withRouter } from "react-router-dom";

import { toggleMyPostsOnly, isMyPostsOnly as initIsMyPostsOnly } from "../../utils/URLUtils";

import LanguageContext from '../../context/LanguageContext';

import appStrings from '../../values/strings';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: "inherit"
  }
}));

function AppControls(props) {
  //user options menu anchor - null when its hidden
  const [userOptionsAnchorEl, setUserOptionsAnchorEl] = React.useState(null);

  const [languageMenuAnchorEl, setLanguageMenuAnchorEl] = React.useState(null);

  const [isAnon, setIsAnon] = React.useState(isAnonStitch());

  const [isMyPostsOnly,setIsMyPostsOnly] = React.useState(initIsMyPostsOnly(props.location.search));

  const classes = useStyles();

  const logout = async () => {
    try {
      await client.auth.logout();
      await client.auth.loginWithCredential(new AnonymousCredential());
      setIsAnon(true);
    } catch (e) {
      console.log(e);
    }
  };

    const openUserOptionsMenu = event => {
      setUserOptionsAnchorEl(event.currentTarget);
    };

    const closeUserOptionsMenu = event => {
      setUserOptionsAnchorEl(null);
    };

    const openLanguagesMenu = event => {
      setLanguageMenuAnchorEl(event.currentTarget);
    };

    const closeLanguagesMenu = event => {
      setLanguageMenuAnchorEl(null);
    };

    return (
      <LanguageContext.Consumer>
        { languageContext=>{
          const strings = appStrings[languageContext.language]
        return (<Box
        flex={1} 
        display="flex" 
        flexDirection="row-reverse">
        <Link to="/feedback">
          <Tooltip title={strings.feedback}>
            <IconButton>
              <FeedbackOutlined />
            </IconButton>
          </Tooltip>
        </Link>

        <Link to="/about">
          <Tooltip title={strings.about}>
            <IconButton className={classes.button}>
              <InfoOutlined />
            </IconButton>
          </Tooltip>
        </Link>

        <Tooltip title={strings.userOptions}>
          <IconButton
            aria-controls="options-menu"
            aria-haspopup="true"
            onClick={openUserOptionsMenu}
            className={classes.button}
          >
            <PersonOutlined />
          </IconButton>
        </Tooltip>

        <Menu
          id="options-menu"
          anchorEl={userOptionsAnchorEl}
          keepMounted
          open={Boolean(userOptionsAnchorEl)}
          onClose={closeUserOptionsMenu}
        >
          {isAnon
            ? [
                <Link key="register" className={classes.link} to="/register">
                  <MenuItem>
                    <HowToRegOutlined />
                    &nbsp;{strings.register}
                  </MenuItem>
                </Link>,
                <Link key="login" className={classes.link} to="/login">
                  <MenuItem>
                    <VpnKeyOutlined />
                    &nbsp;{strings.login}
                  </MenuItem>
                </Link>
              ]
            : [
                <Link
                  key="selfContact"
                  className={classes.link}
                  to="/self/contact"
                >
                  <MenuItem>
                    <ContactPhoneOutlined />
                    &nbsp;{strings.contactInfo}
                  </MenuItem>
                </Link>,

                <Link
                  key="myPosts"
                  className={classes.link}
                  to={toggleMyPostsOnly(props.location.search)}
                  onClick={()=>setIsMyPostsOnly(!isMyPostsOnly)}
                >
                  <MenuItem>
                   {isMyPostsOnly ?<CheckBoxOutlined/>: <CheckBoxOutlineBlankOutlined/>}
                    &nbsp;{strings.onlyMyPosts}
                  </MenuItem>
                </Link>,
                <MenuItem key="logOut" button onClick={logout}>
                  <LockOutlined />
                  &nbsp;{strings.logout}
                </MenuItem>
              ]}
        </Menu>

        {!isAnon && (
          <Link to="/posts/new">
            <Tooltip title={strings.newPost}>
              <IconButton>
                <NoteAddOutlined />
              </IconButton>
            </Tooltip>
          </Link>
        )}

        <Tooltip title={strings.websiteLanguage}>
          <IconButton
            aria-controls="languages-menu"
            aria-haspopup="true"
            onClick={openLanguagesMenu}
            className={classes.button}
          >
            <TranslateOutlined />
          </IconButton>
        </Tooltip>

        <Menu
          id="languages-menu"
          anchorEl={languageMenuAnchorEl}
          keepMounted
          open={Boolean(languageMenuAnchorEl)}
          onClose={closeLanguagesMenu}
        >
          <MenuItem>
            <TranslateOutlined />
            &nbsp;English
          </MenuItem>
          <MenuItem>
            <TranslateOutlined />
            &nbsp;Türkçe
          </MenuItem>
          <MenuItem onClick={()=>{languageContext.setLanguage('ar')}}>
            <TranslateOutlined />
            &nbsp;العربية
          </MenuItem>
        </Menu>
      </Box>
        )}}
      </LanguageContext.Consumer>
    );
  }



export default withRouter(AppControls);
