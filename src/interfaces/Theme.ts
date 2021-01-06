export interface ITheme {
  animations: {
    slideDown: {
      from: Record<never, string>;
      to: Record<never, string>;
      animation: string;
    };
    changeColor: {
      from: Record<never, string>;
      to: Record<never, string>;
      animation: string;
    };
    focusIn: {
      from: Record<never, string>;
      to: Record<never, string>;
      animation: string;
    };
    fadeIn: {
      from: Record<never, string>;
      to: Record<never, string>;
      animation: string;
    };
    fadeInBlur: {
      from: Record<never, string>;
      to: Record<never, string>;
      animation: string;
    };
    blurExpandFade: {
      '0': Record<never, string>;
      '60': Record<never, string>;
      '100': Record<never, string>;
      animation: string;
    };
    fadeOut: {
      from: Record<never, string>;
      to: Record<never, string>;
    };
    slideTop: {
      from: Record<never, string>;
      to: Record<never, string>;
      animation: string;
    };
    letterFocusExpand1: {
      from: Record<never, string>;
      to: Record<never, string>;
      animation: string;
    };
    letterFocusExpand2: {
      from: Record<never, string>;
      to: Record<never, string>;
      animation: string;
    };
    vibrations: {
      '0': Record<never, string>;
      '40': Record<never, string>;
      '60': Record<never, string>;
      '80': Record<never, string>;
      '100': Record<never, string>;
      animation: string;
    };
    vibrations2: {
      '0': Record<never, string>;
      '40': Record<never, string>;
      '60': Record<never, string>;
      '80': Record<never, string>;
      '100': Record<never, string>;
      animation: string;
    };
    vibrant: {
      '0': Record<never, string>;
      '20': Record<never, string>;
      '40': Record<never, string>;
      '60': Record<never, string>;
      '80': Record<never, string>;
      '100': Record<never, string>;
      animation: string;
    };
    shake: {
      '0': Record<never, string>;
      '60': Record<never, string>;
      '70': Record<never, string>;
      '80': Record<never, string>;
      '90': Record<never, string>;
      '100': Record<never, string>;
      animation: string;
    };
  };
  palette: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    white: string;
    success: string;
    danger: string;
    warning: string;

    blackPrimary: string;
    blackSecondary: string;

    grayscale: string[];
    gradient: string[];
  };

  typography: {
    primary: string;
    secondary: string;
    logoPrimary: string;
    logoSecondary: string;
    hiscorePrimary: string;

    size: {
      small: number;
      medium: number;
      mediumSecondary: number;
      large: number;
      xlarge: number;
    };

    letterSpacing: {
      small: string;
      large: string;
    };

    textShadowPrimary: string;
    textShadowSecondary: string;
    textShadowLight: string;
  };

  baseIndex: number;

  border: {
    radius: number;
    thin: string;
    bold: string;
    color: string;
    button: string;
  };

  cursor: {
    link: string;
    disabled: string;
  };

  boxShadowPrimary: string;
  boxShadowButtonPrimary: string;
  boxShadowButtonSecondary: string;

  disabledOpacity: number;
}
