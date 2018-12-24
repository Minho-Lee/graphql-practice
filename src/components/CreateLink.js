import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { FEED_QUERY } from './LinkList';

const POST_MUTATION = gql`
  mutation PostMuTation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;
class CreateLink extends Component {
  state = {
    description: '',
    url: '',
  }

  onValueChange(type, e) {
    this.setState({
      [type]: e.target.value
    })
  }

  render() {
    const { description, url } = this.state;

    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={e => this.onValueChange('description', e)}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={url}
            onChange={e => this.onValueChange('url', e)}
            type="text"
            placeholder="A URL for the link"
          />
        </div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ description, url }}
          onCompleted={() => this.props.history.push('/')}
          update={(store, { data: { post }}) => {
            const data = store.readQuery({ query: FEED_QUERY });
            data.feed.links.unshift(post);
            store.writeQuery({
              query: FEED_QUERY,
              data
            });
          }}
        >
          {(postMuta) => (
            <button onClick={postMuta}>
              Submit!
            </button>
          )}
        </Mutation>
      </div>
    )
  }
}

export default CreateLink;