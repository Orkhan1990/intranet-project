import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  const { currentUser } = useSelector((state) => state.auth);
  return <>{currentUser ? <Outlet /> : <Navigate to={"/sign-in"} />}</>;
};

export default Protected;