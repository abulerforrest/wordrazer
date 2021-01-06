import * as React from 'react';
import { observer } from 'mobx-react';

import { ITheme } from '../../../interfaces/Theme';
import injectSheet, { WithSheet } from 'react-jss';

import { IGamePageController } from '../../../interfaces/pages';

import { Letter } from '../../atoms/Letter';
import { GameTimer, Typography } from '../../atoms';

const styles = (theme: ITheme) => ({
  '@keyframes vibrant': {
    '0%': {
      ...theme.animations.vibrant[0],
    },
    '20%': {
      ...theme.animations.vibrant[20],
    },
    '40%': {
      ...theme.animations.vibrant[40],
    },
    '60%': {
      ...theme.animations.vibrant[60],
    },
    '80%': {
      ...theme.animations.vibrant[80],
    },
    '100%': {
      ...theme.animations.vibrant[100],
    },
  },

  '@keyframes vibrations2': {
    '0%': {
      ...theme.animations.vibrations2[0],
    },
    '40%': {
      ...theme.animations.vibrations2[40],
    },
    '60%': {
      ...theme.animations.vibrations2[60],
    },
    '80%': {
      ...theme.animations.vibrations2[80],
    },
    '100%': {
      ...theme.animations.vibrations2[100],
    },
  },

  '@keyframes slideDown': {
    from: {
      ...theme.animations.slideDown.from,
    },
    to: {
      ...theme.animations.slideDown.to,
    },
  },

  root: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'space-between',
    cursor: 'default',
    userSelect: 'none',
    top: 8,
    right: -150,
    width: 1000,
    animation: theme.animations.slideDown.animation,
  },

  timePosition: {
    position: 'relative',
    marginRight: 60,
  },

  label: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: '-25px 0px -25px -25px',
    padding: '25px 25px 25px 25px',
    paddingRight: '25px',
    display: 'block',
    maxWidth: 280,
    fontSize: 35,
    fontFamily: theme.typography.hiscorePrimary,
    letterSpacing: theme.typography.letterSpacing.small,
  },

  user: {
    color: theme.palette.primary,
    textShadow: theme.typography.textShadowPrimary,
  },

  score: {
    color: theme.palette.success,
    animation: theme.animations.vibrant.animation,
    textShadow: theme.typography.textShadowSecondary,
  },
});

export interface IPlayerStatus {
  controller: IGamePageController;
}

type PlayerStatusProps = IPlayerStatus & WithSheet<typeof styles>;

@observer
class PlayerStatus extends React.Component<PlayerStatusProps> {
  render(): React.ReactNode {
    const { theme, classes, controller } = this.props;

    const scoreLabelClasses = `
			${classes.score}
			${classes.label}
		`;

    const userLabelClasses = `
			${classes.user}
			${classes.label}
		`;

    return (
      <div className={classes.root}>
        <Typography
          fontSize={theme.typography.size.mediumSecondary}
          color={theme.palette.white}
          uppercase
          bold
        >
          Level
          <span className={scoreLabelClasses}>{controller.viewModel.model.level}</span>
        </Typography>
        <Typography
          fontSize={theme.typography.size.mediumSecondary}
          color={theme.palette.white}
          uppercase
          bold
        >
          Lives
          <span className={scoreLabelClasses}>{controller.viewModel.model.lives}</span>
        </Typography>
        <Typography
          fontSize={theme.typography.size.mediumSecondary}
          color={theme.palette.white}
          uppercase
          bold
        >
          Score
          <span className={scoreLabelClasses}>{controller.viewModel.model.score}</span>
        </Typography>
        <Typography
          fontSize={theme.typography.size.mediumSecondary}
          color={theme.palette.white}
          uppercase
          bold
        >
          Username
          <span
            style={{ animation: theme.animations.vibrations2.animation }}
            className={userLabelClasses}
          >
            {controller.viewModel.model.name}
          </span>
        </Typography>
        <div>
          <Typography
            fontSize={theme.typography.size.mediumSecondary}
            color={theme.palette.white}
            uppercase
            bold
          >
            Key input
          </Typography>
          <Letter
            textInput={controller.keyInput}
            showLetter={controller.countDownNumber === 0 && controller.gameHasStarted}
            onKeyDown={(event: KeyboardEvent) => controller.onKeyboardInput(event)}
          />
        </div>
        <div className={classes.timePosition}>
          <Typography
            fontSize={theme.typography.size.mediumSecondary}
            color={theme.palette.white}
            uppercase
            bold
          >
            Time elapsed
          </Typography>
          <GameTimer timeOutput={controller.gameCurrentTime} />
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(PlayerStatus);
