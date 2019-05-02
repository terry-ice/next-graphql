import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Router from "next/router";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
      title
    }
  }
`;
class CreateItem extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    title: "cool shoes",
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
  async uploadFile(e) {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "kebn1wg1");
    console.log(data, "data");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dohxs2duq/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.url
    });
  }
  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={e => {
              e.preventDefault();
              createItem().then(res => {
                Router.push({
                  pathname: "/item",
                  query: { id: res.data.createItem.id }
                });
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                image
                <input
                  type="file"
                  id="file"
                  name="file"
                  required
                  onChange={e => {
                    this.uploadFile(e);
                  }}
                />
                {this.state.image && (
                  <img alt="img" width="200" src={this.state.image} />
                )}
              </label>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={this.state.title}
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
                  value={this.state.price}
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
                  value={this.state.description}
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </label>
              <button type="submit">submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
