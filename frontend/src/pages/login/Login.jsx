import { useState } from "react";
import styled from "styled-components";
import { login } from "../../redux/apiCalls";
import { mobile } from "../../responsive.js";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background:url("https://img.freepik.com/free-vector/online-document-concept-illustration_114360-5453.jpg?w=900&t=st=1673501437~exp=1673502037~hmac=f7a813ace48ce8a1ce1be58c1d1507746faa24876235b9c94f44584380ed1cd5")
      center;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: #5B85A7;
  color:white;
  box-shadow:0px 5px 18px solid black;
  ${mobile({ width: "75%" })}
  transition:all 0.5s;
  &:hover {
    background-color: #4A2F8A; /* Change the background color on hover */
    transform: translateY(-1vmax); /* Scale the element slightly on hover */
  }
  
`;
const TitleNav=styled.h1`
  font-size: 45px;
  font-weight: 200;
  text-align: center;
  margin-bottom: 3vh;
`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  ${mobile({border:"1px solid brown"})}
`;

const Button = styled.button`
  width: 40%;
  border: none;
  border-radius:10px;
  padding: 15px 20px;
  background-color: #3967bc;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    background-color: #27457e;
    cursor: not-allowed;
  }
`;

const LinkTag = styled.a`
  margin: 5px 0px;
  font-size: 14px;
  text-decoration: none;
  cursor:pointer;
`;

const Error = styled.span`
  color: #3f76e5;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { currentUser, isFetching, error } = useSelector((state) => state.user);
  
  
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };
  return (
    <Container>
      <TitleNav>Share-Notes</TitleNav>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Something went wrong...</Error>}

          < LinkTag>
          Need an account  /
          <Link to="/register" style={{textDecoration:"none",color:"white"}}>
           <b style={{marginLeft:"5px"}}>SIGN UP</b>
          </Link>
          </ LinkTag>
          < LinkTag>
          <Link to="/" style={{textDecoration:"none",color:"white"}}>
           <b>Skip</b>
          </Link>
          </ LinkTag>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;