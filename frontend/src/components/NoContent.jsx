import LazyImage from "../utils/LazyImage";

const NoContent = ({img,alt,text}) => {
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div className=" w-[250px] sm:w-[300px] md:w-[330px] h-[300px] sm:h-[350px]">
                    <LazyImage src={img} alt={alt}/> 
                </div>
                <h2 className="font-semibold">{text}</h2>
            </div>
        </>
    )
}
export default NoContent;