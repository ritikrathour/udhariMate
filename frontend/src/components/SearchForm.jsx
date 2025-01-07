import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader"
import AxiosInstance from "../utils/AxiosInstance";
const SearchForm = ({ showSearch, setShowSearch, }) => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const token = axios.CancelToken.source(); 
    
    // debounce function
    function debounce(func, delay) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    }
    // fetchSuggestions
    const fetchSuggestions = useCallback(
        debounce(async (searchQuery) => {  
            try { 
                setLoading(true)
                const { data: data } = await AxiosInstance.get(`/borrowers?search=${searchQuery}`, { cancelToken: token.cancel() })
                setSuggestions(data || []);
                setLoading(false)
            } catch (err) {
                console.error("Error fetching suggestions:", err);
            } finally {
                setLoading(false);
            }
        }, 700),
        []
    );

    // Effect to call fetchSuggestions whenever the query changes
    useEffect(() => {
        if (query.trim() === "") return;
        fetchSuggestions(query);  
    }, [query]);

    // handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query !== "") {
            setQuery("")
            navigate(`transation-area/671690c4513e65352aaa5884`)
        }
    }
    // closeSuggetions
    const closeSuggetions = ()=>{
        setSuggestions([]);
        setQuery("");
    }

    return (
        <>
            <div className={`${!showSearch ? "-translate-y-48 md:translate-y-0" : "translate-y-0 transition-all"} px-2 py-4 md:py-1 z-50  bg-gray-100 border drop-shadow md:border-none md:bg-inherit absolute top-0 left-0 w-full md:w-auto md:static`}>
                <form onSubmit={(e) => handleSubmit(e)} className={`w-[95%] sm:w-[60%] sm:m-auto relative h-8 md:w-72 rounded-full cursor-pointer overflow-hidden`}>
                    <input type="text"
                        placeholder="Search Debiter by Name or Email"
                        value={query}
                        id="search"
                        className="text-sm bg-gray-200 
                    outline-none rounded-md px-2 w-full h-full pr-6"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <label htmlFor="search" type="submit" className="absolute top-[50%] p-1 right-2 translate-y-[-50%] text-slate-700">
                        <i className="fas fa-search"></i>
                    </label>
                </form>
                {
                    query.trim()?.length > 0 && <ul className="bg-white w-full sm:w-[60%]  md:w-full md:absolute left-0 sm:m-auto rounded-md z-50  md:mt-4 p-2 max-h-[250px] overflow-auto">
                        {
                            !loading ? suggestions?.data?.map(user => { 
                                return <li className="hover:bg-gray-100 p-1 capitalize  text-sm" key={user?._id}>
                                    <Link onClick={()=>closeSuggetions()} to={`/transacation-area/${user?._id}`} className="w-full inline-block">
                                        {user?.borrowerDetails?.userName} || {user?.borrowerDetails?.email}
                                    </Link>
                                </li>
                            }) : <Loader style="border-2 border-black m-auto" />
                        }
                        {
                            suggestions?.data?.length <= 0 && !loading && <span className="text-center inline-block w-full text-sm">No more data</span>
                        }
                    </ul>
                }
                <div className="md:hidden absolute top-[2px] right-1 bg-gray-200 text-[12px] w-[20px] h-[20px] rounded-full text-center cursor-pointer" style={{ "lineHeight": "20px" }} onClick={() => setShowSearch(prev => !prev)}>
                    <i className="fas fa-times text-sm text-gray-800 font-semibold"></i>
                </div>
            </div>
        </>
    )
}
export default React.memo(SearchForm);