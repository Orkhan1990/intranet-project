import { useState } from "react";
import Dropdown from "./Dropdown";
import { NavbarListInterface } from "../data/data";



interface SubMenuInterface{
   item:NavbarListInterface
}
const SubMenu = ({item}:SubMenuInterface) => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <li onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
      {
        item.subItems?(<>
        <button aria-expanded={dropdown ? "true" : "false"} className="relative " >{item.title}</button>
        <Dropdown submenus={item.subItems}   dropdown={dropdown} />
        </>):(<a>{item.title}</a>)
      }
    </li>
  );
};

export default SubMenu;
