import React, { Component } from 'react';

class Link extends Component {
  render() {
    const { link } = this.props;

    return (
      <div className="mb4">
        {link.description} ({link.url})<br/>
        {link.postedBy ? link.postedBy.id : null}
      </div>
    );
  }
}

export default Link;
