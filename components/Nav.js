import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "./User";
import Signout from "./Signout";
import React, { Fragment } from "react";
const Nav = () => (
  <User>
    {({ data: { me } }) => {
      return (
        <NavStyles>
          {me && (
            <>
              <Link href="/">
                <a>{me.name}</a>
              </Link>
              <Link href="/items">
                <a>Shop</a>
              </Link>
              <Link href="/sell">
                <a>Sell</a>
              </Link>

              <Link href="/orders">
                <a>Orders</a>
              </Link>
              <Signout />
            </>
          )}
          {!me && (
            <Fragment>
              <Link href="/signup">
                <a>Sign In</a>
              </Link>
              <Link href="/items">
                <a>Shop</a>
              </Link>
              <Link href="/sell">
                <a>Sell</a>
              </Link>
            </Fragment>
          )}
        </NavStyles>
      );
    }}
  </User>
);
export default Nav;
