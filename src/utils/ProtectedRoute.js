import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, altPath, ...props  }) {
  return (
    props.isLoggedIn ? <Component {...props} /> : <Navigate to={altPath} replace/>
)}

export default ProtectedRoute;