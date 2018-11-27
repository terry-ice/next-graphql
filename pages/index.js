import Link from "next/link";

const Home = props => (
  <div>
    <h2>home</h2>
    <Link href="/sell">
      <a>sell</a>
    </Link>
  </div>
);

export default Home;
