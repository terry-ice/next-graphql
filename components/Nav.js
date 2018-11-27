import Link from "next/link";
import NavStyles from './styles/NavStyles'

const Nav = () => (
  <NavStyles>
    <Link href="/items">
      <a>items</a>
    </Link>
    <Link href="/sell">
      <a>sell</a>
    </Link>
    <Link href="/signup"><a>Singnup</a></Link>
    <Link href="/orders"><a>Orders</a></Link>
    <Link href="/me"><a>Account</a></Link>
  </NavStyles>
);
export default Nav;
