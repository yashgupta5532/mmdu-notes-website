import React, { useContext } from "react";
import { Route, Routes, Switch, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import UpdateUser from "./component/updateUser/UpdateUser";
import Comment from "../src/component/comment/Comment";
import UpdatePost from "./component/updatepost/UpdatePost";
import Messenger from "./pages/messenger/messenger";
import { useSelector } from "react-redux";
import SearchUserPage from "./pages/searchUserPage/SearchUserPage";
import Notes from "./component/Notes/Notes";
import "./App.css";
import ForgotPassword from "./pages/login/ForgotPassword";
import ResetPassword from "./pages/login/ResetPassword";
import AdminDashboard from "./component/Admin/AdminDashboard ";
import Contact from "./component/Contact/Contact";
import ContactInfo from "./component/Admin/ContactInfo";

function App() {
  const { currentUser: user } = useSelector((state) => state.user);

  return (
    <>
      <Routes>
        <Route path="/" exact element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/messenger"
          element={!user ? <Navigate to="/" /> : <Messenger />}
        />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/searchuser" element={<SearchUserPage />} />
        <Route path="/profile/update" element={<UpdateUser />} />
        <Route path="/note/update/:notesid" element={<UpdatePost />} />
        <Route path="/viewcomment/:notesid" element={<Comment />} />
        <Route path="/allnotes" element={<Notes />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/reset/password/:token" element={<ResetPassword />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contactinfo" element={<ContactInfo />} />
      </Routes>
    </>
  );
}

export default App;
