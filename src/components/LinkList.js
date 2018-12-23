import React, { Component } from 'react';
import Link from './Link';

class LinkList extends Component {
  render() {
    const linksToRender = [
      {
        id: '1',
        description: 'one',
        url: 'https://www.google.com'
      },
      {
        id: '2',
        description: 'two',
        url: 'https://www.google.com'
      }
    ];

    return (
      <div>
        {linksToRender.map((link) =><Link key={link.id} link={link} />)}
      </div>
    )
  }
}

export default LinkList;
