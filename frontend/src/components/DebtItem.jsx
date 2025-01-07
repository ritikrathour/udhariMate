import { memo, useState } from "react";

const DebtItem = ({ style, items }) => {
    const [showFullText, setShowFullText] = useState(false);
    const { amount, description, date, type,createdAt } = items;  
    let ifLengthMore = description?.length > 15 ? showFullText ? description : description.slice(0, 20) + "..." :description; 
    return (
        <>
            <li className={`${type === "DEBT" ? "self-start" : "self-end "} sm:w-[300px] w-[200px] `}>
                <div className="flex items-center hover:bg-gray-50 shadow drop-shadow-sm 
             justify-between gap-2 rounded-md bg-white py-1 px-3 w-full ">
                    <div className={`flex gap-2 items-center ${style} `}>
                        <i className="fas fa-arrow-up text-sm"></i>
                        <p className="text-[12px">
                            <span className="text-[14px] pr-[1px]">₹</span>{amount}
                        </p>
                    </div>
                    <p className="text-gray-500 font-semibold text-[10px] flex flex-col ">
                        {date ? String(date)?.slice(0, 10) : date?.slice(0, 10)}
                        <span>
                            {new Date(createdAt).toLocaleTimeString()}
                        </span>
                    </p>
                </div>
                {
                    description !== "" && <p onClick={() => setShowFullText(prev =>!prev)} className="mx-2 capitalize cursor-pointer py-1 px-3 text-sm text-gray-500  box-content overflow-hidden w-[250px]">{ifLengthMore}</p>
                }
            </li>
        </>
    )
}
export default memo(DebtItem);