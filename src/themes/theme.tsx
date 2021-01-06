import { ITheme } from '../interfaces/Theme';

export const defaultTheme: ITheme = {
  animations: {
    slideDown: {
      from: {
        transform: 'translateY(-200px)',
        opacity: 0,
      },
      to: {
        transform: 'translateX(0)',
        opacity: 1,
      },
      animation: 'slideDown 1.4s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
    },
    changeColor: {
      from: {
        filter: 'hue-rotate(0deg)',
      },
      to: {
        filter: 'hue-rotate(180deg)',
      },
      animation: 'changeColor 60s cubic-bezier(0.550, 0.085, 0.680, 0.530) infinite',
    },
    focusIn: {
      from: {
        filter: 'blur(12px)',
        opacity: 0,
      },
      to: {
        filter: 'blur(0px)',
        opacity: 1,
      },
      animation: 'focusIn 0.7s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
    },
    fadeIn: {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
      animation: 'fadeIn ease 0.8s',
    },
    fadeInBlur: {
      from: {
        opacity: 0,
        filter: 'blur(10px)',
      },
      to: {
        opacity: 1,
        filter: 'blur(0)',
      },
      animation: 'fadeInBlur ease 1.8s',
    },
    blurExpandFade: {
      '0': {
        filter: 'contrast(0.75) brightness(5.8) blur(0px)',
        fontSize: 90,
        transform: 'translateZ(0)',
        opacity: 1,
      },
      '60': {
        filter: 'contrast(0.75) brightness(5.8) blur(1px)',
        opacity: 0.9,
      },
      '100': {
        fontSize: 220,
        filter: 'contrast(2.75) brightness(0.4) blur(2px)',
        letterSpacing: '1em',
        transform: 'translateZ(300px)',
        opacity: 0,
      },
      animation: 'blurExpandFade 2.4s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
    },
    fadeOut: {
      from: {
        opacity: 1,
        filter: 'blur(0)',
      },
      to: {
        opacity: 0,
        filter: 'blur(30px)',
      },
    },
    slideTop: {
      from: {
        transform: 'translateY(0)',
      },
      to: {
        transform: 'translateY(-50px)',
      },
      animation: 'slideTop 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    },
    letterFocusExpand1: {
      from: {
        letterSpacing: '-0.5em',
        transform: 'translateZ(-800px)',
        filter: 'blur(12px)',
        opacity: 0,
        fontSize: 50,
        textShadow:
          '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073',
      },
      to: {
        transform: 'translateZ(0)',
        filter: 'blur(0)',
        opacity: 1,
        fontSize: 90,
        textShadow:
          '0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6',
      },
      animation: 'letterFocusExpand1 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940)',
    },
    letterFocusExpand2: {
      from: {
        letterSpacing: '-0.5em',
        transform: 'translateZ(-800px)',
        filter: 'blur(12px)',
        opacity: 0,
        fontSize: 50,
        textShadow:
          '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073',
      },
      to: {
        transform: 'translateZ(0)',
        filter: 'blur(0)',
        opacity: 1,
        fontSize: 90,
        textShadow:
          '0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6',
      },
      animation: 'letterFocusExpand2 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940)',
    },
    vibrations: {
      '0': {
        transform: 'translate(0)',
      },
      '40': {
        transform: 'translate(0px, -0.1px)',
      },
      '60': {
        transform: 'translate(0px, 0.5px)',
      },
      '80': {
        transform: 'translate(0)',
        opacity: 0.8,
      },
      '100': {
        opacity: 1,
      },
      animation: 'vibrations 0.3s linear infinite both',
    },
    vibrations2: {
      '0': {
        transform: 'translate(0)',
      },
      '40': {
        transform: 'translate(0px, -0.5px)',
      },
      '60': {
        transform: 'translate(0px, 0.1px)',
      },
      '80': {
        transform: 'translate(0)',
        opacity: 0.8,
      },
      '100': {
        opacity: 1,
      },
      animation: 'vibrations2 0.2s linear infinite both',
    },
    vibrant: {
      '0': {
        transform: 'translate(0)',
      },
      '20': {
        transform: 'translate(0)',
      },
      '40': {
        transform: 'translate(0px, -0.5px)',
      },
      '60': {
        transform: 'translate(0px, 0.5px)',
      },
      '80': {
        transform: 'translate(0)',
        color: 'white',
      },
      '100': {
        transform: 'translate(0)',
      },
      animation: 'vibrant 0.3s linear infinite both',
    },
    shake: {
      '0': {
        transform: 'translateY(0)',
        opacity: 0,
      },
      '60': {
        transform: 'translateY(8px)',
      },
      '70': {
        transform: 'translateY(-8px)',
      },
      '80': {
        transform: 'translateY(6.4px)',
      },
      '90': {
        transform: 'translateY(-6.4px)',
      },
      '100': {
        transform: 'translateY(0)',
        opacity: 1,
      },
      animation: 'shake 1s both',
    },
  },
  palette: {
    primary: '#E731EE',
    primaryLight: '#B002B6',
    primaryDark: '#19297C',
    secondary: '#C49BBB',
    white: '#FFFFFF',
    success: '#03D7FC',
    danger: '#DC3545',
    warning: '#F0AD4E',
    blackPrimary: '#3B444B',
    blackSecondary: '#0E1111',

    grayscale: [
      '#212121',
      '#414141',
      '#616161',
      '#9E9E9E',
      '#BDBDBD',
      '#E0E0E0',
      '#EEEEEE',
      '#F3F3F3',
    ],

    gradient: [
      'linear-gradient(to right top, #040404, #09080a, #0e0c0f, #120f12, #161215)',
      'linear-gradient(to right top, #150215, #250d26, #361038, #49114b, #5d115e)',
    ],
  },

  typography: {
    primary: 'Roboto, sans-serif',
    secondary: 'Nunito, sans-serif',
    logoPrimary: 'Mr Dafoe, cursive',
    logoSecondary: 'Monoton, cursive',
    hiscorePrimary: 'VT323, monospace',

    size: {
      small: 12,
      medium: 17,
      mediumSecondary: 20,
      large: 32,
      xlarge: 40,
    },
    letterSpacing: {
      small: '1px',
      large: '2px',
    },
    textShadowPrimary:
      '0 0 10px rgba(230, 0, 115, 0.7), 0 0 20px rgba(230, 0, 115, 0.2), 0 0 30px rgba(230, 0, 115, 0.4), 0 0 40px rgba(230, 0, 115, 0.7), 0 0 30px rgba(230, 0, 115, 0.2), 0 0 30px rgba(230, 0, 115, 0.3), 0 0 40px rgba(230, 0, 115, 0.7)',
    textShadowSecondary:
      '0 0 10px rgba(3, 215, 252, 0.7), 0 0 20px rgba(3, 215, 252, 0.2), 0 0 30px rgba(3, 215, 252, 0.4), 0 0 40px rgba(3, 215, 252, 0.7), 0 0 30px rgba(3, 215, 252, 0.2), 0 0 30px rgba(3, 215, 252, 0.3), 0 0 40px rgba(3, 215, 252, 0.7)',
    textShadowLight:
      '0 0 5px rgba(3, 215, 252, 0.7), 0 0 5px rgba(3, 215, 252, 0.2), 0 0 10px rgba(3, 215, 252, 0.4), 0 0 20px rgba(3, 215, 252, 0.7), 0 0 10px rgba(3, 215, 252, 0.2), 0 0 5px rgba(3, 215, 252, 0.3), 0 0 5px rgba(3, 215, 252, 0.7)',
  },

  border: {
    thin: '1px solid',
    bold: '4px solid',
    radius: 40,
    color: '#FFFFFF',
    button: '4px solid #FFF6FF',
  },

  cursor: {
    link: 'pointer',
    disabled: 'not-allowed',
  },

  boxShadowPrimary:
    '0 0 5px rgba(255, 255, 255, 0.7), 0 0 5px rgba(255, 255, 255, 0.2), 0 0 5px rgba(255, 255, 255, 0.4), 0 0 5px rgba(255, 255, 255, 0.7), 0 0 6px rgba(255, 255, 255, 0.2), 0 0 6px rgba(3, 215, 252, 0.3), 0 0 4px rgba(3, 215, 252, 0.7)',
  boxShadowButtonPrimary: 'inset 0 0 0 0 #31302B',
  boxShadowButtonSecondary: 'inset 194px 0 0 0 #F947FB',

  baseIndex: 10101,

  disabledOpacity: 0.4,
};
