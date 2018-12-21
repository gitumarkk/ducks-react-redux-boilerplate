/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';

// Icons
import Header from 'components/Header';
import withStyles from '@material-ui/core/styles/withStyles';
import Example from 'containers/Example/index';
import injectSaga from 'utils/injectSaga';
import { saga } from 'containers/redux/index';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import './style.scss';

const drawerWidth = 240;
const transition = {
  transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
};

class App extends Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <Fragment>
        <Helmet
          titleTemplate="%s - To Do "
          defaultTitle="To Do Page"
        >
          <meta name="description" content="ToDo Page" />
        </Helmet>
        <Header />

        <div className={classes.root}>
          <div className={classes.mainPanel} ref="mainPanel">
            <div className={classes.content} style={{ marginTop: '0px' }}>
              <div className={classes.container}>
                <Switch>
                  <Route exact path="/" component={Example} />
                  <Route exact path="/:id" component={Example} />

                  <Route path="" component={NotFoundPage} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    top: '0',
    height: '100vh',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh'
  },
  mainPanel: {
    // [theme.breakpoints.up('md')]: {
    //   width: `calc(100% - ${drawerWidth}px)`
    // },
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch'
  },
  // content: {
  //   marginTop: '70px',
  //   padding: '30px 15px',
  //   minHeight: 'calc(100vh - 123px)'
  // },
  container: {
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  map: {
    marginTop: '70px'
  },
  sidebarWrapper: {
    position: 'relative',
    height: '100vh',
    overflow: 'auto',
    width: drawerWidth,
    zIndex: '4',
    overflowScrolling: 'touch',
    background: '#000',
    opacity: '.8',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  background: {
    position: 'absolute',
    zIndex: '1',
    height: '100%',
    width: '100%',
    display: 'block',
    top: '0',
    left: '0',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    '&:after': {
      position: 'absolute',
      zIndex: '3',
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block',
      background: '#000',
      opacity: '.8'
    }
  },
});

const withSaga = injectSaga({
  key: 'ToDoExample',
  saga
});

export default compose(
  withSaga
)(withStyles(styles, { withTheme: true })(App));
