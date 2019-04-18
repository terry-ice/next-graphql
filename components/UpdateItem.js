import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Router from "next/router";
import formatMoney from "../lib/formatMoney";
import Error from './ErrorMessage'

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where:{ id: $id}){
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;
const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!,
    $title: String,
    $description: String,
    $price: Int
  ) {
    updateItem(
      id: $id,
      title: $title,
      description: $description,
      price: $price
    ) {
      id
      title
      price
    }
  }
`;
class UpdateItem extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    title: "",
    description: "",
    image: "",
    largeImage: "dog2.jpg",
    price: 110
  };
  handleChange(e) {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    console.log(name, type, value);
    this.setState({ [name]: val });
  }
  async updateItem(e,data){
    e.preventDefault();
    const res = await data({
      variables:{
        id: this.props.id,
        ...this.state,
      }
    })
    console.log(res,'res');
  }
  render() {
    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data, loading }) => {
          if(loading) return <p>Loading....</p>
          // if(!data.item) return <p>id is not</p>
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { loading, error }) => (
                <Form
                  onSubmit={e=>{
                    this.updateItem(e,updateItem);
                  }}
                >
                  <Error error={error}></Error>
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        defaultValue={data.item.title}
                        onChange={e => {
                          this.handleChange(e);
                        }}
                      />
                    </label>
                    <label htmlFor="price">
                      price
                      <input
                        type="text"
                        id="price"
                        name="price"
                        required
                        defaultValue={data.item.price}
                        onChange={e => {
                          this.handleChange(e);
                        }}
                      />
                    </label>
                    <label htmlFor="description">
                      description
                      <input
                        type="text"
                        id="description"
                        placeholder="Enter a description"
                        name="description"
                        required
                        defaultValue={data.item.description}
                        onChange={e => {
                          this.handleChange(e);
                        }}
                      />
                    </label>
                    <button type="submit">Sav{loading?'ing':'e'} Changes</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
