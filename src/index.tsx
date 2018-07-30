import * as React from 'react';

export default class HelloWorld extends React.Component<any, any> {
  render() {
    return (
      <div style={{ color: this.props.color }}>
        Hello world
      </div>
    );
  }
}
