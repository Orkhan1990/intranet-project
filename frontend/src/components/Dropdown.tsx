import { Link } from "react-router-dom";
import { SubItemsInterface } from "../data/data";



interface DropdownInterface{
    submenus:SubItemsInterface[],
    dropdown:boolean
}

const Dropdown = ({ submenus, dropdown }:DropdownInterface) => {
  return (
    <ul
      className={` ${
        dropdown ? "show" : "dropdown"
      }  dropdow_menu absolute servis_list z-10`}
    >
      {submenus.map((submenu, index) => (
        <Link to={submenu.url} key={index}>
          <li key={index} className="">
            {submenu.title}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default Dropdown;
