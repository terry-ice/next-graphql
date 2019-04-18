import React, { Component } from "react";
import PaginationStyles from "./styles/PaginationStyles";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { perPage } from "../config";
const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;
class Pagination extends Component {
  render() {
    return (
      <PaginationStyles>
        <Query query={PAGINATION_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <p>loading</p>;
            const count  = data.itemsConnection.aggregate.count;
            const pages = Math.ceil(count/ perPage);
            return <p>hi im {this.props.page} the{pages}</p>;
          }}
        </Query>
      </PaginationStyles>
    );
  }
}

export default Pagination;
