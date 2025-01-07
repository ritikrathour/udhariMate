 
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast"
import AxiosInstance from "../utils/AxiosInstance";
const Bill = ({ isPayment, setShowBill, id }) => {
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [description, setdescription] = useState("");
    const { user } = useSelector(state => state.user);

    const createDebt = async () => {
        try {
            const payload = { amount, description, borrower: id, date }
            const { data } = await AxiosInstance.post("/create-debt", payload,)
            setAmount("")
            setDate("")
            setdescription("")
            toast.success(data?.message)
            setShowBill(false);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
    }
    const payPayment = async () => {
        try {
            const payload = { amount, borrower: id, description, date };
            const { data } = await AxiosInstance.post(`/create-payment`, payload)
            setAmount("")
            setDate("")
            setdescription("")
            toast.success(data?.message)
            setShowBill(false);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
    }

    const handleSubmitData = () => {
        if (!isPayment) {
            if (user?.role === "shopkeeper") {
                createDebt()
            }
        } else {
            if (user?.role === "shopkeeper") {
                payPayment()
            }
        }
    }
    return <>
        <div className="w-full h-[85%] p-2 flex justify-between items-center flex-col absolute top-0 left-[50%] translate-x-[-50%]">
            <button onClick={() => setShowBill(false)} className="absolute top-2 right-4 w-[30px] h-[30px] rounded-full bg-slate-100 cursor-pointer text-gray-800" type="button"><i className="fas fa-times"></i></button>
            <div className="flex flex-col items-center gap-4">
                <h3 className="text-sm font-medium">{!isPayment ? "Debt" : "Payment"}</h3>
                <h2 className="m-auto">
                    <span className={`${!isPayment ? "text-red-500" : "text-green-700"} text-lg`}>₹ </span>
                    <input value={amount} required min={0} onChange={(e) => setAmount(e.target.value)} className="w-[60px] text-xl font-bold appearance-none" placeholder="0000" type="number" />
                </h2>
                <div className="border border-gray-500 px-2 py-1 rounded-md w-[270px] text-center">
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
            </div>
            <div className="flex justify-between gap-4">
                <div className="border border-green-600 h-[40px] w-[240px] sm:w-[300px] md:w-[350px] rounded-md ">
                    <input required value={description} onChange={(e) => setdescription(e.target.value)} className="h-full px-4 text-sm rounded-lg focus:bg-green-50 w-full capitalize" type="text" placeholder={!isPayment ? "Items Description!" : "Message..."} />
                </div>
                <button disabled={(amount.trim().length > 0 & amount > 0) ? false : true} onClick={() => handleSubmitData()} type="button" className={`${amount.trim().length > 0 ? "" : "bg-green-300"} w-[40px] h-[40px] rounded-full bg-green-600 border border-green-500`}>
                    <i className="fas fa-check text-lg text-white"></i>
                </button>
            </div>
        </div>
    </>
}
export default memo(Bill);