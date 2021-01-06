import * as React from 'react';
import injectSheet, { WithSheet } from 'react-jss';

import { ITheme } from '../../../interfaces/Theme';
import { Typography } from '../../atoms';

const styles = (theme: ITheme) => ({
  '@keyframes scroll': {
    '0%': {
      top: '20%',
      opacity: 0,
      transform: 'scale(0.2)',
      'animation-timing-function': 'ease-in',
      filter: 'blur(0)',
    },
    '16%': {
      opacity: 1,
    },
    '60%': {
      letterSpacing: '0px',
    },
    '55%': {
      opacity: 1,
      top: '70%',
      transform: 'scale(2.8)',
      'animation-timing-function': 'linear',
    },
    '90%': {
      opacity: 0.4,
      filter: 'blur(0)',
    },
    '100%': {
      top: '120%',
      opacity: 0,
      filter: 'blur(4px)',
      letterSpacing: '20px',
      transform: 'scale(7.5)',
    },
  },

  root: {
    opacity: 0,
    '-webkitTransformOrigin': '50% 120%',
    transform: 'perspective(300px) rotateX(35deg)',
    //textShadow: "0 1px 1px rgba(255, 0, 0, .15),0 3px 10px rgba(255, 0, 0, .15),0 3px 20px rgba(255, 0, 0, .15)",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    animationIterationCount: 1,
    animation: 'scroll 8s linear 0s forwards',
    position: 'absolute',
    top: '50%',
    textShadow: theme.typography.textShadowSecondary,
    userSelect: 'none',
  },
});

//export type WordState = "default" | "success" | "loading" | "error" | "disabled";

export interface IWordProps {
  word: string;
}

type WordProps = IWordProps & WithSheet<typeof styles>;

class Word extends React.Component<WordProps> {
  public static defaultProps: Partial<IWordProps> = {
    word: '',
  };

  render(): React.ReactNode {
    const { word, classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography fontSize={50} color={'white'}>
          {word}
        </Typography>
      </div>
    );
  }
}

export default injectSheet(styles)(Word);
