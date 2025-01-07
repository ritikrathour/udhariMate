import { useState } from "react";
import Input from "../components/Input";
import LazyImage from "../utils/LazyImage";

const ForgetPassword = () => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const handleChange = () => {

    }
    const handleSubmit = (e) => {
        e.preventDefault();        
    }
    return (
        <>
            <section className="flex justify-center items-start h-[85vh] md:h-[100vh] drop-shadow-sm">
                <div className="w-full sm-w-[400px] md:w-[600px] border-2 px-4 py-2">
                    <div className="md:w-[70%] sm:w-[50%] w-full m-auto h-full md:h-[70%]">
                        <LazyImage src="./images/forget-password.png" alt="forget password" style="w-[75%] m-auto" />
                    </div> 
                    <h2 className="text-3xl text-[#469bbf] font-bold text-center">Forget Password?</h2>
                    <p className="text-[14px] text-center leading-4 px-3 py-2 text-gray-400">Please Enter your registerd Email adress we will get back to you with the reset password. Thanks!</p>
                    <form onSubmit={handleSubmit} className=" mt-4 flex sm:justify-center flex-col gap-4 ">
                        <div className="border border-gray-300 rounded-md">
                            <Input type="email" placeholder="Enter Your Sign Up Email!" value={formData?.email} name="email" id="email" IconStyle="text-[16px]" icon="fas fa-user-circle" func={handleChange} style="border-b-2 border-red-400" />
                        </div>
                        <button disabled={loading} type="submit"
                            className={`${loading ? "bg-[#469bbf] cursor-not-allowed" : ""} flex justify-center bg-[#469bbf] py-[6px] rounded-full w-full sm:w-[300px] m-auto text-white`} >
                            {loading ? <Loader style="border-2 border-white" /> : "Reset Password"}
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}
export default ForgetPassword;