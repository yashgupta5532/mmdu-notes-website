import React, { useContext } from "react";
import HomePost from "./Homepost.js";
import styled from "styled-components";
import { Search, ArrowForward } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { search } from "../../../redux/userRedux";
import { useSelector, useDispatch } from "react-redux";
import { mobile } from "../../../responsive";
import CircularLoader from "../../../component/CircularLoader";
import { publicRequest } from "../../../requestMethods";

const Container = styled.div`
  padding: 20px;
  ${mobile({ padding: "0px" })}
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1vh;
  margin-bottom: 3vh;
  ${mobile({ marginTop: "1vh" })}
`;
const SearchContainer = styled.form`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  padding: 5px;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 500px;
  height: 40px;
  font-size: 16px;
  padding: 5px;
  ${mobile({ height: "30px" })}
`;
const SearchButton = styled.button`
  border: none;
  outline: none;
  background-color: white;
`;
const ShowmoreButton = styled.button`
  margin: auto;
  border: none;
  outline: none;
  background-color: #3e8de3;
  display: flex;
  font-size: 18px;
  align-items: center;
  justify-content: center;

  padding: 2vh;
  padding-left: 3vh;
  padding-right: 3vh;
  cursor: pointer;
  color: white;
  border-radius: 5px;
  &:hover {
    background-color: #1b65b1;
  }
`;

const RenderPost = () => {
  const { currentUser: user, searchedValue } = useSelector(
    (state) => state.user
  );
  const [notes, setnotes] = useState([]);
  const [issearching, setissearching] = useState(false);
  const [postcount, setpostcount] = useState(5);
  const [searchedItem, setsearchedItem] = useState(searchedValue);
  const dispatch = useDispatch();

  const searchHandler = async (e) => {
    e.preventDefault();
    dispatch(search(searchedItem));
  };

  useEffect(() => {
    const fetchallnotes = async () => {
      setissearching(true);
      if (!searchedValue) {
        const res = await publicRequest.get(`notes/?count=${postcount}`);
        if (Array.isArray(res.data)) { // Check if res.data is an array
          setnotes(
            res.data.sort((n1, n2) => {
              return new Date(n2.createdAt) - new Date(n1.createdAt);
            })
          );
        } else {
          setnotes([]); // Set empty array if res.data is not an array
        }
      } else {
        const res = await publicRequest.get("notes/findnotes/" + searchedItem);
        if (Array.isArray(res.data)) { // Check if res.data is an array
          setnotes(res.data);
        } else {
          setnotes([]); // Set empty array if res.data is not an array
        }
      }
      setissearching(false);
    };
    fetchallnotes();
  }, [user._id, searchedValue, postcount]);
  
 useEffect(() => {
  const fetchallnotes = async () => {
    setissearching(true);
    if (!searchedValue) {
      const res = await publicRequest.get(`notes/?count=${postcount}`);
      if (Array.isArray(res.data)) { // Check if res.data is an array
        setnotes(
          res.data.sort((n1, n2) => {
            return new Date(n2.createdAt) - new Date(n1.createdAt);
          })
        );
      } else {
        setnotes([]); // Set empty array if res.data is not an array
      }
    } else {
      const res = await publicRequest.get("notes/findnotes/" + searchedItem);
      if (Array.isArray(res.data)) { // Check if res.data is an array
        setnotes(res.data);
      } else {
        setnotes([]); // Set empty array if res.data is not an array
      }
    }
    setissearching(false);
  };
  fetchallnotes();
}, [user._id, searchedValue, postcount]);

  useEffect(() => {
    dispatch(search(null));
  }, []);

  // Declare filteredNotes inside the component
  const filteredNotes = notes.filter((note) => note.status === "Approved");

  if (issearching) return <CircularLoader item={"notes"} />;
  return (
    <>
      <Wrapper>
        <SearchContainer onSubmit={searchHandler}>
          <Input
            placeholder="Search notes..."
            onChange={(e) => setsearchedItem(e.target.value)}
          />
          <SearchButton type="submit">
            <Search style={{ color: "gray", fontSize: 30 }} />
          </SearchButton>
        </SearchContainer>
      </Wrapper>
      {filteredNotes.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>Not Found</h3>
      ) : (
        filteredNotes.map((p, i) => <HomePost x={p} key={i} />)
      )}
      <ShowmoreButton onClick={() => setpostcount(postcount + 5)}>
        Show More <ArrowForward />
      </ShowmoreButton>
    </>
  );
};

export default RenderPost;
