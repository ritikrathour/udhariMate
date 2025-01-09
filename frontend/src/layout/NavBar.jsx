
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import SearchForm from "../components/SearchForm";
import Loader from "../components/Loader";
import SignOutPopUp from "../components/SignOutPopUp";
import { stopScrolling } from "../ReduxStore/StopScrollingSlice";
import LazyImage from "../utils/LazyImage";
const NavBar = () => {
    const { user, loading } = useSelector(state => state.user);
    const [show, SetShow] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const location = useLocation();
    const { isOpen } = useSelector(state => state.StopScrollBar);
    const dispatch = useDispatch();
    // showSignOutPopUp
    const showSignOutPopUp = () => {
        SetShow(false)
        dispatch(stopScrolling(show))
    }
    useEffect(() => {
        SetShow(false);
    }, [location]);
    return (
        <>
            <nav className="flex justify-between items-center transition-all md:mr-4 mx-2 backdrop-blur-xl py-1">
                <Link to="/" className="flex items-center">
                    <div className="w-[60px]">
                        <LazyImage src="../images/shakeHand.png" alt="logo" />
                    </div>
                    <span className="font-bold text-sm">Udhaari<span className="text-[#469bbf] font-sans font-medium">Mate</span></span>
                </Link>
                {
                    user && user?.role === "shopkeeper" && <SearchForm showSearch={showSearch} setShowSearch={setShowSearch} />
                }
                <div className="flex gap-1 md:gap-2 items-center">
                    {
                        loading ? <Loader style="border border-black" /> : (user && user?._id) ? (
                            <div className="relative flex justify-center items-center gap-2" >
                                {
                                    user && user?.role === "shopkeeper" ? (<Link className="mx-2 text-[14px] font-semibold hidden sm:block " to="/ladger">Ladgers</Link>) : null
                                }
                                {
                                    user?.role === "customer" &&
                                    <Link to={`/transacation-area/${user?.shopId}`} className="mx-2 hover:text-gray-800 hidden sm:block text-gray-500 transition-all text-sm font-medium">Transactions</Link>
                                }
                                <div>
                                    <button className="border-2 px-1 md:px-2 py-1 backdrop-blur-xl rounded-md flex justify-center items-center gap-1 md:gap-2" onClick={() => SetShow(prev => !prev)} >
                                        <div className="image w-[35px] h-[35px] md:w-[45px] md:h-[45px] rounded-full overflow-hidden border border-gray-200">
                                            <LazyImage src={user?.profilePhoto || "../images/user.png"} alt="userImage" />
                                        </div>
                                        <div className=" flex-col items-start leading-4 hidden sm:flex">
                                            <h3 className="capitalize font-medium text-[14px] md:text-[16px]">{user?.userName}</h3>
                                            <p className="text-sm text-gray-500 text-[10px]">{user?.email?.slice(0, 12)}...</p>
                                        </div>
                                        <div className="p-1 cursor-pointer">
                                            <i className={`fas fa-angle-down ${show ? "rotate-180" : "rotate-0"} transition-all`}></i>
                                        </div>
                                    </button>
                                </div>
                                <div className={`${show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"}  absolute bg-white border w-[220px] z-40  flex flex-col items-start top-16 shadow rounded-md right-5 transition-all`}>
                                    <div className="bg-gray-100 w-full p-2 text-center">
                                        <Link to={`/profile/${user?._id}`} className="py-1 flex justify-start items-center gap-2">
                                            <div className="image w-[35px] h-[35px] md:w-[45px] md:h-[45px] rounded-full overflow-hidden">
                                                <LazyImage src={user?.profilePhoto || "../images/user.png"} alt="userImage" />
                                            </div>
                                            <div className="flex flex-col items-start leading-4">
                                                <h3 className="capitalize font-medium text-[14px] md:text-[16px]">{user?.userName}</h3>
                                                <p className="text-sm text-gray-400 text-[10px]">{user?.email}</p>
                                            </div>
                                        </Link>
                                    </div>
                                    <ul className="flex flex-col justify-start items-start gap-1 p-1 w-full mt-1">
                                        <Link to="/" className="hover:text-gray-800 hover:bg-[#69d2ff3d] p-1 rounded-md w-full text-gray-500 align-middle transition-all text-sm font-medium"><i className="fas fa-home mr-4 w-[10px] h-[10px]"></i>Home</Link>
                                        {
                                            user?.role === "shopkeeper" ? (
                                                <div className="flex flex-col gap-2 w-full">
                                                    <Link to="/ladger" className="hover:text-gray-800 hover:bg-[#69d2ff3d] p-1 rounded-md w-full text-gray-500 transition-all text-sm font-medium"><i className="fas fa-users mr-4 w-[10px] h-[10px]"></i>Ladgers</Link>
                                                </div>

                                            ) : (
                                                <div className="flex flex-col gap-2 w-full">
                                                    <Link to={`/transacation-area/${user?.shopId}`} className="hover:text-gray-800 hover:bg-[#69d2ff3d] p-1 rounded-md w-full text-gray-500 transition-all text-sm font-medium">
                                                    <i className="fas fa-exchange-alt mr-4 w-[10px] h-[10px]"></i>
                                                    Transactions
                                                    </Link>
                                                </div>
                                            )
                                        }

                                        <Link to={`/profile/${user?._id}`} className="hover:text-gray-800 hover:bg-[#69d2ff3d] p-1 rounded-md w-full text-gray-500 align-middle transition-all text-sm font-medium"><i className="fas fa-eye mr-4 w-[10px] h-[10px]"></i>Profile</Link>

                                        <button onClick={() => showSignOutPopUp()} type="button" className="text-sm text-left hover:bg-[#69d2ff3d] p-1 rounded-md w-full text-gray-500 font-medium hover:text-gray-800 transition-all"><i className="fas fa-sign-out mr-4 w-[10px] h-[10px]"></i>Sign Out</button>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="w-[100px] sm:w-[120px]">
                                <Button text="Sign Up" />
                            </div>
                        )
                    }
                    {
                        user && user?.role === "shopkeeper" && (
                            <div className="md:hidden" >
                                <i className="fas fa-search cursor-pointer text-[14px]" onClick={() => setShowSearch(true)} />
                            </div>
                        )
                    }

                </div>

                <div onClick={() => dispatch(stopScrolling(show))} className={`w-full absolute left-0 top-0 h-screen z-50 flex justify-center pb-20 md:items-center items-end p-4 sm:p-6 bg-[#9ca3af69] ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"} transition-all`}>
                    <SignOutPopUp />
                </div>
            </nav >

        </>

    )
}
export default NavBar;
