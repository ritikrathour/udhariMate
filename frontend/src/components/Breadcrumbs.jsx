import { useNavigate } from "react-router-dom";

const BreadCrumbs = ()=>{
    const navigate = useNavigate();
    // handleBack
    const handleBack = ()=>{
        window.scrollTo(0, 0)
        navigate(-1);
    }
    return (
        <>
        <div className="cursor-pointer md:absolute  md:top-20 md:left-10 w-[20px] h-[20px] md:w-[30px] md:h-[30px] z-40 rounded-full bg-[#69d2ff3d] text-center leading-[20px] md:leading-[30px] mb-1 text-[12px] md:text-[16px]" onClick={handleBack}>
            <i className="fas fa-arrow-left text-[#469bbf]"></i>
        </div>
        </>
    )
}
export default BreadCrumbs;