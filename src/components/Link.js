import React, { Component } from 'react';

class Link extends Component {
  render() {
    const { link } = this.props;

    return (
      <div>
        {link.description} ({link.url})
      </div>
    );
  }
}

export default Link;
