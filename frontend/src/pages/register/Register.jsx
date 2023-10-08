import styled from "styled-components";
import { mobile } from "../../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { register } from "../../redux/apiCalls";
import { useAlert } from "react-alert";
import validator from "validator";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 55, 255, 0.3), rgba(25, 255, 25, 0.3));
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ paddingTop: "12vh" })}
`;
const TitleNav = styled.h1`
  font-size: 45px;
  font-weight: 200;
  text-align: center;
  margin-bottom: 3vh;
  ${mobile({ textAlign: "center", fontSize: "35px", marginBottom: "1vh" })}
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  ${mobile({ width: "75%", marginTop: "2vh" })}
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  ${mobile({ fontSize: "20px" })}
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  ${mobile({ flexDirection: "column", flexWrap: "nowrap" })}
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  border-radius: 5px;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  ${mobile({ border: "1px solid brown" })}
`;

const Agreement = styled.span`
  font-size: 15px;
  margin-bottom: 20px;
  margin-top: 5px;
`;

const Button = styled.button`
  width: 40%;
  display: block;
  border: none;
  padding: 15px 20px;
  background-color: #3967bc;
  color: white;
  cursor: pointer;
  &:disabled {
    background-color: #223f74;
    cursor: not-allowed;
  }
`;
const LinkTag = styled.a`
  margin-top: 20px;
  font-size: 17px;
  display: block;
  text-decoration: none;
`;
const Error = styled.span`
  color: white;
`;

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);
  const alert = useAlert();
  const handleClick = async (e) => {
    e.preventDefault();
    if (
      !firstname ||
      !lastname ||
      !username ||
      !email ||
      !password ||
      !confirmpassword
    ) {
      alert.error("All fields are required");
      return;
    }
    if (password !== confirmpassword) {
      alert.error("Password does not match");
      return;
    }
    if (!validator.isEmail(email)) {
      alert.error("Please enter a valid email address");
      return;
    }
  
    try {
      const response = await register(dispatch, {
        firstname,
        lastname,
        username,
        email,
        password,
      });
  
      if (response) {
        alert.success("Registration successful");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        alert.error(err.response.data.error);
      } else {
        alert.error("Registration failed. Please check your input.");
      }
    }
  };
  
  
  
  

  return (
    <Container>
      <TitleNav>NoteSharing</TitleNav>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            placeholder="first name"
            onChange={(e) => setFirstname(e.target.value)}
            type="text"
            required
          />
          <Input
            placeholder="last name"
            onChange={(e) => setLastname(e.target.value)}
            type="text"
            required
          />
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            required
          />
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
          <Input
            placeholder="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            required
          />
          <LinkTag style={{ display: "flex", justifyContent: "space-around" }}>
            Already an user?
            <Link to="/login">
              <b style={{ padding: "0px 15px" }}>LOGIN </b>
            </Link>
            <Link to="/forgot/password">
              <b>FORGOT PASSWORD</b>
            </Link>
          </LinkTag>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick} disabled={isFetching}>
            REGISTER
          </Button>
        </Form>
      </Wrapper>  
    </Container>
  );
};

export default Register;
