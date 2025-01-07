import { useState } from "react";
import { toast } from "react-hot-toast"
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { autoScrolling } from "../ReduxStore/StopScrollingSlice";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";
const SignOutPopUp = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signOut = async () => {
        try {
            setLoading(true);
            const { data } = await AxiosInstance.put("/user/signout", {});
            setLoading(false)
            toast.success(data?.message);
            dispatch(autoScrolling(false));
            window.location.reload()
            navigate("/")
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message)
            setLoading(false)
        }
    }

    return (
        <>
            <div onClick={(e) => e.stopPropagation()} className="md:w-[40%] md:h-[40%] w-full h-[220px] rounded-xl bg-white drop-shadow-md relative flex justify-between p-5 flex-col gap-4">
                <div className="absolute top-6 left-2 w-[35px] h-[35px] rounded-full cursor-pointer bg-[#69d2ff3d] text-center"><i className="fas fa-warning leading-[35px] text-[#469bbf]"></i></div>
                <div className="mt-10">
                    <h2 className="font-medium text-lg text-red-950">Sign Out From Udhari App</h2>
                    <p className="text-sm">Are you sure you whould like to sign out of your Udhari account?</p>
                </div>
                <div className="flex items-center gap-2 justify-between ">
                    <button onClick={() => dispatch(autoScrolling(false))} className="bg-[#469bbf] rounded-lg py-2 w-1/2 text-white cursor-pointer font-medium">Cancel</button>
                    <button onClick={() => signOut()} disabled={loading} className={`bg-[#69d2ff3d] rounded-lg py-2 w-1/2 text-[#469bbf] cursor-pointer font-medium flex justify-center ${loading ? "cursor-progress" : "cursor-pointer"}`}>{
                        loading ? <Loader style="border-2 border-black" /> : "Sign out"
                    }</button>
                </div>
            </div>
        </>
    )
}
export default SignOutPopUp;