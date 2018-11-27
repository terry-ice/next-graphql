import React, { Component } from "react";
import Header from "./Header";
import Meta from "./Meta";
import styled, { ThemeProvider, injectGlobal } from "styled-components";

const theme = {
  red: "#FF0000",
  black: "#393939",
  grey: "#3A3A3A",
  lightgrey: "#E1E1E1",
  offWhite: "#EDEDED",
  maxWidth: "1000px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)"
};

const StylePage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;
const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

injectGlobal`
  @font-face{
    font-family: 'radnika_netx';
    src: url('/static/radnikanext-medium-webfont.woff2');
    font-weight: normal;
    font-style: normal;
  }
  html{
    box-sizing: border-box;
    font-size:10px;
  }
  *,*:before,*:after{
    box-sizing: inherit;
  }
  body{
    padding: 0px;
    margin: 0px;
    font-size: 1.5rem;
    line-height: 2;
  }
  a{
    text-decoration: none;
    color:${props => props.theme.black}
  }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StylePage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StylePage>
      </ThemeProvider>
    );
  }
}
export default Page;
