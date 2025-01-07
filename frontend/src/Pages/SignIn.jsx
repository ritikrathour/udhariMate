 
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Loader from "../components/Loader";
import AxiosInstance from "../utils/AxiosInstance";
const SignIn = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    // handle change 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        signInAuth(formData);
    }
    const signInAuth = async (formData) => {
        try {
            setLoading(true)
            await AxiosInstance.post("/signin", formData);
            toast.success("User Logged In Successfully!")
            setLoading(false);
            setTimeout(() => {
                navigate("/")
                window.location.reload()
            }, 1000)
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message)
            setLoading(false);
        }
    }
    return <>
        <section className="flex justify-center items-center h-[80vh]">
            <form onSubmit={(e) => handleSubmit(e)} className="w-[400px] rounded-tl-2xl rounded-br-2xl shadow-md shadow-slate-300 drop-shadow-md text-center p-3  flex flex-col gap-2">
                <h2 className="text-[25px] font-[600]">Welcome Back</h2>
                <Input type="email" placeholder="Email@gmail.com" icon="fas fa-user" value={formData?.email} name="email" id="email" func={handleChange} />
                <div className="relative">
                    <Input type={showPassword ? "text" : "password"} placeholder="Enter Password" value={formData?.password} name="password" id="password" icon="fas fa-key" func={handleChange} />
                    <div className="cursor-pointer absolute top-[50%] translate-y-[-50%] right-2" onClick={() => setShowPassword(prev => !prev)}>
                        <i className={`fas ${!showPassword ? "fa-eye-slash" : "fa-eye"} text-sm`}></i>
                    </div>
                </div> 
                <p className="form_change text-start">
                    <Link to="/forget-password" className="underline text-[12px] cursor-pointer"> Forget Password?</Link>
                </p>
                <button disabled={loading} type="submit" className={`${loading ? "cursor-not-allowed" : ""} flex justify-center bg-[#469bbf] py-[6px] rounded-full w-[300px] m-auto text-white`} >
                    {loading ? <Loader style="border-2 border-white"/> : "Sign In"}
                </button>
                <p className="form_change">
                    Don't have an account?
                    <Link to="/signup" className="text-blue-700 hover:underline text-[14px] cursor-pointer"> Sign Up</Link>
                </p>
            </form>
        </section>
    </>
}
export default SignIn;