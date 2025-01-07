import { memo, useState } from "react";
import Input from "./Input";
import toast from "react-hot-toast";
import Loader from "./Loader";
import AxiosInstance from "../utils/AxiosInstance";

const ChangePasswordPopUp = ({ func }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [changePasswordLoading, setChangePasswordLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    // handlePasswordChange 
    const handlePasswordChange = async (e) => {
        e.preventDefault()
        try {
            setChangePasswordLoading(true)
            await AxiosInstance.post("/user/change-password", { oldPassword, newPassword })
            setChangePasswordLoading(false);
            func(false);
            setNewPassword("")
            setOldPassword("")
            toast.success("Password Changed Successfully!")
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
            setChangePasswordLoading(false)
            setNewPassword("")
            setOldPassword("")
        }
    }
    return (
        <>
            <div className="absolute top-6 right-6 w-6 h-6 rounded-full bg-gray-200 text-center cursor-pointer" onClick={() => func(false)}><i className="fas fa-times"></i></div>
            <div className="h-full rounded-lg bg-white flex justify-center items-center shadow-lg">
                <form onSubmit={handlePasswordChange} className="flex flex-col gap-3 sm:w-[500px] w-full drop-shadow-md p-2">
                    <Input type="password" placeholder="Please Enter Old Password!" value={oldPassword} name="oldPassword" id="oldPassword" icon="fas fa-lock" func={(e) => setOldPassword(e.target.value)} />
                    {/* <Input type="password" placeholder="Please Create New Password!" value={newPassword} name="newPassword" id="newPassword" icon="fas fa-key" func={(e) => setNewPassword(e.target.value)} /> */}
                    <div className="relative">
                        <Input type={showPassword ? "text" : "password"} placeholder="Please Create New Password!" value={newPassword} name="newPassword" id="newPassword" icon="fas fa-key" func={(e) => setNewPassword(e.target.value)} />
                        <div className="cursor-pointer absolute top-[50%] translate-y-[-50%] right-2" onClick={() => setShowPassword(prev => !prev)}>
                            <i className={`fas ${!showPassword ? "fa-eye-slash" : "fa-eye"} text-sm`}></i>
                        </div>
                    </div>
                    <button disabled={changePasswordLoading} type="submit" className={`bg-[#469bbf] py-[6px] rounded-full w-full sm:w-[300px] m-auto flex justify-center  text-white`} >
                        {changePasswordLoading ? <Loader style="border-2 border-white" /> : "Change Password"}
                    </button>
                </form>
            </div>
        </>
    )
}
export default memo(ChangePasswordPopUp);