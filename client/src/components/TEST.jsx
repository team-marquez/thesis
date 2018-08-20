import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Kamban from './Kamban.jsx'
const GET_ECHO = gql`
  {
    echo @client
  }
`;

// Remember to set a initial value for visibilityFilter with defaults
const TEST = () => (
  <Query query={GET_ECHO}>
    {({ data, client }) => {
      return (
      <div>
        {/* <Kamban DATA={JSON.parse(data.echo)}/> */}
        <h1>{JSON.stringify(data)}</h1>
      </div>
    )}}
  </Query>
);

export default TEST
