import * as React from 'react';
import injectSheet, { WithSheet } from 'react-jss';

import { Link as CustomLink } from 'react-router-dom';

const styles = () => ({
  link: {
    textDecoration: 'none',
  },
});

export interface ILinkProps {
  children: React.ReactNode;
  href: string;
}

type LinkProps = ILinkProps & WithSheet<typeof styles>;

class Link extends React.Component<LinkProps> {
  public static defaultProps: Partial<ILinkProps> = {
    href: '/',
  };

  render(): React.ReactNode {
    const { href, classes, children } = this.props;

    return (
      <CustomLink to={href} className={classes.link}>
        {children}
      </CustomLink>
    );
  }
}

export default injectSheet(styles)(Link);
