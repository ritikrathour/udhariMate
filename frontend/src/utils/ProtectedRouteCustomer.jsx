
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom"
const ProtectedRouteCustomer = () => {
    const { user, isAuthenticate, loading } = useSelector(state => state.user);
  
    if (loading) {
        return "Loading..."
    }
    if (user && !user?.role) {
        return <Navigate to={"/"} />
    }
    if (!user?._id && !isAuthenticate) {
        return <Navigate to={"/signin"} />
    }
    if(user?._id && user?.role !== "customer"){
        return <Navigate to="/"/>
    }
    return <Outlet />;
}
export default ProtectedRouteCustomer;