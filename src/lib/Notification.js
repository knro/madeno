import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import {Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMore from '@material-ui/icons/ExpandMore';
import format from 'date-fns/format';

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
      <Slide direction="up" in={open}>
        <Card
          elevation={elevation}
        >
          <CardHeader
            title={
              <span>
                {!hideCloseButton && (
                  <IconButton
                    onClick={this.onCloseNotification}
                    disableRipple
                  >
                    <CloseIcon/>
                  </IconButton>
                )}
                <Typography
                  type="body1"
                  component="span"
                  style={{color: accent}}
                >
                  {appTitle}
                </Typography>
                <Typography
                  type="body1"
                  component="span"
                >
                  &nbsp;&middot;&nbsp;{timestamp ? timestamp : format(date, 'H:mm')}
                </Typography>
                {expandContent ? (
                  <IconButton
                    onClick={this.handleExpandContent}
                    style={{color: accent}}
                    disableRipple
                  >
                    <ExpandMore
                    />
                  </IconButton>
                ) : (
                  <span />
                )}
              </span>
            }
          />
          <CardHeader
            avatar={avatar}
            title={
              <Typography
                type={avatar ? 'body2' : 'headline'}
                component="span"
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
            <CardContent>
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
              >
                {expandContent}
              </Typography>
            </Collapse>
          )}
          {action && (
            <div>
              <CardActions>
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

//export default withStyles(styles)(Notification);
export default Notification;
