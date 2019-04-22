import Signup from '../components/Signup.js';
import Signin from '../components/Signin.js';
import styled from 'styled-components';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignupPage = props => (
  <Columns>
    <Signup />
    <Signin />
    <Signup />
  </Columns>
);

export default SignupPage;
