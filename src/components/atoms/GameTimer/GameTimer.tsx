import * as React from 'react';
import injectSheet, { WithSheet } from 'react-jss';

import { ITheme } from '../../../interfaces/Theme';
import { Typography } from '../Typography';

const styles = (theme: ITheme) => ({
  '@keyframes focusIn': {
    '0%': {
      ...theme.animations.focusIn.from,
    },
    '100%': {
      ...theme.animations.focusIn.to,
    },
  },

  root: {
    position: 'relative',
    width: 300,
  },

  letterFocus: {
    textShadow: theme.typography.textShadowPrimary,
    animation: theme.animations.focusIn.animation,
  },
});

interface IGameTimerProps {
  timeOutput: string;
}

class GameTimer extends React.Component<IGameTimerProps & WithSheet<typeof styles>> {
  private renderTime(): React.ReactNode {
    const { theme, classes, timeOutput } = this.props;

    if (timeOutput) {
      return (
        <Typography
          className={classes.letterFocus}
          color={theme.palette.primary}
          fontSize={30}
          bold
        >
          {timeOutput}
        </Typography>
      );
    }
  }

  render(): React.ReactNode {
    const { classes } = this.props;

    return <div className={classes.root}>{this.renderTime()}</div>;
  }
}

export default injectSheet(styles)(GameTimer);
