import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("authenticated");

  if (!user) {
    console.log("here lloogg");
    return <Navigate to="/mainpage" replace />;
  }
  return children;
};
export default ProtectedRoute;
