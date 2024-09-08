import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux-toolkit/store/store";

const Protected = () => {
  const { currentUser } = useSelector((state:RootState) => state.auth);
  return <>{currentUser ? <Outlet /> : <Navigate to={"/sign-in"} />}</>;
};

export default Protected;
