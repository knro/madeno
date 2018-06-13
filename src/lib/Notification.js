import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Card, { CardHeader, CardContent, CardActions } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMore from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
import format from 'date-fns/format';

const styles = theme => ({
  root: {
    width: 300,
    margin: theme.spacing.unit * 3,
    zIndex: theme.zIndex.snackbar,
    overflow: 'hidden'
  },
  notification: {
    marginTop: theme.spacing.unit * 2,
    boxShadow: '0 2px 4px rgba(0,0,0,.16), 0 2px 4px rgba(0,0,0,.23)'
  },
  card: {},
  cardHeader: {
    padding: theme.spacing.unit * 2
  },
  cardContent: {
    paddingLeft: theme.spacing.unit * 2,
    paddingTop: 0,
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2 + 'px !important'
  },
  avatar: {
    flex: '0 0 auto',
    marginRight: theme.spacing.unit * 2,
    alignItems: 'baseline'
  },
  typeIcons: {
    width: 24,
    height: 24
  },
  cardActions: {
    padding: theme.spacing.unit,
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    background: '#eee',
    fontWeight: '600'
  },
  actionDivider: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit}px 0px ${
      theme.spacing.unit
    }px`,
    padding: 0
  },
  notificationAppTitle: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  notificationMetaHeader: {
    paddingLeft: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * .5
  },
  notifcationMainHeader: {
    paddingLeft: theme.spacing.unit * 2,
    paddingTop: 0,
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  smallIcon: {
    width: 15,
    height: 15
  },
  smallIconButton: {
    width: 20,
    height: 20,
    marginRight: theme.spacing.unit
  },
  appTitle: {
    fontSize: '10pt',
    fontWeight: 600
  },
  timestampFont: {
    fontSize: '10pt',
    color: theme.palette.text.secondary,
    textAlign: 'left'
  },
  titleText: {
    width: 158
  },
  expandTitleText: {
    width: 133
  },
  subheaderText: {
    display: 'block',
    fontSize: '10pt',
    color: theme.palette.text.secondary,
    maxHeight: 60,
    overflow: 'hidden'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    textAlign: 'center'
  },
  expandContent: {
    margin: 0,
    padding: theme.spacing.unit
  },
  secondaryTextColor: {
    color: theme.palette.text.secondary
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
});

let date = new Date();

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }
  componentWillMount() {
    if (this.props.timeout) {
      this.autoHideTimeout = setTimeout(() => {
        this.onNotificationTimeout();
      }, this.props.timeout);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.autoHideTimeout);
  }

  onCloseNotification = () => {
    if (this.props.onCloseNotification) {
      this.props.onCloseNotification();
    }
  };

  onNotificationTimeout = () => {
    if (this.props.onNotificationTimeout) {
      this.props.onNotificationTimeout();
    } else {
      this.onCloseNotification();
    }
  };

  handleExpandContent = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const {
      classes,
      elevation,
      avatar,
      title,
      subheader,
      content,
      action,
      timestamp,
      open,
      hideCloseButton,
      expandContent,
      accent,
      appTitle
    } = this.props;

    return (
      <Slide className={classes.notification} direction="up" in={open}>
        <Card
          className={classNames(classes.root, classes.card)}
          elevation={elevation}
        >
          <CardHeader
            className={classNames(classes.cardHeader, classes.notificationMetaHeader)}
            title={
              <span className={classes.notificationAppTitle}>
                {!hideCloseButton && (
                  <IconButton
                    className={classes.smallIconButton}
                    onClick={this.onCloseNotification}
                    disableRipple
                  >
                    <CloseIcon className={classes.smallIcon} />
                  </IconButton>
                )}
                <Typography
                  type="body1"
                  component="span"
                  style={{color: accent}}
                  classes={{ body1: classes.appTitle }}
                >
                  {appTitle}
                </Typography>
                <Typography
                  type="body1"
                  component="span"
                  classes={{ body1: classes.timestampFont }}
                >
                  &nbsp;&middot;&nbsp;{timestamp ? timestamp : format(date, 'H:mm')}
                </Typography>
                {expandContent ? (
                  <IconButton
                    className={classes.smallIconButton}
                    onClick={this.handleExpandContent}
                    style={{color: accent}}
                    disableRipple
                  >
                    <ExpandMore
                      className={classNames(classes.expand, classes.smallIcon, {
                        [classes.expandOpen]: this.state.expanded
                      })}
                    />
                  </IconButton>
                ) : (
                  <span />
                )}
              </span>
            }
          />
          <CardHeader
            className={classNames(classes.cardHeader, classes.notifcationMainHeader)}
            avatar={avatar}
            title={
              <Typography
                type={avatar ? 'body2' : 'headline'}
                component="span"
                className={
                  expandContent ? classes.expandTitleText : classes.titleText
                }
                noWrap
              >
                {title}
              </Typography>
            }
            subheader={
              <Typography
                type={'body1'}
                component="span"
                className={classes.subheaderText}
              >
                {subheader}
              </Typography>
            }
          />
          {content && (
            <CardContent className={classes.cardContent}>
              <Typography type="body1" component="span">
                {content}
              </Typography>
            </CardContent>
          )}
          {expandContent && (
            <Collapse in={this.state.expanded} unmountOnExit>
              <Typography
                type="body1"
                component="span"
                className={classes.expandContent}
                classes={{ body1: classes.secondaryTextColor }}
              >
                {expandContent}
              </Typography>
            </Collapse>
          )}
          {action && (
            <div>
              <CardActions className={classes.cardActions}>
                {action}
              </CardActions>
            </div>
          )}
        </Card>
      </Slide>
    );
  }
}
Notification.displayName = 'Notification';
Notification.propTypes = {
  classes: PropTypes.any.isRequired,
  appTitle: PropTypes.string,
  accent: PropTypes.string,
  elevation: PropTypes.number,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  subheader: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  avatar: PropTypes.node,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  action: PropTypes.node,
  timeout: PropTypes.number,
  timestamp: PropTypes.string,
  onCloseNotification: PropTypes.func.isRequired,
  onNotificationTimeout: PropTypes.func,
  open: PropTypes.bool.isRequired,
  id: PropTypes.any,
  hideCloseButton: PropTypes.bool,
  priority: PropTypes.bool,
  expandContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};
Notification.defaultProps = {
  elevation: 2,
  appTitle: 'Notification',
  open: false,
  hideCloseButton: false,
  priority: false,
  accent: '#8bc34a'
};

export default withStyles(styles)(Notification);
