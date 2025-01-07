 
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LazyImage from "../utils/LazyImage";
import AccountInfo from "../components/AccountInfo";
import Loader from "../components/Loader";
import AxiosInstance from "../utils/AxiosInstance";

const BorrowerProfile = () => {
    const [borrowerPro, setBorrowerPro] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const GetBorrowerProfile = async (id) => {
        setLoading(true)
        try {
            const { data } = await AxiosInstance.get(`/borrower/${id}`);
            setBorrowerPro(data?.data);
            setLoading(false)
        } catch (error) {
            console.log(error?.response?.data?.message);
            setLoading(false)
        }
    }
    useEffect(() => {
        GetBorrowerProfile(id)
    }, [id]);
    if (loading) {
        return <div className="h-screen flex justify-center items-center"><Loader style="border-2 border-black" /></div>
    }
    return (
        <>
            <section className="flex items-center justify-center gap-5 flex-col h-[85vh]">
                <label htmlFor="userImage" className="w-[200px] h-[200px] overflow-hidden rounded-full drop-shadow-md">
                    <LazyImage src={borrowerPro?.borrower?.profilePhoto || "../images/user.png"} alt="home_second_image" />
                </label>
                <form className="flex flex-col gap-3 sm:w-[500px] w-full drop-shadow-md">
                    <div className=" h-[40px] rounded-lg bg-zinc-100 flex items-center px-2 gap-2">
                        <label htmlFor="userName">
                            <i className="fas fa-user text-[12px]"> </i>
                        </label>
                        <input className="w-full h-full bg-transparent capitalize" defaultValue={borrowerPro?.borrower?.userName} readOnly type="text" name="userName" />
                    </div>
                    <div className=" h-[40px] rounded-lg bg-zinc-100 flex items-center px-2 gap-2">
                        <label htmlFor="email">
                            <i className="fas fa-user-circle text-[12px]"> </i>
                        </label>
                        <input className="w-full h-full bg-transparent" defaultValue={borrowerPro?.borrower?.email} readOnly type="email" name="email" />
                    </div>
                    <div className=" h-[40px] rounded-lg bg-zinc-100 flex items-center px-2 gap-2">
                        <label htmlFor="phone">
                            <i className="fas fa-phone text-[12px]"> </i>
                        </label>
                        <input className="w-full h-full bg-transparent" placeholder="91+ 1234567890" defaultValue={borrowerPro?.borrower?.mobile} readOnly type="text" name="phone" />
                    </div>
                </form>
                <AccountInfo createdAt={borrowerPro?.createdAt} />
            </section>
        </>
    )
}
export default BorrowerProfile;