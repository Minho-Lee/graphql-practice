import React, { Component } from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

import Link from './Link';

const FEED_SEARDCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
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

class Search extends Component {
  state = {
    links: [],
    filter: ''
  };

  changeFilter = (e) => {
    this.setState({ filter: e.target.value });
  }

  _executeSearch = async () => {
    // purpose of 'withApollo' is that it injects the 'ApolloClient' instance that was created in
    // index.js into the 'Search' compoennt as a new prop called 'client'
    // 'client' has a method called 'query' which you can use to query manually instead of using gql
    const { filter } = this.state;
    const result = await this.props.client.query({
      query: FEED_SEARDCH_QUERY,
      variables: { filter },
    });
    const links = result.data.feed.links;
    this.setState({ links });
  }

  render() {
    return(
      <div>
        <div>
          Search
          <input
            type="text"
            onChange={(e) => this.changeFilter(e)}
          />
          <button type="button" onClick={() => this._executeSearch()}>OK</button>
        </div>
        {this.state.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
      </div>
    );
  }
}

export default withApollo(Search);
