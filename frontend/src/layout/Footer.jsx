import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>  
            <nav>
                <Link to="/">
                    {/* <span className="inline-block bg-gradient-to-bl to-pink-500 from-yellow-400 rounded-[6px] px-4 py-2 text-white">Udhari</span> Bro */}
                    <img className="w-[70px]" src="../images/shakeHand.png" alt="" />
                </Link>
            </nav>
            <ul className="m-auto  flex gap-4 justify-center items-center">
                <li>
                    <Link to=""><i className="fab fa-linkedin text-[20px]"></i></Link>
                </li>
                <li>
                    <Link to=""><i className="fab fa-instagram text-[20px]"></i></Link>
                </li>
                <li>
                    <Link to=""><i className="fab fa-facebook text-[20px]"></i></Link>
                </li>
                <li>
                    <Link to=""><i className="fab fa-google text-[20px]"></i></Link>
                </li>
                <li>
                    <Link to=""><i className="fab fa-twitter text-[20px]"></i></Link>
                </li>
                <li>
                    <Link to=""><i className="fab fa-youtube text-[20px]"></i></Link>
                </li>
            </ul>

            <p className="text-center mt-2 text-[14px]">Made with lots of 💦 and ❤️</p>
        </>
    )
}
export default Footer;