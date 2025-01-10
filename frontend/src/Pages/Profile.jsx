import React, { useRef, useState } from "react";
import Input from "../components/Input";
import LazyImage from "../utils/LazyImage";
import { useSelector } from "react-redux";
import ChangePasswordPopUp from "../components/ChangePasswordPopUp";
import toast from "react-hot-toast"; 
import Loader from "../components/Loader";
import AccountInfo from "../components/AccountInfo";
import AxiosInstance from "../utils/AxiosInstance";
const Profile = () => {
    // current user 
    const { user } = useSelector(state => state.user); 
    const [formData, setFormData] = useState({});
    const [changePassPopUp, setChangePassPopUp] = useState(false);
    const [updateProfileLoading, setUdateProfileLoading] = useState(false);
    const [isDisabledTrue, setIsDisabledTrue] = useState(true);
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(null); 
    const [uploadImageLoading,setUploadImageLoading] = useState(false)
    // handleChange
    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
        setIsDisabledTrue(false)
    }
    // handleImageChange
    const handleImageChange = (e) => {
        let imageFile = e.target.files[0]
        setPreview(URL.createObjectURL(imageFile));
        if (!imageFile) return;
        // Validate file size (5MB max)
        if (imageFile.size > 5 * 1024 * 1024) {
            toast.error("File size must not exceed 5MB.");
            return;
        }
        // Validate file type
        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!validTypes.includes(imageFile.type)) {
            toast.error("Invalid file type. Please select a JPEG, PNG, or WEBP image.");
            return;
        }
        handleImageUpload(imageFile)
    } 
    const handleImageUpload = async (imageFile) => {
        console.log(imageFile);
        setUploadImageLoading(true)
        const formData = new FormData();
        formData.append("image", imageFile);
        try {
            await AxiosInstance.put("/user/uploadImage",formData,{"content-type":"application/json"}); 
            toast.success("Image Uploaded Successfully!")
            setUploadImageLoading(false)
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message);
        } finally { 
            setUploadImageLoading(false)
        }
    };

    // handleUpdateProfile
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            setUdateProfileLoading(true);
            await AxiosInstance.post("/user/update-profile", formData,);
            toast.success("User Profile Updated Successfully!")
            setUdateProfileLoading(false);
            setTimeout(() => {
                setIsDisabledTrue(true)
            }, 2000);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
            setUdateProfileLoading(false)
        }
    }
    // handleCopyShopId to copy the shopID
    const handleShopIDCopy = () => {
        if (inputRef.current) {
            inputRef.current.select(); // Select the text
            navigator.clipboard
                .writeText(inputRef.current.value) // Copy text to clipboard 
            toast.success('ShopID copied Successfully!');
        }
    };
    return (
        <>
            <section className="flex items-center justify-center flex-col h-[100vh]">
                <label htmlFor="userImage" className="w-[200px] h-[200px] overflow-hidden cursor-pointer rounded-full drop-shadow-md border border-gray-300 backdrop-blur">
                    <LazyImage src={preview || user?.profilePhoto ||  "../images/user.png"} alt="home_second_image" accept="image/*" />
                </label>
                <input type="file" id="userImage" className="pointer-events-none hidden" name="userImage" onChange={handleImageChange} /> 
                <h4 className="capitalize text-sm font-medium h-[20px]">{uploadImageLoading && "Uploading Avatar please wait..."}</h4>
                <form onSubmit={handleUpdateProfile} className="flex flex-col gap-3 sm:w-[500px] w-full drop-shadow-md">
                    <Input type="text" placeholder="User Name" name="userName" defaultValue={user?.userName} id="userName" icon="fas fa-user" func={handleChange} />
                    <Input type="text" placeholder="+91 1234567890" defaultValue={user?.mobile} name="mobile" id="mobile" icon="fas fa-phone" func={handleChange} />
                    {
                        user?.role === "shopkeeper" &&
                        <>
                            <div className="flex justify-between items-center bg-zinc-100 px-2 rounded-lg h-[40px]">
                                <div className="flex items-center gap-2 w-full">
                                    <label htmlFor="shopId"><i className="fas fa-shop text-[12px]"></i></label>
                                    <input ref={inputRef} className=" bg-transparent h-full  w-full rounded-lg " name="shopId" type="text" readOnly defaultValue={user?.shopId} />
                                </div>
                                <span onClick={() => handleShopIDCopy()} className="cursor-pointer hover:bg-gray-300 w-[25px] h-[25px] rounded-full text-center leading-[25px]"><i className="fas fa-copy text-[12px]"> </i></span>
                            </div>
                            <p className="px-2 text-center text-[10px] capitalize font-medium">this is your shop ID share to your customers for sign up!</p>
                        </>
                    }

                    <button onClick={() => setChangePassPopUp(true)} className="text-[14px] font-medium bg-[#69d2ff3d] w-full py-2" type="button">Change Password</button>
                    <button disabled={isDisabledTrue} type="submit" className={`${updateProfileLoading ? "pointer-events-none" : "pointer-events-auto"} ${isDisabledTrue && "bg[#469bbfc2] cursor-not-allowed"} bg-[#469bbf] py-[6px] rounded-full w-[300px] m-auto text-white flex justify-center`} >
                        {updateProfileLoading ? <Loader style="border-2 border-white" /> : "Update Profile"}
                    </button>
                </form>
                <div onClick={() => setChangePassPopUp(false)} className={`${!changePassPopUp ? "scale-0" : "scale-100"} w-full absolute h-full flex items-center bg-[#b4b4b46] top-0 transition-all z-50`}>
                    <div onClick={(e) => e.stopPropagation()} className="p-2 sm:p-5 w-full h-[350px] sm:h-[450px] md:h-[600px] relative">
                        <ChangePasswordPopUp func={() => setChangePassPopUp()} />
                    </div>
                </div>
                <AccountInfo createdAt={user?.createdAt} />
            </section>
        </>
    )
}
export default Profile;
