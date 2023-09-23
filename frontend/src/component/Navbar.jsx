import { Badge } from "@material-ui/core";
import {
  Search,
  Chat,
  Menu,
  AccountCircle,
  ExitToApp,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout, search } from "../redux/userRedux";
import { useRef } from "react";
import TopNavbar from "./TopNavbar/TopNavbar";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { IoMdDocument } from "react-icons/io";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { IoIosPerson } from 'react-icons/io';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 10px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ flex: 5 })}
`;

const Language = styled.span`
  font-size: 18px;
  cursor: pointer;
  color: dodgerBlue;

  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.form`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  ${mobile({ marginLeft: "0px" })}
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "120px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  margin-left: -15vmax;

  @media (max-width: 800px) {
    display: none;
  }
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px", display: "none" })}
`;
const Right = styled.div`
  margin-left: -5vmax;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${mobile({ flex: 10, justifyContent: "space-around" })}
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 25px;

  ${mobile({ marginLeft: "15px", marginRight: "5px", flexDirection: "column" })}
`;
const Item = styled.p`
  font-size: 20px;
  margin-left: "2px";
  color: #115195;
  border-radius: 10%;
  padding: 0.5vmax;
  ${mobile({ fontSize: "13px" })}
  &:hover {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.8);
  }
`;
const CartItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "15px", marginRight: "5px" })}
`;
const Button = styled.button`
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  margin-left: 2px;
  font-size: 20px;
  color: #185393;
  ${mobile({ fontSize: "13px" })}
`;
const SearchButton = styled.button`
  border: none;
  outline: none;
  background-color: white;
`;
const TopNavWrapper = styled.div`
  display: none;
  ${mobile({ display: "block" })}
`;

const Navbar = () => {
  // const quantity = useSelector(state=>state.cart.quantity)
  const currentUser = useSelector((state) => state.user.currentUser);
  const [searchedValue, setsearchedValue] = useState(null);
  const item = useRef();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };
  // const searchHandler=(e)=>{
  //   e.preventDefault();
  //   dispatch(search(searchedValue));
  // }
  useEffect(() => {
    dispatch(search(null));
  }, []);
  // const HandleNav =()=>{
  //     console.log(item.current.display)
  //        if(item.current.display==="flex"){
  //           item.current.display="none";
  //        }
  //        else{
  //           item.current.display="flex";
  //        }
  // }

  return (
    <>
      <TopNavWrapper>
        <TopNavbar />
      </TopNavWrapper>
      <Container >
        <Wrapper style={{display:"flex",overflowX:"auto"}}>
          <Left className="Search-remove" style={{ display: "flex" }}>
            <Link
              to="/allnotes"
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "3px",
              }}
            >
              <IoMdDocument size={16} style={{ color: "#1b6dc4" }} />
              <Item>Notes</Item>
            </Link>
            {currentUser.isAdmin && (
              <Link
                to="/admin"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "3px",
                }}
              >
                <IoIosPerson size={16} style={{ color: "#1b6dc4" }} />
                <Item>Admin</Item>
              </Link>
            )}
            <Link
              to="/contact"
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "3px",
              }}
            >
              <FaPhone size={16} style={{ color: "#1b6dc4" }} />
              <Item>Contact</Item>
            </Link>
            {/* <SearchContainer onSubmit={searchHandler}>
            <Input placeholder="Search" onChange={(e)=>setsearchedValue(e.target.value)}/>
            <SearchButton type="submit">
            <Search style={{ color: "gray", fontSize: 16 }} />
            </SearchButton >
          </SearchContainer> */}
          </Left>
          <Center>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <Logo>NOTES-HUB</Logo>
            </Link>
          </Center>
          <Right>
            {currentUser ? (
              <>
                <Link
                  to={"/profile/" + currentUser._id}
                  style={{ textDecoration: "none" }}
                >
                  <MenuItem>
                    <AccountCircle />
                    <Item>{currentUser.username}</Item>
                  </MenuItem>
                </Link>

                <MenuItem>
                  <ExitToApp onClick={logoutHandler} />
                  <Button onClick={logoutHandler}>Logout</Button>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem>
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    SignIn
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/register"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Register
                  </Link>
                </MenuItem>
              </>
            )}

            <Link to="/searchuser" style={{ textDecoration: "none" }}>
              <MenuItem>
                <Chat style={{ color: "#1b6dc4" }} />
                <Item>Chat</Item>
              </MenuItem>
            </Link>
          </Right>
        </Wrapper>
      </Container>
    </>
  );
};

export default Navbar;
