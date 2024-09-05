import { Link } from "react-router-dom";
import { SubNavMenu } from "../data/data";



interface DropdownInterface{
  submenus:SubNavMenu[],
  dropdown:boolean
}
const Dropdown = ({ submenus, dropdown }:DropdownInterface) => {
  return (
    <ul
      className={` ${
        dropdown ? "show" : "dropdown"
      }  dropdow_menu absolute servis_list z-10`}
    >
      {submenus.map((submenu:SubNavMenu, index:number) => (
        <Link to={submenu.url}>
          <li key={index} className="">
            {submenu.title}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default Dropdown;