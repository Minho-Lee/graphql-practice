import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Link from './Link';

class LinkList extends Component {
  render() {
    const FEED_QUERY = gql`
      {
        feed {
          links {
            id
            createdAt
            url
            description
            postedBy {
              id
              name
            }
            votes {
              id
              user {
                id
              }
            }
          }
        }
      }
    `;

    return (
      <Query query={FEED_QUERY}>
        {/* Apollo injected several props into the component's `render prop function` */}
        {/* These props provide info about the `state` of the network request */}
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching...</div>
          if (error) return <div>Error Occurred!</div>

          const linksToRender = data.feed.links;

          return (
            <div>
              {linksToRender.map((link, index) => (
                <Link key={link.id} link={link} index={index} />))
              }
            </div>
          );
        }}
      </Query>
    );
  }
}

export default LinkList;
