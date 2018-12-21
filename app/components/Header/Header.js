import React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// App
import { BASE_URL } from 'utils/constants';
import Base from 'containers/redux/base';
import './style.scss';

const todo = new Base('todo', '/api/v1/framework/todo/');

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    Axios.get(`${BASE_URL}/api/v1/framework/todo/minimal/`).then((resp) => {
      this.setState({ todos: resp.data });
    });
  }

  render() {
    const { classes, currentId } = this.props;
    const { todos } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.heading}>
              ToDo
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  heading: {
    flexGrow: 1,
    fontWeight: 'bold',
    fontSize: 24
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 350,
    color: 'white'
  },
  select: {
    color: 'white'
  }
});


export default connect(
  (props) => {
    return {};
  },
  (dispatch) => ({
    getToDo: (id) => dispatch(todo.getDetailRequest(id)),
  })
)(withStyles(styles, { withTheme: true })(withRouter(Header)));
