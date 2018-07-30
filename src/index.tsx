import * as React from 'react';
import { default as styled } from 'styled-components';

const Test = styled.h1`
  color: yellow;
`;

export default class HelloWorld extends React.Component<any, any> {
  render() {
    return (
      <div style={{ color: this.props.color }}>
        <Test>
            Hello world
        </Test>
      </div>
    );
  }
}
