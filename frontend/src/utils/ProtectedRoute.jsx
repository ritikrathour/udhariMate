
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom"
import Loader from "../components/Loader";
const ProtectedRoute = () => {
    const { user, isAuthenticate, loading } = useSelector(state => state.user); 
    const {pathname} = useLocation(); 
    if (loading) {
        return <div className="w-full flex justify-center"> <Loader/></div>
    } 
    if (!user?._id && !isAuthenticate) {
        return <Navigate to={"/signup"} />
    } 
    return <Outlet />;
}
export default ProtectedRoute;