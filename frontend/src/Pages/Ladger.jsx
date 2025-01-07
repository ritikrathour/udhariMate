import { useEffect, useRef, useState } from "react";
import Borrower from "../components/Borrower";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../components/Loader"
import toast from "react-hot-toast";
import NoContent from "../components/NoContent"; 
import AxiosInstance from "../utils/AxiosInstance";
const Ladger = () => {
    const { user } = useSelector(state => state.user);
    const [borrowers, setBorrowers] = useState([])
    const [borrowersloading, setborrowersloading] = useState(true);
    const [show, setShow] = useState(false);
    const filterPopupRef = useRef();
    const location = useLocation();
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1);
    const [moreBorrowerLoading, setMoreBorrowerLoading] = useState(false); 
    const token = axios.CancelToken.source();
    //get borrowers   
    const getBorrowers = async () => {         
        try {
            const { data: { data } } = await AxiosInstance.get(`/borrowers?page=${page}`, { cancelToken: token.cancel() })
            setTotalPages(data?.totalPages);
            setBorrowers(prev => [...prev, ...data?.borrowers])
            setborrowersloading(false)
            setMoreBorrowerLoading(false)
        } catch (error) {
            console.log(error);
            setborrowersloading(false);
            setMoreBorrowerLoading(false); 
        }
    }
    // handleLoadMorePage 
    const handleLoadMorePage = () => { 
        setPage(prev => prev + 1);
        setMoreBorrowerLoading(true)
    } 
    const handleShow = () => { 
        setShow(prev => !prev);
    } 
    useEffect(() => { 
        setShow(false)
    }, [location])
    
    useEffect(() => { 
        if (user && user?.role === "shopkeeper") {
            getBorrowers();
        }
    }, [page])

    return (
        <>
            <section className="flex flex-col md:flex-row w-full sm:w-[90%] md:w-[80%] m-auto mb-4 gap-4 relative rounded-md">
                <div className=" w-full py-2 px-2 "> 
                    <div className="flex justify-between mb-4 relative z-40">
                        <h3 className="text-[16px] font-semibold border-b-2 border-black uppercase text-black" >Customers</h3>
                        <button ref={filterPopupRef} onClick={handleShow} type="button" className=" border text-[16px] border-gray-300 px-4 rounded-full font-medium bg-[#69d2ff3d]">
                            Filter <i className="fas fa-filter text-black"></i>
                        </button>
                        <div className={`${show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"} absolute bg-white border w-[200px] flex flex-col items-start top-10 shadow rounded-md right-10 transition-all`} >
                            <div className="bg-gray-100 w-full p-2 text-start">
                                <h2 className="text-[12px]">Sort By</h2>
                            </div>
                            <div className="flex flex-col justify-start items-start gap-1 p-2 w-full mt-1">
                                <div className="flex gap-2 items-center">
                                    <input className="cursor-pointer" type="checkbox" name="name" id="name"   />
                                    <label className="cursor-pointer text-[13px]" htmlFor="name">Name</label>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <input className="cursor-pointer" type="checkbox" name="amount" id="amount" />
                                    <label className="cursor-pointer text-[13px]" htmlFor="amount">Amount</label>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <input className="cursor-pointer" type="checkbox" name="latest" id="latest"  />
                                    <label className="cursor-pointer text-[13px]" htmlFor="latest">Latest</label>
                                </div>
                                <button onClick={() => setShow(false)} className="rounded-md py-1 text-white bg-[#469bbf] w-full mt-1">Save</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col rounded-md gap-3 bg-white py-2 overflow-y-auto h-[80vh]  mb-3">
                        {
                            borrowersloading ? <div className="m-auto h-[60vh]"><Loader style="border-black border-2" /></div> : (
                                borrowers && borrowers?.map((borrower) => {
                                    return <Borrower key={borrower?._id} borrower={borrower} />
                                })
                            )
                        }
                        {
                            borrowers?.length === 0 && !borrowersloading && <NoContent img="../images/noBorrower.png" alt="no borrower" text="You Have no Borrower Yet!" />
                        }
                        {
                            moreBorrowerLoading ? <div className="m-auto"><Loader style="border-2 border-black" /> </div> : null
                        }
                        {
                            !borrowersloading && page < totalPages ?
                                <p onClick={() => handleLoadMorePage()} className="text-center cursor-pointer  bg-gray-200 w-[200px] m-auto rounded-xl py-1 text-gray-800 font-medium">Load More</p>
                                : null
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
export default Ladger;