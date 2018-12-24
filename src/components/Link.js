import React, { Component } from 'react';

import { AUTH_TOKEN } from '../constants';

import { timeDifferenceForDate } from '../helpers/utils';

class Link extends Component {
  _voteForLink() {
    console.log('vote');
  }

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
            <div
              className="ml1 gray f11"
              onClick={() => this._voteForLink()}
              style={arrowStyle}
            >
              ▲
            </div>
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
