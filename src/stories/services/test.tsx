import * as React from 'react';

class test extends React.Component {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  name(hej: any) {
    return;
  }

  render() {
    return <div onClick={(evt) => this.name(evt)} />;
  }
}
