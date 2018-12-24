import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { AUTH_TOKEN } from '../constants';

import { timeDifferenceForDate } from '../helpers/utils';

const VOTE_MUTATION = gql`
  mutation voteMutation($id: ID!) {
    vote(linkId: $id) {
      id
      link {
        votes {
          id
          user {
            id
            name
          }
        }
      }
      user {
        id
      }
    }
  }
`;
class Link extends Component {
  render() {
    const { link, index } = this.props;
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const arrowStyle = {
      cursor: 'pointer',
    };

    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{index + 1}.</span>
          {authToken && (
            <Mutation
              mutation={VOTE_MUTATION}
              variables={{ id: link.id }}
              update={(store, { data: { vote } }) =>
                this.props.updateStoreAfterVote(store, vote, link.id)
              }
            >
              {mutation => (
                <div
                  className="ml1 gray f11"
                  onClick={mutation}
                  style={arrowStyle}
                >
                  ▲
                </div>
              )}
            </Mutation>
          )}
        </div>
        <div className="ml1">
          <div>
            {link.description} ({link.url})
          </div>
          <div className="f6 lh-copy gray">
            {link.votes.length} votes | by{' '}
            {link.postedBy
              ? link.postedBy.name
              : 'Unknown'}{' '}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        </div>
      </div>
    );
  }
}

export default Link;
