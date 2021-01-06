import * as React from 'react';
import injectSheet, { WithSheet } from 'react-jss';
import { ITheme } from '../../../interfaces/Theme';

const styles = (theme: ITheme) => ({
  '@keyframes slideDown': {
    from: { top: -300, opacity: 0 },
    to: { top: -150, opacity: 1 },
  },

  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },

  root: {
    position: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    height: 350,
  },

  wordOne: {
    position: 'relative',
    display: 'block',
    zIndex: 4,
    fontFamily: theme.typography.logoPrimary,
    fontSize: 200,
    top: -60,
    color: '#EB219B',
    '-webkitTextFillColor': 'rgba(253, 90, 250, 1)',
    textShadow: '-2px -2px 0 #FFBAF2',
    '-webkitFilter': 'drop-shadow(3px 3px 1px #441F62)',
    '-webkitTransform': 'skew(-10deg,-10deg)',
    fontWeight: 'normal',
    animationName: 'fadeIn',
    animationDuration: '2s',
    animationTimingFunction: 'ease',
  },

  wordTwo: {
    position: 'relative',
    fontFamily: theme.typography.logoSecondary,
    left: 20,
    top: -150,
    fontSize: 200,
    lineHeight: 1,
    backgroundImage:
      '-webkit-linear-gradient(#022486 0%, #0AD0FD 30%, #BDFCFC 40%, #D8FFFF 44%, #00081C 44%, #00081C 50%, #074A67 52%, #1CD8FE 60%, #7FEDFE 62%, #96F5FC 70%, #0FD8FA 73%, #0BD2FD 88%, #AFFDFF 100%)',
    '-webkitBackgroundClip': 'text',
    '-webkitTextFillColor': 'transparent',
    '-webkitTextStroke': '1px #fff',

    animationDuration: '2s',
    animationName: 'slideDown',
    animationTimingFunction: 'ease',

    visibility: 'visible !important',
  },
});

export interface ILogoProps {
  wordOne: string;
  wordTwo: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

type LogoProps = ILogoProps & WithSheet<typeof styles>;

class Logo extends React.Component<LogoProps> {
  render(): React.ReactNode {
    const { classes, wordOne, wordTwo } = this.props;

    return (
      <div className={classes.root}>
        <span className={classes.wordOne}>{wordOne}</span>
        <span className={classes.wordTwo}>{wordTwo}</span>
      </div>
    );
  }
}

export default injectSheet(styles)(Logo);
