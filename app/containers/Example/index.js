/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Material ui dashbord
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// App
import Base from 'containers/redux/base';
import './style.scss';

const todo = new Base('todo', '/api/v1/todo/');

class Dashboard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.getToDo();
  }

  render() {
    const { classes, todo = {} } = this.props;

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="" />
        </Helmet>
        <div className="home-page">
          <Card className={classes.card}>
            <CardContent>
              <section className="left">
                <h1>{ todo.name }</h1>
              </section>
            </CardContent>
          </Card>
        </div>
      </article>
    );
  }
}

Dashboard.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  toDoList: PropTypes.array,
  getToDo: PropTypes.func,
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    getToDo: () => dispatch(todo.getRequest()),
  };
};

const mapStateToProps = createStructuredSelector({
  todo: todo.makeSelectDetail()
});

const styles = (theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Dashboard));
