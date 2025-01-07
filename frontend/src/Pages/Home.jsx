 
import LazyImage from "../utils/LazyImage"; 
const Home = () => { 
    return (
        <>
            <section className="flex flex-col gap-5"> 
                <div className="text-center">
                    <div className="sm:w-[600px] md:w-[50%] m-auto mt-2 w-full sm:h-[380px] h-auto md:h-[60%]"> 
                        <LazyImage src="../images/people-using-phones.png" alt="home_image"/> 
                    </div>
                    <h1 className="text-[20px] md:text-[25px] leading-8 font-semibold">Simplify Debt Tracking Effortlessly!</h1>
                    <p className="text-gray-700">Simplify Your Udhari Management <br /> Track, Settle, and Relax!</p>
                </div>
                <div className="text-center">
                    <div className="sm:w-[600px] md:w-[50%] m-auto mt-10 w-full sm:h-[450px] h-auto md:h-[60%]">
                        <LazyImage src="../images/home2.png" alt="home_second_image"/> 
                    </div>
                    <h1 className="text-[20px] md:text-[25px] leading-8 font-semibold">Manage Borrowers with Ease!</h1>
                    <p className="text-gray-500">Effortless Debt Tracking <br /> Your Digital Udhari Assistant!</p>
                </div>
            </section>
        </>
    )
}
export default Home;