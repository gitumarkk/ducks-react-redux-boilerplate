import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import ExitToApp from '@material-ui/icons/ExitToApp';

// App
import Base from 'containers/redux/base';

const user = new Base('user', '/api/v1/user/');

const boxShadow = {
  boxShadow:
      '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
};

const transition = {
  transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
};
const defaultFont = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: '300',
  lineHeight: '1.5em'
};

const drawerWidth = 240;
const grayColor = '#999999';
const infoColor = '#00acc1';

const sidebarStyle = (theme) => ({
  drawerPaper: {
    border: 'none',
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    zIndex: '1',
    ...boxShadow,
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'fixed',
      height: '100%'
    },
    [theme.breakpoints.down('sm')]: {
      width: drawerWidth,
      ...boxShadow,
      position: 'fixed',
      display: 'block',
      top: '0',
      height: '100vh',
      right: '0',
      left: 'auto',
      zIndex: '1032',
      visibility: 'visible',
      overflowY: 'visible',
      borderTop: 'none',
      textAlign: 'left',
      paddingRight: '0px',
      paddingLeft: '0',
      transform: `translate3d(${drawerWidth}px, 0, 0)`,
      ...transition
    }
  },
  logo: {
    position: 'relative',
    padding: '15px 15px',
    zIndex: '4',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '0',

      height: '1px',
      right: '15px',
      width: 'calc(100% - 30px)',
      backgroundColor: 'rgba(180, 180, 180, 0.3)'
    }
  },
  logoLink: {
    ...defaultFont,
    textTransform: 'uppercase',
    padding: '5px 0',
    display: 'block',
    fontSize: '18px',
    textAlign: 'left',
    fontWeight: '400',
    lineHeight: '30px',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    '&,&:hover': {
      color: '#FFFFFF'
    }
  },
  logoImage: {
    width: '30px',
    display: 'inline-block',
    maxHeight: '30px',
    marginLeft: '10px',
    marginRight: '15px'
  },
  img: {
    width: '35px',
    top: '22px',
    position: 'absolute',
    verticalAlign: 'middle',
    border: '0'
  },
  list: {
    marginTop: '20px',
    paddingLeft: '0',
    paddingTop: '0',
    paddingBottom: '0',
    marginBottom: '0',
    listStyle: 'none',
    position: 'unset'
  },
  item: {
    position: 'relative',
    display: 'block',
    textDecoration: 'none',
    '&:hover,&:focus,&:visited,&': {
      color: '#FFFFFF'
    }
  },
  itemLink: {
    width: 'auto',
    transition: 'all 300ms linear',
    margin: '10px 15px 0',
    borderRadius: '3px',
    position: 'relative',
    display: 'block',
    padding: '10px 15px',
    backgroundColor: 'transparent',
    ...defaultFont
  },
  itemIcon: {
    width: '24px',
    height: '30px',
    fontSize: '24px',
    lineHeight: '30px',
    float: 'left',
    marginRight: '15px',
    textAlign: 'center',
    verticalAlign: 'middle',
    color: 'rgba(255, 255, 255, 0.8)'
  },
  itemText: {
    ...defaultFont,
    margin: '0',
    lineHeight: '30px',
    fontSize: '14px',
    color: '#FFFFFF'
  },
  whiteFont: {
    color: '#FFFFFF'
  },
  grayFont: {
    color: grayColor
  },
  blue: {
    backgroundColor: infoColor,
    boxShadow:
        '0 12px 20px -10px rgba(0,188,212,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(0,188,212,.2)',
    '&:hover': {
      backgroundColor: infoColor,
      boxShadow:
          '0 12px 20px -10px rgba(0,188,212,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(0,188,212,.2)'
    }
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  itemAvatar: {
    margin: 10
  },

  itemAvatarText: {
    lineHeight: '50px',
    minHeight: '50px',
  },

  divider: { border: '0.5px solid white' }
});

const SHARED_ROUTES = [
  {
    // href: '/settings',
    disabled: true,
    sidebarName: 'Settings',
    navbarName: 'Settings',
    icon: SettingsApplications
  },

  {
    href: '/accounts/logout',
    sidebarName: 'Logout',
    navbarName: 'Logout',
    icon: ExitToApp
  }
];

class SidebarLinksComponent extends React.PureComponent {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    const { props } = this;
    return props.location && props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }

  renderRouteNav(prop, key) {
    const { classes } = this.props;
    const color = 'blue';

    if (prop.redirect) return null;
    const listItemClasses = classNames({
      [' ' + classes[color]]: this.activeRoute(prop.path)
    });
    const whiteFontClasses = classNames({
      [' ' + classes.whiteFont]: this.activeRoute(prop.path),
      [' ' + classes.grayFont]: prop.disabled
    });

    if (prop.href) {
      return (
        <a href={!prop.disabled && prop.href}>
          <ListItem button className={classes.itemLink + listItemClasses}>
            <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
              <prop.icon />
            </ListItemIcon>
            <ListItemText
              primary={prop.sidebarName}
              className={classes.itemText + whiteFontClasses}
              disableTypography
            />
          </ListItem>
        </a>
      );
    }

    return (
      <NavLink
        to={!prop.disabled && prop.path}
        className={classes.item}
        activeClassName="active"
        key={key}
      >
        <ListItem button className={classes.itemLink + listItemClasses}>
          <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
            <prop.icon />
          </ListItemIcon>
          <ListItemText
            primary={prop.sidebarName}
            className={classes.itemText + whiteFontClasses}
            disableTypography
          />
        </ListItem>
      </NavLink>
    );
  }

  render() {
    const { classes, routes, headerName, currentUser = {} } = this.props;

    return (
      <List className={classes.list}>
        <ListItem button className={classes.itemLink}>
          <ListItemText
            primary={headerName}
            className={classes.itemText}
            disableTypography
          />
        </ListItem>

        <ListItem button className={classNames(classes.itemLink, classes.itemAvatar)}>
          <ListItemIcon className={classes.itemIcon}>
            <Avatar
              alt={currentUser.name}
              src="https://spectrum-alpha-zappa-static.s3.amazonaws.com/images/avatar.png"
              className={classNames(classes.avatar)}
            />
          </ListItemIcon>

          <ListItemText
            primary={currentUser.name}
            className={classNames(classes.itemText, classes.itemAvatarText)}
            disableTypography
          />
        </ListItem>

        <Divider className={classes.divider} />

        {routes.map((prop, key) => this.renderRouteNav(prop, key) )}

        <Divider className={classes.divider} />

        {SHARED_ROUTES.map((prop, key) => this.renderRouteNav(prop, key) )}
      </List>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: user.makeSelectDetail()
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(user.getRequest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(sidebarStyle)(SidebarLinksComponent));
