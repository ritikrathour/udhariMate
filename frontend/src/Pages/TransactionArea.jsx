
import { Link, useParams } from "react-router-dom";
import Bill from "../components/Bill";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import PatmentAndCreditButtons from "../components/Payment&CreditButtons";
import DebtItem from "../components/DebtItem";
import { useRef } from "react";
import NoContent from "../components/NoContent";
import ScrollToTop from "../components/ScrollTop";
import AxiosInstance from "../utils/AxiosInstance";
const TransactionArea = () => {
    const [showBill, setShowBill] = useState(false);
    const [isPayment, setIsPayment] = useState(false);
    const [borrower, setBorrower] = useState(null);
    const scrollRef = useRef();
    const { id } = useParams();
    const { user } = useSelector(state => state.user);
    // handelClickPayment    
    const handelClickPayment = () => {
        setShowBill(true);
        setIsPayment(true);
    }
    // handelClickCredit
    const handelClickCredit = () => {
        setShowBill(true);
        setIsPayment(false);
    }
    // get Borrower by ID     
    const GetBorrowerByID = async () => {
        try {
            const { data } = await AxiosInstance.get(`/borrower/${id}`);
            setBorrower(data?.data);
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    };
    useEffect(() => {
        if (user?._id) {
            GetBorrowerByID();
        }
    }, [id]);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [borrower?.transactions])
    return (
        <>
            <div className="m-auto bg-gray-100 w-full h-full top-0 left-0 relative md:block rounded-md border-2 ">
                {
                    showBill && <ScrollToTop />

                }
                {
                    user && user?.role === "shopkeeper" &&
                    <div className={`${showBill ? "translate-y-0 pointer-events-auto opacity-100 transition-all md:h-[650px] h-[600px]" : " -translate-y-full pointer-events-none opacity-0 h-0 transition-all"} bg-gray-200 z-40 rounded-md px-2 absolute top-0 left-0 w-full`}>
                        <Bill id={borrower?._id} isPayment={isPayment} setShowBill={setShowBill} />
                    </div>
                }
                <nav className="flex justify-between items-center p-2 bg-white rounded-md" >
                    <div className="flex items-center gap-2">
                        <div className="rounded-full overflow-hidden w-[40px] h-[40px]">
                            <img className="object-cover h-full" src={"../images/js.jfif" || "default_user_image"} alt="" />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="capitalize font-semibold text-[14px]">{borrower?.borrower?.userName}</h3>
                            <Link to={`${user && user?.role === "shopkeeper" ? `/borrower-profile/${id}` : `/profile/${user?._id}`}`} className="text-[12px] cursor-pointer hover:text-blue-800 font-semibold text-blue-700 transition-all">View Profile <i className="fas fa-caret-right" /></Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-[14px] font-medium">Advance Credit</p>
                        <h2 className="font-semibold  text-green-500 text-[16px]">₹{borrower?.advancedPayment || 0}</h2>
                    </div>
                </nav>
                <div ref={scrollRef} className={`md:p-4 ${borrower?.transactions && borrower?.transactions.length < !0 ? "flex justify-center items-center" : ""}  mt-2 px-2 w-full overflow-y-auto md:h-[520px] sm:h-[420px] h-[400px]`}>
                    {
                        borrower?.transactions && borrower?.transactions.length > 0 ? (
                            <ul className="flex flex-col gap-4 flex-wrap sm:justify-between justify-center overflow-hidden">
                                {
                                    borrower?.transactions?.map((item) => {
                                        return <DebtItem key={item?._id} items={item} style={`${item?.type === "DEBT" ? "text-red-400" : "text-green-400"}`} />
                                    })
                                }
                            </ul>
                        ) : <NoContent img="../images/shophere.png" alt="no transations" text="You Have No Transation Yet!" />
                    }
                </div>
                <footer className="bg-white md:py-2 sm:py-2 p-2 flex justify-between flex-col-reverse sm:flex-row gap-4 items-center z-40 w-full">
                    <div>
                        <div className="flex flex-col items-center">
                            <p className="text-[14px] text-nowrap">Balence Due</p>
                            <h2 className="font-semibold  text-red-500 text-[16px]">₹{borrower?.debt || 0}</h2>
                        </div>
                    </div>
                    {
                        user && user?.role === "shopkeeper" ? (
                            <PatmentAndCreditButtons payment={handelClickPayment} credit={handelClickCredit} />
                        ) : null
                    }
                </footer>
            </div>
        </>

    )
}
export default TransactionArea;