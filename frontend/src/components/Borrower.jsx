import { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LazyImage from "../utils/LazyImage";

const Borrower = ({ borrower }) => { 
    const { borrower: { userName, createdAt,profilePhoto }, _id,debt,advancedPayment} = borrower; 
    const { user } = useSelector(state => state.user); 
    let rupee_color = (debt === 0) ? "text-green-500" : advancedPayment ? "text-green-500" : "text-red-500";
    return (
        <> 
            <Link to={`/transacation-area/${user?.role === "customer" ? user?._id : _id}`}>
                <div className="flex justify-between cursor-pointer hover:bg-gray-100 transition-all p-1 rounded-md">
                    <div className="flex gap-2">
                        <div className="rounded-full overflow-hidden w-[40px] h-[40px]"> 
                            <LazyImage src={ profilePhoto || "../images/user.png"} alt="borrowerImage" />
                        </div>
                        <div className="">
                            <h3 className="capitalize font-semibold text-[14px]">{userName}</h3>
                            <p className="text-[12px]">Added on {createdAt.split("T")?.[0]}</p>
                        </div>
                    </div>
                    <div className="pr-6">
                        <h2 className={`${rupee_color} text-[14px] font-bold`}><i className="fas fa-rupee mr-1" />{debt}</h2>
                        <p className="text-[12px]">Due</p>
                    </div>
                </div>
            </Link>
        </>
    )
}
export default memo(Borrower);