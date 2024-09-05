import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-gray-600 h-[200px] flex items-center justify-between pl-20 pr-20">
      <div className="flex items-center gap-2 ">
        <Link to={"/"}>
          <img
            src="../images/manmetalicon.png"
            alt=""
            className="h-[55px] object-cover"
          />
        </Link>
        <div className="flex pt-[40px] gap-1 text-sm underline text-white">
          <p>&copy;</p>
          {new Date().getFullYear()}
          <p>Improtex Trucks and Buses</p>
        </div>
      </div>
      <div className="flex gap-5 text-white text-lg pt-[70px]">
        <a href="https://www.instagram.com/" target="_blank">
          <FaInstagram />
        </a>
        <a href="https://www.facebook.com/improtextrucksandbuses" target="_blank">
          <FaFacebook />
        </a>
        <a href="https://www.linkedin.com/" target="_blank">
          <FaLinkedinIn />
        </a>
        <a href="https://www.twitter.com/" target="_blank">
          <FaSquareXTwitter />
        </a>
      </div>
    </div>
  );
};

export default Footer;